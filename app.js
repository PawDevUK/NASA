function bootstrapRow(query, article) {
    axios.get(`https://images-api.nasa.gov/search?q=${query}&media_type=image`).then((res) => {
        console.log(res)
       
        const element = document.querySelector(`article`)
        let row = document.createElement('div')
        row.setAttribute('class', 'row')
        element.appendChild(row)

        let cardArticle = function (width) {
            let art = Math.floor(Math.random() * 25) + 1;
            const resDat = res.data.collection.items[art]
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
            card.classList.add('class', `col-${width}`)
            card.classList.add('class', `mx-auto`)
            row.classList.add('class', `p-2`)
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
            [3, 4, 3],
            [4, 3, 3],
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
        // console.log(randTwo);
        // console.log(randThree);
        // console.log('three');
        // console.log(rowLayoutThree[randThree][0]);
        // console.log(rowLayoutThree[randThree][1]);
        // console.log(rowLayoutThree[randThree][2]);
        // console.log('two');
        // console.log(rowLayoutTwo[randTwo][0]);
        // console.log(rowLayoutTwo[randTwo][1]);

        const ran = Math.random() >= 0.5
        if (ran) {
            cardArticle(rowLayoutThree[randThree][0])
            cardArticle(rowLayoutThree[randThree][1])
            cardArticle(rowLayoutThree[randThree][2])
        } else {
            cardArticle(6)
            cardArticle(5)
        }

    })
}

bootstrapRow('Trump')
bootstrapRow('SpaceX' )
bootstrapRow('Dragon' )
bootstrapRow('Moon' )
bootstrapRow('Sun' )

// TODO adjust card body 