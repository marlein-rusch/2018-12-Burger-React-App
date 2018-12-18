// l. 292.
import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: name
    }
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  }
};
// l. 294. Zie note hieronder 295 (zelfde verhaal maar dan voor succesvolle request)
export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}
// .295. Voor consistency is dit een export, ondanks dat deze action
// .. altijd binnen dit file wordt aangeroepen, nl vanuit initIngredients
// .. na een niet-succesvolle async request. Deze const wordt dus ook niet ge-exporteerd in het 
// .. samenbundelende file 'index.js' in de actions folder.
export const fetchIngredientsFailed = (/* no argument */) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

// l. 294. Put axios in Redux structure.
export const initIngredients = () => {
  // This syntax is available thanks to Redux thunk
  return dispatch => {
    axios.get('https://react-marleins-burger.firebaseio.com/ingredients.json')
    .then(response => {
      // l. 294. Old line, toen het nog in de CompDidMount van het originele BurgerBuilder.js zat
      // this.setState({ingredients: response.data})
      dispatch(setIngredients(response.data))
    })
    .catch(error => {
      dispatch(fetchIngredientsFailed());
    })
  }
}