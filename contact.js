"use strict";

/* Fields/elements.  */
const form = document.querySelector(".contact-form");
const messageInput = document.getElementById("message");
const charCounter = document.getElementById("charCounter");
const popup = document.getElementById("successPopup");
const popupText = document.getElementById("popupText");
const overlay = document.getElementById("overlay");
const clearBtn = document.querySelector('button[type="reset"]');

/* Event listeners */
messageInput.addEventListener("input", updateCharCounter);  
form.addEventListener("submit", formSubmit);

clearBtn.addEventListener("click", () => {
    updateCharCounter();
})

/* Function for submit button */
function formSubmit(event) {
    event.preventDefault();

    const fields = form.querySelectorAll("input, textarea, select");
    let hasErrors = false;

    fields.forEach(field => {
        const error = field.parentElement.querySelector(".error-message");


        /* If the field is empty. */
        if (field.value.trim() === "")
        {
            showError(field, error, field.dataset.requiredError);
            hasErrors = true;
            return;
        }

        /* If the text in the field is invalid */
        if (!isValidField(field))
        {
            showError(field, error, field.dataset.formatError);
            hasErrors = true;
            return;
        }

        /* No wrong input, show success */
        clearError(field, error);
    });

    
    if (messageInput.value.length < 20){
        hasErrors = true;
    }

    if (!hasErrors){
        showSuccessPopup();
        form.reset();
        updateCharCounter();

        fields.forEach(field => {
            field.classList.remove("input-success");
        })
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

    if (field.id === "message"){
        return field.value.trim().length >= 20;
    }

    if (field.tagName === "SELECT") {
        return field.value !== "";
    }

    return true; 
}


/* Function for when an field is in error */ 
function showError(field, errorElement, message){
    errorElement.textContent = message;
    errorElement.style.display = "block";
    field.classList.add("input-error");
    field.classList.remove("input-success");

}

/* Function for when a field is right */
function clearError(field, errorElement){
    errorElement.textContent = "";
    errorElement.style.display = "none";
    field.classList.remove("input-error");
    field.classList.add("input-success");
}

/* Updates char counter while typing */
function updateCharCounter(){
    const length = messageInput.value.length;
    charCounter.textContent = `${length} / 20 characters`;
    if (length === 0){
        charCounter.style.color = "#999";
    } else if (length < 20){
        charCounter.style.color = "red";
    } else {
        charCounter.style.color = "lightgreen";
    }
}

function showSuccessPopup(){
    const firstName = document.getElementById("firstName").value;

    popupText.innerHTML = `Thank you <strong>${firstName}</strong> for reaching out to us, we will be in touch as soon as possible`;
    popup.classList.remove("hidden");
    overlay.classList.remove("hidden");

    document.body.classList.add("no-scroll");


    setTimeout(closePopup, 3000)
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !popup.classList.contains("hidden")) {
        closePopup();
    }
});

function closePopup() {
    popup.classList.add("hidden");
    overlay.classList.add("hidden");

    document.body.classList.remove("no-scroll");
}