const cards = document.querySelectorAll('.card');

const contents = document.querySelectorAll('.quote-line');
const img_boxes = document.querySelectorAll('.imgBx');
const pages = document.querySelectorAll('.page-num');
const from_to = document.querySelectorAll('.from-to');

const buttons = document.querySelectorAll('.card-buttons')
const copy_texts = document.querySelectorAll('.copy-text');
const copy_cites = document.querySelectorAll('.copy-citation');

async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
}

async function main() {
    //for search access
    const quote_list = await fetchData('../data/little_prince_quotes.json');
    const citation = await fetchData('../data/citation.json');
    //for index access
    const quotes = Object.values(quote_list);
    // const date = new Date();
    let randomIndex;
    let lastIndex = [];
    function uniqueRandIndex(){
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * 11);
        } while (lastIndex.includes(randomIndex)); // repeat until a unique random number is generated
        if (lastIndex.length >= 3) {
            lastIndex.shift(); // remove the oldest random number from the array
        }
        return randomIndex;
    }

    contents[0].innerHTML = quotes[0]["line"];

    for(let i = 0; i < 3; ++i) {
        randomIndex = uniqueRandIndex();
        lastIndex.push(randomIndex);

        contents[i].innerHTML = '\"' + quotes[randomIndex]['line'] + '\"';
        pages[i].innerHTML = 'Page: ' + quotes[randomIndex]['page'];
        from_to[i].innerHTML = 'from ' + quotes[randomIndex]['from'] + ' to ' + quotes[randomIndex]['to'];
        img_boxes[i].style.backgroundImage = `url(${quotes[randomIndex]['img']})`;
    }

    for(let i = 0; i < 3; ++i) {
        cards[i].setAttribute('tabindex', `${i + 1}`);
        cards[i].setAttribute('aria-expanded', 'true');
        cards[i].addEventListener('keypress', function(evt){
            if(evt.key === 'Enter') {
                // Check if the event was triggered by a child element
                if (evt.target !== this) {
                    return;
                }
                if(this.classList.contains('active')) {
                    this.classList.remove('active');
                }   else {
                    this.classList.add('active');
                }
            }
        })

        cards[i].addEventListener('click', function(evt){
            if(evt.target !== copy_texts[i] && evt.target !== copy_cites[i]) {
                if(this.classList.contains('active')) {
                    this.classList.remove('active');
                }   else{
                    this.classList.add('active');
                }
            }
        });

        copy_texts[i].setAttribute('tabindex', `${i + 1}`);
        copy_texts[i].addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(function() {
                copy_texts[i].classList.remove('clicked')
            }, 1000);
            navigator.clipboard.writeText(contents[i].innerHTML + ' (Saint Exupéry ' + pages[i].innerHTML.replace('Page: ', '') + ')');
        });
        copy_texts[i].addEventListener('keypress', function(evt) {
            if(evt.key === 'Enter'){
                evt.preventDefault();
                this.classList.add('clicked');
                setTimeout(function() {
                    copy_texts[i].classList.remove('clicked')
                }, 1000);
                navigator.clipboard.writeText(contents[i].innerHTML);
            }
        });

        copy_cites[i].setAttribute('tabindex', `${i + 1}`);
        copy_cites[i].addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(function() {
                console.log('did')
                copy_cites[i].classList.remove('clicked')
            }, 1000);
            navigator.clipboard.writeText(citation['mla']);
        });
        copy_cites[i].addEventListener('keypress', function(evt) {
            if(evt.key === 'Enter'){
                evt.preventDefault();
                this.classList.add('clicked');
                setTimeout(function() {
                    copy_cites[i].classList.remove('clicked')
                }, 1000);
                navigator.clipboard.writeText(citation['mla']);
            }
        });
    }
}
  
main();
cards.forEach((card) => card.setAttribute('tabindex', '1'));