import {ADD_RECIPES} from "./recipes.action"
import swal from 'sweetalert';


export const initialState = {
    recipes : [],
    veganCounter: 0,
    notVeganCounter:0
}


export const recipesReducer = (state = initialState , action)=>{
    switch(action.type){
        case ADD_RECIPES:
            if(state.recipes.length>=4){
                swal({
                    title: "Upps!",
                    text: "no se puede mas",
                    icon: "error"
                  });
            }

            if(state.veganCounter<2 && action.payload.vegan === true){
                return {
                    recipes: [...state.recipes,action.payload],
                    veganCounter: state.veganCounter+1,
                    notVeganCounter: state.notVeganCounter
                }
            }else if (state.notVeganCounter<2 && action.payload.vegan === false) {
                return {
                    recipes: [...state.recipes,action.payload],
                    veganCounter: state.veganCounter,
                    notVeganCounter: state.notVeganCounter+1
                }
            }else{
                swal({
                    title: "Upps!",
                    text: "You can only choose 2 VEGAN and 2 NON-VEGAN dishes...",
                    icon: "error"
                  });
                return{
                    ...state
                }
            }

        default:
            return state
    }
        
}