console.log('TEST');


const API_KEY = 'h03ln8w3DxE8AyR0ORXxOS5JgG5jyCcc';


// randomisen van array - geplukt van stakc overflow
const randomArray = arr => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
}


function createVideo(src) {
  // met createElement() kan je elk HTML-element maken in JS

  const video = document.createElement('video');

  video.src = src;
  video.autoplay = true;
  video.loop = true;
  video.className = 'video animate__animated animate__headShake';
  console.log(video);
  return video;

}


const searchGiphy = searchTerm => {

  console.log('searched for:', searchTerm);

  // via giphy developer site een account gemaakt en de Request URL gekopieerd
  // dit fetch je in JS --> fetch(`URL`) -- let op backticks, niet aanhalingstekens
  // dan maak je er een JSON van --> fetch(`URL`).then(function(){})
  // dan maak je er een JS object van --> fetch(`URL`).then(function(){}).then(function(){});
  // daarna alles in een eigen searchGiphy() function gooien 
  // API_KEY bovenin plaatsen, searchTerm er ook in :) 

  fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=50&offset=0&rating=r&lang=en`
  )
    .then(response => {
      return response.json();
    })
    .then(j => {
      const gif = randomArray(j.data); // randomArry is bovenin gedefinieerd :)
      const src = gif.images.original.mp4;
      console.log(src);

      const video = createVideo(src);

      const videoElement = document.querySelector('.videos');
      // appendChild voegt element <video></video> toe aan het eind van HTML

      videoElement.appendChild(video);


      // er is iets als addEventListener die iets doet na/op een event, in dit geval na het inladen van een video
      // LET OP! .addEventListener op video !
      // hier krijgt het een class, om in CSS te animeren

      video.addEventListener = ('loadeddata', event => {

        toggleLoading(false);
        document.body.classList.add('has-results');
        document.body.classList.add('visible');
        showWhatSearch.innerHTML = (`Smash enter for more '${searchTerm}'`);

      });


      // zelf proberen om na 5 searches, de eerst te verwijderen --> lukt niet
      // const videoArray = [];
      // videoArray.push(video);
      // console.log(videoArray);

      // const videoStart = 1;
      // const videoCounter = videoStart + 1;
      // console.log(videoCounter);

      // if (videoCounter < 5) {
      //   videoElement.appendChild(video);
      //   toggleLoading(false);
      // } else {
      //   videoElement.removeChild(video);
      // };

    });

  // searchGiphy.catch((error) => {
  //   console.log(error);
  // });

};


// 1. als je zoekt, laat spinner zien met class op body
// 2. verander de tekst naar "Hit enter to see more '${searchTerm}'"
// 3. bij fail, meldt het (bij error boven)

// er moet hiervoor een loading state komen!
// hier moet tussen togglen, dus er moet een class op worden gezet en af gehaald
// die state is een boolean, wordt gestopt in een functie

const toggleLoading = state => {

  // if (true === state) hoeft niet hier, if(state) zou moeten volstaan
  // werkt bij mij alleen niet !?
  if (state) {
    document.body.classList.add("loading");
  } else {
    document.body.classList.remove("loading");
  };

}



// SEARCH 

// const searchInput2 = document.getElementsByClassName('.search-input');
const searchInput = document.querySelector('.search-input');


// event is een speciaal ding waar je heel veel info, soort snapshot is het - ook welke toets er dus is gedrukt!
const doSearch = event => {


  const searchTerm = searchInput.value;
  // console.log(event);

  const showWhatSearch = document.querySelector('.search-hint');

  // hier een functie waabij een search wordt gedaan met meer dan 2 characters en na het drukken van Enter
  if (searchTerm.length > 2 && event.key === "Enter") {

    searchGiphy(searchTerm);
    toggleLoading(true);

  }

  // toevoegen van een class op heel body!
  if (searchTerm.length > 2) {

    document.body.classList.add("show-hint");

    // toevoegen van searchTerm aan HTML!
    // const showWhatSearch = document.querySelector('.search-hint');
    showWhatSearch.innerHTML = (`Hit enter to search '${searchTerm}'`);

  } else {
    document.body.classList.remove("show-hint");

    // verwijderen van HTML zit al in de class

  }


};


//  keyup event is op toetsenbord drukken? wat is keydown dan?
// je kan function los doen
searchInput.addEventListener('keyup', doSearch);
