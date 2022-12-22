// document.addEventListener("DOMContentLoaded", function () {
//     console.log(50)
//     getPosts('all', 1)


//     // index page
//     document.querySelector('#all').onclick = () => {
//         getPosts('all', 1)
//     }
//     const f = document.querySelector('#following')

//     f.onclick = () => {
//         getPosts('following', 1)
//     }



//     const post_button = document.querySelector(".post-button")
//     post_button.onclick = () => {
//         const body = document.querySelector(".text-post")
//         console.log(body.value)

//         if (body.value.length > 0) {
//             postData('post', { body: body.value })

//         }
//         else {
//             post_button.disabled = true;
//         }
//     }

// })

// // a function to get the posts whether all , following , or user's posts
// function getPosts(type = "", pageNum = 1, id) {
//     const del = document.querySelectorAll('.post')
//     // document.querySelector('#previous').disabled = true
//     del.forEach(post => {
//         // post.style.display = 'none'
//         post.remove()
//     })


//     const t = type
//     const page = pageNum
//     console.log(page)
//     // Event.preventDefault
//     fetch(`post/${t}?page=${page}&id=${id}`)
//         .then(response => response.json())
//         .then(data => {
//             // console.log(data)



//             var i = 0
//             // very important step as the serialized list of the queryset is stringfied as whole not as its elements//
//             // unstring

//             const posts = eval(data.post[0])
//             // console.log(posts)

//             posts.forEach(post => {
//                 console.log(post)

//                 createPost(post, data.poster[i], t)
//                 i += 1
//             })


//             // svg
//             const n = document.querySelectorAll('.svg')
//             console.log(n)
//             n.forEach(element => {
//                 // console.log(element)
//                 const id = element.id.substring(1)



//                 const aid = `i${id}`
//                 const likes = `l${id}`
//                 // console.log(aid)
//                 const after = document.querySelector(`#${aid}`)
//                 var count = document.querySelector(`#${likes}`)
//                 var count2 = eval(count.innerHTML)

//                 //fetching liked answer
//                 fetch(`post/likes/${id}`)
//                     .then(response => response.json())
//                     .then(data => {
//                         console.log(data)

//                         if (data == 'yes') {
//                             console.log(data)
//                             element.style.display = 'none'
//                             after.style.display = 'block'
//                         }

//                     })


//                 // console.log(count2)
//                 // console.log(after)
//                 element.ondblclick = () => {


//                     element.style.display = 'none'
//                     after.style.display = 'block'
//                     count2 += 1
//                     console.log(count2)
//                     count.innerHTML = `${count2}`
//                     postData(`post/likes/${id}`, { 'likes': `${count2}`, 'answer': 'add' }, 'PUT')

//                 }
//                 after.onclick = () => {
//                     element.style.display = 'block'
//                     after.style.display = 'none'
//                     count2 -= 1
//                     console.log(count2)
//                     count.innerHTML = `${count2}`
//                     postData(`post/likes/${id}`, { 'likes': `${count2}`, 'answer': 'del' }, 'PUT')
//                 }


//             })


//             const buttons = document.querySelectorAll('.edit-button')
//             buttons.forEach(button => {
//                 const id = button.id.substring(1)
//                 const body = document.querySelector(`#b${id}`)
//                 // const id = button.id.substring(1)
//                 button.onclick = () => {
//                     if (button.innerHTML == 'Edit') {
//                         button.innerHTML = 'Save'
//                         body.readOnly = false
//                     }
//                     else {
//                         button.innerHTML = 'Edit'
//                         body.readOnly = true

//                         postData(`post/body/${id}`, { 'body': body.value }, 'PUT')
//                     }
//                 }

//             })


//             // user profile
//             const users = document.querySelectorAll('.username')
//             var m = 1
//             users.forEach(u => {
//                 const id = eval(u.id.substring(1))
//                 m = id
//                 console.log(id)
//                 u.onclick = () => {
//                     // calls
//                     console.log(`id = ${id}`)
//                     user(id, 1)
//                     getPosts('user', 1, id)

