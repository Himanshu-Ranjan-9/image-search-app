const accessKey= `8pesNBh_44YAwMtPJnhUxAJv5s_u-v6faW-2VJJMwkA`;
const form=document.querySelector("form")
const input = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = ""
let page = 1;
 
 async function searchImage (){
    inputData = input.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`


    const response = await fetch(url);
    const data = await response.json();

    const results = data.results
    if(page===1){
        searchResults.innerHTML=""
    }
    results.map((result)=>{
        const div=document.createElement('div')
        div.classList.add("search-result")
        const image = document.createElement("img")
        image.src=result.urls.small
        image.alt=result.alt_description
        const imageLink = document.createElement("a")
        imageLink.href=result.links.html
        imageLink.target="_blank"
        imageLink.textContent=result.alt_description

        div.appendChild(image)
        div.appendChild(imageLink)
        searchResults.appendChild(div)
    });
    page++;
    if (page>1) {
        showMore.style.display="block"
        
    }

}
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    page =1
    searchImage()
})
showMore.addEventListener("click",()=>{
    searchImage();
})