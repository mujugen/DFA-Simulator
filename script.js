let regex1 = "(b+aa+ab) (a+b)* (bb+aba+ab)* (aaa+bbb) (a+b) (a+b+ab)*";
let regex2 =
  "(1+0)* (11+00+101+010) (1+0+11+00+101)* (11+00) (11+00+101)* (1+0) (1+0+11)*";
var currentRegex = 1;
function switchRegex() {
  let regexLabel = document.getElementById("regexLabel");
  let languageLabel = document.getElementById("languageLabel");
  let regexDiagram1 = document.getElementById("regexDiagram1");
  let regexDiagram2 = document.getElementById("regexDiagram2");
  let pdaDiagram1 = document.getElementById("pdaDiagram1");
  let pdaDiagram2 = document.getElementById("pdaDiagram2");
  let cfg1 = document.getElementById("cfg1");
  let cfg2 = document.getElementById("cfg2");

  if (currentRegex == 2) {
    regexLabel.textContent = regex1;
    languageLabel.textContent = "[a,b]";
    currentRegex = 1;
    regexDiagram1.classList.remove("d-none");
    regexDiagram2.classList.add("d-none");
    pdaDiagram1.classList.remove("d-none");
    pdaDiagram2.classList.add("d-none");
    cfg1.classList.remove("d-none");
    cfg2.classList.add("d-none");
  } else {
    regexLabel.textContent = regex2;
    languageLabel.textContent = "[0,1]";
    currentRegex = 2;
    regexDiagram1.classList.add("d-none");
    regexDiagram2.classList.remove("d-none");
    pdaDiagram1.classList.add("d-none");
    pdaDiagram2.classList.remove("d-none");
    cfg1.classList.add("d-none");
    cfg2.classList.remove("d-none");
  }
}

var nodes = {
  q0: {
    a: "q1",
    b: "q2",
  },
  q1: {
    a: "q2",
    b: "q2",
  },
  q2: {
    a: "q5",
    b: "q3",
  },
  q3: {
    a: "q2",
    b: "q4",
  },
  q4: {
    a: "q2",
    b: "q7",
  },
  q5: {
    a: "q6",
    b: "q2",
  },
  q6: {
    a: "q7",
    b: "q2",
  },
  q7: {
    a: "q8",
    b: "q8",
  },
  q8: {
    a: "q8",
    b: "q8",
  },
};

async function simulate() {
  let input_string = "aabbabaaaaba";
  let currentNode = "q0";
  let nextNode, transition;
  for (i = 0; i < input_string.length; i++) {
    nextNode = nodes[currentNode][input_string[i]];
    transition = `${currentNode}${nextNode}`;
    let transitionElement = document.getElementById(transition);
    let circleElement = document.getElementById(nextNode);
    circleElement.classList.add("transition");
    circleElement.classList.add("hovered");
    transitionElement.classList.add("transition");
    await sleep(1000);
    circleElement.classList.remove("transition");
    circleElement.classList.remove("hovered");
    transitionElement.classList.remove("transition");
    await sleep(500);
    currentNode = nextNode;
  }
}

function validate() {
  console.log("validate");
}

window.onload = function () {
  //switchRegex();
};

function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds); // 1000 milliseconds = 1 second
  });
}
