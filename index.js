const express = require("express");
const axios = require("axios");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

const PORT = 4000;

app.route("/order").post(async (req, res) => {
  const STORES = {
    nutritely: {
      url: "https://nutritely.myshopify.com/admin/api/2022-01/orders.json",
      token: "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",
    },
    sukooon: {
      url: "https://sukooon57.myshopify.com/admin/api/2021-10/orders.json",
      token: "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",
    },
    elaan: {
      url: "https://arehmancare.myshopify.com/admin/api/2021-10/orders.json",
      token: "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",
    },
  };
  const body = req.body;
  const store = STORES[body.store];
  if (!store) {
    return res.status(500).json({
      error: "Store not found",
    });
  }
  const { url, token } = store;
  const config = {
    method: "post",
    url,
    data: body,
    headers: {
      "X-Shopify-Access-Token": token,
    },
  };
  await axios(config)
    .then((response) => {
      return res.json(response.data);
    })
    .catch((err) => {
      return res.status(500).json({
        error: err.message,
      });
    });
});

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
