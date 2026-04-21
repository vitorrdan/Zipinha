import { useState } from "react";
import { listarAtividades, deletarAtividade} from "../services/api";
import { Header } from "../components/Header";

export default function PaginaMonitor(){

    const [entregas, setEntregas] = useState([])
    const [senha, setSenha] = useState('')
    const [autenticado, setAutenticado] = useState(false)
    const [ordenacao, setOrdenacao] = useState('')
    const [loading, setLoading] = useState(false)
    const [sucesso, setSucesso] = useState(false)
    const [erro, setError] = useState('')
    const [deletado, setDeletado] = useState([])


    async function handleLogin(){
        setError('') //limpar erros passados

        if(!senha){
            setError('Senha necessária')
            return
        }
        
        try{
            setLoading(true)
            const dados = await listarAtividades(senha)
            setEntregas(dados)
            setSucesso(true)
            setAutenticado(true)

        } catch(err){
            const mensagem = 'Senha inválida'
            setError(mensagem)
        } finally {
            setLoading(false)
        }

    }

    async function handleDeletar(id){
        setError('')

        try{
            setLoading(true)
            const entrega = await deletarAtividade(id, senha)
            setDeletado([...deletado, id])

        }catch(err){
            const mensagem = 'Erro ao deletar atividade'
            setError(mensagem)
        } finally {
            setLoading(false)
        }
    }

    function ordenaEntregas(){
        return [...entregas].sort((a,b) => {
            if(ordenacao == 'aluno'){
                return a.aluno.localeCompare(b.aluno)

            } else if (ordenacao == 'atividade'){
                return a.atividade.localeCompare(b.atividade)
            }

            // padrão: ordena por data mais recente primeiro
              return new Date(b.criado_em) - new Date(a.criado_em)
        })
    }

    function formatarData(isoString) {
        return new Date(isoString).toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
        })
  }

    if(!autenticado){
        //pagina login
         return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-sm border border-gray-100">

          <div className="mb-8">
            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-2xl font-medium text-gray-800">Área do monitor</h1>
            <p className="text-gray-400 text-sm mt-1">Digite a senha para acessar</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Senha
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                // permite enviar com Enter
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-400 transition-colors"
              />
            </div>
          </div>

          {erro && (
            <div className="mt-4 p-3 bg-red-50 rounded-xl">
              <p className="text-red-600 text-sm">{erro}</p>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full mt-6 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white rounded-xl text-sm font-medium transition-colors"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

        </div>
      </div>
    )
    }


    return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header titulo="Área do Monitor" subtitulo="Programação Web" />

      <div className="flex-1 px-8 py-10 max-w-6xl w-full mx-auto">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-medium text-gray-800">Entregas</h2>
            <p className="text-gray-400 text-sm mt-1">
              {ordenaEntregas().length} entrega{ordenaEntregas().length !== 1 ? 's' : ''} recebida{ordenaEntregas().length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => setAutenticado(false)}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Sair
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          {['data', 'aluno', 'atividade'].map((opcao) => (
            <button
              key={opcao}
              onClick={() => setOrdenacao(opcao)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                ordenacao === opcao
                  ? 'bg-teal-500 text-white'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-teal-400'
              }`}
            >
              Por {opcao}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {ordenaEntregas().length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-400 text-sm">Nenhuma entrega ainda.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-6 py-4">Aluno</th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-6 py-4">Atividade</th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-6 py-4">Arquivo</th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-6 py-4">Data</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {ordenaEntregas().map((entrega) => (
                  <tr key={entrega.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">{entrega.aluno}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{entrega.atividade}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{entrega.arquivo_nome}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{formatarData(entrega.criado_em)}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeletar(entrega.id)}
                        className="text-xs text-red-400 hover:text-red-600 transition-colors"
                      >
                        remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-stone-100 border-t border-stone-200 px-8 py-4 flex items-center justify-between">
      <span className="text-xs text-stone-400">Projeto Beira Linha — PUC Minas</span>
      <span className="text-xs text-stone-400">Programação Web</span>
    </footer>
  )
}