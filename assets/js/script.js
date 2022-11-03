
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
            getDetails(dataResponse._embedded.events[0].id, dataResponse._embedded.events[2].id, dataResponse._embedded.events[4].id);
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

    var link1 = document.getElementById('link-1');
    var link2 = document.getElementById('link-2');
    var link3 = document.getElementById('link-3');

    Promise.all([
        fetch ("https://app.ticketmaster.com/discovery/v2/events/"+deets1+".json?apikey=emwInIksrqTSCb37BcVP8fFHMhvD4RlB")
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log('data1',data)
                link1.href = data.url;
                details1.textContent = data.name + '! Upcoming concert on ' + data.dates.start.localDate + ' at ' + data.products[0].name + '!';
            }),

        fetch ("https://app.ticketmaster.com/discovery/v2/events/"+deets2+".json?apikey=emwInIksrqTSCb37BcVP8fFHMhvD4RlB")
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log('data2',data)
                link2.href = data.url;
                details2.textContent = data.name + '! Upcoming concert on ' + data.dates.start.localDate + ' at ' + data.products[0].name + '!';
            }),

        fetch ("https://app.ticketmaster.com/discovery/v2/events/"+deets3+".json?apikey=emwInIksrqTSCb37BcVP8fFHMhvD4RlB")
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log('data3',data)
                link3.href = data.url;
                details3.textContent = data.name + '! Upcoming concert on ' + data.dates.start.localDate + ' at ' + data.products[0].name + '!';
            })
    ])
}  



let seatGeekUrl = 'https://api.seatgeek.com/2/events?client_id=Mjk5MjEzNTl8MTY2NjY2NTg0MC45NzIwODE&client_secret=e76fe68a4de01f96cc9edc8e764f2b645e9d7c500bb645e1034614c936924f42';

fetch(seatGeekUrl)
    .then(response => {
        console.log(response);
        return response.json()
    })
    .then(data => {
// logs data so that i could read throught the documention and how to write to code so that i can 
// get exactly what i want to display to the user
        console.log(data);

        let pageNumber = data.meta.page;
        console.log(pageNumber); // 1
        let firstTenEvents = data.events;
		// filters through the events to only return concerts 
        let concerts = firstTenEvents.filter(function(event) {
            return event.type === 'concert';
        })

        
        let topEventTitle        = data.events[0].title;
        let venueNameForTopEvent = firstTenEvents[0].venue.name;
        let topEventLocation     = firstTenEvents[0].venue.display_location;
		
        let topEventEl     = document.querySelector('#topEvent');
        let topEventDateEl = document.querySelector('#topEventDate');
        let topEventLoc    = document.querySelector('#topEventLoc');

        console.log(concerts);
        console.log(topEventTitle);
        console.log(venueNameForTopEvent)
        console.log(topEventLocation)
        console.log(topEventEl);
        console.dir(topEventEl);

// pulls id from Html so that information from the api can be inputted in that spot
        topEventEl.innerHTML     = concerts[0].title;
        topEventDateEl.innerHTML = concerts[0].datetime_utc;
        topEventLoc.innerHTML    = concerts[0].venue.display_location;

    })
    // .catch(err => console.error('err'))

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