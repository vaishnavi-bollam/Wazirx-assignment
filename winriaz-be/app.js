require("dotenv").config();
const express = require("express");
const axios = require("axios");

const cors = require("cors");

const Wazirx = require("./models/wazirx");

const app = express();

app.use(cors());

app.get("/results", async (req, res) => {
  const response = await axios.get("https://api.wazirx.com/api/v2/tickers");

  const first10 = Object.entries(response.data)
    .slice(0, 10)
    .map(([key, value]) => ({
      name: value.name,
      last: value.last,
      buy: value.buy,
      sell: value.sell,
      volume: value.volume,
      base_unit: value.base_unit,
    }));

  console.log("data", first10);

  await Wazirx.bulkCreate(first10);
  res.status(200).send(first10);
});

const port = 3000;
app.listen(port, console.log("Server is running ..."));
