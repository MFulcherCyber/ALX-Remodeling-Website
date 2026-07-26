console.log("ALX Remodeling website loaded.");

const currentYearElement = document.querySelector("#current-year");

if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Contact form elements
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const messageField = document.querySelector("#message");
const characterCount = document.querySelector("#character-count");

/**
 * Updates the project-details character counter.
 */
function updateCharacterCount() {
    if (!messageField || !characterCount) {
        return;
    }

    const currentLength = messageField.value.length;
    const maximumLength = messageField.maxLength;

    characterCount.textContent =
        `${currentLength} / ${maximumLength} characters`;
}

// Run the counter when the contact page loads.
updateCharacterCount();

// Update the counter whenever the customer types.
if (messageField) {
    messageField.addEventListener("input", updateCharacterCount);
}

// Process a valid contact-form submission.
if (contactForm && formStatus) {
    contactForm.addEventListener("submit", function (event) {
        // Prevent the browser from reloading or navigating away.
        event.preventDefault();

        // Read the values from the form.
        const formData = new FormData(contactForm);
        const fullName = String(
            formData.get("fullName") || ""
        ).trim();

        const greeting = fullName
            ? `Thank you, ${fullName}.`
            : "Thank you.";

        // Use textContent rather than innerHTML for safer output.
        formStatus.textContent =
            `${greeting} Your information passed validation. ` +
            "This demonstration form has not sent or saved the request.";

        formStatus.className = "form-status success";

        // Clear the completed form.
        contactForm.reset();
        updateCharacterCount();
    });
}