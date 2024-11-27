const apiKey = '3OTra5WFEIv6rl-RnxnwwTIuDPJoLWuWuU81eFZSKc0';
const apiHost = 'https://api.unsplash.com';
const photosContainer = document.getElementById("random-photos")

// full url - https://api.unsplash.com/photos/random?client_id=3OTra5WFEIv6rl-RnxnwwTIuDPJoLWuWuU81eFZSKc0


// function to fetch data from the API
async function fetchRandomPhotos() {

    // url for the api request
    const url = `${apiHost}/photos/random?client_id=${apiKey}&count=30`;

    try {
        // sends GET request
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error fetching random photos`);
        }

        // converts JSON file to JS object
        const photos = await response.json();
        renderPhotos(photos);
    } catch (error) {
        // if an error occurs, its caught here
        console.error('Error occured: ', error);
    }
}


// function to render JSON data
function renderPhotos(photos) {
    photos.forEach(photo => {

        // creating new elements
        const photoElement = document.createElement('div');
        const image = document.createElement('img');

        image.src = photo.urls.small;
        image.alt = photo.alt_description;

        // new classes
        image.classList.add("img-fluid");
        photoElement.classList.add("col-12", "col-sm-6", "col-md-4", "col-xl-4", "mb-3", "photo-container");

        // appending elements
        photoElement.appendChild(image);
        photosContainer.appendChild(photoElement);
    });
}
fetchRandomPhotos();