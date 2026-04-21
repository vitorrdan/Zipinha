const nodemailer = require('nodemailer')

// Configura o transportador — é quem de fato envia o e-mail (cliente)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

async function enviarEmailEntrega({ aluno, atividade, arquivoPath, arquivoNome }) {
  const dataFormatada = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo'
  })

  const mailOptions = {
    from: `Zipinha <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_DESTINO, //permite multiplos emails
    subject: `[Zipinha] ${aluno} — ${atividade}`,

    // Corpo do e-mail em HTML
    html: `
      <h2>Nova entrega recebida!</h2>
      <table>
        <tr>
          <td><strong>Aluno:</strong></td>
          <td>${aluno}</td>
        </tr>
        <tr>
          <td><strong>Atividade:</strong></td>
          <td>${atividade}</td>
        </tr>
        <tr>
          <td><strong>Arquivo:</strong></td>
          <td>${arquivoNome}</td>
        </tr>
        <tr>
          <td><strong>Data/hora:</strong></td>
          <td>${dataFormatada}</td>
        </tr>
      </table>
    `,

    // Arquivo como anexo
    attachments: [
      {
        filename: arquivoNome,
        path: arquivoPath   // caminho do arquivo temporário
      }
    ]
  }

  await transporter.sendMail(mailOptions)
  console.log(`E-mail enviado — ${aluno} — ${atividade}`)
}

module.exports = { enviarEmailEntrega }