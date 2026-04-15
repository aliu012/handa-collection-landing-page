  const form = document.getElementById('contact-form');
  
  form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Stop the page from refreshing
    
    // 1. Basic Validation Check
    const email = form.email.value;
    if (!email.includes('.com') && !email.includes('.ng')) {
      alert("Please use a valid email address (ending in .com or .ng)");
      return;
    }

    // 2. Sending the data
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      alert("Thanks! The designer will get back to you soon.");
      form.reset();
    } else {
      alert("Oops! There was a problem sending your message.");
    }
  });
