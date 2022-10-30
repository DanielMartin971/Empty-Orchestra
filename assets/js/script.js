console.log('I belong here');
var searchInput = document.getElementById("#btnSearch")
var textInput = document.getElementById("#input")

function searchInput() {

}

// async function getTickets(bands) {
// 	var apiUrl = "https://api.seatgeek.com/2/events?client_id=Mjk5MjEzNTl8MTY2NjY2NTg0MC45NzIwODE&client_secret=e76fe68a4de01f96cc9edc8e764f2b645e9d7c500bb645e1034614c936924f42"

// 	var response = await fetch(apiUrl);
// 	if (response.ok) {
// 		var data = await response.json();
// 		var name = data.name;

// 		await search(data)
// 	}
// }

//Client ID: Mjk5MjEzNTl8MTY2NjY2NTg0MC45NzIwODE
//Secret: e76fe68a4de01f96cc9edc8e764f2b645e9d7c500bb645e1034614c936924f42
// function searchInput() {

let seatGeekUrl = 'https://api.seatgeek.com/2/events?client_id=Mjk5MjEzNTl8MTY2NjY2NTg0MC45NzIwODE&client_secret=e76fe68a4de01f96cc9edc8e764f2b645e9d7c500bb645e1034614c936924f42'
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
		console.log(concerts);
		let topEventTitle = data.events[0].title;
		console.log(topEventTitle);
		let venueNameForTopEvent = firstTenEvents[0].venue.name;
		console.log(venueNameForTopEvent)
		let topEventLocation = firstTenEvents[0].venue.display_location;
		console.log(topEventLocation)
		let topEventEl = document.querySelector('#topEvent');
		let topEventBandEl = document.querySelector('#topEventBand');
		let topEventLoc = document.querySelector('#topEventLoc');
		console.log(topEventEl);
		console.dir(topEventEl);


		topEventEl.innerHTML = concerts[0].title;
		topEventBandEl.innerHTML = concerts[0].performers[0].name;
		topEventLoc.innerHTML = concerts[0].venue.display_location;
	})
	.catch(err => console.error('err'))

const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links')

burgerIcon.addEventListener('click', () => {
	navbarMenu.classList.toggle('is-active')
	console.log(data);
})



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
	if (n > slides.length) { slideIndex = 1 }
	if (n < 1) { slideIndex = slides.length }
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}

}
btnSearch.addEventListener("click", () => {
	var userInput = inputValue.val().trim();
	if (userInput !== "") {
		getTickets(searchInput.value);
	}
})