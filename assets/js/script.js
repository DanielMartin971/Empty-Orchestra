console.log('I belong here');

//Client ID: Mjk5MjEzNTl8MTY2NjY2NTg0MC45NzIwODE
//Secret: e76fe68a4de01f96cc9edc8e764f2b645e9d7c500bb645e1034614c936924f42

fetch('https://api.seatgeek.com/2/events?client_id=Mjk5MjEzNTl8MTY2NjY2NTg0MC45NzIwODE&client_secret=e76fe68a4de01f96cc9edc8e764f2b645e9d7c500bb645e1034614c936924f42')
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(err => console.error(err));

const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links')

burgerIcon.addEventListener('click', () =>{
	navbarMenu.classList.toggle('is-active')
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
	  if (n > slides.length) {slideIndex = 1}
	  if (n < 1) {slideIndex = slides.length}
	  for (i = 0; i < slides.length; i++) {
		  slides[i].style.display = "none";
	  }
	}