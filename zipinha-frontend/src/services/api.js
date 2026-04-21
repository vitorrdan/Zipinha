import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001'
})

//envia as atividades do aluno
export async function enviarAtividade({aluno, atividade, arquivo, codigoAula}){

    console.log('Entrei en enviarAtividade com axios')

    const formData = new FormData
    formData.append('aluno', aluno)
    formData.append('atividade', atividade)
    formData.append('arquivo', arquivo)
    formData.append('codigo', codigoAula)

    const response = await api.post('/api/upload', formData)
    console.log(response.data)
    return response.data
}

//recebe a lista de entregas
export async function listarAtividades(senha){
    const response = await api.get('/api/atividades', {
        headers: {
            'x-monitor-senha': senha
        }
    })

    return response.data 
}

export async function deletarAtividade(id, senha) {
  const response = await api.delete(`/api/atividades/${id}`, {
    headers: {
      'x-monitor-senha': senha
    }
  })
  return response.datas
}