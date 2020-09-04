//TOGGLES//
let login = false
let likesOn = false
let formOn = false
let loginOn = false
let viewOn = false
let uploadsOn = false
let likes = []
/*************************** DOM Elements ***************************/
//CONTAINERS, FORMS//
const outfitContainer = document.querySelector("#main-container")
const outfitForm = document.querySelector("#add-outfit-form")
const userForm = document.querySelector("#login-form")
const likedImgsContainer = document.querySelector(".liked-imgs-container")
const header = document.querySelector("#header")
const userProfile = document.querySelector("#user-profile")
const uploadsContainer = document.querySelector(".uploads-container")
const cards = document.querySelector("#outfits")
const likedUl = document.querySelector("#liked")
const uploadUl = document.querySelector(".upload-cards")
//BUTTONS//
const addBtn = document.querySelector("#new-outfit")
const likedImgsBtn = document.querySelector("#liked-imgs")
const viewProfileBtn = document.querySelector("#view-profile")
const viewUploadBtn = document.querySelector("#uploaded")
/************************** Event Listeners **************************/
userForm.addEventListener("submit", (e) => handleUser(e))
outfitForm.addEventListener("submit", (e) => handleFormSubmit(e))
likedImgsBtn.addEventListener('click', handleLikedImages)
viewUploadBtn.addEventListener('click', handleUploads)
addBtn.addEventListener("click", () => {
    // hide & seek with the form
    formOn = !formOn
    if (formOn) {
        outfitForm.style.display = 'block'
    } else {
        outfitForm.style.display = 'none'
    }
})

viewProfileBtn.addEventListener('click',() => {
    viewOn = !viewOn
    if (viewOn) {
        userProfile.style.display = 'block'
        // viewProfileBtn.style.display = 'none'
    } else {
        userProfile.style.display = 'none'
        // viewProfileBtn.style.display = 'block'
    }
})

cards.addEventListener("click", e => {
    if(e.target.dataset.action === "like"){
        handleLikeBtn(e)
    }
})

// likedImgsContainer.addEventListener("click", e => {
//     if(e.target.dataset.action === "delete"){
//         handleDislike(e)
//     }
// })

uploadsContainer.addEventListener("click", (e) => {
    if(e.target.dataset.action === "delete"){
        handleDelete(e)
    }
})

/*************************** Event Handlers ***************************/
function handleUser(e){
    e.preventDefault()
    const userName = e.target["username"].value
    localStorage.username = userName
    const newUserInfo = {
        username: userName
    }
    fetch(`http://localhost:3000/users`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserInfo)
    })
    .then(r => r.json())
    .then(user => {
    localStorage.id = user.id
    //local storage stores the user id
    })

    document.querySelector("#welcome").innerText = "Hey, " + userName + " welcome to outfit liker!",
    document.querySelector("#username").innerText = userName;

    login = !login
    if (login) {
        userForm.style.display = 'none',
        header.style.display = 'block',
        outfitContainer.style.display = 'block'

    } else {
        userForm.style.display = 'block',
        header.style.display = 'none',
        outfitContainer.style.display = 'none'
    }

}
    
function handleLikeBtn(e) {
    const outfitUl = e.target.closest(".outfit-card")
    const likeCount = outfitUl.querySelector(".like-count")
    let newLikeCount = parseInt(likeCount.textContent) + 1
    let outfitId = outfitUl.dataset.id
    const newLike = {
        outfit_id: outfitId,
        user_id: localStorage.id,
        like_count: newLikeCount   
    }

    fetch('http://localhost:3000/likes', {
     method: 'POST',
     headers: {
       "Content-Type": "application/json",
       "Accept": "application/json"
     },
     body: JSON.stringify(newLike)
   })
   .then(r => r.json())
   .then(outfit => renderOneOutfit(outfit))

   likeCount.textContent = newLikeCount

}

function handleFormSubmit(e){
    e.preventDefault()
    const outfitName = e.target["name"].value
    const outfitUserName = localStorage.username
    const outfitSeason = e.target["seasons"].value
    const outfitImg = e.target["img-url"].value
    const newOutfit = {
        name: outfitName,
        season: outfitSeason,
        username: outfitUserName,
        img_url: outfitImg,
        like_count: 0
    }
    fetch(`http://localhost:3000/outfits`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newOutfit)
    })
    .then(r => r.json())
    .then(newOutfitInfo => {
        console.log(newOutfitInfo)
        renderOneOutfit(newOutfitInfo)
    })
}

