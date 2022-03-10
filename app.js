fetch(`https://randomuser.me/api/?results=12`)
    .then(response => response.json())
    .then(raw_data => raw_data.results)
    .then(data => usersGenerator(data))
    .then(dat => createModal(dat))
    .then(searchBar())

let current;
function usersGenerator(data) {
    for(let i=0; i<12; i+=1) {


        const gallery = document.getElementById("gallery");
        const name = data[i].name.first + ` ` + data[i].name.last;
        const image = data[i].picture.medium
        const email = data[i].email
        const city = data[i].location.city

        gallery.innerHTML += `
                <div class="card" id="${i}">
                    <div class="card-img-container">
                        <img class="card-img" src="${image}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${name}</h3>
                        <p class="card-text">${email}</p>
                        <p class="card-text cap">${city}</p>
                    </div>
                </div>`
    }
    console.log(data)
    return data
}


// Create modal and eventListener to it
function createModal(data){
    const gallery = document.getElementById(`gallery`)
    const cards = document.querySelectorAll(`.card`)
    cards.forEach((card, index)=>{

        const div = document.createElement(`div`)
        let birthday = data[index].dob.date
        let made = birthday.slice(0,10)
        div.className = `modal-container`
        div.id = `m${index}`
        div.innerHTML = `
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${data[index].picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${data[index].name.first + ` ` + data[index].name.last}</h3>
                        <p class="modal-text">${data[index].email}</p>
                        <p class="modal-text cap">${data[index].location.country} - ${data[index].location.city} </p>
                        <hr>
                        <p class="modal-text">Tel: ${data[index].phone}</p>
                        <p class="modal-text">${data[index].location.street.number} ${data[index].location.street.name}</p>
                        <p class="modal-text">Birthday: ${made}</p>
                    </div>
                </div>

                // IMPORTANT: Below is only for exceeds tasks
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>`
        gallery.appendChild(div)
        div.style.display = `none`

        card.addEventListener(`click`, ()=>{
            current = index
            const currentModal = document.getElementById(`m${current}`)
            currentModal.style.display = ``
        })
        document.getElementById(`m${index}`).addEventListener(`click`, (e)=>{


            if(e.target.id === "modal-prev"){
                document.getElementById(`m${current}`).style.display = `none`
                current -= 1

                if(current===-1){
                    document.getElementById(`m${current+1}`).style.display = `none`
                }
                else{
                    document.getElementById(`m${current}`).style.display = ``}


            }
            if(e.target.id === `modal-next`){

                document.getElementById(`m${current}`).style.display = `none`
                current +=1

                if(current === 12){
                    document.getElementById(`m${current-1}`).style.display = `none`
                }
                else{
                    document.getElementById(`m${current}`).style.display = ``}
            }
            if(e.target.id === `modal-close-btn` || e.target.textContent === `X`){
                console.log(current)
                document.getElementById(`m${current}`).style.display = `none`
            }
        })
    });
    return data
}



async function searchBar() {
    const header = document.getElementById(`header-inner-container`)
    const div = document.createElement(`div`)
    div.className = `search-container`
    div.innerHTML += `
                    <form action="#" method="get">
                        <input type="search" id="search-input" class="search-input" placeholder="Search...">
                        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                    </form>`
    header.appendChild(div)
}