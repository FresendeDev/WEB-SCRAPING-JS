const pup = require("puppeteer");
// import JSONWrite from "./write";
// import * as JSONWrite from "./write.js";
// var test = require("./write.js");
const JSONWrite = require("./write");
// import { JSONWrite } from "./write";
// import { test } from "./write";

// const fs = require("fs");

const url = "https://www.mercadolivre.com.br/";
const searchFor = "macbook";

const list = [];

(async () => {
  // headless: false mostra o processo se True executa em segundo plano
  const browser = await pup.launch({ headless: true });
  page = await browser.newPage();
  console.log("1. iniciado");

  await page.goto(url);
  console.log("2. fui para url");

  await page.waitForSelector("#cb1-edit");
  console.log("3. aguardando seletor");

  await page.type("#cb1-edit", searchFor);
  console.log("4. escrevendo");

  //   Nao foi necessario Promise aqui
  //   await Promise.all([page.waitForNavigation(), page.click(".nav-icon-search")]);
  await page.click(".nav-icon-search");
  console.log("5. cliando");

  await page.waitForSelector(".ui-search-result__image");
  console.log("6. aguardando seletor...");

  // $$eval  equivalente a document.querySelectorAll
  const links = await page.$$eval(".ui-search-result__image > a", (elem) =>
    elem.map((link) => link.href)
  );

  //   if (links) {
  //     console.log(`7. links carregados = ${links.length}`);
  //   } else {
  //     console.log("erro aqui");
  //   }

  let c = 1;

  for (let link of links) {
    if (c < 4) {
      console.log("Pagina", c);
      await page.goto(link);
      await page.waitForSelector(".ui-pdp-title");

      let title = await page.$eval(
        ".ui-pdp-title",
        (element) => element.innerText
      );
      let price = await page.$eval(
        ".andes-money-amount__fraction",
        (element) => element.innerText
      );

      let saller = await page.evaluate(() => {
        let el = document.querySelector(".ui-pdp-seller__link-trigger");
        if (!el) return null;
        return el.innerText;
      });

      let id = c;
      const obj = {};

      // console.log(typeof obj);

      obj.id = c;
      obj.title = title;
      obj.price = price;
      saller ? (obj.saller = saller) : "";
      obj.link = link;

      list.push(obj);

      c++;
    }
  }
  const t = { name: "fabio" };
  const ab = JSONWrite("./db/teste.json", list)
    .then(console.log)
    .catch(console.error);

  // JSONWrite("./db/teste.json", list);

  // escrevendo no arquivo json
  // fs.writeFile(
  //   "./db/dados.json",
  //   JSON.stringify(list, null, 2),
  //   // JSON.stringify(list, ["id", "price"], 2),
  //   "utf-8",
  //   (error, result) => {
  //     if (error) {
  //       console.error(error);
  //       return;
  //     } else {
  //       if (result == undefined) console.log("Json ok!");
  //     }
  //   }
  // );

  // usando o writeFileSync nao precisa retornar try catch para pegar erro
  // try {
  //   const dataString = JSON.stringify(list, null, 2);
  //   fs.writeFileSync("./db/dados.json", dataString, "utf-8");
  //   console.log("Json ok!");
  // } catch (e) {
  //   console.log(e);
  // }

  // convertendo para formato json
  // const listJason = JSON.stringify(list, null, 2);
  // console.log(listJason);

  // console.log("list= ", list);

  //   await page.waitForTimeout(3000);
  //   console.log("8. aguardando antes de fechar");

  await browser.close();
  console.log("fechado");
})();

// API jason