function handleLikedImages(){
    likesOn = !likesOn
    if (likesOn) {
        likedImgsContainer.style.display = 'block'
    } else {
        likedImgsContainer.style.display = 'none'
    }

    //GET LIKED OUTFITS
    fetch(`http://localhost:3000/users/${localStorage.id}`)//user show
    .then(r => r.json())
    .then(user => renderLikedOutfits(user))
}

// function handleDislike(e){
//     const likedUl = e.target.closest(".outfit-card")
//     let likedUl = likedUl.dataset.id
//     fetch(`http://localhost:3000/users/${localStorage.id}`, {
//       method: "DELETE"
//     })
//     .then(r => r.json())
//     .then(data => {
//       console.log(data)
//       // pessimistic rendering: DOM manipulation inside of fetch
//       outfitUl.remove()
//     })
// }

function handleUploads(){
    uploadsOn = !uploadsOn
    if (uploadsOn) {
        uploadsContainer.style.display = 'block'
    } else {
        uploadsContainer.style.display = 'none'
    }
    
    //GET UPLOADED OUTFITS
    fetch(`http://localhost:3000/users/${localStorage.id}`)
    .then(r => r.json())
    .then(user => renderUploads(user))
}

function handleDelete(e){
    const outfitUl = e.target.closest(".upload-card")
    let outfitId = outfitUl.dataset.id
    fetch(`http://localhost:3000/outfits/${outfitId}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(data => {
      console.log(data)
      // pessimistic rendering: DOM manipulation inside of fetch
      outfitUl.remove()
    })
}

function handleEdit(e){

}

/*********************** Render Functions ***********************/
function renderAllOutfits(outfits){
    outfits.forEach(renderOneOutfit)
}

function renderOneOutfit(outfit){
    let outfitLi = document.createElement('li')
    outfitLi.className = "outfit-card"
    outfitLi.dataset.id = outfit.id
    outfitLi.innerHTML = `
    <div class="content">
        <h2>${outfit.name}</h2>
        <h4> ${outfit.season} </h4>
        <h5>${outfit.user_username}</h5>
    </div>
    <div class="image">
        <img src=${outfit.img_url}>
    </div>
    <div class="likes">
        <span class="like-count">${outfit.like_count} </span> Likes 
    </div>
    <button data-action="like" class="like-button"> 💗LIKE </button>
    `
    cards.append(outfitLi)
}



function renderLikedOutfits(user){
    console.log(user)
    let liked_outfits = user.liked_outfits
    liked_outfits.forEach(renderOneLikedOutfit)
}

function renderOneLikedOutfit(outfit){
    console.log(outfit)
    let likedLi = document.createElement('li')
    likedLi.className = "like-card"
    likedLi.dataset.id = outfit.id
    likedLi.innerHTML = `
    <h2>${outfit.name}</h2>
    <h4> ${outfit.season} </h4>
    <img src=${outfit.img_url}>
    `

    likedUl.append(likedLi)
}

function renderUploads(user){
    let uploads = user.outfits
    uploads.forEach(outfit => {
        let uploadLi = document.createElement('li')
        uploadLi.className = "upload-card"
        uploadLi.dataset.id = outfit.id
        uploadLi.innerHTML = `
        <h2 id="name">${outfit.name}</h2>
        <button id="edit-name"> Edit </button>
        <h4 id="season"> ${outfit.season} </h4>
        <button data-action="delete" class="delete-button"> Delete ❌</button>
        <img src=${outfit.img_url}>
        `
        console.log(outfit)
        let editBtn = uploadUl.querySelector("#edit-name")
        editBtn.addEventListener("click", (editName))
        uploadUl.append(uploadLi)

        function editName(outfit){
            let newName = uploadUl.querySelector("#name").textContent
            console.log(newName)
            let outfitId = uploadUl.dataset.id
            fetch(`http://localhost:3000/outfits/${outfitId}`,{
                method: "PATCH",
                helpers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify({name: newName})
            })
        }
    })

    
}
/************************* Intial Render *************************/
fetch(`http://localhost:3000/outfits`)
.then(r =>r.json())
.then(outfits => renderAllOutfits(outfits))
