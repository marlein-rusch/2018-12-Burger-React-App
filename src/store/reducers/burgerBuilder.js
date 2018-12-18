import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  // l. 294. null, omdat we nu fetchen.
  // null is ook nodig in een ander file om te spinner te laten zien geloof ik
  ingredients: null, 
  totalPrice: 4,
  error: false, // l.294,
  building: false // l. 325. Redirecting the user to Checkout page (with selected burger ingr.)
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          // l.266. Double spread operator to create a deap clone: real new object
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true // l. 325 (burger ingr bewaren voor un-auth users)
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName], 
        building: true // l. 325 (burger ingr bewaren voor un-auth users)
      }
    // l. 295
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        // l. 296: Order aangepast, zodat samenvattings-lijstje
        // .. ook de in de visuele burger wordt gereflect.
        // Is niet zo heel herbruikbaar, maar onze CSS classes waren toch al insteld
        // ..op deze specifieke ingredients, dus maakt niet zo uit
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        // l. 304. Total price reset
        totalPrice: 4,
        // Indien de error naar true was gezet, weer naar false, zodat we weer stuff displayen
        error: false,
        building: false // l. 325 (burger ingr weggooien when reloading page)
      };
    
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}

export default reducer;

 