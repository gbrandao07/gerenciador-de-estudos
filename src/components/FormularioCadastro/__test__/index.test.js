import { render , cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { act } from "react-dom/test-utils";
import FormularioCadastro from "..";

describe("[unit testing] suite for FormularioCadastro", () => {

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

    it("should render FormularioCadastro component without crashing", () => {
        render(<FormularioCadastro tarefasCadastradas={tarefasCadastradasMock} setTarefasCadastradas={mockSetTarefasCadastradas} />)
    })

    it("should display success message when creating new task", () => {
        
        /* GIVEN */
        
        render(<FormularioCadastro tarefasCadastradas={tarefasCadastradasMock} setTarefasCadastradas={mockSetTarefasCadastradas} />)
        const inputTarefa = screen.getByTestId("testInputTarefaId")
        const btnCadastrar = screen.getByTestId("testBtnCadastrarTarefa")
        
        userEvent.type(inputTarefa, "Estudar react testing library")
        
        /* WHEN */
        
        // act renders component again after execution 
        act(() => {
            btnCadastrar.click()
        });

        /* THEN */
        const successMessage = screen.getByTestId("testSuccessMessageId")
        expect(successMessage.textContent).toBe("Estudo 'Estudar react testing library' cadastrado com sucesso")
    })

    it("should display error message when creating new task with invalid value", () => {
        
        /* GIVEN */
        
        render(<FormularioCadastro tarefasCadastradas={tarefasCadastradasMock} setTarefasCadastradas={mockSetTarefasCadastradas} />)
        const btnCadastrar = screen.getByTestId("testBtnCadastrarTarefa")

        /* WHEN */
        
        // act renders component again after execution 
        act(() => {
            btnCadastrar.click()
        });

        /* THEN */
        const errorMessage = screen.getByTestId("testErrorMessageId")
        expect(errorMessage.textContent).toBe("Preencha a descrição do estudo")    
    })

    it("should display error message when creating a duplicated task", () => {
        
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
            return <FormularioCadastro tarefasCadastradas={tarefasCadastradas} setTarefasCadastradas={setTarefasCadastradas} />
        };
        
        render(<Wrapper />)
        const inputTarefa = screen.getByTestId("testInputTarefaId")
        const btnCadastrar = screen.getByTestId("testBtnCadastrarTarefa")

        /* WHEN */
        userEvent.type(inputTarefa, "Estudo repetido nao pode ser cadastrado na segunda tentativa")
             
        // act renders component again after execution 
        act(() => {
            btnCadastrar.click()
        });

        userEvent.clear(inputTarefa)
        userEvent.type(inputTarefa, "Estudo repetido nao pode ser cadastrado na segunda tentativa")
             
        // act renders component again after execution 
        act(() => {
            btnCadastrar.click()
        });

        /* THEN */
        const errorMessage = screen.getByTestId("testErrorMessageId")
        expect(errorMessage.textContent).toBe("Estudo já cadastrado")    
    })

})