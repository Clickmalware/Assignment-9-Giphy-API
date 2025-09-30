console.log("script.js loaded");
const endpoint = "https://api.giphy.com/v1/gifs/search?api_key=lyvaNLvsQ4qxw1fLbpHyZE78P1ulmtZi&q=dog&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips";
let images = []; // Declare images in outer scope

//Fetch Gifs: Using either async/await or .then, utilize the fetch method to get all the original image URLs from that are returned by the API call. Store the data in an array called images. Run the code and use console.log() to preview the data in your browsers console.
async function fetchGifs() {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    images = data.data.map(gif => gif.images.original.url); // Store original image URLs in the images array
    console.log(images); // Log the array of image URLs to the console
  } catch (error) {
    console.error("Error fetching GIFs:", error);
  }
}
// Call the function to fetch GIFs
fetchGifs(); 

//Display a Random Gif: Add an event listener to the button so that when it is clicked, a random image from the images array is displayed on the page. You can use Math.random() to select a random index from the array.
const fetchGifButton = document.getElementById("fetch-gif-btn");
const gifContainer = document.getElementById("gif-container");

fetchGifButton.addEventListener("click", function() {
  if (images.length === 0) {
    console.log("No images available. Please try again later.");
    return;
  }
  
  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImageUrl = images[randomIndex];
  
  // Clear previous GIFs
  gifContainer.innerHTML = '';
  
  // Create an img element and set its src to the random image URL
  const img = document.createElement("img");
  img.src = randomImageUrl;
  img.alt = "Random GIF";
  img.classList.add("img-fluid", "mb-3"); // Add Bootstrap classes for responsiveness and margin
  
  // Append the img element to the gifContainer
  gifContainer.appendChild(img);
});

fetchGifButton.addEventListener("click", async function() {
  // Fetch GIF data from the endpoint
  const response = await fetch(endpoint);
  const data = await response.json();
  const images = data.data.map(gif => gif.images.original.url);
  console.log(images);

  // Clear previous GIFs
  gifContainer.innerHTML = '';

  // Iterate through the images array and append each image using DOM manipulation
  for (let i = 0; i < images.length; i++) {
    const imageUrl = images[i];
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "GIF Image";
    img.classList.add("col-3", "mb-3"); // Bootstrap grid and margin
    gifContainer.appendChild(img);
  }
});
