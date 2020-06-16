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
                (function randomArticle() {
                    const randArt = Math.floor(Math.random() * 80) + 1;
                    resDat = res.data.collection.items[randArt];
                })();
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

            (function addDateTOCard() {
                let date;
                let divDate;
                (function getDate() {
                    return date = resDat.data[0].date_created.slice(0, 10);
                })();

                (function makeDivAppend() {
                    divDate = document.createElement('div');
                    card.prepend(divDate);
                    (function addClass() {
                        divDate.classList.add('cardDate');
                    })();
                })();
                (function feedCardDate() {
                    divDate.innerText = date;
                })()
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

(function bootstrapSectionPageLayout() {
    for (let item = 0; item < 5; item++) {
        bootstrapRow('spacex');
    }
})();


(function navbarActive() {
    const AllLi = document.querySelectorAll('.nav-item');
    for (let li of AllLi) {
        li.addEventListener('click', function () {
            for (let li of AllLi) {
                li.classList.remove('active');
            }
            this.classList.add('active');
        })
    }
})();

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
})();

(function displayMain() {
    const AllLi = document.querySelectorAll('.nav-item');
    const allMain = document.querySelectorAll('main');

    (function displayAllNone() {
        for (let li of AllLi) {
            li.addEventListener('click', (e) => {
                for (let main of allMain) {
                    main.style.display = 'none';
                }
            })
        }
    })();

    function clearDynamicMain(select) {
        document.querySelector(`#dynamicMain${select}`).innerHTML = '';
    }

    function mainTriggerDisplay(button, main, func, q, w, e, r, t) {
        AllLi[button].addEventListener('click', (event) => {
            for (let i = 1; i < 4; i++) {
                clearDynamicMain(i);
            }
            allMain[main].style.display = '';
            (func) ? func(q, w, e, r, t): null;
        })
    }
    mainTriggerDisplay(0, 4);
    mainTriggerDisplay(1, 3, createApod);
    mainTriggerDisplay(2, 2, createDynamicMain, 2, 'Earth from Space', 'earth', 18, -1);
    mainTriggerDisplay(3, 1, createDynamicMain, 3, 'Moon Pictures', 'moon', 18, 45);
})()

function createApod() {
    const main = document.querySelector('#dynamicMain1');
    const mainDiv = document.createElement('div');
    const apodDate = document.createElement('div');
    const header = document.createElement('div');
    const titleDiv = document.createElement('div');
    const titleText = document.createElement('h5')
    const descDiv = document.createElement('div');
    const imgEl = document.createElement('img');
    (function appendElements() {
        main.appendChild(mainDiv);
        titleDiv.append(titleText)
        titleDiv.append(apodDate)
        for (let item of [header, titleDiv, descDiv, imgEl]) {
            mainDiv.appendChild(item);
        }
        console.log(titleDiv);
        console.log(apodDate);
    })();

    (function setAttributes() {
        titleDiv.setAttribute('id', 'apodTitle');
        descDiv.setAttribute('id', 'apodDec');
        main.classList.remove('main');
        titleDiv.classList.add('apodText');
        descDiv.classList.add('apodText');
        header.classList.add('mainHeader');
        apodDate.setAttribute('id', 'apodDate');
    })();

    (function feedApodFromApi() {
        axios.get('https://api.nasa.gov/planetary/apod?&api_key=jAhBUnKhCqNuSoZjheFlI67NM72CDiv2gAM7F0ji&').then((res) => {
            header.innerText = 'Astronomy Picture of the Day';
            (function checkLinkForJPG() {
                const imageLinkExtension = res.data.url.slice(-4, -1)
                if (imageLinkExtension === '.jp') {
                    (function setTodaysApod() {
                        descDiv.innerText = res.data.explanation;
                        titleText.innerText = res.data.title;
                        imgEl.setAttribute('src', res.data.url);
                        apodDate.innerText = res.data.date;
                    })()

                } else {
                    (function fallBackToMillenniumApod() {
                        (function applyBiggerWidthForDate() {
                            apodDate.classList.add('biggerDate')
                        })();
                        axios.get('https://api.nasa.gov/planetary/apod?date=2000-01-01&api_key=jAhBUnKhCqNuSoZjheFlI67NM72CDiv2gAM7F0ji&').then((res) => {
                            (function feedMillenniumApod() {
                                apodDate.innerText = `Back in time to: ${res.data.date}`;
                                descDiv.innerText = res.data.explanation;
                                titleText.innerText = res.data.title;
                                imgEl.setAttribute('src', res.data.url);
                            })()
                        })
                    })()
                }
            })()
        })
    })();
}

function createDynamicMain(targetMain, headerText, apiQuery = 'nasa', iFrom, iTo = -1) {
    const main = document.querySelector(`#dynamicMain${targetMain}`);
    const header = document.createElement('div');
    main.appendChild(header)
    header.classList.add('mainHeader');
    (apiQuery === 'nasa') ? header.innerText = 'Search for: Nasa': header.innerText = headerText;
    axios.get(`https://images-api.nasa.gov/search?keywords=${apiQuery}&media_type=image`).then((res) => {
        const resDat = res.data.collection.items;
        for (let item of resDat.slice(iFrom, iTo)) {
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

(function searchForm() {
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
        createDynamicMain(4, `Search for: ${formValue.toUpperCase()}`, formValue, 0, -1)
    })
})();

(function footerCurrentYear() {
    let year;
    (function getYear() {
        year = new Date().getFullYear()
    })();
    (function appendYearToFooter() {
        const footer = document.querySelector('footer');
        const footerDiv = document.createElement('div')
        footerDiv.setAttribute('id', 'year');
        footer.prepend(footerDiv)
    })();
    (function feedYear() {
        document.querySelector('#year').innerText = year;
    })();
})();