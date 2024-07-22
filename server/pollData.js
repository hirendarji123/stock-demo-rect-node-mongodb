// server/pollData.js
const axios = require("axios");
const Price = require("./models/Price");
const { symbols } = require("./Constant");
require("dotenv").config();

const fetchPriceForSymbol = async (symbol) => {
  console.log("🚀 ~ fetchPriceForSymbol ~ symbol:", symbol);
  try {
    const response = await axios.post(
      process.env.BASE_URL,
      {
        currency: "USD",
        code: symbol,
        meta: true,
      },
      {
        headers: {
          "content-type": "application/json",
          "x-api-key": process.env.LIVECOINWATCH_API_KEY,
        },
      }
    );

    const price = response.data.rate;
    console.log(response.data.symbol, price);
    const newPrice = new Price({ symbol, price });
    await newPrice.save();
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
  }
};
const fetchPrices = async () => {
  try {
    await Promise.all(
      symbols.map(async (item) => await fetchPriceForSymbol(item))
    );
  } catch (err) {
    console.log(err);
  }
};

fetchPrices();

module.exports = { fetchPrices };
