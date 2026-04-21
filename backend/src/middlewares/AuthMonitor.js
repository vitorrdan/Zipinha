function verificaMonitor(req, res, next) {

  // Lê o header 'x-monitor-senha' que o frontend vai mandar
  const senha = req.headers['x-monitor-senha']

  if (!senha || senha !== process.env.CODIGO_MONITOR) {
    return res.status(401).json({ erro: 'Senha incorreta' })
  }

  next()
}

module.exports =  { verificaMonitor }