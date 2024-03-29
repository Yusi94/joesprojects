const contactForm = document.querySelector('#contact-form');
const submitStatus = document.querySelector('.submit-status');

contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const contactPerson = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    fetch("https://formsubmit.co/ajax/youremail@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: contactPerson,
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        submitStatus.textContent = "Your message was sent successfully. We'll get back to you shortly!";
        submitStatus.classList.add('success');
        
        setTimeout(() => {
            submitStatus.textContent = "";
            submitStatus.classList.remove('success');
        }, 4000);
    })
    .catch(error => {
        // console.log(error)
        submitStatus.textContent = "Oops! Something went wrong. Please wait a few seconds and try again.";
        submitStatus.classList.add('error');

        setTimeout(() => {
            submitStatus.textContent = "";
            submitStatus.classList.remove('error');
        }, 4000);
    });
});