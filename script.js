const apiKey = '3OTra5WFEIv6rl-RnxnwwTIuDPJoLWuWuU81eFZSKc0';
const apiHost = 'https://api.unsplash.com';
const photosContainer = document.getElementById("random-photos")

// full url - https://api.unsplash.com/photos/random?client_id=3OTra5WFEIv6rl-RnxnwwTIuDPJoLWuWuU81eFZSKc0


// function to fetch data from the API
async function fetchRandomPhotos() {

    // url for the api request
    const url = `${apiHost}/photos/random?client_id=${apiKey}&count=5`;

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
        const photoElement = document.createElement('div');

        photoElement.innerHTML = `
            <img src = "${photo.urls.small}" alt="${photo.alt_description}">
        `;

        photosContainer.appendChild(photoElement);
    });
}
fetchRandomPhotos();