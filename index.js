const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

const url = "https://www.bbc.com/news";
axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];

    $(`.gs-c-promo`, html).each(function () {
      //<a class="gs-c-promo-heading"
      const title = $(this).text().replace("\n", "");
      //<p class="gs-c-promo-summary"
      const url = $(this).find("a").attr("href");
      articles.push({
        title,
        url,
      });
    });
    console.log(articles);
  })
  .catch((err) => console.log(err));
