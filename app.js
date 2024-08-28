// const blocks = document.querySelector('.section__bottom')
// const genres = document.querySelector('.genres')
// const search = document.querySelector('.search')
// const rating = document.querySelector('.rating')

// fetch('https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=%D0%93%D0%B0%D1%80%D1%80%D0%B8%20%D0%9F%D0%BE%D1%82%D1%82%D0%B5%D1%80',
//     {
//         method: 'GET',
//         headers:{
//             'accept': 'application/json',
//             'X-API-KEY': 'D0P33B2-QGT4Z7E-M4418SE-Z780YE3'
//     } 
// })
// .then(result=> result.json())
// .then(answer=> {
//     console.log(answer.docs)
//     let lol = answer.docs
//     let arr = []
//     lol.forEach(element => {
//         console.log(element);
//         const block = document.createElement('div')
//         blocks.append(block)
//         block.innerHTML += `
//         <img src=${element.poster.previewUrl}>
//         <h2> ${element.name} </h2>
//         <p> ${element.shortDescription} </p>
//         `
//         const mem = element.genres
//         mem.forEach(element =>{
//             const wtf = element.name
//             arr.push(wtf)
//             // genres.innerHTML += `
//             // <option> ${element.name} </option>
//             // `
//         })  
//     })
// })

const blocks = document.querySelector('.section__bottom')
const genres = document.querySelector('.genres')
const search = document.querySelector('.search')
const rating = document.querySelector('.rating')
let arr = []
let arrTwo = []
fetch(`https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=%D0%93%D0%B0%D1%80%D1%80%D0%B8%20%D0%BF%D0%BE%D1%82%D1%82%D0%B5%D1%80`,
    {
        method: 'GET',
        headers:{
            'accept': 'application/json',
            'X-API-KEY': 'C7JWNAN-47PMK0C-M8FH882-FNKPMEA',
        }
    })
.then(result=> result.json())
.then(answer=> {
    const lol = answer.docs
    console.log(lol);
    lol.forEach(element => {
        const block = document.createElement('div')
        blocks.append(block)
        block.innerHTML += `
            <img src=${element.poster.previewUrl}>
            <h2>${element.name}</h2>
            <p>${element.shortDescription}</p>
        `
        const mem = element.genres
        mem.forEach(element =>{
            arr.push(element.name)
        })
        let ggg = Math.floor(element.internalRating)
        arrTwo.push(ggg)
        arrTwo.sort((a, b) => b - a)
    })
    let filter = arrTwo.filter((value, index, self) => {
        return self.indexOf(value) == index
    })
    filter.forEach(element => {
        rating.innerHTML += `
        <option>${element}</option>
        `
    })
    rating.addEventListener('change',(event)=>{
        const toRating = parseInt(event.target.value)
        blocks.innerHTML = ``
        lol.forEach(element=>{
            const filmRating = Math.floor(element.internalRating)
            if (filmRating === toRating){
                const block = document.createElement('div')
                blocks.append(block)
                block.innerHTML += `
                <img src=${element.poster.previewUrl}>
                <h2>${element.name}</h2>
                <p>${element.shortDescription}</p>
                `
            }
        })
    })
    arr = arr.filter((item, index) => arr.indexOf(item) === index)
    arr.forEach(element=> {
        genres.innerHTML += `
        <option>${element}</option>
        `
    })
    genres.addEventListener('change', (event) => {
        const selectedGenre = event.target.value
        blocks.innerHTML = ''
        lol.forEach(element=> {
            if (element.genres.some(item => item.name === selectedGenre)){
                const block = document.createElement('div')
                blocks.append(block)
                block.innerHTML += `
                    <img src=${element.poster.previewUrl}>
                    <h2>${element.name}</h2>
                    <p>${element.shortDescription}</p>
                `
            }
        })
    })
    search.addEventListener('input',(realValue)=>{
    const inputValue = realValue.target.value
    blocks.innerHTML = ''
    lol.forEach(element =>{
        const filmName = element.name
        if(filmName.includes(inputValue)){
            const block = document.createElement('div')
            blocks.append(block)
            block.innerHTML = `
            <img src=${element.poster.previewUrl}>
            <h2> ${element.name} </h2>
            <p> ${element.shortDescription} </p>
            `
        }
    })
    })
})