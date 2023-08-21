

document.addEventListener('DOMContentLoaded', function () {
    function uploadContent(objeto) {
        const jsonString = JSON.stringify(objeto, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${objeto.name.value.toLowerCase().replaceAll(' ', '-')}_${objeto.cpf.value}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    let count = 0

    let formCLient = {
        name: document.querySelector("#name"),
        cpf: document.querySelector("#cpf"),
        birth: document.querySelector("#birth"),
        phone: document.querySelector("#phone"),
        address: {
            street: document.querySelector("#address"),
            residencialNumber: document.querySelector("#residencial-number"),
            neighborhood: document.querySelector("#bairro"),
            city: document.querySelector("#city"),
            state: document.querySelector("#state"),
            postalCode: document.querySelector("#CEP")
        },
        medic: document.querySelector("#medic-name"),
        glassesList: [], // Array para armazenar os objetos glasses

        addGlasses: function (count) {
            const newGlasses = {
                glassesClientName: document.querySelector(`#glasses-client-name-${count}`),
                prescription: {
                    rightEye: {
                        esf: document.querySelector(`#esferico-od-${count}`),
                        cil: document.querySelector(`#cilindrico-od-${count}`),
                        axis: document.querySelector(`#axis-od-${count}`),
                        dnp: document.querySelector(`#dnp-od-${count}`),
                        height: document.querySelector(`#height-od-${count}`)
                    },
                    leftEye: {
                        esf: document.querySelector(`#esferico-oe-${count}`),
                        cil: document.querySelector(`#cilindrico-oe-${count}`),
                        axis: document.querySelector(`#axis-oe-${count}`),
                        dnp: document.querySelector(`#dnp-oe-${count}`),
                        height: document.querySelector(`#height-oe-${count}`)
                    }
                },
                lensType: document.querySelector(`#lens-select-${count}`),
                frames: {
                    frameId: document.querySelector(`#frames-${count}`),
                    price: document.querySelector(`#frames-value-${count}`),
                    obs: document.querySelector(`#obs-glasses-label-${count}`)
                }
            }
            this.glassesList.push(newGlasses)
        },
        payment: {
            price: document.querySelector("#price"),
            dicount: document.querySelector("#discount"),
            finalPrice: document.querySelector("#final-price"),
            method: document.querySelector("#payment-method").value,
            paid: document.querySelector("#value-check")
        },
        signatureAndDocuments: {
            canvas: document.querySelector("#canvas"),
            frontDocument: document.querySelector("#front-document"),
            backDocument: document.querySelector("#back-document"),
            limparCanvas: function () {

            },
            salvarAssinatura: function () {

            }
        }

    }

    console.log(formCLient)
    const clientInfoDiv = document.querySelector(".client");

    const newGlasses = (objeto) => {
        count++
        objeto.addGlasses(count); // Chama a função addGlasses e passa o valor do contador

        

        // Crie a nova div de óculos
        const glassesDiv = document.createElement("div");
        glassesDiv.className = "forms-div glasses"; // Adicione as classes à nova div
        glassesDiv.innerHTML = `
    <p>óculos</p><br>
    <label for="">Nome do cliente:</label>
    <input type="text" name="glasses-client-name${count}" id="glasses-client-name${count}" placeholder="Nome do cliente"><br>
    <label for="">Receituário:</label>
    <table>
        <tr>
            <td></td>
            <td>ESF</td>
            <td>CIL</td>
            <td>EIX</td>
            <td>DNP</td>
            <td>ALT</td>
        </tr>
        <tr>
            <td>OD</td>
            <td><input type="number" class="degree-glasses" id="esferico-od${count}" placeholder="OD ESF"></td>
            <td><input type="number" class="degree-glasses" id="cilindrico-od${count}" placeholder="OD CIL"></td>
            <td><input type="number" class="degree-glasses" id="axis-od${count}" placeholder="OD EIXO"></td>
            <td><input type="number" class="degree-glasses" id="dnp-od${count}" placeholder="OD DNP"></td>
            <td><input type="number" class="degree-glasses" id="height-od${count}" placeholder="OD ALT"></td>
        </tr>
        <tr>
            <td>OE</td>
            <td><input type="number" class="degree-glasses" id="esferico-oe${count}" placeholder="OE ESF"></td>
            <td><input type="number" class="degree-glasses" id="cilindrico-oe${count}" placeholder="OE CIL"></td>
            <td><input type="number" class="degree-glasses" id="axis-oe${count}" placeholder="OE EIXO"></td>
            <td><input type="number" class="degree-glasses" id="dnp-oe${count}" placeholder="OE DNP"></td>
            <td><input type="number" class="degree-glasses" id="height-oe${count}" placeholder="OE ALT"></td>
        </tr>
    </table>
    <label for="">Tipo de lente:</label>
    <select name="lens-select${count}" id="lens-select${count}">
        <option value="0">Lente 1</option>
        <option value="1">Lente 2</option>
        <option value="2">Lente 3</option>
        <option value="3">Lente 4</option>
        <option value="4">Lente 5</option>
        <option value="5">Lente 6</option>
        <option value="6">Lente 7</option>
        <option value="7">Lente 8</option>
        <option value="8">Lente 9</option>
        <option value="9">Lente 10</option>
    </select>
    <label for="">Armação:</label>
    <input type="text" id="frames${count}" placeholder="Referência">
    <label for="">Valor:</label>
    <input type="number" id="frames-value${count}" placeholder="Valor da Armação">
    <input type="text" id="obs-glasses-label${count}" placeholder="OBSERVAÇÃO">
    `;

        
        clientInfoDiv.insertAdjacentElement("afterend", glassesDiv);

    }

    const addNewGlassesDiv = document.querySelector("#btn-add-glass-label");
    addNewGlassesDiv.addEventListener("click", function () {
        newGlasses(formCLient);
    });

    const btnUpload = document.querySelector('#send')
    btnUpload.addEventListener('click', function() {
        uploadContent(formCLient)
    })
}
);




