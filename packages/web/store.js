import { applyMiddleware, createStore } from "redux";
import { getPublicKey } from "./util/Crypto";

const API_URL = "https://lasscoin.herokuapp.com/api";

const initialState = {
  transactions: [],
  nextTransaction: null,
  height: 0,
  pendingBlocks: 0,
  private_key: null,
  public_key: null,
  mined: 0,
  balance: 0,
  received: 0,
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
  } else if (action.type == "GET_BALANCE_DETAILS") {
    console.log(store.getState());
    let balance = 0;
    let mined = 0;
    let received = 0;
    fetch(
      API_URL + `/transactions/balance/?address=${store.getState().public_key}`
    ).then((res) => {
      res.json().then((data) => {
        balance = data.balance;
      });
    });
  } else if (action.type == "SET_PRIV_KEY") {
    getPublicKey(action.payload.key).then((res) => {
      action.payload = { ...action.payload, public_key: res };
      next(action);
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
    case "GET_BALANCE_DETAILS":
      return {
        ...state,
        balance: action.payload.balance,
        mined: action.payload.mined,
        received: action.payload.received,
      };
    case "SET_PRIV_KEY":
      return {
        ...state,
        private_key: action.payload.key,
        public_key: action.payload.public_key,
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(fetcherMiddleware));

export default store;
