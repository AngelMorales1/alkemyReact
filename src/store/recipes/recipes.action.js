export const ADD_RECIPES = 'ADD_RECIPES'
export const REMOVE_RECIPES = 'REMOVE_RECIPES'

export function addRecipes(receta) {
    return {
        type : ADD_RECIPES,
        payload : receta
    }
}


export function removeRecipes(receta) {
    return {
        type : REMOVE_RECIPES,
        payload : receta
    }
}