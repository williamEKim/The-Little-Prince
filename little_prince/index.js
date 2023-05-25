let stars = document.getElementById('stars');
let B612 = document.getElementById('B612');
let desert_n_b = document.getElementById('d_n_b');
let desert_n_f = document.getElementById('d_n_f');
let airplane = document.getElementById('airplane');

const mediaQuery = window.matchMedia('(min-width: 600px)');

let header = document.querySelector('header')
let header_btns = document.querySelectorAll('.header_btn');
let toQuote_btn = document.querySelector('.quote');


const onScrollDown = () => {
    let distanceScrolled = window.scrollY;
    if(distanceScrolled > 900) return;

    desert_n_b.animate({
        top: distanceScrolled*0.1 + 'px'
    }, {duration: 1200, fill: 'forwards'});
    
    if(mediaQuery.matches) {
        B612.animate({
            top: 50 + distanceScrolled*0.8 + 'px'
        }, {duration: 1200, fill: 'forwards'});
    }   else {
        B612.animate({
            top: 200 + distanceScrolled*0.7 + 'px'
        }, {duration: 1200, fill: 'forwards'});
    }
    

    stars.animate({
        top: distanceScrolled*0.1 + 'px'
    }, {duration: 1200, fill: 'forwards'});


    header.animate({
        transform: `translateY(${distanceScrolled * 0.1}%)`
    }, {duration: 1200, fill: 'forwards'});
}

function onHeaderClick() {
    header_btns.forEach((btn) => btn.classList.remove('active'));
    this.classList.add('active');
}

window.addEventListener('scroll', onScrollDown)
header_btns.forEach((btn) => btn.addEventListener('click', onHeaderClick));

airplane.addEventListener('click', ()=>{
    document.getElementById('intro').scrollIntoView();
});

toQuote_btn.addEventListener('click', ()=>{
    //window.open('./pages/quote.html', '_blank');
    window.location.href='pages/quote.html';
})

B612.addEventListener('click', () => {
    window.open('https://blogs.ubc.ca/edcp508/files/2016/02/TheLittlePrince.pdf', '_blank');
})