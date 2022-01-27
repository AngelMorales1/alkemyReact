export const ADD_RECIPES = 'ADD_RECIPES'

export function addRecipes(receta) {
    return {
        type : ADD_RECIPES,
        payload : receta
    }
}