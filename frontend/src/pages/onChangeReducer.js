export const transactionReducer = (state, action) => {
  switch (action.type) {
    case 'amount':
      return {...state, amount: action.payload};
    case 'type':
      return {...state, type: action.payload};
    case 'category':
      return {...state, category: action.payload};
    default:
        return state;
  }
}