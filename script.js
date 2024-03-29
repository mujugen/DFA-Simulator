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
  1: {
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
  },
  2: {
    w0: {
      0: "w1",
      1: "w3",
    },
    w1: {
      0: "w5",
      1: "w2",
    },
    w2: {
      0: "w5",
      1: "w0",
    },
    w3: {
      0: "w4",
      1: "w5",
    },
    w4: {
      0: "w0",
      1: "w5",
    },
    w5: {
      0: "w7",
      1: "w6",
    },
    w6: {
      0: "w7",
      1: "w8",
    },
    w7: {
      0: "w8",
      1: "w6",
    },
    w8: {
      0: "w9",
      1: "w9",
    },
    w9: {
      0: "w9",
      1: "w9",
    },
  },
};

let input_display = document.getElementById("input-display");
let simulateBtn = document.getElementById("simulateBtn");

async function simulate() {
  let input_string = document.getElementById("inputString").value;
  console.log(input_string);
  let nextNode, transition, currentNode;
  currentNode = currentRegex == 1 ? "q0" : "w0";
  let input_display = document.getElementById("input-display");
  input_display.classList.remove("red");
  input_display.classList.remove("blue");
  input_display.innerHTML = "";

  // Insert <span> elements around each letter in the input display
  for (let i = 0; i < input_string.length; i++) {
    let spanElement = document.createElement("span");
    spanElement.textContent = input_string[i];
    input_display.appendChild(spanElement);
  }

  for (let i = 0; i < input_string.length; i++) {
    nextNode = nodes[currentRegex][currentNode][input_string[i]];
    transition = `${currentNode}${nextNode}`;
    let transitionElement = document.getElementById(transition);
    let circleElement = document.getElementById(nextNode);
    circleElement.classList.add("transition");
    circleElement.classList.add("hovered");
    transitionElement.classList.add("transition");

    // Highlight the current letter using span element
    let spanElement = input_display.children[i];
    spanElement.classList.add("big");

    await sleep(1000);
    circleElement.classList.remove("transition");
    circleElement.classList.remove("hovered");
    transitionElement.classList.remove("transition");

    // Remove highlighting after delay
    spanElement.classList.remove("big");

    await sleep(500);
    currentNode = nextNode;
  }

  simulateBtn.disabled = true;
}

function validate() {
  let input_string = document.getElementById("inputString").value;
  console.log(input_string);
  let nextNode, transition, currentNode;
  currentNode = currentRegex == 1 ? "q0" : "w0";
  input_display.innerHTML = input_string;
  input_display.classList.remove("red");
  input_display.classList.remove("blue");

  for (i = 0; i < input_string.length; i++) {
    if (currentRegex == 1) {
      if (input_string[i] !== "a" && input_string[i] !== "b") {
        console.log("invalid");
        input_display.classList.add("red");
        simulateBtn.disabled = true;
        return;
      }
    } else {
      if (input_string[i] !== "0" && input_string[i] !== "1") {
        console.log("invalid");
        input_display.classList.add("red");
        simulateBtn.disabled = true;
        return;
      }
    }

    nextNode = nodes[currentRegex][currentNode][input_string[i]];
    currentNode = nextNode;
  }
  if (currentRegex == 1) {
    if (currentNode == "q8") {
      console.log("valid");
      input_display.classList.add("blue");
      simulateBtn.disabled = false;
    } else {
      console.log("invalid");
      input_display.classList.add("red");
      simulateBtn.disabled = true;
    }
  } else {
    if (currentNode == "w9") {
      console.log("valid");
      input_display.classList.add("blue");

      simulateBtn.disabled = false;
    } else {
      console.log("invalid");
      input_display.classList.add("red");
      simulateBtn.disabled = true;
    }
  }
}

window.onload = function () {
  //switchRegex();

  simulateBtn.disabled = true;
};

function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds); // 1000 milliseconds = 1 second
  });
}

function clearInput() {
  document.getElementById("inputString").value = "";
  input_display.classList.remove("blue");
  input_display.classList.remove("red");
  input_display.innerHTML = "";
  simulateBtn.disabled = true;
}
