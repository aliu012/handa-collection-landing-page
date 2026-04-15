  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const spinner = document.getElementById('spinner');
  const modal = document.getElementById('custom-modal');
  const overlay = document.getElementById('modal-overlay');
  const modalMsg = document.getElementById('modal-message');
  const okBtn = document.getElementById('modal-ok-btn');
    
  form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Stop page reload

    // Show loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    spinner.classList.remove('hidden');

    function showModal(message) {
  modalMsg.textContent = message;
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

// Function to close the modal
okBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
});

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
        showModal("Success! The designer has received your message.");
        form.reset();
      } else {
        const errorData = await response.json();
        showModal("Submission failed: " + errorData.error);
      }
    } catch (error) {
      showModal("Network error. Please check your internet connection.");
    } finally {
      // Hide loading state
      submitBtn.disabled = false;
      btnText.textContent = 'Send Message';
      spinner.classList.add('hidden');
    }
  });
