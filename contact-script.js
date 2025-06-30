// **IMPORTANT: Replace this with the Web app URL you copied in Step 5**
const scriptURL = "https://script.google.com/macros/s/AKfycbzcCUzEvbc4OTJoHVB4ozUHgeF90sADWtfopigYQZBm8OQKJ86cdFrvrLP3v_X0OEA2/exec";

// Get a reference to your HTML form (you'll add an ID to your form in contact.html)
const form = document.getElementById('contact-form');

// Get a reference to a div where you want to display messages (you'll add an ID to this div)
const messageDiv = document.getElementById('contact-message');

form.addEventListener('submit', e => {
    e.preventDefault(); // Prevents the default form submission behavior
    messageDiv.textContent = 'Submitting your message...'; // Display a submitting message

    // Create FormData object from the form
    const formData = new FormData(form);
    // Convert FormData to URLSearchParams (this worked for your subscription form)
    const searchParams = new URLSearchParams();
    for (const pair of formData.entries()) {
        searchParams.append(pair[0], pair[1]);
    }

    // Send the data using fetch API
    fetch(scriptURL, {
        method: 'POST',
        // Explicitly set the Content-Type header as URL-encoded
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // Send the data as a URL-encoded string
        body: searchParams.toString()
    })
    .then(response => response.json()) // Parse the JSON response from Apps Script
    .then(data => {
        if (data.result === 'success') { // Check for the 'result' property from Apps Script
            messageDiv.textContent = '✅ Success! Your message has been sent.';
            form.reset(); // Clear the form fields after successful submission
        } else {
            // Display error message from Apps Script or a generic one
            throw new Error(data.error || 'Unknown error occurred.');
        }
    })
    .catch(error => {
        // Catch and display any network or other errors
        messageDiv.textContent = `❌ Error: ${error.message}`;
        console.error('Error!', error.message);
    });
});