const JSONRead = require("./read");
const JSONWrite = require("./write");

// const result = "";

const JSONUpdate = (filePath, newData, encoding = "utf-8") => {
  const promiseCallback = async (resolve, reject) => {
    try {
      const data = await JSONRead(filePath, encoding);
      data.push(newData);
      // const result = { ...data, ...newData };
      // const result = data;
      // console.log("data = ", data);
      // console.log("newData = ", newData, "fim newdata");
      // const result = data.push(newData);
      // await JSONWrite(filePath, result, encoding);
      await JSONWrite(filePath, data, encoding);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  };

  return new Promise(promiseCallback);
  // return new Promise(promiseCallback);
};

// module.exports = JSONUpdate;

JSONUpdate("./db/teste.json", {
  id: 7,
  title: "MacBook",
  price: "6",
  saller: "PRIME.VENDASONLINE",
  link: "NA",
})
  .then(console.log)
  .catch(console.error);
