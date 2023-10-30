// App.js
import React from "react";
import StockTable from "./component/stockTable";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="Appas">
        <StockTable />
      </div>
    </Provider>
  );
};

export default App;
