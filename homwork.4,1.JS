const name = document.querySelector("#name")
const email = document.querySelector("#email")
const message = document.querySelector("#message")
const btn = document.querySelector(".subscribe_form-btn")

btn.addEventListener('click', function(event) {
    event.preventDefault()

    if (!name.value.trim()){
        name.style.border = '1px solid #e10f00'
        return
    }
    name.style.border = '1px solid #131313'

    if (!email.value.trim()){
        email.style.border = '1px solid #e10f00'
        return
    }
    email.style.border = '1px solid #131313'

    if (!message.value.trim()){
        message.style.border = '1px solid #e10f00'
        return
    }
    message.style.border = '1px solid #131313'

    alert(`Вы отправили сообщение, Ваше имя ${name.value}, Ваша почта ${email.value}`)
    name.value = ""
    email.value = ""
    console.log(message.value)
    message.value = ""
})
