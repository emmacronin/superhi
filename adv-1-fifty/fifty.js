function makeMarquee() {

    const title = 'FIFTY Music Festival — November 10–12, Desert Valley'

    // nieuwe lege lijst maken, vullen met tekst en samenvoegen met dash 

    const marqueeText = new Array(50).fill(title).join(' — ')

    // met jQuery is het " $('datgene dat je wilt pakken') " en in vanilla Js is het " document.querySelector('datgene dat je wilt pakken') "

    const marquee = document.querySelector('.marquee span')

    // met jQuery is het vullen van HTML met " $('div').html('') " en in vanilla Js is het " div.innerHTML ='' "

    marquee.innerHTML = marqueeText

}

makeMarquee()


// een function van Stack Overflow voor het generen van een willekeurig getal

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// console.log(random(1, 500))

// pak alle .circles uit HTML

const circles = document.querySelectorAll('.circle')

// je krijgt een array, daar moet je doorheen loopen
// je kan een index toevoegen aan de function om iedere cirkel los aan te kunnen spreken, zo kan je delay per cirkel toevoegen

// function kan je HERSCHRIJVEN naar =>

circles.forEach((pulsate, index) => {

    // hier krijg je toegang tot elke 'circle'
    // console.log(circle) --> geef elke "<span class="shape circle"></span>"
    // animatie op elke circle

    // proberen om waarde van scale ook random te krijgen, ' + newScale + '
    const newScale = random(2, 8)

    pulsate.animate([
        // keyframes
        { transform: 'scale(1)' },
        { transform: 'scale(' + newScale + ')' },
        { transform: 'scale(1)' }
    ], {
        // timing opties
        delay: random(100, 300) * index,
        duration: 3000,
        iterations: Infinity
    })
})

const squiggles = document.querySelectorAll('.squiggle')

// const top = document.querySelector('.intro')

squiggles.forEach(function (squiggle, index) {

    const newRotate = random(10, 90)
    const newScale2 = random(0.2, 1.3)

    squiggle.animate([
        { transform: 'rotate(-10deg)' },
        { transform: 'scale(0.4)' },
        // { transform: 'rotate(' + newRotate + 'deg)' },
        // { transform: 'scale(' + newScale2 + ')' },
        // ' + newRotate + 'deg --> KAN JE HERSCHRIJVEN naar ${newRotate}deg, maar let wel op de speciale aanhalingsteksten `` (niet '')
        { transform: `rotate(${newRotate}deg)` },
        { transform: `scale(${newScale2})` },
        { transform: 'rotate(-10deg)' }
        // { transform: 'scale(0.7)' }
    ], {
        delay: random(1, 500) * index,
        duration: 4000,
        iterations: Infinity
    })

})

// dit is om elementen te animeren wanner ze in viewport komen
// hier wordt een script gebruikt van GitHub van Cam Wiegert (https://unpkg.com/in-view@0.6.1/dist/in-view.min.js), die is ingeladen in het index.html onderaan
// dit voegt een class toe wanneer een element in viewport is (in-viewport)

// inView('.someSelector')
//     .on('enter', doSomehting)
//     .on('exit', el => {
//         el.styler.opacity = 0.5;
// });

// .classList.add is vanilla Js versie van jQuery's .addClass() methode

inView('.section')

    .on('enter', sectionView => {
        sectionView.classList.add('in-viewport')
    })

    .on('exit', sectionView => {
        sectionView.classList.remove('in-viewport')
    })

inView.threshold(0.5)

// om de el's in een section apart van elkaar te animeren moeten we ze apart van elkaar aanspreken
// om er vervolgens een transition-delay aan toe te voegen

// eerst alle sections
const sections = document.querySelectorAll('.section')

sections.forEach((section, index) => {

    const artists = section.querySelectorAll('.lineup li')
    const shapes = section.querySelectorAll('.shape')

    // console.log(artists, shapes)

    artists.forEach((artist, index) => {

        const newDelayArtist = index * 200

        // .style is toevoegen aan CSS!
        artist.style.transitionDelay = `${newDelayArtist}ms`

    })

    shapes.forEach((shape, index) => {

        const newDelayShape = (artists.length + index) * 50

        shape.style.transitionDelay = `${newDelayShape}ms`
    })
})

// smooth scrolling in Js !
// 1. elke keer als je <a> klikt, doe deze functie => // in jQuery is dat $(naam).on('click', function(){})
// 2. niet standaard behaviour, maar 'smooth' scrolling
// 3. pak 'href'
// 4. scroll er naar met document.quertSelector('.day-3').scrollIntoView({behavior: 'smooth'})

const scrollLinks = document.querySelectorAll('.js-scroll')

console.log(scrollLinks)

scrollLinks.forEach(poep => {

    // poep.addEventListener('click', function () {
    //     console.log('hello')
    // })

    poep.addEventListener('click', (event) => {
        // event is een snapshot met belachelijk veel data, waar je hebt geklikt, hoe ver gescrolld, etc.
        console.log(event)

        // return false in jQuery, blokkeert standaard gedrag van browser
        // gebeurt nu niets bij het klikken op de link, die wordt vervangen
        event.preventDefault()

        // attribute pakken in jQury is $(naam).attr('href')
        // vanilla Js is naam.getAttribute('href')
        const href2 = poep.getAttribute('href')
        // console.log(href2)

        document.querySelector(href2).scrollIntoView({
            behavior: 'smooth'
        })
    })

})