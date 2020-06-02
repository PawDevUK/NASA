function bootstrapRow(query) {
    axios.get(`https://images-api.nasa.gov/search?q=${query}&media_type=image`).then((res) => {
        const element = document.querySelector(`article`)
        let row = document.createElement('div')
        row.setAttribute('class', 'row')
        element.appendChild(row)

        let cardArticle = function (width) {
            let art = Math.floor(Math.random() * 80) + 1;
            const resDat = res.data.collection.items[art];

            let title = resDat.data[0].title;
            let imgLink = resDat.links[0].href


            let card = document.createElement('div')
            let cardBody = document.createElement('div')
            let img = document.createElement('img')
            let h5 = document.createElement('h5')

            row.appendChild(card)
            card.appendChild(img)
            card.appendChild(cardBody)
            cardBody.appendChild(h5)
            card.setAttribute('class', 'card')
            card.setAttribute('data-toggle', 'modal')
            card.setAttribute('data-target', '#staticBackdrop')


            const modalBody = document.querySelector('#modalBody')
            const modalTitle = document.querySelector('#staticBackdropLabel')

            card.addEventListener('click', () => {
                function clearDescFromLinks() {
                    let str = resDat.data[0].description;
                    if (!str.includes('<') && !str.includes('http')) {
                        modalBody.innerText = resDat.data[0].description;
                    } else if (str.includes('<')) {
                        modalBody.innerText = str.slice(0, str.indexOf('<'));
                    } else if (str.includes('http')) {
                        modalBody.innerText = str.slice(0, str.indexOf('http'));
                    }
                }
                clearDescFromLinks()
                modalTitle.innerText = title
                let modalImg = document.createElement('img')
                modalBody.appendChild(modalImg)
                modalImg.setAttribute('src', imgLink)
                modalImg.setAttribute('id', 'modalImg')

            })

            card.classList.add(`col-${width}`)
            card.classList.add(`mx-auto`)
            row.classList.add(`p-2`)
            img.setAttribute('src', imgLink)
            img.setAttribute('class', 'card-img-top')
            cardBody.setAttribute('class', 'card-body')
            h5.innerText = title;

        }

        let rowLayoutThree = [
            [3, 5, 3],
            [5, 3, 3],
            [3, 3, 5],
            [3, 4, 4],
            [3, 4, 4],
            [4, 3, 4],
            [4, 4, 3],
        ]

        const rowLayoutTwo = [
            [6, 5],
            [5, 6],
            [8, 3],
            [3, 8],
        ]
        const randThree = Math.floor(Math.random() * 6) + 1

        const randTwo = Math.floor(Math.random() * 3) + 1;
        const ran = Math.random() >= 0.5
        if (ran) {
            cardArticle(rowLayoutThree[randThree][0])
            cardArticle(rowLayoutThree[randThree][1])
            cardArticle(rowLayoutThree[randThree][2])
        } else {
            cardArticle(rowLayoutTwo[randTwo][0])
            cardArticle(rowLayoutTwo[randTwo][1])
        }

    })
}
bootstrapRow('SpaceX')
bootstrapRow('Dragon')
bootstrapRow('Earth')
bootstrapRow('Moon')
bootstrapRow('Sun')
bootstrapRow('2020')
bootstrapRow('Astronauts')

function navbarActive() {
    const AllLi = document.querySelectorAll('.nav-item')
    for (let li of AllLi) {
        li.addEventListener('click', function () {
            for (let li of AllLi) {
                li.classList.remove('active')
            }
            this.classList.add('active')
        })
    }
}

function createMain() {
    const AllLi = document.querySelectorAll('#navbarSupportedContent .nav-item')
    const container = document.querySelector('.container')
    for (let i = 1; i < AllLi.length; i++) {
        const main = document.createElement('main')
        main.setAttribute('id', `dynamicMain${i}`)
        container.insertBefore(main, container.childNodes[3])
    }
}
createMain()

