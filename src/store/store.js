import { createContext, useReducer } from "react";
import { initialState, recipesReducer } from "./recipes/recipes.reducer";

export const recipesContext = createContext();

export const UseRecipesContext = ({children})=>{

    const [recipes, dispatchRecipes] = useReducer(recipesReducer, initialState)

    return(
        <recipesContext.Provider value={{recipes,dispatchRecipes}}>
            {children}
        </recipesContext.Provider>
    )
}