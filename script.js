// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Example of an event listener for a button click on the homepage
    const exploreButton = document.getElementById('explore-button');
    if (exploreButton) {
        exploreButton.addEventListener('click', () => {
            window.location.href = 'destinations.html';
        });
    }

    // Function to update the homepage content dynamically
    function updateHomepageContent() {
        const welcomeMessage = document.getElementById('welcome-message');
        if (welcomeMessage) {
            welcomeMessage.textContent = 'Welcome to Your Travel Adventure!';
        }
    }

    updateHomepageContent();
});