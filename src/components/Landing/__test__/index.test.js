import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import Landing from ".."

describe("[integration testing] suite for Landing", () => {

    it("should render Landing component without crashing", () => {
        render(<Landing />)
    })

    it("should add item correctly", () => {

        /* GIVEN */
    
        render(<Landing />)
        const inputTarefa = screen.getByTestId("testInputTarefaId")
        const btnCadastrar = screen.getByTestId("testBtnCadastrarTarefa")
        
        userEvent.type(inputTarefa, "Estudar Testes integrados")
        
        /* WHEN */
        
        // act renders component again after execution 
        act(() => {
            btnCadastrar.click()
        });

        /* THEN */
        const successMessage = screen.getByTestId("testSuccessMessageId")
        expect(successMessage.textContent).toBe("Estudo 'Estudar Testes integrados' cadastrado com sucesso")
    })
})