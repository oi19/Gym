document.addEventListener('DOMContentLoaded', function () {



    button_handler()
    membership_renewal()

})

// Example POST method implementation:
function postData(url = '', data = {}) {
    // Default options are marked with *
    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
        .then(response => response.json())
        .then(data => { console.log(data) })
}


// join leave button function to handle the button with its 2 applications
// 1- when DOMContent  is loaded , what be the innnerhtml of the button should be based on the user joining the class or not
// 2- onclick the button fetch a post request to the url to create a new instance of the user_class table (assigining the user to this class)
async function join_leave_button() {
    // selecting all the join leave buttons 
    const buttons = document.querySelectorAll('.join-leave-button')
    // looping over them

    for (let i = 0; i < buttons.length; i++) {
        // for every button , call the joined function to check  what the innerhtml of the button should be 
        let button = buttons[i]
        // console.log(button)
        let s = ''
        // await fetch(`/join?class_id=${button.id}`)
        //     .then(response => response.json())
        //     .then((data) => {
        //         console.log(data)
        //         console.log(10)

        //         s = data
        //     })
        joined(button)
        class_capacity(button.id)
        // const response = data.json()
        // console.log(s)
        // // checking data 
        // if (data == 'Found') {
        //     button.innerHTML = 'leave'
        // }

        button.onclick = () => {
            postData(`/join`, { 'id': `${button.id}`, 'button': `${button.innerHTML}` })
            class_capacity(button.id)
            if (button.innerHTML == 'join') {
                button.innerHTML = 'leave'
            }
            else { button.innerHTML = 'join' }

        }


    }
}

// a helper function to check if the user  enrolled in classes or not
async function joined(button) {
    await fetch(`/join?class_id=${button.id}`)
        .then(response => response.json())
        .then((data) => {
            // console.log(data)
            // console.log(10)
            if (data == 'found') {
                button.innerHTML = 'leave'
            }
            else {
                button.innerHTML = 'join'
            }
        })
        .catch(error => console.log(error))

}

// function which hides the buttons when user's memebrship is expired 
function display_buttons() {
    const buttons = document.querySelectorAll('.join-leave-button')
    buttons.forEach(button => {
        button.style.display = "none"
    })
}


// a function checks if user's membership is expired or user has no membership
function button_handler() {
    fetch(`/membershipinfo`)
        .then(response => response.json())
        .then(data => {
            data = eval(data.data[0])
            const div = document.querySelector('#post-sub1')
            if (div != null) div.style.display = 'none'

            const button = document.querySelector('#buy-renew')

            if (data.length > 0) {

                info = data[0]
                start = info.fields.date_start.split('T')[0]
                end = info.fields.date_end.split('T')[0]
                // today date
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date
                // console.log(dateTime)
                // console.log(new Date(end).getTime() > new Date(dateTime).getTime())
                t = new Date().getTime() < new Date(dateTime).getTime()
                expired = new Date(end).getTime() < new Date(dateTime).getTime()
                // console.log(expired)
                // console.log(t)
                // console.log(new Date())

                if (!expired) {
                    join_leave_button()
                    // div.style.display = 'none'

                }
                else {
                    display_buttons()
                    button.innerHTML = 'Renew'
                    div.style.display = 'block'
                }

            }

            //  selecting the membership div

            // console.log(20)
            else {
                display_buttons()
                div.style.display = 'block'
                button.innerHTML = 'buy'
            }
        })

    // .catch(error => {
    //     console.log(error)
    // })

}

function membership_renewal() {
    const value = document.querySelector('#buy-renew')
    // console.log(value.innerHTML)
    // console.log(value.value)
    // console.log(value.innerHTML)

    const button = document.querySelector('.join-leave-button1')
    // console.log(button)
    if (button != null) {
        button.onclick = () => {
            postData(`membershipinfo?value=${value.innerHTML}`)
            button_handler()
        }
    }

}


async function class_capacity(id) {
    await fetch(`class_capacity?id=${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(id)
            const capacity = data
            console.log(capacity)
            console.log(26)
            const num = document.querySelector(`#c${id}`)
            num.innerHTML = `${capacity}`

        })
}