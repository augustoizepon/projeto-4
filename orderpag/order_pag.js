

document.addEventListener('DOMContentLoaded', function () {
    function uploadContent() {



    }
    const lerInputs = () => {

        const formCLient = {
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
            glasses: {
                glassesClientName: document.querySelector("#glasses-client-name"),
                prescription: {
                    rightEye: {
                        esf: document.querySelector("#esferico-od"),
                        cil: document.querySelector("#cilindrico-od"),
                        axis: document.querySelector("#axis-od"),
                        dnp: document.querySelector("#dnp-od"),
                        height: document.querySelector("#height-od")
                    },
                    leftEye: {
                        esf: document.querySelector("#esferico-oe"),
                        cil: document.querySelector("#cilindrico-oe"),
                        axis: document.querySelector("#axis-oe"),
                        dnp: document.querySelector("#dnp-oe"),
                        height: document.querySelector("#height-oe")
                    }
                },
                glassesType: document.querySelector("#lens-select"),
                frames: {
                    frameId: document.querySelector("#frames"),
                    price: document.querySelector("#frames-value"),
                    obs: document.querySelector("#obs-glasses-label")
                }
            },
            payment: {
                price: document.querySelector("#price"),
                dicount: document.querySelector("#discount"),
                finalPrice: document.querySelector("#final-price"),
                method: document.querySelector("#payment-method"),
                paid: document.querySelector("#value-check")
            },
            signatureAndDocuments: {
                canvas: document.querySelector("#canvas"),
                frontDocument: document.querySelector("#front-document"),
                backDocument: document.querySelector("#back-document"),
                limparCanvas: function() {

                },
                salvarAssinatura: function () {
                    
                }
            }

        }


        lerInputs()

        const btnUpload = document.querySelector('#send')
        btnUpload.addEventListener('click', uploadContent)
    }
});




