function bootstrapRow(query) {
    axios.get(`https://images-api.nasa.gov/search?q=${query}&media_type=image`).then((res) => {
        const element = document.querySelector(`article`)
        let row = document.createElement('div')
        row.setAttribute('class', 'row')
        element.appendChild(row)
        
        let cardArticle = function (width) {
            let art = Math.floor(Math.random() * 40) + 1;
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
            const staticBackdrop = document.querySelector('#staticBackdrop')

            card.addEventListener('click',()=>{
                modalBody.innerText = resDat.data[0].description;
                modalTitle.innerText = title
                let modalImg = document.createElement('img')
                modalBody.appendChild(modalImg)
                modalImg.setAttribute('src',imgLink)
                modalImg.setAttribute('id','modalImg')
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

const AllLi = document.querySelectorAll('.nav-item')
for(let li of AllLi){
    li.addEventListener('click',function(){
        for(let li of AllLi ){
            li.classList.remove('active')
        }
        this.classList.add('active')
    })
}


const spacex = AllLi[0]
const main = document.querySelector('main')
main.style.display = 'none'
spacex.addEventListener('click', ()=>{
if()
})