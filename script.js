let regex1 = "(b+aa+ab) (a+b)* (bb+aba+ab)* (aaa+bbb) (a+b) (a+b+ab)*";
let regex2 =
  "(1+0)* (11+00+101+010) (1+0+11+00+101)* (11+00) (11+00+101)* (1+0) (1+0+11)*";
var currentRegex = 1;
function switchRegex() {
  let regexLabel = document.getElementById("regexLabel");
  let languageLabel = document.getElementById("languageLabel");
  let regexDiagram1 = document.getElementById("regexDiagram1");
  let regexDiagram2 = document.getElementById("regexDiagram2");

  if (currentRegex == 2) {
    regexLabel.textContent = regex1;
    languageLabel.textContent = "[a,b]";
    currentRegex = 1;
    regexDiagram1.classList.remove("d-none");
    regexDiagram2.classList.add("d-none");
  } else {
    regexLabel.textContent = regex2;
    languageLabel.textContent = "[0,1]";
    currentRegex = 2;
    regexDiagram1.classList.add("d-none");
    regexDiagram2.classList.remove("d-none");
  }
}

function simulate() {
  console.log("simulate");
}
function validate() {
  console.log("validate");
}

window.onload = function () {
  /* switchRegex(); */
};
