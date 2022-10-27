const pup = require("puppeteer");
// const JSONRead = require("./read");
// const JSONWrite = require("./write");
require("dotenv").config();
// const JSONRead = require("./read");

// const fs = require("fs");
const readers = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
};

const url = "https://associados.amazon.com.br/";
const user = process.env.USER;
// const user = "teste";
const pass = process.env.PASS;

const list = [];

(async () => {
  // headless: false mostra o processo se True executa em segundo plano
  const browser = await pup.launch({ headless: false });
  // page = await browser.newPage();
  page = await browser.newPage();
  console.log("1. iniciado");

  await page.goto(url, readers);
  console.log("2. fui para url");

  await page.waitForSelector(".ac-header-item");
  console.log("3. aguardando seletor");

  await page.click(".ac-header-item > a");
  console.log("4. clicou");

  await page.waitForSelector("#ap_email");
  console.log("5. aguardando seletor");

  await page.type("#ap_email", user);
  console.log("6. escrevendo no usuario");

  await page.type("#ap_password", pass);
  console.log("7. o pass");

  await page.click(".a-checkbox > label > input");
  console.log("8. checkbox");

  await page.waitForTimeout(10000);

  await page.click("#signInSubmit");
  console.log("8. click login");

  // await page.click(".nav-icon-search");
  // console.log("5. cliando");

  // await page.waitForSelector(".ui-search-result__image");
  // console.log("6. aguardando seletor...");

  // const links = await page.$$eval(".ui-search-result__image > a", (elem) =>
  //   elem.map((link) => link.href)
  // );

  // let c = 1;

  // for (let link of links) {
  //   if (c < 4) {
  //     console.log("Pagina", c);
  //     await page.goto(link);
  //     await page.waitForSelector(".ui-pdp-title");

  //     let title = await page.$eval(
  //       ".ui-pdp-title",
  //       (element) => element.innerText
  //     );
  //     let price = await page.$eval(
  //       ".andes-money-amount__fraction",
  //       (element) => element.innerText
  //     );

  //     let saller = await page.evaluate(() => {
  //       let el = document.querySelector(".ui-pdp-seller__link-trigger");
  //       if (!el) return null;
  //       return el.innerText;
  //     });

  //     let id = c;
  //     const obj = {};

  //     obj.id = c;
  //     obj.title = title;
  //     obj.price = price;
  //     saller ? (obj.saller = saller) : "";
  //     obj.link = link;

  //     list.push(obj);

  //     c++;
  //   }
  // }

  // JSONWrite("./db/teste.json", list).catch(console.error);

  await page.waitForTimeout(10000);

  await browser.close();
  console.log("fechado");

  // const leitura = await JSONRead("./db/teste.json")
  // .then(console.log)
  // .catch(console.error);
})();
