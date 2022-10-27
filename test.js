// Variavel de ambiente para definir senha
require("dotenv").config();
// console.log(process.env);
// senha = process.env.MMM;
// function senha() {
//   const senha = process.env.MMM;
// const paragrafo = document.createElement("p");
// const texto = document.createTextNode("Testando");
// paragrafo.appendChild(texto);
// return paragrafo;
// }
const senha = process.env.MMM;
console.log(senha);
function gravar() {
  var titulo = document.getElementById("txtTitulo").value;
  var subtitulo = document.getElementById("txtSubtitulo").value;
  var div = document.getElementById("divResultado");

  div.innerHTML = `<h1> ${titulo} </h1> \n  ${senha}`;
}
