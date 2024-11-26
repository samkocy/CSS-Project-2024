const apiKey = '3OTra5WFEIv6rl-RnxnwwTIuDPJoLWuWuU81eFZSKc0';
const apiHost = 'https://api.unsplash.com';
const photosContainer = document.getElementById(random-photos)


// function to fetch data from the API
async function fetchRandomPhotos() {

    // url for the api request
    const url = `${apiHost}/photos/random?client_id=${apiKey}`;

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
        console.error(error);
    }
}


function renderPhotos(photos) {
    photos.forEach(photo => {
        const photoElement = document.createElement('div');

        photoElement.innerHTML = `
            <img src = 
        `;

        photosContainer.appendChild(photoElement);
    });
}
fetchRandomPhotos();