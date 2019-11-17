// VARIABLES
/*
 Gallery is used to add contacts
 Body is used to add modal overlay
 people is used to save the info from fetch
 */
const $gallery = $('.gallery');
const $body = $('body');
var people = 0;

// FETCH INFO
/*
 Fetch API is used to get 12 random users
 Results from the API is sent to generateCard
 cardListener is set up after to make sure correct number of cards show up
 */
fetch('https://randomuser.me/api/?results=12&nat=ie') //https://randomuser.me/api/?results=5000
    .then(response => response.json())
    .then(data => generateCard(data.results))
    .then(plHolder => cardListener());

// CREATING CONTACT CARDS
/**
  Taken from index.html to outline structure of card before appending to gallery element
 */
function generateCard(data)
{
    people = data;
    const contact = data.map(item => `
        <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src=${item.picture.medium} alt="profile picture">
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

// MODAL FUNCTIONS
/*
  Sets up event listener for each of the cards

 */
function cardListener() {
    const cards = document.getElementsByClassName('card');
    for (let i = 0; i < 12; i = i + 1) {
        cards[i].addEventListener('click', function () { generateModal(i) });
    }
};

/**
  Creates the overlay for the modal
  Correctly sets up birthday before adding it
  Appends to body element
 */
function generateModal(i)
{
    let temp = people[i];
    let dob = `${temp.dob.date.substring(5, 7)}/${temp.dob.date.substring(8, 10)}/${temp.dob.date.substring(0, 4)}`;
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
                    <p class="modal-text">Birthday: ${dob}</p>
                </div>
            </div>
       </div>
    `;
    $body.append(modalHTML);
}

/* Close button listener 
   Whenever 'x' is clicked, hides the modal overlay
   https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript
*/
$(document).on('click', '#modal-close-btn', function () { $('.modal-container').hide() });



