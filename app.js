function bootstrapRow(query) {
    axios.get(`https://images-api.nasa.gov/search?q=${query}&media_type=image`).then((res) => {
        let row = (function makeRowAppend() {
            const element = document.querySelector(`article`)
            const row = document.createElement('div')
            row.setAttribute('class', 'row')
            row.classList.add('cardRow')
            element.appendChild(row)
            return row
        })();

        function makeCardAppend(width, res) {
            let resDat;
            let title;
            let img;
            let h5;
            let card;
            let imgLink;
            let cardBody;
            (function getData(res) {
                let randArt;
                (function randomArticle() {
                    randArt = Math.floor(Math.random() * 80) + 1;
                })();
                resDat = res.data.collection.items[randArt];
                title = resDat.data[0].title;
                imgLink = resDat.links[0].href;
            })(res);

            (function makeCard() {
                card = document.createElement('div');
                cardBody = document.createElement('div');
                img = document.createElement('img');
                h5 = document.createElement('h5');
            })();
            (function setCardAttribute() {
                card.setAttribute('class', 'card')
                card.classList.add(`col-${width}`)
                card.classList.add(`mx-auto`)
                row.classList.add(`p-2`)
                img.setAttribute('src', imgLink)
                img.setAttribute('class', 'card-img-top')
                cardBody.setAttribute('class', 'card-body')
                h5.innerText = title;
                (function addModalAttributes() {
                    card.setAttribute('data-toggle', 'modal')
                    card.setAttribute('data-target', '#staticBackdrop')
                })();
            })();

            (function appendCard() {
                row.appendChild(card)
                card.appendChild(img)
                card.appendChild(cardBody)
                cardBody.appendChild(h5)
            })();

            (function modal() {
                const modalImg = document.createElement('img');
                const modalBody = document.querySelector('#modalBody');
                const modalTitle = document.querySelector('#staticBackdropLabel');

                card.addEventListener('click',
                    function clearModalDescFromLinks() {
                        let str = resDat.data[0].description;
                        if (!str.includes('<') && !str.includes('http')) {
                            modalBody.innerText = resDat.data[0].description;
                        } else if (str.includes('<')) {
                            modalBody.innerText = str.slice(0, str.indexOf('<'));
                        } else if (str.includes('http')) {
                            modalBody.innerText = str.slice(0, str.indexOf('http'));
                        }
                    }
                );
                card.addEventListener('click', function feedAppendModal() {
                    modalTitle.innerText = title;
                    modalBody.appendChild(modalImg);
                    modalImg.setAttribute('src', imgLink);
                    modalImg.setAttribute('id', 'modalImg');
                })
            })()
        };

        (function generateRandRowLayout() {
            let rowLayoutThree = [
                [3, 5, 3],
                [5, 3, 3],
                [3, 3, 5],
                [3, 4, 4],
                [3, 4, 4],
                [4, 3, 4],
                [4, 4, 3],
            ];
            const rowLayoutTwo = [
                [6, 5],
                [5, 6],
                [8, 3],
                [3, 8],
            ];
            const randThree = Math.floor(Math.random() * 6) + 1;
            const randTwo = Math.floor(Math.random() * 3) + 1;
            const ran = Math.random() >= 0.5;
            if (ran) {
                makeCardAppend(rowLayoutThree[randThree][0], res);
                makeCardAppend(rowLayoutThree[randThree][1], res);
                makeCardAppend(rowLayoutThree[randThree][2], res);
            } else {
                makeCardAppend(rowLayoutTwo[randTwo][0], res);
                makeCardAppend(rowLayoutTwo[randTwo][1], res);
            }
        })();

    })
}

(function bootstrapRowsPageLayout() {
    for (let item of ['SpaceX', 'Dragon', 'Earth', 'Moon', 'Sun', '2020', 'Astronauts']) {
        bootstrapRow(item);
    }
})()











function navbarActive() {
    const AllLi = document.querySelectorAll('.nav-item');
    for (let li of AllLi) {
        li.addEventListener('click', function () {
            for (let li of AllLi) {
                li.classList.remove('active');
            }
            this.classList.add('active');
        })
    }
}

(function createMain() {
    const AllLi = document.querySelectorAll('#navbarSupportedContent .nav-item');
    const container = document.querySelector('.container');
    for (let i = 1; i < AllLi.length + 1; i++) {
        const main = document.createElement('main');
        main.setAttribute('id', `dynamicMain${i}`);
        main.classList.add('main');
        main.classList.add('display');
        container.insertBefore(main, container.childNodes[3]);
    }

})()


function displayMain() {
    const AllLi = document.querySelectorAll('.nav-item');
    const allMain = document.querySelectorAll('main');

    function displayNone() {
        for (let li of AllLi) {
            li.addEventListener('click', (e) => {
                for (let main of allMain) {
                    main.style.display = 'none';
                }
            })
        }
    }
    displayNone();

    function clearMain(select) {
        document.querySelector(`#${select}`).innerHTML = '';
    }

    function mainTriggerDisplay(button, main, func) {
        AllLi[button].addEventListener('click', (e) => {
            allMain[main].style.display = '';
            clearMain('dynamicMain1');
            clearMain('dynamicMain2');
            clearMain('dynamicMain3');
            clearMain('dynamicMain4');
            (func) ? func(): null;
        })
    }
    mainTriggerDisplay(0, 4);
    mainTriggerDisplay(1, 3, createMainPict);
    mainTriggerDisplay(2, 2, createMainEarth);
    mainTriggerDisplay(3, 1, createMainMoon);
}
displayMain();
navbarActive();

