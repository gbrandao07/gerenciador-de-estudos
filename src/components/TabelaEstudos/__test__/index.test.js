import React, { useState } from "react";
import { render , cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import TabelaEstudos from "..";

describe("[unit testing] suite for TabelaEstudos", () => {
       
    afterEach(cleanup)
    
    var tarefasCadastradasMock
    var mockSetTarefasCadastradas
    
    beforeEach(() => {
        // mock da state vinda por props do FormularioCadastro
        tarefasCadastradasMock = [
            "Estudar React",
            "Estudar Spring boot",
            "Estudar Mulesoft",	
            "Estudar Openshift",			
            "Estudar Kafka",	
            "Estudar Gitlab pipelines",
            "Estudar Gitlab Feature Flags com Unleash",
            "Estudar Kubernetes"
        ]

        mockSetTarefasCadastradas = jest.fn();

        jest.mock('react', () => ({
            useState: tarefasCadastradasMock => [tarefasCadastradasMock, mockSetTarefasCadastradas]
        })); 
    })

    it("should render TabelaEstudos component without crashing", () => {
        render(<TabelaEstudos setTarefasCadastradas={mockSetTarefasCadastradas} tarefasCadastradas={tarefasCadastradasMock} />)
    })

    it("should display 8 default tasks when render", () => {
        
        /* GIVEN */
        const { getByTestId, getAllByRole } = render(<TabelaEstudos setTarefasCadastradas={mockSetTarefasCadastradas} tarefasCadastradas={tarefasCadastradasMock} />)

        /* WHEN */

        // recupera todos as rows (tr) presentes no DOM
        const tableItems = getAllByRole('row')

        /* THEN */
        for (var i=1; i< tableItems.length; i++) {
            // na tabela precisar comecar em 1 (posicao 0 eh o header)
            expect(tableItems[i].textContent).toBe(tarefasCadastradasMock[i-1])
        }

        const lblInformandoQueHaTarefasPendentes =  getByTestId('testlblInfoTarefasPendentesId')
        expect(lblInformandoQueHaTarefasPendentes.textContent).toBe("0 estudo(s) concluidos. Você tem 8 estudo(s) pendentes!")
    })

    it("should display 7 tasks when delete 1", () => {

        /* GIVEN */

        const { getByTestId } = render(<TabelaEstudos setTarefasCadastradas={mockSetTarefasCadastradas} tarefasCadastradas={tarefasCadastradasMock} />)

        const btnDelete = getByTestId("testButtonDeleteIdEstudar Spring boot")

        /* WHEN */

        // act renders component again after execution 
        act(() => {
            btnDelete.click()
        });

        const tableItems = screen.getAllByRole('row')

        /* THEN */

        expect(tableItems.length).toBe(8) // itens sao 7, porem o header conta tmb
        
        for (var i=1; i< tableItems.length; i++) {
            // na tabela precisar comecar em 1 (posicao 0 eh o header)
            expect(tableItems[i].textContent).not.toBe("Estudar Spring boot")
        }

        const lblInformandoQueHaTarefasPendentes =  getByTestId('testlblInfoTarefasPendentesId')
        expect(lblInformandoQueHaTarefasPendentes.textContent).toBe("0 estudo(s) concluidos. Você tem 7 estudo(s) pendentes!")
    })

    it("should display default message in table when delete all tasks", () => {

        /* GIVEN */

        // Wrapper permite usar o hook state e manipular os valores (ao contrario do que esta no beforeEach com jest. Este apenas
        // permite usar, mas quando chama o set nao muda nada)
        const Wrapper = () => {
            const [tarefasCadastradas, setTarefasCadastradas] = useState([
                "Estudar React",
                "Estudar Spring boot",
                "Estudar Mulesoft",	
                "Estudar Openshift",			
                "Estudar Kafka",	
                "Estudar Gitlab pipelines",
                "Estudar Gitlab Feature Flags com Unleash",
                "Estudar Kubernetes"
            ]); 
            return <TabelaEstudos tarefasCadastradas={tarefasCadastradas} setTarefasCadastradas={setTarefasCadastradas} />
        };

        const { getByTestId } = render(<Wrapper />)

        const btnDeleteTask1 = getByTestId("testButtonDeleteIdEstudar React")
        const btnDeleteTask2 = getByTestId("testButtonDeleteIdEstudar Spring boot")
        const btnDeleteTask3 = getByTestId("testButtonDeleteIdEstudar Mulesoft")
        const btnDeleteTask4 = getByTestId("testButtonDeleteIdEstudar Openshift")
        const btnDeleteTask5 = getByTestId("testButtonDeleteIdEstudar Kafka")
        const btnDeleteTask6 = getByTestId("testButtonDeleteIdEstudar Gitlab pipelines")
        const btnDeleteTask7 = getByTestId("testButtonDeleteIdEstudar Gitlab Feature Flags com Unleash")
        const btnDeleteTask8 = getByTestId("testButtonDeleteIdEstudar Kubernetes")

        /* WHEN */

        // act renders component again after execution 
        act(() => {
            btnDeleteTask1.click()
            btnDeleteTask2.click()
            btnDeleteTask3.click()
            btnDeleteTask4.click()
            btnDeleteTask5.click()
            btnDeleteTask6.click()
            btnDeleteTask7.click()
            btnDeleteTask8.click()
        });

        const tableItems = screen.getAllByRole('row')

        expect(tableItems.length).toBe(2) // header + mensagem default

        expect(tableItems[1].textContent).toBe("Não há tarefas cadastradas.")
        
    })

    it("should display congratulations message when finish all tasks", () => {

        /* GIVEN */

        // Wrapper permite usar o hook state e manipular os valores (ao contrario do que esta no beforeEach com jest. Este apenas
        // permite usar, mas quando chama o set nao muda nada)
        const Wrapper = () => {
            const [tarefasCadastradas, setTarefasCadastradas] = useState([
                "Estudar React",
                "Estudar Spring boot",
                "Estudar Mulesoft",	
                "Estudar Openshift",			
                "Estudar Kafka",	
                "Estudar Gitlab pipelines",
                "Estudar Gitlab Feature Flags com Unleash",
                "Estudar Kubernetes"
            ]); 
            return <TabelaEstudos tarefasCadastradas={tarefasCadastradas} setTarefasCadastradas={setTarefasCadastradas} />
        };

        const { getByTestId } = render(<Wrapper />)

        const btnFinishTask1 = getByTestId("testButtonFinishIdEstudar React")
        const btnFinishTask2 = getByTestId("testButtonFinishIdEstudar Spring boot")
        const btnFinishTask3 = getByTestId("testButtonFinishIdEstudar Mulesoft")
        const btnFinishTask4 = getByTestId("testButtonFinishIdEstudar Openshift")
        const btnFinishTask5 = getByTestId("testButtonFinishIdEstudar Kafka")
        const btnFinishTask6 = getByTestId("testButtonFinishIdEstudar Gitlab pipelines")
        const btnFinishTask7 = getByTestId("testButtonFinishIdEstudar Gitlab Feature Flags com Unleash")
        const btnFinishTask8 = getByTestId("testButtonFinishIdEstudar Kubernetes")

        /* WHEN */

        // act renders component again after execution 
        act(() => {
            btnFinishTask1.click()
        });
        act(() => {
            btnFinishTask2.click()
        });
        act(() => {
            btnFinishTask3.click()
        });
        act(() => {
            btnFinishTask4.click()
        });
        act(() => {
            btnFinishTask5.click()
        });
        act(() => {
            btnFinishTask6.click()
        });
        act(() => {
            btnFinishTask7.click()
        });
        act(() => {
            btnFinishTask8.click()
        });

        const tableItems = screen.getAllByRole('row')
        expect(tableItems.length).toBe(2) // header + mensagem default
        expect(tableItems[1].textContent).toBe("Não há tarefas cadastradas.")

        const lblParabens =  screen.getByTestId('testlblParabensId')
        expect(lblParabens.textContent).toBe("Parabéns, você concluiu todos os seus 8 estudos!")
    })

    it("should display updated value when edit task", () => {
        
        /* GIVEN */

        window.prompt = jest.fn().mockImplementation(() => "estudo com nova descricao")
        window.confirm = jest.fn().mockImplementation(() => true)

        // Wrapper permite usar o hook state e manipular os valores (ao contrario do que esta no beforeEach com jest. Este apenas
        // permite usar, mas quando chama o set nao muda nada)
        const Wrapper = () => {
            const [tarefasCadastradas, setTarefasCadastradas] = useState([
                "Estudar React",
                "Estudar Spring boot",
                "Estudar Mulesoft",	
                "Estudar Openshift",			
                "Estudar Kafka",	
                "Estudar Gitlab pipelines",
                "Estudar Gitlab Feature Flags com Unleash",
                "Estudar Kubernetes"
            ]); 
            return <TabelaEstudos tarefasCadastradas={tarefasCadastradas} setTarefasCadastradas={setTarefasCadastradas} />
        };

        const { getByTestId } = render(<Wrapper />)

        const btnEditTask1 = getByTestId("testButtonEditIdEstudar React") 

        act(() => {
            btnEditTask1.click()
        });

        const tableItems = screen.getAllByRole('row')
        expect(tableItems[1].textContent).toBe("estudo com nova descricao")
    })
})