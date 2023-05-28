// Importando a biblioteca PDFKit
const PDFDocument = require('pdfkit');
const fs = require('fs');


// Função para gerar o PDF
function generatePDF() {
  // Criando um novo documento PDF
  const doc = new PDFDocument();

  // Definindo o stream de saída para salvar o PDF gerado
  const stream = fs.createWriteStream('pedido.pdf');
  doc.pipe(stream);

  // Definindo o número de pedido inicial
  let pedidoNumber = 1;

  // Função para adicionar uma nova página ao PDF
  function addNewPage() {
    doc.addPage();
    doc.fontSize(18).text(`Pedido No ${pedidoNumber}`, { align: 'center' });
    pedidoNumber++;
  }

  // Função para adicionar os dados do cliente à página atual do PDF
  function addClientData() {
    doc.fontSize(12).text(`Nome: ${document.getElementById('name').value}`);
    doc.fontSize(12).text(`CPF: ${document.getElementById('cpf').value}`);
    doc.fontSize(12).text(`Data de Nascimento: ${document.getElementById('birth').value}`);
    doc.fontSize(12).text(`Telefone: ${document.getElementById('phone').value}`);
    doc.fontSize(12).text(`Endereço: ${document.getElementById('address').value}`);
    doc.fontSize(12).text(`Número: ${document.getElementById('residencial-number').value}`);
    doc.fontSize(12).text(`Bairro: ${document.getElementById('bairro').value}`);
    doc.fontSize(12).text(`Cidade: ${document.getElementById('city').value}`);
    doc.fontSize(12).text(`Estado: ${document.getElementById('state').value}`);
    doc.fontSize(12).text(`CEP: ${document.getElementById('CEP').value}`);
    doc.fontSize(12).text(`Médico: ${document.getElementById('medic-name').value}`);
    doc.moveDown();
  }

  // Função para adicionar os dados dos óculos à página atual do PDF
  function addGlassesData() {
    doc.fontSize(12).text('Óculos:');
    doc.fontSize(12).text(`Nome do Cliente: ${document.getElementById('glasses-client-name').value}`);
    doc.fontSize(12).text('Receituário:');
    doc.table({
      headers: ['', 'ESF', 'CIL', 'EIX', 'DNP', 'ALT'],
      rows: [
        ['OD', document.getElementById('esferico-od').value, document.getElementById('cilindrico-od').value,
          document.getElementById('axis-od').value, document.getElementById('dnp-od').value,
          document.getElementById('height-od').value],
        ['OE', document.getElementById('esferico-oe').value, document.getElementById('cilindrico-oe').value,
          document.getElementById('axis-oe').value, document.getElementById('dnp-oe').value,
          document.getElementById('height-oe').value]
      ]
    });
    doc.fontSize(12).text(`Tipo de Lente: ${document.getElementById('lens-select').value}`);
    doc.fontSize(12).text(`Armação: ${document.getElementById('frames').value}`);
    doc.fontSize(12).text(`Valor: R$ ${document.getElementById('frames-value').value}`);
    doc.fontSize(12).text(`Observação: ${document.getElementById('obs-glasses').value}`);
    doc.moveDown();
  }

   // Função para adicionar os valores e descontos à página atual do PDF
   function addValuesAndDiscounts() {
    doc.fontSize(12).text('Valores e Descontos:');
    doc.table({
      headers: ['', 'Valores'],
      rows: [
        ['Valor do(s) Óculos:', 'R$ 0000,00'],
        ['Desconto:', document.getElementById('discount').value],
        ['Valor Final:', 'R$ 0000,00']
      ]
    });
    doc.fontSize(12).text(`Forma de Pagamento: ${document.getElementById('payment-method').value}`);
    doc.fontSize(12).text(`Valor Pago: ${document.getElementById('value-check').value}`);
    doc.moveDown();
  }

  // Função para adicionar a assinatura do cliente à página atual do PDF
  function addClientSignature() {
    doc.fontSize(12).text('Assinatura do Cliente:');
    const canvas = document.getElementById('canvas');
    const imgData = canvas.toDataURL('image/png');
    doc.image(imgData, { width: 300, height: 150 });
    doc.moveDown();
  }

  // Função para adicionar o documento com foto à página atual do PDF
  function addDocumentWithPhoto() {
    doc.fontSize(12).text('Documento com foto (RG ou CNH):');
    const frontDocument = document.getElementById('front-document');
    const backDocument = document.getElementById('back-document');
    // Adicione aqui o código para adicionar as imagens do documento ao PDF
    doc.moveDown();
  }

  // Função para adicionar os dados do pedido ao PDF
  function addPedidoData() {
    addClientData();
    addGlassesData();
    addValuesAndDiscounts();
    addClientSignature();
    addDocumentWithPhoto();
  }

  // Chamando as funções para adicionar os dados do pedido ao PDF
  addNewPage();
  addPedidoData();

  // Finalizando o documento PDF
  doc.end();

  console.log('PDF gerado com sucesso!');
}

// Chamando a função para gerar o PDF quando o botão "Enviar pedido" for clicado
const sendButton = document.getElementById('send');
sendButton.addEventListener('click', generatePDF);