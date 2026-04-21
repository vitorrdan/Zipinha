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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-250 ">

        {/* Header */}
        <Header titulo={"Área do Aluno"} subtitulo={"Programação web"} />
          
        <div className="mt-6 mb-6">
          <h1 className="text-2xl font-medium text-gray-800">Entrega de atividades</h1>
          <p>Preencha os campos abaixo e anexe seu arquivo para entregar.</p>
        </div>

        {/* Campos */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Seu nome
            </label>
            <input
              type="text"
              placeholder="Ex: Maria Eduarda"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-290 text-sm focus:outline-none focus:border-teal-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Nome da atividade
            </label>
            <input
              type="text"
              placeholder="Ex: Aula 3 – Formulários HTML"
              value={atividade}
              onChange={(e) => setAtividade(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-290 text-sm focus:outline-none focus:border-teal-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Código da aula
            </label>
            <input
              type="text"
              placeholder="Digite o código que está no quadro"
              value={codigoAula}
              onChange={(e) => setCodigoAula(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-290 text-sm focus:outline-none focus:border-teal-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Arquivo(s)
            </label>
            <label className="w-full flex flex-col items-center justify-center px-4 py-8 rounded-xl border-2 border-dashed border-gray-290 cursor-pointer hover:border-teal-400 transition-colors">
              <svg className="w-8 h-8 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {arquivo ? (
                <span className="text-sm text-teal-600 font-medium">{arquivo.name}</span>
              ) : (
                <>
                  <span className="text-sm text-gray-400">Clique para selecionar</span>
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

        {/* Erro */}
        {erro && (
          <div className="mt-4 p-3 bg-red-50 rounded-xl">
            <p className="text-red-600 text-sm">{erro}</p>
          </div>
        )}

        {/* Botão */}
        <button
          onClick={handleEnviar}
          disabled={loading}
          className="w-40 mt-6 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white rounded-xl text-sm font-medium transition-colors"
        >
          {loading ? 'Enviando...' : 'Enviar atividade'}
        </button>

      </div>
    </div>
    )

}

