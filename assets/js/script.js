
var searchInput = document.getElementById("btnSearch")
var textInput   = document.getElementById("input")

//Client ID: Mjk5MjEzNTl8MTY2NjY2NTg0MC45NzIwODE
//Secret: e76fe68a4de01f96cc9edc8e764f2b645e9d7c500bb645e1034614c936924f42
// function searchInput() {

let seatGeekUrl = 'https://api.seatgeek.com/2/events?client_id=Mjk5MjEzNTl8MTY2NjY2NTg0MC45NzIwODE&client_secret=e76fe68a4de01f96cc9edc8e764f2b645e9d7c500bb645e1034614c936924f42';

fetch(seatGeekUrl)
    .then(response => {
        console.log(response);
        return response.json()
    })
    .then(data => {

        console.log(data);

        let pageNumber = data.meta.page;
        console.log(pageNumber); // 1
        let firstTenEvents = data.events;
        let concerts = firstTenEvents.filter(function(event) {
            return event.type === 'concert';
        })

        
        let topEventTitle        = data.events[0].title;
        let venueNameForTopEvent = firstTenEvents[0].venue.name;
        let topEventLocation     = firstTenEvents[0].venue.display_location;
        let topEventEl     = document.querySelector('#topEvent');
        let topEventBandEl = document.querySelector('#topEventBand');
        let topEventLoc    = document.querySelector('#topEventLoc');

        console.log(concerts);
        console.log(topEventTitle);
        console.log(venueNameForTopEvent)
        console.log(topEventLocation)
        console.log(topEventEl);
        console.dir(topEventEl);


        topEventEl.innerHTML     = concerts[0].title;
        topEventBandEl.innerHTML = concerts[0].performers[0].name;
        topEventLoc.innerHTML    = concerts[0].venue.display_location;
    })
    .catch(err => console.error('err'))

const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links')

// burgerIcon.addEventListener('click', () => {
//     navbarMenu.classList.toggle('is-active')
//     console.log(data);
// })



var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("item-slide");
    var captionText = document.getElementById("caption");

    if (n > slides.length) { 
        slideIndex = 1 
    }

    if (n < 1) { 
        slideIndex = slides.length 
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

}

btnSearch.addEventListener("click", (e) => {
    var search    = textInput.value.trim();
    var userInput = search;

    e.preventDefault();

    if (userInput !== "") {
        getTickets(searchInput.value);
    }
})

var testing = 'https://app.ticketmaster.com/discovery/v2/venues.json?apikey=emwInIksrqTSCb37BcVP8fFHMhvD4RlB';
//https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=emwInIksrqTSCb37BcVP8fFHMhvD4RlB
//https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=emwInIksrqTSCb37BcVP8fFHMhvD4RlB

fetch(testing)
    .then(response => {
        console.log('ticketmaster',response);
        return response.json()
    })
    .then(data => {console.log(data)})