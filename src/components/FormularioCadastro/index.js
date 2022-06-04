import { useState } from 'react'
import './styles.css'

export default function FormularioCadastro(props) {

    const [descricaoTarefa, setDescricaoTarefa] = useState('')
    const [erros, setErros] = useState('')
    const [success, setSuccess] = useState('')

    function cadastrar(e) {
        e.preventDefault()
        setErros('')
        setSuccess('')
        if (descricaoTarefa === '') {
            setErros("Preencha a descrição do estudo")
            return
        }
        if (!props.tarefasCadastradas.includes(descricaoTarefa.toLowerCase().trim()) 
                && !props.tarefasCadastradas.includes(descricaoTarefa.toUpperCase().trim())
                && !props.tarefasCadastradas.includes(descricaoTarefa.trim())) {
                    props.setTarefasCadastradas([...props.tarefasCadastradas, descricaoTarefa])
                    setSuccess(`Estudo '${descricaoTarefa}' cadastrado com sucesso`)
        } else {
            setErros("Estudo já cadastrado")
        }
    }

    function handleInputChange(e) {
        setSuccess('')
        setErros('')
        setDescricaoTarefa(e.target.value) 
    }

    function limpar(e) {
        e.preventDefault()
        setSuccess('')
        setErros('')
        setDescricaoTarefa('') 
    }

    return(
        <div className="containerCadastro">
            { success !== '' && 
                <span data-testid="testSuccessMessageId" className="messageSuccess">{success}</span>
            }
            { erros !== '' && 
                <span data-testid="testErrorMessageId" className="messageError">{erros}</span>
            }
            <form className="formCadastro" onSubmit={e => cadastrar(e)}>
                <div className="cadastroArea">
                    <label htmlFor="inputTarefa">Descreva o estudo:</label>
                    <input data-testid="testInputTarefaId" type="text" placeholder="Informe uma breve descrição... " value={descricaoTarefa} onChange={e => handleInputChange(e)}></input>
                </div>
                <button data-testid="testBtnCadastrarTarefa" type="submit">Cadastrar</button>
                <button onClick={e => limpar(e)}>Limpar</button>
            </form>
        </div>
    )
}
