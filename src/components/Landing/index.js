import { useState } from "react";
import FormularioCadastro from "../FormularioCadastro";
import TabelaEstudos from "../TabelaEstudos";
import './styles.css'

export default function Landing() {

    const [tarefasCadastradas, setTarefasCadastradas] = useState([
        "Estudar React",
        "Estudar Spring boot",
        "Estudar Mulesoft",	
        "Estudar Openshift",			
        "Estudar Kafka",	
        "Estudar Gitlab pipelines",
        "Estudar Gitlab Feature Flags com Unleash",
        "Estudar Kubernetes"
    ])

    return(
        <div className="container">
            <div className="landing">
                <h1>Gerenciador de estudos</h1>
            </div>
            <FormularioCadastro tarefasCadastradas={tarefasCadastradas} setTarefasCadastradas={setTarefasCadastradas} />
            <TabelaEstudos tarefasCadastradas={tarefasCadastradas} setTarefasCadastradas={setTarefasCadastradas} />
        </div>
    )
}