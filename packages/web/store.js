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

function uniqBy(a, key) {
  var seen = {};
  return a.filter(function (item) {
    var k = key(item);
    return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  });
}

const fetcherMiddleware = (store) => (next) => (action) => {
  console.log("Performing Action:", action.type);
  if (action.type == "GET_TRANSACTIONS") {
    const state = { ...store.getState() };

    if (state.height == state.transactions.length) {
      return;
    } else {
      if (
        state.nextTransaction == "GENESIS" &&
        state.height == state.transactions.length
      ) {
        return;
      }
    }
    const FETCH_URL =
      API_URL +
      `/transactions/?next=${
        state.nextTransaction != null
          ? state.nextTransaction == "GENESIS"
            ? ""
            : state.nextTransaction
          : ""
      }`;

    fetch(FETCH_URL).then((res) => {
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
    let balance = 0;
    let mined = 0;
    let received = 0;
    let balance_url =
      API_URL +
      `/transactions/balance/?address=${encodeURIComponent(
        store.getState().public_key
      )}`;
    let mined_url =
      API_URL +
      `/transactions/balance/mined/?address=${encodeURIComponent(
        store.getState().public_key
      )}`;
    let received_url =
      API_URL +
      `/transactions/balance/received/?address=${encodeURIComponent(
        store.getState().public_key
      )}`;

    fetch(balance_url).then((res) => {
      res.json().then((data) => {
        balance = data.balance;
        fetch(mined_url).then((res) => {
          res.json().then((data) => {
            mined = data.balance;
            fetch(received_url).then((res) => {
              res.json().then((data) => {
                received = data.balance;
                action.payload = {
                  ...action.payload,
                  mined,
                  balance,
                  received,
                };
                next(action);
              });
            });
          });
        });
      });
    });

    //next(action)
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
      let newTransactions = uniqBy(
        [...state.transactions, ...action.payload.data],
        (x) => {
          return x.height;
        }
      ).sort((a, b) => {
        return parseInt(b.height) - parseInt(a.height);
      });
      return {
        ...state,
        transactions: newTransactions,
        nextTransaction: action.payload.next,
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
