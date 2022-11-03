
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

//When this function is called it grabs the events then calls the other functions giving them the IDs for the API and making it
//easier to search for events and grab details and imgs
function getEvents(searchInput) {
	
	fetch ("https://app.ticketmaster.com/discovery/v2/events.json?apikey=emwInIksrqTSCb37BcVP8fFHMhvD4RlB&size=10&classificationName=music&keyword="+searchInput)
		.then(function(responseData) {
			return responseData.json();

		})
		.then(function(dataResponse){
			console.log(dataResponse);
            var id1 = dataResponse._embedded.events[0].id;
            var id2 = dataResponse._embedded.events[1].id;
            var id3 = dataResponse._embedded.events[2].id; 

            getImgs(dataResponse._embedded.events[0].id);
            setTimeout(getDetails(id1,id2,id3),1000);
            console.log(id1,id2,id3);
		})
}

//This function when called grabs the imgs for the events and places them on the HTML page
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

//This function gets the details of events i.e. date and place
function getDetails(deets1,deets2,deets3){
    var details1 = document.getElementById('details-1');
    var details2 = document.getElementById('details-2');
    var details3 = document.getElementById('details-3');

    var link1 = document.getElementById('link-1');
    var link2 = document.getElementById('link-2');
    var link3 = document.getElementById('link-3');

    // Promise.all([
        fetch ("https://app.ticketmaster.com/discovery/v2/events/"+deets1+".json?apikey=emwInIksrqTSCb37BcVP8fFHMhvD4RlB")
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                if(Object.keys(data).indexOf('products') === -1){
                    console.log('there are no products');
                    details1.textContent = data.name + '! Upcoming concert on ' + data.dates.start.localDate;
                }
                else{
                    console.log('data2',data);
                    link1.href = data.url;
                    details1.textContent = data.name + '! Upcoming concert on ' + data.dates.start.localDate + ' at ' + data.products[0].name + '!';
                }

                fetch ("https://app.ticketmaster.com/discovery/v2/events/"+deets2+".json?apikey=emwInIksrqTSCb37BcVP8fFHMhvD4RlB")
                    .then(function(response){
                        return response.json();
                    })
                    .then(function(data){
                        if(Object.keys(data).indexOf('products') === -1){
                            console.log('there are no products');
                            details2.textContent = data.name + '! Upcoming concert on ' + data.dates.start.localDate;
                        }
                        else{
                            console.log('data2',data);
                            link2.href = data.url;
                            details2.textContent = data.name + '! Upcoming concert on ' + data.dates.start.localDate + ' at ' + data.products[0].name + '!';
                        }

                        fetch ("https://app.ticketmaster.com/discovery/v2/events/"+deets3+".json?apikey=emwInIksrqTSCb37BcVP8fFHMhvD4RlB")
                            .then(function(response){
                                return response.json();
                            })
                            .then(function(data){
                                if(Object.keys(data).indexOf('products') === -1){
                                    console.log('there are no products');
                                    details3.textContent = data.name + '! Upcoming concert on ' + data.dates.start.localDate;
                                }
                                else{
                                    console.log('data2',data);
                                    link3.href = data.url;
                                    details3.textContent = data.name + '! Upcoming concert on ' + data.dates.start.localDate + ' at ' + data.products[0].name + '!';
                                }
                            })
                        })
            })
    // ])
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
        console.log(venueNameForTopEvent);
        console.log(topEventLocation);
    })
    .catch(err => console.error('err'))


//The rest of the lines until the btn search are for the carousel
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

// When the search btn is clicked this function is called and calls the getEvents function
btnSearch.addEventListener("click", (e) => {
    var search    = textInput.value.trim();

    e.preventDefault();
	console.log(search)

    if (search !== "") {
        getEvents(search);
    }

})