function verificaCodigo(req,res,next){
    const { codigo } = req.body;

    if(!codigo){
        return res.status(404).json({mensagem: "Necessário enviar o codigo de verificação"})
    }

    if(codigo != process.env.CODIGO_AULA){
        return res.status(401).json({erro: "Código inválido"})
    }

    next()

}

module.exports = { verificaCodigo }