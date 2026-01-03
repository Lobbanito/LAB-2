"use strict";

const form = document.querySelector(".contact-form");
const messageInput = document.getElementById("message")
const charCounter = document.getElementById("charCounter")

messageInput.addEventListener("input", updateCharCounter);
form.addEventListener("submit", formSubmit);

function formSubmit(event) {
    event.preventDefault();

    const fields = form.querySelectorAll("input, textarea, select");

    fields.forEach(function (field) {
        const error = field.parentElement.querySelector(".error-message");

        if (field.value.trim() === "") {
            error.textContent = "This field is required";
            error.style.display = "block";
        } else {
            error.textContent = "";
            error.style.display = "none";
        }
    });
}

function updateCharCounter(){
    const length = messageInput.value.length;

    charCounter.textContent = `${length} / 20 characters`;

    if (length < 20){
        charCounter.style.color = "red";
    } else {
        charCounter.style.color = "lightgreen";
    }
}
