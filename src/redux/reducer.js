import {
  FETCH_STOCK_REQUEST,
  FETCH_STOCK_SUCCESS,
  FETCH_STOCK_FAILURE,
  STOCK_DATA_FAILURE,
  STOCK_DATA_SUCCESS,
  STOCK_DATA_REQUEST,
} from "./action";

const initialState = {
  stocks: [],
  stocksData: [],
  loading: false,
  error: null,
};

const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STOCK_REQUEST:
      return { ...state, error: null };
    case FETCH_STOCK_SUCCESS:
      return { ...state, stocks: action.payload, loading: false, error: null };
    case FETCH_STOCK_FAILURE:
      return { ...state, stocks: [], loading: false, error: action.payload };
    case STOCK_DATA_REQUEST:
      return {
        ...state,
        stocksData: action.payload,
        loading: true,
        error: null,
      };
    case STOCK_DATA_SUCCESS:
      return {
        ...state,
        stocksData: action.payload,
        loading: false,
        error: null,
      };
    case STOCK_DATA_FAILURE:
      return {
        ...state,
        stocksData: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default stockReducer;
