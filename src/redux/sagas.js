import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_STOCK_REQUEST,
  STOCK_DATA_REQUEST,
  fetchStockSuccess,
  fetchStockFailure,
  stockDataFailure,
  stockDataSuccess,
} from "./action";

const apiKey = "JPRM3WKKDTY02Y81";
function* fetchStock(data) {
  const keyWord = data.payload ? data.payload : "tesco";
  try {
    const response = yield call(
      axios.get,
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyWord}&apikey=${apiKey}`
    );
    yield put(fetchStockSuccess(response.data.bestMatches));
  } catch (error) {
    yield put(fetchStockFailure(error));
  }
}

function* fetchStockData(data) {
  try {
    const response = yield call(
      axios.get,
      data.payload.isMonth
        ? `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${data.payload.symbol}&apikey=${apiKey}`
        : `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${data.payload.symbol}&apikey=${apiKey}`
    );

    yield put(stockDataSuccess(response.data));
  } catch (error) {
    yield put(stockDataFailure(error));
  }
}

function* stockSaga() {
  yield takeEvery(FETCH_STOCK_REQUEST, fetchStock);
  yield takeEvery(STOCK_DATA_REQUEST, fetchStockData);
}

export default stockSaga;
