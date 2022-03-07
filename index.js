const express = require("express");
const axios = require("axios");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

const PORT = 4000;

app.route("/order").post(async (req, res) => {
  const order = req.body;
  const config = {
    method: "post",
    url: "https://sukooon57.myshopify.com/admin/api/2021-10/orders.json",
    data: order,
    headers: {
      "X-Shopify-Access-Token": "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",
    },
  };
  let response = await axios(config);
  res.send(response.data);
});

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
