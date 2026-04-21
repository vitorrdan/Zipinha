const express = require('express')
const multer = require('multer') // lib pra processar arquivo enviado
const path = require('path')
const fs = require('fs')

const { salvarEntrega, listarEntregas, deleteEntrega } = require('../services/database')
const { enviarEmailEntrega } = require('../services/email')
const { verificaCodigo } = require('../middlewares/authAluno')
const { verificaMonitor } = require('../middlewares/AuthMonitor')



const router = express.Router()

//Pasta temporaria onde o Multer vai salvar os arquivos antes de mandar pro Drive
const TEMP_DIR = path.join(__dirname, '..', '..', 'temp')

//Cria pasta temp se nao existir
if(!fs.existsSync(TEMP_DIR)){
    fs.mkdirSync(TEMP_DIR)
}

//Configura onde e como salvar o arquivo temporariamente
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, TEMP_DIR)
    },

    filename: function(req,file,cb){
        const uniqueName = Date.now() + '-' + file.originalname //usa timestamp atual para diferenciar arquivos com mesmo nome
        cb(null,uniqueName)
    }
})

function fileFilter(req,file, cb){
    const allowedTypes = [
    'application/zip',
    'application/x-zip-compressed',
    'text/html',
    'text/css',
    'text/javascript',
    'application/javascript'
    ]

    if(allowedTypes.includes(file.mimetype)){
        cb(null, true) //aceita o arquivo
    } else {
        cb(new Error('Tipo de arquivo não permitido'), false) //rejeita
    }
}

//Junta as configuracoes e define limite de tamanho
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024 //50 MB 
    }
})


//Rota p/ POST das ATIVIDADES
// upload.single = middlware ajuda o express a processar o arquivo
router.post('/upload', upload.single('arquivo'), verificaCodigo,  async(req, res) => {

    //se o Multer nao encontrou arquivo nenhum (multer separa a req = texto + arquivo)
    if(!req.file){
        return res.status(400).json({erro: 'Nenhum arquivo enviado !'})
    }

    //Campos de texto que vem junto com o arquivo
    const {aluno, atividade} = req.body

    if(!aluno || !atividade){
        return res.status(400).json({erro: 'Nome do aluno e atividade são obrigatórios'})
    }

    try{
       // Manda o e-mail com o arquivo anexado
        await enviarEmailEntrega({
            aluno,
            atividade,
            arquivoPath: req.file.path,
            arquivoNome: req.file.originalname
        })

        // Salva o registro no banco
        const id = salvarEntrega({
            aluno,
            atividade,
            arquivo_nome: req.file.originalname,
            drive_url: 'enviado por e-mail'
        })

        // Deleta o arquivo temporário depois de anexar no e-mail
        const fs = require('fs')
        fs.unlinkSync(req.file.path)

        console.log(`Entrega #${id} salva — ${aluno} — ${atividade}`)

        res.json({
            mensagem: 'Atividade entregue com sucesso!'
        })

    } catch(err) {
        console.error('Erro no upload', err)
        res.status(500).json({erro: 'Erro ao processar arquivo. Tente de novo - upload.js'})
    }

})

//Rota p/ GET  das ATIVIDADES
router.get('/atividades', verificaMonitor, (req, res) => {
    const entregas = listarEntregas()
    res.json(entregas)
})


//Rota p/ DELETE das ATIVIDADES
router.delete('/atividades/:id', verificaMonitor, (req, res) => {
    const entrega = deleteEntrega(req.params.id)
    
    console.log(`Entrega ${entrega.id} deletada - ${entrega.aluno} - ${entrega.atividade}`)

    res.json({mensagem: `Entrega ${entrega.atividade} deletada !`})
})

module.exports =  router 