function displayMain() {
    const AllLi = document.querySelectorAll('.nav-item')
    const allMain = document.querySelectorAll('main')

    function displayNone() {
        for (let li of AllLi) {
            li.addEventListener('click', (e) => {
                for (let main of allMain) {
                    main.style.display = 'none'
                }

            })
        }
    }
    displayNone()

    function mainTriggerDisplay(button, main) {
        AllLi[button].addEventListener('click', (e) => {
            allMain[main].style.display = ''
            clearMain('dynamicMain1')
            createMainPict()
        })
    }
    mainTriggerDisplay(0, 3)
    mainTriggerDisplay(1, 2)
    mainTriggerDisplay(2, 1)
    mainTriggerDisplay(3, 0)
}
displayMain()
navbarActive()

function createMainPict() {
    const main = document.querySelector('#dynamicMain1');
    const mainDiv = document.createElement('div');
    const header = document.createElement('div');
    const titleDiv = document.createElement('div');
    const descDiv = document.createElement('div');
    const imgEl = document.createElement('img');
    main.appendChild(mainDiv)
    mainDiv.appendChild(header)
    mainDiv.appendChild(titleDiv)
    mainDiv.appendChild(descDiv)
    mainDiv.appendChild(imgEl)
    header.setAttribute('id', 'apodHeader')
    titleDiv.setAttribute('id', 'apodTitle')
    descDiv.setAttribute('id', 'apodDec')
    titleDiv.classList.add('apodText')
    descDiv.classList.add('apodText')
    header.innerText = 'Astronomy Picture of the Day'
    axios.get('https://api.nasa.gov/planetary/apod?api_key=jAhBUnKhCqNuSoZjheFlI67NM72CDiv2gAM7F0ji&').then((res) => {
        const img = res.data.url;
        const date = res.data.date;
        const title = res.data.title;
        const expl = res.data.explanation;
        descDiv.innerText = expl;
        titleDiv.innerText = title;
        console.log(img);
        console.log(title);
        console.log(expl);
        console.log(date);
        console.log(res);
        imgEl.setAttribute('src', img);
    })
}

function clearMain(select) {
    document.querySelector(`#${select}`).innerHTML = ''
}

function createMainEarth() {
    const main = document.querySelector('#dynamicMain2');
    const header = document.createElement('div');
    main.appendChild(header)
    header.setAttribute('id', 'earthHeader')

   

    header.innerText = 'Earth from Space'
    axios.get('https://images-api.nasa.gov/search?keywords=earth&media_type=image').then((res) => {
        const resDat = res.data.collection.items;
        for (let item of resDat.slice(18,-1)) {
          
            const imgDiv = document.createElement('div');
            const titleDiv = document.createElement('div');
            const imgEl = document.createElement('img');
           
            imgDiv.appendChild(titleDiv)
            imgDiv.appendChild(imgEl)

            titleDiv.classList.add('earthText')
            imgEl.classList.add('earthImg')
            imgDiv.classList.add('earthWrapper')

            imgEl.setAttribute('src',item.links[0].href)
          
            titleDiv.innerText = item.data[0].title
            main.appendChild(imgDiv)
        }

    })

}
createMainEarth()

function createMainMoon() {
    const main = document.querySelector('#dynamicMain3');
    const header = document.createElement('div');
    main.appendChild(header)
    header.setAttribute('id', 'earthHeader')

   

    header.innerText = 'Moon Pictures'
    axios.get('https://images-api.nasa.gov/search?keywords=moon&media_type=image').then((res) => {
        const resDat = res.data.collection.items;
        let num = 0;

        for (let item of resDat.slice(18,45)) {
            num +=1;
            const imgDiv = document.createElement('div');
            const titleDiv = document.createElement('div');
            const imgEl = document.createElement('img');
           
            imgDiv.appendChild(titleDiv)
            imgDiv.appendChild(imgEl)

            titleDiv.classList.add('earthText')
            imgEl.classList.add('earthImg')
            imgDiv.classList.add('earthWrapper')

            imgEl.setAttribute('src',item.links[0].href)
            imgDiv.setAttribute('id', num);
            titleDiv.innerText = item.data[0].title

            main.appendChild(imgDiv)
        }

    })

}
createMainMoon()