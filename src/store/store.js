import { createContext, useReducer } from "react";
import { initialState, recipesReducer } from "./recipes/recipes.reducer";

export const recipesContext = createContext();

export const UseRecipesContext = ({children})=>{

    const [recipesState, dispatchRecipes] = useReducer(recipesReducer, initialState)

    return(
        <recipesContext.Provider value={{recipesState,dispatchRecipes}}>
            {children}
        </recipesContext.Provider>
    )
}