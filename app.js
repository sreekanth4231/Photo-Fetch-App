// https://api.pexels.com/v1/curated?per_page=15&page=1
// https://api.pexels.com/v1/search?query=cat+query&per_page=15&page=1

// eCiIKRqA0XLD9ykCTiJ6laTnxeFTQB0mZLRv9AAIjSAU4UkEuI2lwQQV


const auth = "eCiIKRqA0XLD9ykCTiJ6laTnxeFTQB0mZLRv9AAIjSAU4UkEuI2lwQQV"
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitBtn = document.querySelector(".submit-button");
const form = document.querySelector(".search-form")
const more = document.querySelector(".more")
let searchValue;
let fetchLink;
let page = 1

searchInput.addEventListener("input",updateInput);
more.addEventListener("click",loadMore);

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    searchPhotos(searchValue)
})

function updateInput(e){
    searchValue = e.target.value;
}

async function fetchApi(url){
    try{
        const dataFetch = await fetch(url,
        {
            method:"GET",
            headers:{
                accept:"Application/json",
                authorization: auth,
            }
        });
    
        const data = await dataFetch.json();
        return data
    }
    catch(err){
        console.log(err)
    }
}

function generatePicture(data){
    data.photos.forEach(photo => {
        console.log(photo)
        const galleryImg = document.createElement("div")
        galleryImg.classList.add("gallery-img")
        galleryImg.innerHTML= `
        <img src="${photo.src.original}"></img>
        <div class="gallery-info">
            <p>${photo.photographer}</p>
            <a target=_blank href=${photo.src.original}>Download</a>
        </div>`
        gallery.appendChild(galleryImg)
    });
}

async function curatedPhotos(){
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1"
    const data = await fetchApi(fetchLink)
    generatePicture(data);
}

async function searchPhotos(query){
    clear()
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`
    const data = await fetchApi(fetchLink) 
    generatePicture(data);
}

async function loadMore(){
    page++
    if(searchValue){
        fetchLink = `https://api.pexels.com/v1/search?query=${searchValue}+query&per_page=15&${page}`
    }
    else{
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&${page}`
    }

    const data = await fetchApi(fetchLink);
    generatePicture(data)
}

function clear(){
    gallery.innerHTML = ""
    searchInput.value = ""
}

curatedPhotos();





