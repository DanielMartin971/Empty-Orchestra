
var searchInput = document.getElementById("btnSearch")
var textInput   = document.getElementById("input")

// function searchInput() {

// }
// Consumer Key    emwInIksrqTSCb37BcVP8fFHMhvD4RlB
// Consumer Secret    ykku1hQvJW1A1ivu
// [6:49 PM]
// ticketmaster key
// [6:52 PM]
// https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=emwInIksrqTSCb37BcVP8fFHMhvD4RlB

//Client ID: Mjk5MjEzNTl8MTY2NjY2NTg0MC45NzIwODE
//Secret: e76fe68a4de01f96cc9edc8e764f2b645e9d7c500bb645e1034614c936924f42
// function searchInput() {

function getEvents(searchInput) {
	
	fetch ("https://app.ticketmaster.com/discovery/v2/events.json?apikey=emwInIksrqTSCb37BcVP8fFHMhvD4RlB&size=10&classificationName=music&keyword="+searchInput)
		.then(function(responseData) {
			return responseData.json();

		})
		.then(function(dataResponse){
			console.log(dataResponse);
            console.log(dataResponse._embedded.events[0].id);
            getImgs(dataResponse._embedded.events[0].id);
            getDetails(dataResponse._embedded.events[0].id, dataResponse._embedded.events[1].id, dataResponse._embedded.events[2].id);
		})
}

function getImgs(thing){
    var img1 = document.getElementById('img-1');
    var img2 = document.getElementById('img-2');
    var img3 = document.getElementById('img-3');

    fetch ("https://app.ticketmaster.com/discovery/v2/events/"+thing+"/images.json?apikey=emwInIksrqTSCb37BcVP8fFHMhvD4RlB")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            img1.src = data.images[1].url;
            img2.src = data.images[2].url;
            img3.src = data.images[3].url;
        })
        .catch(err => console.log('err'))
}

function getDetails(deets1,deets2,deets3){
    var details1 = document.getElementById('details-1');
    var details2 = document.getElementById('details-2');
    var details3 = document.getElementById('details-3');

    fetch ("https://app.ticketmaster.com/discovery/v2/events/"+deets1+".json?apikey=emwInIksrqTSCb37BcVP8fFHMhvD4RlB")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            console.log(data.name,data.products[0].name)

            details1.textContent = data.name + '! Upcoming concert on ' + data.dates.start.localDate + ' at ' + data.products[0].name + '!';
        })

    fetch ("https://app.ticketmaster.com/discovery/v2/events/"+deets2+".json?apikey=emwInIksrqTSCb37BcVP8fFHMhvD4RlB")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            details2.textContent = data.name + '! Upcoming concert on ' + data.dates.start.localDate + ' at ' + data.products[0].name + '!';
        })

    fetch ("https://app.ticketmaster.com/discovery/v2/events/"+deets3+".json?apikey=emwInIksrqTSCb37BcVP8fFHMhvD4RlB")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            details3.textContent = data.name + '! Upcoming concert on ' + data.dates.start.localDate + ' at ' + data.products[0].name + '!';
        })
}
		
		
		 
	  

function showEvents(json) {
		var items = $('#events .list-group-item');
		items.hide();

		var events = json._embedded.events;
		var item = items.first();

		for (var i=0;i<events.length;i++) {
		  item.children('.list-group-item-heading').text(events[i].name);
		  item.children('.list-group-item-text').text(events[i].dates.start.localDate);
		  try {
			item.children('.venue').text(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
		  } catch (err) {
			console.log(err);
		  }
		  item.show();
		  item.off("click");
		  item.click(events[i], function(eventObject) {
			console.log(eventObject.data);
			try {
			  getAttraction(eventObject.data._embedded.attractions[0].id);
			} catch (err) {
			console.log(err);
			}
		  });
		  item=item.next();
		}
}

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
    // .catch(err => console.error('err'))

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

    e.preventDefault();
	console.log(search)

    if (search !== "") {
        getEvents(search);
    }

})