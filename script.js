let regex1 = "(b+aa+ab) (a+b)* (bb+aba+ab)* (aaa+bbb) (a+b) (a+b+ab)*";
let regex2 =
  "(1+0)* (11+00+101+010) (1+0+11+00+101)* (11+00) (11+00+101)* (1+0) (1+0+11)*";
var currentRegex = 1;
function switchRegex() {
  clearInput();
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
      a: "q5",
      b: "q4",
    },
    q4: {
      a: "q5",
      b: "q7",
    },
    q5: {
      a: "q6",
      b: "q3",
    },
    q6: {
      a: "q7",
      b: "q3",
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

var pda_nodes = {
  1: {
    q0box: {
      a: "q1box",
      b: "q2box",
    },
    q1box: {
      a: "q2box",
      b: "q2box",
    },
    q2box: {
      a: "q5box",
      b: "q3box",
    },
    q3box: {
      a: "q5box",
      b: "q4box",
    },
    q4box: {
      a: "q5box",
      b: "q7box",
    },
    q5box: {
      a: "q6box",
      b: "q3box",
    },
    q6box: {
      a: "q7box",
      b: "q3box",
    },
    q7box: {
      a: "qacceptbox",
      b: "qacceptbox",
    },
    qacceptbox: {
      a: "qacceptbox",
      b: "qacceptbox",
    },
  },
  2: {
    w0box: {
      0: "w1box",
      1: "w2box",
    },
    w1box: {
      0: "w4box",
      1: "w3box",
    },
    w2box: {
      0: "w3box",
      1: "w4box",
    },
    w3box: {
      0: "w4box",
      1: "w4box",
    },
    w4box: {
      0: "w5box",
      1: "w6box",
    },
    w5box: {
      0: "w7box",
      1: "w6box",
    },
    w6box: {
      0: "w5box",
      1: "w7box",
    },
    w7box: {
      0: "wacceptbox",
      1: "wacceptbox",
    },
    wacceptbox: {
      0: "wacceptbox",
      1: "wacceptbox",
    },
  },
};

let input_display = document.getElementById("input-display");
let simulateBtn = document.getElementById("simulateBtn");

async function simulate() {
  let input_string = document.getElementById("inputString").value;
  console.log(input_string);
  let nextNode, transition, currentNode;
  let nextNodePda, transitionPda, currentNodePda;
  currentNode = currentRegex == 1 ? "q0" : "w0";
  currentNodePda = currentRegex == 1 ? "q0box" : "w0box";
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
    nextNodePda = pda_nodes[currentRegex][currentNodePda][input_string[i]];

    transition = `${currentNode}${nextNode}`;

    transitionPda = `${currentNodePda}${nextNodePda}`;
    let transitionElement = document.getElementById(transition);
    let transitionElementPda = document.getElementById(transitionPda);
    let circleElement = document.getElementById(nextNode);
    let boxElementPda = document.getElementById(nextNodePda);
    circleElement.classList.add("transition");
    circleElement.classList.add("hovered");

    transitionElement.classList.add("transition");
    if (
      !(
        transitionPda == "wacceptboxwacceptbox" ||
        transitionPda == "qacceptboxqacceptbox"
      )
    ) {
      boxElementPda.classList.add("transition");
      boxElementPda.classList.add("hovered");
      transitionElementPda.classList.add("transition");
    }

    // Highlight the current letter using span element
    let spanElement = input_display.children[i];
    spanElement.classList.add("big");

    await sleep(1000);
    circleElement.classList.remove("transition");
    circleElement.classList.remove("hovered");
    transitionElement.classList.remove("transition");

    if (
      !(
        transitionPda == "wacceptboxwacceptbox" ||
        transitionPda == "qacceptboxqacceptbox"
      )
    ) {
      boxElementPda.classList.remove("transition");
      boxElementPda.classList.remove("hovered");
      transitionElementPda.classList.remove("transition");
    }

    // Remove highlighting after delay
    spanElement.classList.remove("big");

    currentNode = nextNode;
    currentNodePda = nextNodePda;
  }

  simulateBtn.disabled = true;
  await sleep(500);

  if (currentRegex == 1) {
    if (currentNode == "q8") {
      console.log("valid");
      openModal("Valid String");
      input_display.classList.add("blue");
      simulateBtn.disabled = false;
    } else {
      console.log("invalid");
      openModal("Invalid String");
      input_display.classList.add("red");
      simulateBtn.disabled = true;
    }
  } else {
    if (currentNode == "w9") {
      console.log("valid");
      openModal("Valid String");
      input_display.classList.add("blue");

      simulateBtn.disabled = false;
    } else {
      console.log("invalid");
      openModal("Invalid String");
      input_display.classList.add("red");
      simulateBtn.disabled = true;
    }
  }
}

function validate() {
  let input_string = document.getElementById("inputString").value;
  console.log(input_string);
  let nextNode, transition, currentNode;
  currentNode = currentRegex == 1 ? "q0" : "w0";
  input_display.innerHTML = input_string;
  input_display.classList.remove("red");
  input_display.classList.remove("blue");
  let valid = true;

  for (i = 0; i < input_string.length; i++) {
    if (currentRegex == 1) {
      if (input_string[i] !== "a" && input_string[i] !== "b") {
        console.log("invalid");
        input_display.classList.add("red");
        simulateBtn.disabled = true;
        valid = false;
        return;
      }
    } else {
      if (input_string[i] !== "0" && input_string[i] !== "1") {
        console.log("invalid");
        input_display.classList.add("red");
        simulateBtn.disabled = true;
        valid = false;
        return;
      }
    }
  }
  if (valid) {
    input_display.classList.add("blue");
    simulateBtn.disabled = false;
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

function openModal(text) {
  // Get the modal
  var modal = document.getElementById("myModal");
  var modalText = document.getElementById("modal-text");
  modalText.innerText = text;
  modal.style.display = "block";
}
function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}
