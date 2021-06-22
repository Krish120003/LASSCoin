import { applyMiddleware, createStore } from "redux";
import { getPublicKeyAsText } from "./util/Crypto";

const API_URL = "https://lasscoin.herokuapp.com/api";

const initialState = {
  transactions: [],
  nextTransaction: null,
  height: 0,
  pendingBlocks: 0,
  private_key: null,
  public_key: null,
};

const fetcherMiddleware = (store) => (next) => (action) => {
  console.log("Performing Action:", action.type);
  if (action.type == "GET_TRANSACTIONS") {
    fetch(API_URL + "/transactions/").then((res) => {
      res.json().then((data) => {
        next({ ...action, payload: data });
      });
    });
  } else if (action.type == "GET_HEIGHT") {
    fetch(API_URL + "/transactions/height/").then((res) => {
      res.json().then((data) => {
        next({ ...action, payload: data });
      });
    });
  } else if (action.type == "GET_PENDING") {
    fetch(API_URL + "/transactions/pending/").then((res) => {
      res.json().then((data) => {
        next({ ...action, payload: data });
      });
    });
  } else {
    next(action);
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
    case "GET_HEIGHT":
      return {
        ...state,
        height: action.payload.height,
      };
    case "GET_PENDING":
      return {
        ...state,
        pendingBlocks: action.payload.pending,
      };
    case "SET_PRIV_KEY":
      return {
        ...state,
        private_key: action.payload.key,
        public_key: getPublicKeyAsText(action.payload.key)
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(fetcherMiddleware));

export default store;
