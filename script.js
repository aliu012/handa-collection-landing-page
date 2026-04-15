  const form = document.getElementById('contact-form');
  
  form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Stop page reload

    // 1. Collect the data from the form
    const formData = new FormData(form);
    
    // 2. CONVERT TO JSON (This fixes the Formspree error)
    const data = Object.fromEntries(formData.entries());

    // 3. Send the data
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Tell Formspree it is JSON
          'Accept': 'application/json'
        },
        body: JSON.stringify(data) // Turn the object into a JSON string
      });

      if (response.ok) {
        alert("Success! The designer has received your message.");
        form.reset();
      } else {
        const errorData = await response.json();
        alert("Submission failed: " + (errorData.error || "Unknown error"));
      }
    } catch (error) {
      alert("Network error. Please check your internet connection.");
    }
  });