//                     // .then(data => { print(data) })
//                     // console.log(44)
//                     document.querySelector('#post-sub').style.display = 'none'
//                     document.querySelector('.user-container').style.display = 'block'
//                 }

//             })

//             pagination()







//         })

// }

// function user(id) {
//     console.log(88)
//     fetch(`/user/${id}`)
//         .then(response => response.json())
//         .then(data => {
//             const result = data.user[0]
//             const user = eval(result)
//             const fields = user[0].fields
//             const user_id = user[0].pk
//             console.log(user_id)
//             console.log(id)
//             const time = fields.date_joined.split('T')
//             const f = document.querySelector('.follow-unfollow')
//             // f.innerHTML = 'Follow'


//             if (user_id != data.current_user) {
//                 f.style.display = 'block'
//                 if (data.answer == 'yes') {
//                     f.innerHTML = 'Unfollow'
//                 }
//                 else {
//                     f.innerHTML = 'Follow'
//                 }
//                 f.onclick = () => {
//                     var b = document.querySelector('.followersNum')
//                     postData(`user/${user_id}`)
//                     if (f.innerHTML == 'Follow') {
//                         f.innerHTML = 'Unfollow'
//                         console.log(b.innerHTML)
//                         b.innerHTML = (eval(b.innerHTML) + 1)
//                         console.log(b.innerHTML)
//                     }
//                     else {
//                         f.innerHTML = 'Follow'
//                         // var b = document.querySelector('.followersNum').innerHTML
//                         console.log(b)
//                         b.innerHTML = (eval(b.innerHTML) - 1)
//                     }


//                 }

//             }
//             else {
//                 f.style.display = 'none'
//             }



//             console.log(data.followers)
//             console.log(data.following)
//             document.querySelector('.user-username').innerHTML = `${fields.username}`
//             document.querySelector('.user-username2').innerHTML = `@${fields.username}`
//             document.querySelector('.joined-date').innerHTML = `Joined ${time[0]}`
//             document.querySelector('.followingNum').innerHTML = ` ${data.following}`
//             document.querySelector('.followersNum').innerHTML = ` ${data.followers}`
//         })


// }




// function createPost(data, username, type) {

//     // username of the creator of the postc

//     console.log(data)
//     const creator = username
//     console.log(username)
//     console.log(data.fields.timestamp)
//     // post div
//     const div = document.createElement('div')
//     div.className = 'post'
//     div.id = `${type}`
//     // div.setAttribute('data-type', `${type}`)
//     // link with the user name
//     const link = document.createElement('a')
//     // link.href = "{% url 'user' %}"
//     const h = document.createElement('h6')
//     h.className = 'username'
//     h.id = `u${data.fields.creator}`
//     h.innerHTML = `@${creator}`
//     link.appendChild(h)





//     // textarea
//     const body = document.createElement('textarea')
//     body.className = 'post-text-edit'
//     body.id = `b${data.pk}`
//     body.setAttribute('rows', '1')
//     body.setAttribute('cols', '30')
//     body.readOnly = true
//     body.value = data.fields.body


//     // edit button
//     const button = document.createElement('button')
//     button.className = 'edit-button'
//     button.innerHTML = 'Edit'
//     button.id = `e${data.pk}`
//     //

//     // form appending
//     // form.appendChild(csrf)
//     // form.appendChild(body)
//     // form.appendChild(button)



//     // date of the post
//     const h2 = document.createElement('h6')
//     const time = data.fields.timestamp.split('T')
//     console.log(time)
//     const min = time[1].split(':')
//     var d = 'pm'
//     console.log(d)
//     console.log(`time is hours`)
//     var hours = (parseInt(min[0]) + 2)
//     if (hours < 12) {
//         d = 'am'
//     }
//     h2.innerHTML = `${time[0]}, ${hours}:${min[1]}${d}`

