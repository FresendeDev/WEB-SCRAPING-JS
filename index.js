const pup = require("puppeteer");

const url = "https://www.mercadolivre.com.br/";
const searchFor = "macbook";

(async () => {
  const browser = await pup.launch({ headless: false });
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
  const links = await page.$$eval(".ui-search-result__image > a", (el) =>
    el.map((link) => link.href)
  );

  if (links) {
    console.log("7. links carregados");
  } else {
    console.log("erro aqui");
  }

  await page.waitForTimeout(3000);
  console.log("8. aguardando antes de fechar");

  await browser.close();
  console.log("fechado");
})();
