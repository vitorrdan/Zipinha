const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

// Inicializa o bd ao iniciar o servidor
require('./services/database')
const app = express()

// ---MIDDLEWARES GLOBAIS---




// Permite que o frontend (em outro dominio) acesse o backend
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http:localhost:5173'
}))

// Permite que o servidor entenda JSON no corpo das requisições
app.use(express.json())



// ---ROTAS---
const uploadRoutes = require('./routes/entrega.route')
app.use('/api', uploadRoutes)

// Rota de verificação — útil pra testar se o servidor está de pé
app.get('/health', (req, res) => {
  res.json({ status: 'ok', projeto: 'Zipinha' })
})




//---SOBE O SERVIDOR---
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Servidor Zipinha rodando na porta: ${PORT}`)
})