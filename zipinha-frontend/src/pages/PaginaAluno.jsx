import { useState } from "react";
import { enviarAtividade } from "../services/api";
import { Header } from "../components/header";

export default function PaginaAluno(){
    const [nome, setNome] = useState('')
    const [atividade, setAtividade] = useState('')
    const [codigoAula, setCodigoAula] = useState('')
    const [arquivo, setArquivo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState(false)

    async function handleEnviar(){
        //limpa erro anterio
        setErro('')
        console.log('oi');
        
        if(!nome || !atividade || !codigoAula || !arquivo){
            setErro('Preencha todos os campos antes de enviar')
            return
        }
        

        try {
            console.log('entrei no try')
            setLoading(true)

            console.log('nome:', nome)
            console.log('atividade:', atividade)


            await enviarAtividade({aluno: nome, atividade, arquivo, codigoAula})
           
            //Deu certo - mostra sucesso e limpa formulario
            setSucesso(true)
            setNome('')
            setAtividade('')
            setCodigoAula('')
            setArquivo(null)

        } catch(err){
            const mensagem = err.response?.data?.erro || 'Erro ao enviar. Tente de novo.'
            console.log(err)
            setErro(mensagem)
        } finally {
            setLoading(false)
        }

    }

    if(sucesso) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-xl font-medium text-gray-800 mb-2">Atividade enviada!</h2>
                <p className="text-gray-500 text-sm mb-6">Seu arquivo foi entregue com sucesso.</p>
                <button
                    onClick={() => setSucesso(false)}
                    className="text-teal-600 text-sm hover:underline"
                >
                    Enviar outra atividade
                </button>
                </div>
            </div>
        )

    }

    return (
   <div className="min-h-screen flex flex-col bg-gray-50">
      <Header titulo="Área do Aluno" subtitulo="Programação Web" />

      <div className="flex-1 px-8 py-10 max-w-2xl w-full mx-auto">

        <div className="mb-8">
          <h2 className="text-2xl font-medium text-gray-800">Entrega de atividades</h2>
          <p className="text-gray-400 text-sm mt-1">Preencha os campos abaixo e anexe seu arquivo para entregar.</p>
        </div>

        <div className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Seu nome</label>
            <input
              type="text"
              placeholder="Ex: Maria Eduarda"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-teal-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Nome da atividade</label>
            <input
              type="text"
              placeholder="Ex: Aula 3 – Formulários HTML"
              value={atividade}
              onChange={(e) => setAtividade(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-teal-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Código da aula</label>
            <input
              type="text"
              placeholder="Digite o código que está no quadro"
              value={codigoAula}
              onChange={(e) => setCodigoAula(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-teal-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Arquivo(s)</label>
            <label className="w-full flex flex-col items-center justify-center px-4 py-12 rounded-xl border-2 border-dashed border-gray-200 cursor-pointer hover:border-teal-400 bg-white transition-colors">
              <svg className="w-10 h-10 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              {arquivo ? (
                <span className="text-sm text-teal-600 font-medium">{arquivo.name}</span>
              ) : (
                <>
                  <span className="text-sm text-gray-500">Clique para selecionar</span>
                  <span className="text-xs text-gray-300 mt-1">ZIP, HTML, CSS, JS — até 50MB</span>
                </>
              )}
              <input
                type="file"
                className="hidden"
                onChange={(e) => setArquivo(e.target.files[0])}
              />
            </label>
          </div>

        </div>

        {erro && (
          <div className="mt-6 p-4 bg-red-50 rounded-xl">
            <p className="text-red-600 text-sm">{erro}</p>
          </div>
        )}

        <button
          onClick={handleEnviar}
          disabled={loading}
          className="w-full mt-8 py-4 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white rounded-xl text-sm font-medium transition-colors"
        >
          {loading ? 'Enviando...' : 'Enviar atividade'}
        </button>

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