function createMainPict() {
    const main = document.querySelector('#dynamicMain1');
    const mainDiv = document.createElement('div');
    const header = document.createElement('div');
    const titleDiv = document.createElement('div');
    const descDiv = document.createElement('div');
    const imgEl = document.createElement('img');
    main.appendChild(mainDiv);
    mainDiv.appendChild(header);
    mainDiv.appendChild(titleDiv);
    mainDiv.appendChild(descDiv);
    mainDiv.appendChild(imgEl);
    titleDiv.setAttribute('id', 'apodTitle');
    descDiv.setAttribute('id', 'apodDec');
    main.classList.remove('main');
    titleDiv.classList.add('apodText');
    descDiv.classList.add('apodText');
    header.classList.add('mainHeader');
    header.innerText = 'Astronomy Picture of the Day';
    axios.get('https://api.nasa.gov/planetary/apod?api_key=jAhBUnKhCqNuSoZjheFlI67NM72CDiv2gAM7F0ji&').then((res) => {
        const img = res.data.url;
        const date = res.data.date;
        const title = res.data.title;
        const expl = res.data.explanation;
        descDiv.innerText = expl;
        titleDiv.innerText = title;
        imgEl.setAttribute('src', img);
    })
}

function createMainEarth() {
    const main = document.querySelector('#dynamicMain2');
    const header = document.createElement('div');
    main.appendChild(header)
    header.classList.add('mainHeader')
    header.innerText = 'Earth from Space'
    axios.get('https://images-api.nasa.gov/search?keywords=earth&media_type=image').then((res) => {
        const resDat = res.data.collection.items;
        for (let item of resDat.slice(18, -1)) {
            const imgDiv = document.createElement('div');
            const titleDiv = document.createElement('div');
            const imgEl = document.createElement('img');
            imgDiv.appendChild(titleDiv)
            imgDiv.appendChild(imgEl)
            titleDiv.classList.add('Text')
            imgEl.classList.add('Img')
            imgDiv.classList.add('Wrapper')
            imgEl.setAttribute('src', item.links[0].href)
            titleDiv.innerText = item.data[0].title
            main.appendChild(imgDiv)
        }
    })
}

function createMainMoon() {
    const main = document.querySelector('#dynamicMain3');
    const header = document.createElement('div');
    main.appendChild(header)
    header.classList.add('mainHeader')
    header.innerText = 'Moon Pictures'
    axios.get('https://images-api.nasa.gov/search?keywords=moon&media_type=image').then((res) => {
        const resDat = res.data.collection.items;
        let num = 0;
        for (let item of resDat.slice(18, 45)) {
            num += 1;
            const imgDiv = document.createElement('div');
            const titleDiv = document.createElement('div');
            const imgEl = document.createElement('img');
            imgDiv.appendChild(titleDiv)
            imgDiv.appendChild(imgEl)
            titleDiv.classList.add('Text')
            imgEl.classList.add('Img')
            imgDiv.classList.add('Wrapper')
            imgEl.setAttribute('src', item.links[0].href)
            imgDiv.setAttribute('id', num);
            titleDiv.innerText = item.data[0].title
            main.appendChild(imgDiv)
        }

    })

}


function search(formValue = 'nasa') {
    const main = document.querySelector('#dynamicMain4')
    const header = document.createElement('div');
    main.appendChild(header);
    header.classList.add('mainHeader')
    header.innerText = 'Search';
    axios.get(`https://images-api.nasa.gov/search?q=${formValue}&media_type=image`).then((res) => {
        const resDat = res.data.collection.items;
        header.innerText = 'Search';
        for (let item of resDat) {
            const imgDiv = document.createElement('div');
            const titleDiv = document.createElement('div');
            const imgEl = document.createElement('img');
            imgDiv.appendChild(titleDiv)
            imgDiv.appendChild(imgEl)
            titleDiv.classList.add('Text')
            imgEl.classList.add('Img')
            imgDiv.classList.add('Wrapper')
            imgEl.setAttribute('src', item.links[0].href)
            titleDiv.innerText = item.data[0].title
            main.appendChild(imgDiv)
        }
    })
}

let formValue;
const formImp = document.querySelector('form input')
const searchBtn = document.querySelector('#searchBtn')
formImp.addEventListener('input', (e) => {
    formValue = e.target.value;
})

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const main = document.querySelector('#dynamicMain4')
    const allMain = document.querySelectorAll('.display')
    document.querySelectorAll('main')[4].style.display = 'none';
    for (let el of allMain) {
        el.style.display = 'none';
        el.innerHTML = ''
    };
    allMain
    main.style.display = '';
    const AllLi = document.querySelectorAll('.nav-item')
    for (let el of AllLi) {

        el.classList.remove('active')
    }
    search(formValue);
})