fetch(`https://randomuser.me/api/?results=12`)
    .then(response => response.json())
    .then(raw_data => raw_data.results)
    .then(data => usersGenerator(data))


function usersGenerator(data) {
 for(let i=0; i<12; i+=1) {

        const gallery = document.getElementById("gallery");

        console.log(data)
        const name = data[i].name.first + ` ` + data[i].name.last;
        const image = data[i].picture.medium
        const email = data[i].email
        const city = data[i].location.city

        gallery.innerHTML += `  
                <div class="card">                  
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
}