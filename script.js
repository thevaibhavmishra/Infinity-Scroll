let count = 5;
const apiKey = 'JueJToCc665RRpbglBG-CIUzWxBU0hPVYQdhBfX77Cc'; // access key
// const apiKey = 'tgJ9jvkPtbBHwbBlRI9fHdQvji6E2KDw27FwmOaLAPY' //  secret key

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttributes(element, attributes) {
    for ( const key in attributes ){
        element.setAttribute(key, attributes[key]);
    }
}

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30; 
    }
}

function displayPhotos(){
    totalImages = totalImages + photosArray.length;
    photosArray.forEach((photo)=>{
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        
        // ADD Event listener to check if image is loaded

        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

    } catch(e) {

    }
}

// add event listener

window.addEventListener('scroll', ()=>{

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready ) {
        ready = false;
        getPhotos();
    }

})

getPhotos();

