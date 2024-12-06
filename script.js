const apiKey = 'o5vx23ExgOHEE1BN0sIrEiQ-6Gdfn-zTmUbzDZsKI2c'; // o5vx23ExgOHEE1BN0sIrEiQ-6Gdfn-zTmUbzDZsKI2c
const apiHost = 'https://api.unsplash.com';
const photosContainer = document.getElementById('random-photos');
const showPhotosButton = document.getElementById('photosButton');
// full url - https://api.unsplash.com/photos/random?client_id=o5vx23ExgOHEE1BN0sIrEiQ-6Gdfn-zTmUbzDZsKI2c


// function to filter photos by category
function selectedCategory() {
    const selectedRadio = document.querySelector('input[name="category"]:checked'); // checks which radio button is selected
    return selectedRadio ? selectedRadio.value : null; // shorten if else statement, if button is selected, returns it value, if not, returns null
}


// function to fetch photos from the API
async function fetchRandomPhotos(category, count) {
    // checks if there is category selected a number of photos entered
    if (!category || !count) {
        return null; // if it's empty, function will not continue
    }

    // url for the api photos request
    const url = `${apiHost}/photos/random?query=${category}&client_id=${apiKey}&count=${count}`;

    try {
        // sends GET request
        const response = await fetch(url);

        // if there is a problem with response from the server, error message will be displayed
        if (!response.ok) {
            throw new Error(`Error fetching random photos`);
        }
        
        return await response.json();
    } catch (error) {
        // if an error occurs, its caught here
        console.error('Error occured while fetching the photos: ', error);
        return null;
    }
}


// function to fetch user details from the API
async function fetchUserInfo(username) {

    // url for the api user info request
    const url = `${apiHost}/users/${username}?client_id=${apiKey}`;

    try {
        // sends GET request
        const response = await fetch(url);

        // if there is a problem with response from the server, error message will be displayed
        if (!response.ok) {
            throw new Error (`Error fetching user details`);
        }

        return await response.json();
    } catch (error) {
        // if an error occurs, its caught here
        console.error('Error occured while fetching the users: ', error)
        return null;
    }
}


// function to render JSON data
function renderPhotos(photos) {
    photosContainer.innerHTML = ''; // clears photos

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
                        <p class="card-text">Photographer: ${userInfo.name}</p>
                        <p class="card-text">Followers Count: ${userInfo.followers_count}</p>
                    </div>
                `;

                // appending elements
                photosContainer.appendChild(photoElement);
            }
        });
    });
}

// adding event listener, 
showPhotosButton.addEventListener('click', async () => {

    // getting user input
    const category = selectedCategory();
    const photoCount = parseInt(document.getElementById('photoCount').value); // converting photo count into integer

    if (!category || isNaN(photoCount) || photoCount < 1 || photoCount > 30) {
        alert('Please select category and enter a number between 1 and 30'); // if something is empty or photo count is not 1-30, error message will be displayed
        return;
    }

    const photos = await fetchRandomPhotos(category, photoCount);
    renderPhotos(photos);
});