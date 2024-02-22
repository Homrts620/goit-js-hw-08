import _throttle from 'lodash.throttle';


const keyStorage = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const inputEmail = form.elements.email;
const inputMessage = form.elements.message;
const submitButton = document.querySelector('button');

const saveFeedbackForm =  JSON.parse(localStorage.getItem(keyStorage));
if(saveFeedbackForm) {
inputEmail.value = saveFeedbackForm.email.trim();
inputMessage.value = saveFeedbackForm.message.trim();
submitButton.disabled = !(inputEmail.value.trim() && inputMessage.value.trim());
}

form.addEventListener('input', _throttle(() => {
localStorage.setItem(keyStorage, JSON.stringify({
email: inputEmail.value,
message: inputMessage.value,
}) 
);
submitButton.disabled = !(inputEmail.value.trim() && inputMessage.value.trim());
}, 500)
);

form.addEventListener('submit', event => {

    event.preventDefault();
    if(inputEmail.value.trim() === '' || inputMessage.value.trim() === '') {
    alert("Please fill in all the fields!");
    return;
}

    console.log({
    email: inputEmail.value,
    message: inputMessage.value,  
});

    form.reset();
    localStorage.removeItem(keyStorage);
    submitButton.disabled = true;
});