//     //likes Container
//     const div2 = document.createElement('div')
//     div2.className = 'likes-container'

//     const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
//     svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

//     // svg.xmins('http://www.w3.org/2000/svg')
//     svg.setAttribute('width', '16')
//     svg.setAttribute('height', '16')
//     // svg.fill = 'currentColor'
//     svg.setAttribute('fill', 'currentColor')
//     svg.setAttribute('viewbox', '0 0 16 16')
//     // svg.viewbox = '0 0 16 16'

//     // svg.classList.add('bi bi-heart')
//     svg.setAttribute('class', 'svg')
//     svg.setAttribute('id', `s${data.pk}`)


//     const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
//     // path.d = 'm8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z'
//     path.setAttribute('d', 'm8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z')
//     svg.appendChild(path)

//     const i = document.createElement('i')
//     i.setAttribute('class', 'fas fa-heart')
//     i.id = `i${data.pk}`
//     i.style.display = 'none'





//     //likes Count
//     const likes = document.createElement('h6')
//     likes.className = 'likes-num'
//     likes.id = `l${data.pk}`
//     console.log(`likes_counter = ${data.fields.likes_counter}`)
//     likes.innerHTML = data.fields.likes_counter

//     div2.appendChild(i)

//     //likes appending
//     div2.appendChild(svg)
//     div2.appendChild(likes)

//     // post appending
//     div.appendChild(link)
//     // div.appendChild(editext)
//     div.appendChild(body)
//     div.appendChild(button)
//     div.appendChild(h2)
//     div.appendChild(div2)


//     // post-container appending
//     const container = document.querySelector('.post-container')
//     console.log(container)

//     container.append(div)





// }



// function pagination() {

//     // var json = JSON.stringify({
//     //     type: document.querySelector('.post').dataset.type

//     // })
//     const post = document.querySelectorAll('.post')

//     console.log(post)
//     const type = post[0].id
//     console.log(type)

//     const num = document.querySelector('#page-num')
//     const pageNum = parseInt(num.innerHTML)

//     console.log(`${pageNum}`)
//     console.log(`77:${pageNum}`)
//     page = pageNum + 1
//     var p = []
//     // fetch(`post/${t}?page=${page}&id=${id}`)
//     fetch(`post/${type}?page=${page}`)
//         .then(response => response.json())
//         .then(data => {
//             var count = 0
//             // console.log(eval(data.length))
//             // console.log(`length= ${data.length}`)
//             if (data.length == 0) {
//                 count = 0
//             }
//             else {
//                 p = eval(data.post[0])
//                 console.log(p)
//                 count = p.length
//             }

//             console.log(count)



//             // next page
//             const next = document.querySelector('#next')
//             const previous = document.querySelector('#previous')
//             // previous.disabled = true
//             console.log(previous)
//             if (count != 0) {


//                 next.onclick = () => {
//                     // deleting current posts

//                     getPosts(type, pageNum + 1)
//                     num.innerHTML = `${pageNum + 1}`
//                     previous.disabled = false

//                 }

//             }

//             else {
//                 next.disabled = true
//             }
//             if (pageNum > 1) {

//                 previous.onclick = () => {
//                     getPosts(type, pageNum - 1)
//                     num.innerHTML = `${pageNum - 1}`

//                 }

//             }
//             else if (pageNum < 2) {
//                 previous.disabled = true;
//             }




//         })




// }
// // Example POST method implementation:
// function postData(url = '', data = {}, method = 'POST', csrf = '') {
//     // Default options are marked with *
//     fetch(url, {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//             'Content-Type': 'application/json',
//             "X-CSRFToken": csrf
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//         },

//         body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     // return response.json(); // parses JSON response into native JavaScript objects

//     // user function in case of clicking the follow unfollow button

// }




