const form = document.getElementById('subscription-form');
const messageDiv = document.getElementById('form-message');
        
    // PASTE YOUR GOOGLE APPS SCRIPT URL HERE
    const scriptURL = "https://script.google.com/macros/s/AKfycbxhCkP9SdQ4fnFI49YiWQ8x4phH4Q6BiOAtWIhAnckSsQDNOXyXIewI0C325jv3jUc/exec";

form.addEventListener('submit', e => {
    e.preventDefault(); // Prevents the default form submission behavior
    messageDiv.textContent = 'Submitting...';

    // Convert FormData to URLSearchParams
    const formData = new FormData(form);
    const searchParams = new URLSearchParams();
    for (const pair of formData.entries()) {
        searchParams.append(pair[0], pair[1]);
    }

    fetch(scriptURL, {
        method: 'POST',
        // Explicitly set the Content-Type header
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // Send the data as a URL-encoded string
        body: searchParams.toString()
    })
    .then(response => response.json())
    .then(data => {
        // Check for 'status' from the minimal test script
        if (data.status === 'received') {
            messageDiv.textContent = '✅ Success! Data sent to test script.';
            form.reset(); // Clear the form fields
        }
        // Add a fallback check for the original script's success result
        else if (data.result === 'success') {
            messageDiv.textContent = '✅ Success! Thank you for subscribing.';
            form.reset();
        }
        else {
            throw new Error(data.error || 'Unknown error occurred.');
        }
    })
    .catch(error => {
        messageDiv.textContent = `❌ Error: ${error.message}`;
        console.error('Error!', error.message);
    });
});