document.addEventListener('DOMContentLoaded', function() {
    // --- Hamburger Menu Logic (wrapped in a check) ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.navbar-links');

    if (hamburger && navLinks) { // Only run if hamburger and navLinks exist
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('is-active');
        });
    }

    // --- Subscription Form Logic (wrapped in a check) ---
    const form = document.getElementById('subscription-form');
    const messageDiv = document.getElementById('form-message');

    if (form && messageDiv) { // Only run if the form and message div exist
        // PASTE YOUR GOOGLE APPS SCRIPT URL HERE
        const scriptURL = "https://script.google.com/macros/s/AKfycbxhCkP9SdQ4fnFI49YiWQ8x4phH4Q6BiOAtWIhAnckSsQDNOXyXIewI0C325jv3jUc/exec";

        form.addEventListener('submit', e => {
            e.preventDefault(); // Prevents the default form submission behavior
            messageDiv.textContent = 'Submitting...';

            const formData = new FormData(form);
            const searchParams = new URLSearchParams();
            for (const pair of formData.entries()) {
                searchParams.append(pair[0], pair[1]);
            }

            fetch(scriptURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: searchParams.toString()
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'received') {
                    messageDiv.textContent = '✅ Success! Data sent to test script.';
                    form.reset();
                } else if (data.result === 'success') {
                    messageDiv.textContent = '✅ Success! Thank you for subscribing.';
                    form.reset();
                } else {
                    throw new Error(data.error || 'Unknown error occurred.');
                }
            })
            .catch(error => {
                messageDiv.textContent = `❌ Error: ${error.message}`;
                console.error('Error!', error.message);
            });
        });
    }
});

    // --- NEW CODE FOR ABBR TAG ---
    const abbrElements = document.querySelectorAll('abbr');

    abbrElements.forEach(abbr => {
        // Add a touchstart listener to prevent default browser behavior on tap
        // The { passive: false } option is crucial here to allow preventDefault()
        abbr.addEventListener('touchstart', (event) => {
            // Stop the browser from opening a search window or doing other default actions
            event.preventDefault();

            // Optional: You could add a console log here for debugging if needed:
            // console.log('Abbreviation tapped:', abbr.title);

            // If you later want to implement a custom visual tooltip on tap,
            // this is where you would trigger its display.
            // For now, it just prevents the Google search.

        }, { passive: false }); // IMPORTANT: passive: false is needed for preventDefault() to work on touch events
    });
});