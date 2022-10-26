const JSONRead = require("./read");
const JSONWrite = require("./write");

// const result = "";

const JSONUpdate = (filePath, newData, encoding = "utf-8") => {
  const promiseCallback = async (resolve, reject) => {
    try {
      const data = await JSONRead(filePath, encoding);
      const result = { ...data, ...newData };
      await JSONWrite(filePath, result, encoding);
      resolve(result);
    } catch (e) {
      reject(e);
    }
  };

  return new Promise(promiseCallback);
};

module.exports = JSONUpdate;

JSONUpdate("./db/teste.json", [
  {
    id: 6,
    title: "MacBook",
    price: "6",
    saller: "PRIME.VENDASONLINE",
    link: "NA",
  },
])
  .then(console.log)
  .catch(console.error);
