"use strict";

/* Fields, variabels fetched from html doc.  */
const form = document.querySelector(".contact-form");
const messageInput = document.getElementById("message");
const charCounter = document.getElementById("charCounter");
let firstName = document.getElementById("firstName");

/* Event listeners */
messageInput.addEventListener("input", updateCharCounter);  
form.addEventListener("submit", formSubmit);

/* Function for submit button */
function formSubmit(event) {
    event.preventDefault();

    const fields = form.querySelectorAll("input, textarea, select");
    let hasErrors = false;

    fields.forEach(field => {
        const error = field.parentElement.querySelector(".error-message");

        if (field.value.trim() === "")
        {
            showError(field, error, field.dataset.requiredError);
            hasErrors = true;
            return;
        }

        if (!isValidField(field))
        {
            showError(field, error, field.dataset.formatError);
            hasErrors = true;
            return;
        }

        clearError(field, error);
    });

    if (messageInput.value.length < 20){
        hasErrors = true;
    }

    if (!hasErrors){
        form.reset();
        updateCharCounter();
    }
}

function isValidField(field){
    if (field.id === "firstName" || field.id === "lastName") {
        return /^[a-zA-ZåäöÅÄÖ-]+(\s[a-zA-ZåäöÅÄÖ-]+)*$/.test(field.value.trim());
    }

    if (field.type === "email"){
        return field.checkValidity();
    }

    if (field.type === "tel"){
        return /^[0-9+\s-]+$/.test(field.value);
    }

    return true; 
}


function showError(field, errorElement, message){
    errorElement.textContent = message;
    errorElement.style.display = "block";
    field.classList.add("input-error");
    field.classList.remove("input-success");

}

function clearError(field, errorElement){
    errorElement.textContent = "";
    errorElement.style.display = "none";
    field.classList.remove("input-error");
    field.classList.add("input-success");
}
function updateCharCounter(){
    const length = messageInput.value.length;

    charCounter.textContent = `${length} / 20 characters`;

    if (length < 20){
        charCounter.style.color = "red";
        hasErrors = true;
    } else {
        charCounter.style.color = "lightgreen";
    }
}
