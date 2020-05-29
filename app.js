let q = 'spaceX astronauts'

axios.get(`https://images-api.nasa.gov/search?q=${q}&media_type=image`).then((res) => {
    let article = 1
    let imgLink = res.data.collection.items[article].links[0].href
    let description = res.data.collection.items[article].data[0].description;
    let title = res.data.collection.items[article].data[0].title;
    const spaceX = document.querySelector('#spacex');
    let img = document.createElement('img')
    let h3 =document.createElement('h4')
    let p =document.createElement('p')
    spaceX.appendChild(img)
    spaceX.appendChild(h3)
    spaceX.appendChild(p)
    img.setAttribute('src', imgLink)
    h3.innerText=title;
    p.innerText=description
})

// data.collection.items