

document.addEventListener('DOMContentLoaded', function () {
    function uploadContent() {
        const lerInputs = () => {
            const input = document.querySelectorAll('input');
            let array = []
            input.forEach(valores => {
                array.push(`{${valores.placeholder}: ${valores.value}}`)
            })
            console.log(array)
        }


        lerInputs()


    }


    const btnUpload = document.querySelector('#send')
    btnUpload.addEventListener('click', uploadContent)
})




