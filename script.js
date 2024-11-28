const apiKey = '3OTra5WFEIv6rl-RnxnwwTIuDPJoLWuWuU81eFZSKc0';
const apiHost = 'https://api.unsplash.com';
const photosContainer = document.getElementById("random-photos")
// full url - https://api.unsplash.com/photos/random?client_id=3OTra5WFEIv6rl-RnxnwwTIuDPJoLWuWuU81eFZSKc0


// function to fetch photos from the API
async function fetchRandomPhotos() {

    // url for the api photos request
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
        console.error('Error occured while fetching the photos: ', error);
    }
}


// function to fetch user details from the API
async function fetchUserInfo(username) {

    // url for the api user info request
    const url = `${apiHost}/users/${username}?client_id=${apiKey}`;

    try {
        // sends GET request
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error (`Error fetching user details`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error occured while fetching the users: ', error)
        return null;
    }
}


// function to render JSON data
function renderPhotos(photos) {
    photos.forEach(photo => {
        fetchUserInfo(photo.user.username).then(userInfo => {
            if (userInfo) {
                // creating new elements
                const photoElement = document.createElement('div');
                photoElement.classList.add("col-sm-6", "col-lg-4", "col-xxl-3", "mb-5");

                // inner HTML, inline styling used to create same size images
                photoElement.innerHTML = `
                    <div class="card h-100">
                        <img src="${photo.urls.small}" alt="${photo.alt_description}" class="card-img-top img-fluid" style="object-fit: cover; height: 300px; width: 100%;">
                    <div class="card-body">
                        <p class="card-text">Likes: ${photo.likes}</p>
                        <p class="card-text">Photographer: ${userInfo.name}</p
                        <p class="card-text">Photographer: ${userInfo.followers_count}</p
                    </div>
                `;

                // appending elements
                photosContainer.appendChild(photoElement);
            }
        });
    });
}
fetchRandomPhotos();