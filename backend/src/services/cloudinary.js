const cloudinary = require('cloudinary').v2
const fs = require('fs')

//Configuração cloudinary com as credenciiais
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

async function uploadParaCloudinary(caminhoArquivo, nomeArquivo){
    const resultado = await cloudinary.uploader.upload(caminhoArquivo, {
        // raw = permite qualquer tipo de arquivo
        resource_type: 'raw',

        //nome do arquivo no Cloudinary
        public_id: nomeArquivo,

        //acesso publico pra download
        access_mode: 'public',

        //pasta onde vai ficar organizado
        folder: 'zipinha'
    })

    //Deleta o arquivo temporário depois de mandar pro Cloudinary
    fs.unlinkSync(caminhoArquivo)

    //retorna o link de download direto
    return resultado.secure_url
}

module.exports = { uploadParaCloudinary }