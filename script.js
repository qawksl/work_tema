var menuBtn = document.querySelector('.menu-btn');
var nav = document.querySelector('nav');
var lineOne = document.querySelector('nav .menu-btn .line--1');
var lineTwo = document.querySelector('nav .menu-btn .line--2');
var lineThree = document.querySelector('nav .menu-btn .line--3');
var link = document.querySelector('nav .nav-links');
menuBtn.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    lineOne.classList.toggle('line-cross');
    lineTwo.classList.toggle('line-fade-out');
    lineThree.classList.toggle('line-cross');
    link.classList.toggle('fade-in');
})

const axios = require('axios');
async function doPostRequest() {


    let res = await axios.post('http://212.57.137.147:8080/movies');

    let data = res.data;
    console.log(data);
}

doPostRequest();
// axios.post('http://212.57.137.147:8080/movies',
    
//     {
//      "name": "The Matrix",
//      "artemRating": 9.5,
//      "leraRating": 8.8,
//      "photoName": "matrix.jpg"
//     }
// );


