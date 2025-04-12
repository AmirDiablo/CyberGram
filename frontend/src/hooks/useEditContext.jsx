import { EditContext } from "../context/EditContext";
import { useContext } from "react";

export const useEditContext = () => {
    const context = useContext(EditContext)

    if(!context){
        throw Error("useEditContext must be used inside an EditContextProvider")
    }

    return context
}