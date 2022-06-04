import { useCallback, useState } from 'react';
import './styles.css'

export default function TabelaEstudos(props) {
    
    const [tarefasConcluidasCounter, setTarefasConcluidasCounter] = useState(0)

    /* Necessario para forcar uma atualizacao na tabela quando a funcao de delete na tabela no componente pai for chamada */
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    function handleDelete(tarefa) {
        var indexOf = props.tarefasCadastradas.indexOf(tarefa)
        props.tarefasCadastradas.splice(indexOf, 1) // remove o item na posicao indexOf, alterando o array
        props.setTarefasCadastradas(props.tarefasCadastradas)
        forceUpdate()
    }

    function handleEdit(tarefa) {
        var newTarefaDescricao = window.prompt("Digite a nova descrição para o estudo:", tarefa)
        var updateTarefasArray = props.tarefasCadastradas
        updateTarefasArray[props.tarefasCadastradas.indexOf(tarefa)] = newTarefaDescricao
        props.setTarefasCadastradas(updateTarefasArray)
        forceUpdate()
    }

    function handleFinish(tarefa) {
        setTarefasConcluidasCounter(tarefasConcluidasCounter+1)
        handleDelete(tarefa)
    }

    return(
        <div className="containerTabela">
            <h1>Estudos cadastrados</h1>

            <table id="tarefas" data-testid="testTarefasTableId">
                <tbody>
                    <tr>
                        <th>Descrição</th>
                        <th>Alterar</th>
                        <th>Excluir</th>
                        <th>Marcar como concluído</th>
                    </tr>
                    { props.tarefasCadastradas.length > 0 &&
                        props.tarefasCadastradas.map(tarefa => {
                        const testButtonDeleteId = "testButtonDeleteId" + tarefa
                        const testButtonFinishId = "testButtonFinishId" + tarefa
                        const testButtonEditId = "testButtonEditId" + tarefa
                        return(
                            <tr key={tarefa}>
                                <td>{tarefa}</td>
                                <td>
                                    <button data-testid={testButtonEditId} onClick={() => handleEdit(tarefa)}>
                                        <div className="fas fa-edit" />
                                    </button>
                                </td>
                                <td>
                                    <button data-testid={testButtonDeleteId} onClick={() => handleDelete(tarefa)}>
                                        <div className="fas fa-trash-alt" />
                                    </button>
                                </td>
                                <td>
                                    <button data-testid={testButtonFinishId} onClick={() => handleFinish(tarefa)}>
                                        <div className="fa fa-check" />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    { props.tarefasCadastradas.length === 0 &&
                        <tr key="semCadastros">
                            <td>Não há tarefas cadastradas.</td>
                            <td />
                            <td />                          
                            <td />
                        </tr>
                    }
                </tbody>
            </table>
            { props.tarefasCadastradas.length === 0 &&
                <h3 data-testid="testlblParabensId">Parabéns, você concluiu todos os seus {tarefasConcluidasCounter} estudos!</h3>
            }
            { props.tarefasCadastradas.length > 0 &&
                <h3 data-testid="testlblInfoTarefasPendentesId">{tarefasConcluidasCounter} estudo(s) concluidos. Você tem {props.tarefasCadastradas.length} estudo(s) pendentes!</h3>
            }
        </div>
    )
}