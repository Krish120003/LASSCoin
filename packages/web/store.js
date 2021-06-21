import { createStore } from "redux";

const initialState = {
  transactions: [],
  nextTransaction: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return { ...state };
  }
};
