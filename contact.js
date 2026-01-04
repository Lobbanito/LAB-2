/* Code written by Elias Robyne 2026-01-04 */

//Enables strict mode. 
"use strict";

// DOM elements or fields.
const form = document.querySelector(".contact-form");
const messageInput = document.getElementById("message");
const charCounter = document.getElementById("charCounter");
const popup = document.getElementById("successPopup");
const popupText = document.getElementById("popupText");
const overlay = document.getElementById("overlay");
const clearBtn = document.querySelector('button[type="reset"]');

// Event listeners
messageInput.addEventListener("input", updateCharCounter);  
form.addEventListener("submit", formSubmit);

form.addEventListener("reset", () => {
    const fields = form.querySelectorAll("input, textarea, select");

    fields.forEach(field => {
        const error = field.parentElement.querySelector(".error-message");

        // Remove error messages.
        if (error) {
            error.textContent = "";
            error.style.display = "none";
        }

        // Remove validation border styles.
        field.classList.remove("input-error");
        field.classList.remove("input-success");
    });

    // RAF awaits the values to reset and then calls updateCharCounter.
    requestAnimationFrame(updateCharCounter);
});


// Function for form validation and submission. 
function formSubmit(event) {
    event.preventDefault();

    const fields = form.querySelectorAll("input, textarea, select");
    let hasErrors = false;

    fields.forEach(field => {
        const error = field.parentElement.querySelector(".error-message");


        // If the field is empty.
        if (field.value.trim() === "")
        {
            showError(field, error, field.dataset.requiredError);
            hasErrors = true;
            return;
        }

        // If the text in the field is invalid
        if (!isValidField(field))
        {
            showError(field, error, field.dataset.formatError);
            hasErrors = true;
            return;
        }

        // Field is valid, success. 
        clearError(field, error);
    });

    
    //Checks message length.
    if (messageInput.value.length < 20){
        hasErrors = true;
    }

    //Everything is filled as intended, success popup is shown and the form is reset. 
    if (!hasErrors){
        showSuccessPopup();
        form.reset();
        updateCharCounter();

        fields.forEach(field => {
            field.classList.remove("input-success");
        })
    }
}

// Regex and build in functions to control that the fields are filled as intended. 
// Task was to build a function for each field. This seems like a better solution. 
function isValidField(field){

    // Only characters, no special chars or numbers, "-" is allowed.  
    if (field.id === "firstName" || field.id === "lastName") {
        return /^[a-zA-ZåäöÅÄÖ-]+(\s[a-zA-ZåäöÅÄÖ-]+)*$/.test(field.value.trim());
    }
    // Email is in right format, built in function checkValidity used. 
    if (field.type === "email"){
        return field.checkValidity();
    }
    // Only numbers, space, "+" and "-" in tel. 
    if (field.type === "tel"){
        return /^[0-9+\s-]+$/.test(field.value);
    }

    // Message must be more than 20 characters.  
    if (field.id === "message"){
        return field.value.trim().length >= 20;
    }

    // Checks that a subject is chosen. 
    if (field.tagName === "SELECT") {
        return field.value !== "";
    }

    return true; 
}


// Function for invalid fields, UI.
function showError(field, errorElement, message){
    errorElement.textContent = message;
    errorElement.style.display = "block";
    field.classList.add("input-error");
    field.classList.remove("input-success");

}

// Function for valid fields, UI.
function clearError(field, errorElement){
    errorElement.textContent = "";
    errorElement.style.display = "none";
    field.classList.remove("input-error");
    field.classList.add("input-success");
}

// Updates live char counter and color while typing
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

// Function for success popup, the code is already in html and css, it's just hidden. Here we show it. 
function showSuccessPopup(){
    const firstName = document.getElementById("firstName").value;

    popupText.innerHTML = `Thank you <strong>${firstName}</strong> for reaching out to us, we will be in touch as soon as possible`;
    popup.classList.remove("hidden");
    overlay.classList.remove("hidden");

    //No scroll while popup is active. 
    document.body.classList.add("no-scroll");

    //Popup closes after 3 seconds. 
    setTimeout(closePopup, 3000)
}

// Event listener on char "Escape", user have an option to close popup with escape. ARIA standard.  
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !popup.classList.contains("hidden")) {
        closePopup();
    }
});

//Reusable fucntion to close the popup window (DRY). 
function closePopup() {
    popup.classList.add("hidden");
    overlay.classList.add("hidden");

    document.body.classList.remove("no-scroll");
}