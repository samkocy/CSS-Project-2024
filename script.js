const apiKey = '3OTra5WFEIv6rl-RnxnwwTIuDPJoLWuWuU81eFZSKc0';
const apiHost = 'https://api.unsplash.com';


// function to fetch data from the API
async function fetchRandomPhotos() {

    // url for the api request
    const url = '';


    try {
        // sends GET request
        const response = await fetch(url);

        // converts JSON file to JS object
        const data = await response.json();
    }
    catch (error) {
        // if an error occurs, its caught here
        console.error(error);
    }
}