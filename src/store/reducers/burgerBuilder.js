import * as actionTypes from '../actions/actionTypes';

const initialState = {
  // l. 294. null, omdat we nu fetchen.
  // null is ook nodig in een ander file om te spinner te laten zien geloof ik
  ingredients: null, 
  totalPrice: 4,
  error: false // toegevoegd in l.294
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
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      }
    // l. 295
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        // Indien de error naar true was gezet, weer naar false, zodat we weer stuff displayen
        error: false
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