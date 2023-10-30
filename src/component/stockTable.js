import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchStockRequest, stockDataRequest } from "../redux/action";
import "./stockTable.css";
import AsyncSelect from "react-select/async";
const StockTable = ({
  stocks,
  fetchStockRequest,
  loading,
  error,
  stockDataRequest,
  stocksData,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [stock, setStock] = useState("Stock");
  const [isMonth, setIsmonth] = useState(null);
  const [filteredStocks, setFilteredStocks] = useState([]);

  const loadOptions = async (inputValue, callback) => {
    try {
      fetchStockRequest(inputValue);

      const options = stocks?.map((stock) => ({
        value: stock["1. symbol"],
        label: `${stock["1. symbol"]} (${stock["2. name"]})`,
      }));

      callback(options);
    } catch (error) {
      console.error("Error fetching stock options: ", error);
      callback([]);
    }
  };
  useEffect(() => {
    const data = stocks?.filter((stock) =>
      stock["1. symbol"].toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStocks(data);
  }, [searchQuery, stocks]);
  useEffect(() => {
    fetchStockRequest(searchQuery);
  }, [fetchStockRequest, searchQuery]);

  const handleMonthData = (e, symbol) => {
    e.preventDefault();
    stockDataRequest({ symbol: symbol, isMonth: true });
    setIsmonth(true);
    setStock(symbol);
  };
  const handleDailyData = (e, symbol) => {
    e.preventDefault();
    stockDataRequest({ symbol: symbol, isMonth: false });
    setIsmonth(false);
    setStock(symbol);
  };

  useEffect(() => {
    const filteredStocks =
      stocks?.filter((item) => {
        return item["1. symbol"] === selectedOption?.value;
      }) || [];
    setFilteredStocks(filteredStocks);
  }, [selectedOption, stocks]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="lds-dual-ring"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  return (
    <>
      <div className="table-container">
        {/* <Autocomplete
          getItemValue={(item) => item && item["1. symbol"]}
          items={filteredStocks}
          renderItem={(item, isHighlighted) => (
            <div
              key={item["1. symbol"]}
              style={{
                background: isHighlighted ? "lightgray" : "white",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              {`${item["1. symbol"]} (${item["2. name"]})`}
            </div>
          )}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSelect={(value) => setSearchQuery(value)}
          inputProps={{
            placeholder: "Search by Symbol",
            style: {
              width: "200%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxSizing: "border-box",
              marginBottom: "10px",
            },
          }}
        /> */}
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions
          value={selectedOption}
          onChange={(selected) => setSelectedOption(selected)}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          placeholder="Search by Symbol"
        />
        <h2>Stock List</h2>
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Type</th>
              <th>Region</th>
              <th>Market Open</th>
              <th>Market Close</th>
              <th>Timezone</th>
              <th>Currency</th>
              <th>Match Score</th>
              <th>Monthly Data</th>
              <th>Daily Data</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks &&
              filteredStocks.map((stock) => (
                <tr key={stock["1. symbol"]}>
                  <td>{stock["1. symbol"]}</td>
                  <td>{stock["2. name"]}</td>
                  <td>{stock["3. type"]}</td>
                  <td>{stock["4. region"]}</td>
                  <td>{stock["5. marketOpen"]}</td>
                  <td>{stock["6. marketClose"]}</td>
                  <td>{stock["7. timezone"]}</td>
                  <td>{stock["8. currency"]}</td>
                  <td>{stock["9. matchScore"]}</td>
                  <td>
                    <button
                      onClick={(event) =>
                        handleMonthData(event, stock["1. symbol"])
                      }
                    >
                      Show Data
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(event) =>
                        handleDailyData(event, stock["1. symbol"])
                      }
                    >
                      Show Data
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {stocksData && stocksData["Monthly Time Series"] && isMonth ? (
        <div className="table-container">
          <h2>
            {stock} {isMonth ? "Monthly" : "Daily"} report
          </h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(stocksData["Monthly Time Series"]).map((date) => (
                <tr key={date}>
                  <td>{date}</td>
                  <td>{stocksData["Monthly Time Series"][date]["1. open"]}</td>
                  <td>{stocksData["Monthly Time Series"][date]["2. high"]}</td>
                  <td>{stocksData["Monthly Time Series"][date]["3. low"]}</td>
                  <td>{stocksData["Monthly Time Series"][date]["4. close"]}</td>
                  <td>
                    {stocksData["Monthly Time Series"][date]["5. volume"]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="table-container">
          <h2>
            {stock} {isMonth ? "Monthly" : "Daily"} report
          </h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
              </tr>
            </thead>
            {stocksData && stocksData["Time Series (Daily)"] ? (
              <tbody>
                {Object.keys(stocksData["Time Series (Daily)"]).map((date) => (
                  <tr key={date}>
                    <td>{date}</td>
                    <td>
                      {stocksData["Time Series (Daily)"][date]["1. open"]}
                    </td>
                    <td>
                      {stocksData["Time Series (Daily)"][date]["2. high"]}
                    </td>
                    <td>{stocksData["Time Series (Daily)"][date]["3. low"]}</td>
                    <td>
                      {stocksData["Time Series (Daily)"][date]["4. close"]}
                    </td>
                    <td>
                      {stocksData["Time Series (Daily)"][date]["5. volume"]}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody></tbody>
            )}
          </table>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  stocks: state.stocks,
  loading: state.loading,
  error: state.error,
  stocksData: state.stocksData,
});

export default connect(mapStateToProps, {
  fetchStockRequest,
  stockDataRequest,
})(StockTable);
