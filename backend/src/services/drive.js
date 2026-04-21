// apenas para pastas em worksapce, email de empresas e instituições (implementação futura)

const { google } = require('googleapis')
const fs = require('fs')
const path = require('path')

// Cria o cliente de autenticacao usando as credenciais do .env
const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/drive']
})

//Cria o cliente do Drive
const drive = google.drive({version: 'v3', auth})

async function uploadParaDrive(caminhoArquivo, nomeArquivo){

    const fileStream = fs.createReadStream(caminhoArquivo)

    const response = await drive.files.create({
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
        requestBody: {
            name: nomeArquivo,
            parents: [process.env.GOOGLE_DRIVE_FOLDER_ID]
        },

        media: {
            //mimeType: 'application/octet-stream',
            body: fileStream
        },

        fields: 'id, webViewLink'
    })

    await drive.permissions.create({
        fileId: response.data.id,
        supportsAllDrives: true,
        requestBody: {
            role: 'reader',
            type:'anyone'
        }
    })

    //Deleta o arquivo temporario dps de mandar pro Drive
    fs.unlinkSync(caminhoArquivo)

    //Retorna o link do arquivo no Drive
    return response.data.webViewLink

}


module.exports = {uploadParaDrive}
