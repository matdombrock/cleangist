console.log('Hello from index.js');

// Get all anchor links
const sections = document.querySelectorAll('a');

// Loop through each section and add a click event listener
// Scroll up after visiting anchor link
// XXX - Kinda bad code
sections.forEach(section => {
    section.addEventListener('click', function (e) {
        // Scroll to the target section with the offset
        setTimeout(() => {
            window.scrollTo({
                top: window.scrollY - 200,
                behavior: 'smooth'
            });
        }, 1);
    });
});