function createArticle(query,article,elemntId,big){
    axios.get(`https://images-api.nasa.gov/search?q=${query}&media_type=image`).then((res) => {
        let imgLink = res.data.collection.items[article].links[0].href
        let description = res.data.collection.items[article].data[0].description;
        let title = res.data.collection.items[article].data[0].title;
        const trump = document.querySelector(`#${elemntId}`)
        let img = document.createElement('img')
        let h4 = document.createElement('h4')
        let p = document.createElement('p')
        trump.appendChild(img)
        trump.appendChild(h4)
        trump.appendChild(p)
        img.setAttribute('src', imgLink)
        img.setAttribute('class', 'round')
        img.setAttribute('class', 'imgArticle')
        h4.setAttribute('class', 'h4Article')
        p.setAttribute('class', 'pArticle')
        h4.innerText = title;
        if(!big){
            p.innerText = description
        }else{
            img.setAttribute('class','big')
        h4.setAttribute('class', 'bigTitle')
            
            p.innerText = '';
            
        }
        
     })
}


//createarticle
//serach for
//index of array in result object 
//div id

createArticle('Trump',14,'trump', false)
createArticle('SpaceX astronauts',1,'spacex',false)
createArticle('sun',2,'sun',true)
createArticle('Earth',6,'epic',false)
createArticle('Moon ',53,'moon',false)
