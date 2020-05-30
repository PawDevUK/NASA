function createArticle(query, article, elemntId, big) {
    axios.get(`https://images-api.nasa.gov/search?q=${query}&media_type=image`).then((res) => {
        let imgLink = res.data.collection.items[article].links[0].href
        let description = res.data.collection.items[article].data[0].description;
        let title = res.data.collection.items[article].data[0].title;
        const element = document.querySelector(`#${elemntId}`)
        let img = document.createElement('img')
        let h4 = document.createElement('h4')
        let p = document.createElement('p')
        element.appendChild(img)
        element.appendChild(h4)
        element.appendChild(p)
        img.setAttribute('src', imgLink)
        // img.setAttribute('class', 'round')
        img.setAttribute('class', 'imgArticle')
        h4.setAttribute('class', 'h4Article')
        p.setAttribute('class', 'pArticle')
        h4.innerText = title;
        if (!big) {
            p.innerText = description
        } else {
            img.setAttribute('class', 'big')
            h4.setAttribute('class', 'bigTitle')
            p.innerText = '';
        }

    })
}


//createarticle
//serach for
//index of array in result object 
//div id

createArticle('Trump 2020', 1, 'trump', false) //14
createArticle('SpaceX astronauts', 1, 'spacex', false)
createArticle('sun', 2, 'sun', true)
createArticle('Earth', 13, 'epic', false)
createArticle('Moon', 20, 'moon', false)
createArticle('Moon', 22, 'moon2', false)
createArticle('Jupiter', 26, 'jupiter', false)
createArticle('Mars', 08, 'mars', true)
