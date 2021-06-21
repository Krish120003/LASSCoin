import { createStore } from "redux";

const initialState = {
  transactions: [],
  nextTransaction: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      const newTransactions = [...state.transactions];
      let newNext = null;
      if (state.nextTransaction != null) {
      } else {
        fetch("https://lasscoin.herokuapp.com/api/transactions/").then(
          (res) => {
            res.json().then((data) => {
              newNext = data.next ? data.next : null;
              data.data.forEach((element) => {
                newTransactions.push(element);
              });
            });
          }
        );
        newTransactions;
      }
      return {
        ...state,
        transactions: newTransactions,
        nextTransaction: newNext,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
