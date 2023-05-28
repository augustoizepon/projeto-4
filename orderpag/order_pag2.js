const btnAddMedic = document.getElementById("btn-add-medic");
const medicLabel = document.getElementById("medic");
const inputMedic = document.getElementById("medic-name");
let indexMedic = 0;

const addNewMedic = () => {
  const newInputMedic = document.createElement(`input`);
  newInputMedic.id = "medic-name-" + indexMedic;
  newInputMedic.placeholder = "Dr(a).";
  newInputMedic.style.width = "";
  inputMedic.after(newInputMedic);
  indexMedic++;
};

btnAddMedic.addEventListener("click", addNewMedic);

const glassesLabel = document.getElementById("glasses-label");
const btnAddGlassesLabel = document.getElementById("btn-add-glass-label");
let index = 0;

const addNewGlassLabel = () => {
  const glassesLabelClone = document.createElement("label");
  glassesLabelClone.classList.add("glasses-label");
  glassesLabelClone.id = "glasses-label-" + index;
  const children = glassesLabel.childNodes;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.nodeType === Node.ELEMENT_NODE) {
      const childClone = child.cloneNode(true);
      glassesLabelClone.appendChild(childClone);
    } else if (child.nodeType === Node.TEXT_NODE) {
      const textClone = child.cloneNode();
      glassesLabelClone.appendChild(textClone);
    }
  }
  index++;
  glassesLabelClone.setAttribute("data-index", index);
  glassesLabel.after(glassesLabelClone);
  const newGlassesLabel = document.getElementById(`glasses-label-${index}`);
  const style = window.getComputedStyle(glassesLabel);
  for (let i = 0; i < style.length; i++) {
    const property = style[i];
    newGlassesLabel.style.setProperty(property, style.getPropertyValue(property));
  }
};

btnAddGlassesLabel.addEventListener("click", addNewGlassLabel);

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.addEventListener("touchstart", iniciarAssinatura);
canvas.addEventListener("touchmove", assinar);
canvas.addEventListener("touchend", pararAssinatura);

var desenhando = false;
var ultimaPosicao = null;

function iniciarAssinatura(evento) {
  evento.preventDefault(); // impede que a tela role
  desenhando = true;
  ultimaPosicao = obterPosicaoTouch(evento);
}

function assinar(evento) {
  if (evento.targetTouches.length == 1) {
    evento.preventDefault(); // impede que a tela role
    if (desenhando) {
      var posicaoAtual = obterPosicaoTouch(evento);
      desenharLinha(ultimaPosicao, posicaoAtual);
      ultimaPosicao = posicaoAtual;
    }
  }
}

function pararAssinatura(evento) {
  desenhando = false;
}

function obterPosicaoTouch(evento) {
  var retangulo = canvas.getBoundingClientRect();
  var scaleX = canvas.width / retangulo.width;
  var scaleY = canvas.height / retangulo.height;

  return {
    x: (evento.touches[0].clientX - retangulo.left) * scaleX,
    y: (evento.touches[0].clientY - retangulo.top) * scaleY
  };
}

function desenharLinha(inicio, fim) {
  ctx.beginPath();
  ctx.moveTo(inicio.x, inicio.y);
  ctx.lineTo(fim.x, fim.y);
  ctx.stroke();
}

function limparCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function salvarAssinatura() {
  var imagemAssinatura = canvas.toDataURL();
  console.log(imagemAssinatura);
  // Envie a imagem para o servidor ou armazene em algum lugar
}

const sendButton = document.getElementById("send");

// Variável para armazenar o número do pedido
let pedidoNumber = 1;

const catchingInputs = () => {
  const allInputs = document.querySelectorAll("input");

  // Criar um novo documento PDF
  const doc = new jsPDF();

  let yPos = 20; // Posição vertical inicial

  // Função para adicionar uma nova página, se necessário
  const addNewPageIfNeeded = () => {
    if (yPos >= doc.internal.pageSize.height - 10) {
      doc.addPage();
      yPos = 20;
    }
  };

  // Adicionar o número do pedido ao PDF
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(165, 10, `Pedido ${pedidoNumber.toString().padStart(5, "0")}`);

  // Incrementar o número do pedido para o próximo
  pedidoNumber++;

  // Adicionar os valores dos inputs em uma tabela separada
  const otherInputsTable = [];
  const placeholders = [];
  const values = [];

  allInputs.forEach((input) => {
    const inputValue = input.value;
    const placeholder = input.placeholder;

    if (placeholder.startsWith("OD") || placeholder.startsWith("OE")) {
      return; // Pular inputs relacionados às especificações dos óculos
    }

    placeholders.push(placeholder);
    values.push(inputValue);
  });

  // Verificar se há dados para adicionar à tabela
  if (placeholders.length > 0 && values.length > 0) {
    // Adicionar cabeçalho da tabela
    otherInputsTable.push(["Objeto", "Informação"]);

    // Adicionar dados à tabela
    for (let i = 0; i < placeholders.length; i++) {
      otherInputsTable.push([placeholders[i], values[i]]);
    }

    // Desenhar a tabela para os outros inputs
    addNewPageIfNeeded();
    doc.autoTable({
      startY: yPos,
      head: [otherInputsTable[0]],
      body: otherInputsTable.slice(1),
      theme: "plain",
      styles: {
        fontSize: 10,
        cellPadding: 2,
        lineWidth: 0.1,
      },
    });

    yPos += doc.previousAutoTable.finalY + 10; // Atualizar a posição vertical
    addNewPageIfNeeded();
  }

  // Cabeçalho da tabela "Especificações para os óculos"
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(20, yPos, "Especificações para os óculos");
  yPos += 15;

  // Preencher a tabela com os valores dos inputs dos óculos
  const tableData = [
    ["Olhos", "", "ESFÉRICO", "CILÍNDRICO", "EIXO", "DNP", "ALTURA"],
    ["OD", "", "", "", "", "", ""],
    ["OE", "", "", "", "", "", "", ""]
  ];

  allInputs.forEach((input) => {
    const inputValue = input.value;
    const placeholder = input.placeholder;

    if (placeholder === "OD ESF") {
      tableData[1][1] = inputValue;
    } else if (placeholder === "OD CIL") {
      tableData[1][2] = inputValue;
    } else if (placeholder === "OD EIXO") {
      tableData[1][3] = inputValue;
    }else if (placeholder === "OD DNP") {
      tableData[1][4] = inputValue;
    } else if (placeholder === "OD ALT") {
      tableData[1][5] = inputValue;
    } else if (placeholder === "OE ESF") {
      tableData[2][1] = inputValue;
    } else if (placeholder === "OE CIL") {
      tableData[2][2] = inputValue;
    } else if (placeholder === "OE EIXO") {
      tableData[2][3] = inputValue;
    } else if (placeholder === "OE DNP") {
      tableData[2][4] = inputValue;
    } else if (placeholder === "OE ALT") {
      tableData[2][5] = inputValue;
    }
  });

  // Desenhar a tabela "Especificações para os óculos"
  addNewPageIfNeeded();
  doc.autoTable({
    startY: yPos,
    head: [tableData[0]],
    body: tableData.slice(1),
    theme: "plain",
    styles: {
      fontSize: 10,
      cellPadding: 2,
      lineWidth: 0.1,
      fontStyle: "bold",
    },
    headStyles: {
      fillColor: "#f2f2f2",
    },
  });

  // Salvar o documento PDF
  doc.save("formulario.pdf");
};

sendButton.addEventListener("click", catchingInputs);