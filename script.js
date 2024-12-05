const apiKey = 'UWpGsSnrfPqCD9YYsimK-EbuAnaylawGJdgua973kbw';
const apiHost = 'https://api.unsplash.com';
const photosContainer = document.getElementById('random-photos');
const showPhotosButton = document.getElementById('photosButton');
// full url - https://api.unsplash.com/photos/random?client_id=o5vx23ExgOHEE1BN0sIrEiQ-6Gdfn-zTmUbzDZsKI2c


// function to filter photos by category
function selectedCategory() {
    const selectedRadio = document.querySelector('input[name="category"]:checked');
    return selectedRadio ? selectedRadio.value : null;
}


// function to fetch photos from the API
async function fetchRandomPhotos(category, count) {
    // checks if there is category selected a number of photos entered
    if (!category || !count) {
        return [];
    }

    // url for the api photos request
    const url = `${apiHost}/photos/random?query=${category}&client_id=${apiKey}&count=${count}`;

    try {
        // sends GET request
        const response = await fetch(url);

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
    photosContainer.innerHTML = '';

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

showPhotosButton.addEventListener('click', async () => {
    const category = selectedCategory();
    const photoCount = parseInt(document.getElementById('photoCount').value)

    if (!category || isNaN(photoCount) || photoCount < 1 || photoCount > 30) {
        alert('Please select category and enter a number between 1 and 30');
        return;
    }

    const photos = await fetchRandomPhotos(category, photoCount);
    renderPhotos(photos);
});