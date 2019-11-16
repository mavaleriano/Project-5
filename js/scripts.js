// VARIABLES
const $gallery = $('.gallery');

// FETCH INFO
fetch('https://randomuser.me/api/?results=12') //https://randomuser.me/api/?results=5000
    .then(response => response.json())
    .then(data => generateCard(data.results));

// HELPER FUNCTIONS
function generateCard(data) {
    const contact = data.map(item => `
    <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src=${item.picture.thumbnail} alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
                    <p class="card-text">${item.email}</p>
                    <p class="card-text cap">${item.location.city}, ${item.location.state}</p>
                </div>
            </div>
`).join("");
    $gallery.append(contact);
}