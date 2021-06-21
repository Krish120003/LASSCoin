import { applyMiddleware, createStore } from "redux";

const initialState = {
  transactions: [],
  nextTransaction: null,
};

/*
fetch("https://lasscoin.herokuapp.com/api/transactions/").then(
          (res) => {
            res.json().then((data) => {
              newNext = data.next ? data.next : null;
              data.data.forEach((element) => {
                newTransactions.push(element);
              });
            });
          }
        );*/

const loggerMiddleware = (store) => (next) => (action) => {
  console.log("Performing Action:", action.type);
  if (action.type == "GET_TRANSACTIONS") {
    fetch("https://lasscoin.herokuapp.com/api/transactions/").then((res) => {
      res.json().then((data) => {
        next({ ...action, payload: data });
      });
    });
  } else {
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        transactions: [...state.transactions, ...action.payload.data],
        next: action.payload.next,
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(loggerMiddleware));

export default store;
