console.log('I belong here');

//Client ID: Mjk5MjEzNTl8MTY2NjY2NTg0MC45NzIwODE
//Secret: e76fe68a4de01f96cc9edc8e764f2b645e9d7c500bb645e1034614c936924f42

fetch('https://api.seatgeek.com/2/events?client_id=Mjk5MjEzNTl8MTY2NjY2NTg0MC45NzIwODE&client_secret=e76fe68a4de01f96cc9edc8e764f2b645e9d7c500bb645e1034614c936924f42')
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));