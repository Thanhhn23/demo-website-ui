import React, { useState } from "react";
import "../App.css";
import { getCookieValue } from "../function/cookie";

export const filterPrice = async (fromPrice, toPrice, page, limit) => {
  const token = getCookieValue('token');
  const response = await fetch(`https://demo-website-api.vercel.app/api/v1/products?from_price=${fromPrice}&to_price=${toPrice}&page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    // body: JSON.stringify({ fromPrice, toPrice }),
  });
  return await response.json();
};

function FilterPrice({ handleFilter, page, limit, handleClearPrice, handleChangePrice }) {
  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");

  function handleFilterPrice() {
    handleFilter(Number(fromPrice), Number(toPrice), page, limit);
    handleChangePrice(fromPrice, toPrice)
  };
  function handleClearFilterPrice() {
    setFromPrice("");
    setToPrice("");
    handleClearPrice();
  }

  return (
    <div className="filter-price-container">
      <label htmlFor="from-price">From:</label>
      <input
        type="number"
        id="from-price"
        value={fromPrice}
        onChange={(e) => setFromPrice(e.target.value)}
        className="price-input"
      />
      <label htmlFor="to-price">To:</label>
      <input
        type="number"
        id="to-price"
        value={toPrice}
        onChange={(e) => setToPrice(e.target.value)}
        className="price-input"
      />
      <button className="search-price-button" onClick={handleFilterPrice}>
        Search Price
      </button>
      <button className="search-price-button" onClick={handleClearFilterPrice}>Clear price</button>
    </div>
  );
}

export default FilterPrice;
