export const FETCH_STOCK_REQUEST = "FETCH_STOCK_REQUEST";
export const FETCH_STOCK_SUCCESS = "FETCH_STOCK_SUCCESS";
export const FETCH_STOCK_FAILURE = "FETCH_STOCK_FAILURE";
export const STOCK_DATA_REQUEST = "STOCK_DATA_REQUEST";
export const STOCK_DATA_SUCCESS = "STOCK_DATA_SUCCESS";
export const STOCK_DATA_FAILURE = "STOCK_DATA_FAILURE";

export const fetchStockRequest = (data) => ({
  type: FETCH_STOCK_REQUEST,
  payload: data,
});

export const fetchStockSuccess = (data) => ({
  type: FETCH_STOCK_SUCCESS,
  payload: data,
});

export const fetchStockFailure = (error) => ({
  type: FETCH_STOCK_FAILURE,
  payload: error,
});

export const stockDataRequest = (data) => ({
  type: STOCK_DATA_REQUEST,
  payload: data,
});

export const stockDataSuccess = (data) => ({
  type: STOCK_DATA_SUCCESS,
  payload: data,
});

export const stockDataFailure = (error) => ({
  type: STOCK_DATA_FAILURE,
  payload: error,
});
