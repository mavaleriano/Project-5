    // VARIABLES
    const $gallery = $('.gallery');
    const $body = $('body');
    var people = 0;

    // FETCH INFO
fetch('https://randomuser.me/api/?results=12&nat=ie') //https://randomuser.me/api/?results=5000
    .then(response => response.json())
    .then(data => generateCard(data.results))
    .then(plHolder => cardListener());

    // HELPER FUNCTIONS
    function generateCard(data) {
        people = data;
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

    // MODAL

function cardListener() {
    const cards = document.getElementsByClassName('card');
    for (let i = 0; i < 12; i = i + 1) {
        cards[i].addEventListener('click', function () { generateModal(i) });
    }
};

function generateModal(i) {
    let temp = people[i];
    const modalHTML = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${temp.picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${temp.name.first} ${temp.name.last}</h3>
                <p class="modal-text">${temp.email}</p>
                <p class="modal-text cap">${temp.location.city}</p>
                <hr>
                <p class="modal-text">${temp.cell}</p>
                <p class="modal-text">${temp.location.street.number} ${temp.location.street.name}, ${temp.location.state} ${temp.location.postcode}</p>
                <p class="modal-text">Birthday: 10/21/2015</p>
            </div>
       </div>
    `;
    $body.append(modalHTML);
}

function buttonListener() {
    $('#modal-close-btn').click(function () { $('.modal-container').hide() });
}



