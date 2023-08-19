

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
                
            }

        }


        lerInputs()

        const btnUpload = document.querySelector('#send')
        btnUpload.addEventListener('click', uploadContent)
    }
});




