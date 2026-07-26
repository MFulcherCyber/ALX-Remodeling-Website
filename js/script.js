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

// Rough remodeling estimate calculator
const estimateForm = document.querySelector("#estimate-form");
const estimateResult = document.querySelector("#estimate-result");
const estimateRange = document.querySelector("#estimate-range");
const estimateBreakdown = document.querySelector(
    "#estimate-breakdown"
);

// Demonstration pricing only.
// Replace these values with verified ALX pricing later.
const projectRates = {
    kitchen: {
        label: "Kitchen remodeling",
        lowRate: 140,
        highRate: 260,
        minimumLow: 12000,
        minimumHigh: 22000
    },

    bathroom: {
        label: "Bathroom remodeling",
        lowRate: 160,
        highRate: 300,
        minimumLow: 8000,
        minimumHigh: 16000
    },

    flooring: {
        label: "Flooring installation",
        lowRate: 7,
        highRate: 18,
        minimumLow: 1500,
        minimumHigh: 3500
    },

    painting: {
        label: "Interior painting",
        lowRate: 3,
        highRate: 8,
        minimumLow: 1000,
        minimumHigh: 2500
    },

    drywall: {
        label: "Drywall work",
        lowRate: 4,
        highRate: 11,
        minimumLow: 1200,
        minimumHigh: 3000
    },

    general: {
        label: "General renovation",
        lowRate: 75,
        highRate: 175,
        minimumLow: 5000,
        minimumHigh: 12000
    }
};

const qualityMultipliers = {
    budget: {
        label: "Budget finish level",
        multiplier: 0.85
    },

    standard: {
        label: "Standard finish level",
        multiplier: 1
    },

    premium: {
        label: "Premium finish level",
        multiplier: 1.35
    }
};

const addonPrices = {
    demolition: {
        label: "Demolition and removal",
        low: 1000,
        high: 2500
    },

    electrical: {
        label: "Electrical changes",
        low: 750,
        high: 2500
    },

    plumbing: {
        label: "Plumbing changes",
        low: 1000,
        high: 3500
    },

    permits: {
        label: "Permit allowance",
        low: 300,
        high: 1200
    }
};

const usdFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
});

/**
 * Adds one item to the estimate breakdown.
 */
function addEstimateBreakdownItem(text) {
    if (!estimateBreakdown) {
        return;
    }

    const listItem = document.createElement("li");
    listItem.textContent = text;
    estimateBreakdown.appendChild(listItem);
}

/**
 * Calculates and displays the rough project estimate.
 */
function calculateEstimate(event) {
    event.preventDefault();

    if (
        !estimateForm ||
        !estimateResult ||
        !estimateRange ||
        !estimateBreakdown
    ) {
        return;
    }

    const formData = new FormData(estimateForm);

    const projectType = String(
        formData.get("projectType") || ""
    );

    const qualityLevel = String(
        formData.get("qualityLevel") || ""
    );

    const squareFeet = Number(
        formData.get("squareFeet")
    );

    const selectedProject = projectRates[projectType];
    const selectedQuality =
        qualityMultipliers[qualityLevel];

    if (
        !selectedProject ||
        !selectedQuality ||
        !Number.isFinite(squareFeet) ||
        squareFeet <= 0
    ) {
        return;
    }

    let lowEstimate = Math.max(
        squareFeet * selectedProject.lowRate,
        selectedProject.minimumLow
    );

    let highEstimate = Math.max(
        squareFeet * selectedProject.highRate,
        selectedProject.minimumHigh
    );

    lowEstimate *= selectedQuality.multiplier;
    highEstimate *= selectedQuality.multiplier;

    const selectedAddons = estimateForm.querySelectorAll(
        'input[name="addons"]:checked'
    );

    selectedAddons.forEach(function (checkbox) {
        const addon = addonPrices[checkbox.value];

        if (!addon) {
            return;
        }

        lowEstimate += addon.low;
        highEstimate += addon.high;
    });

    // Round estimates to the nearest $100.
    lowEstimate = Math.round(lowEstimate / 100) * 100;
    highEstimate = Math.round(highEstimate / 100) * 100;

    estimateRange.textContent =
        `${usdFormatter.format(lowEstimate)} – ` +
        `${usdFormatter.format(highEstimate)}`;

    estimateBreakdown.replaceChildren();

    addEstimateBreakdownItem(
        `${selectedProject.label}: ` +
        `${squareFeet.toLocaleString("en-US")} square feet`
    );

    addEstimateBreakdownItem(selectedQuality.label);

    selectedAddons.forEach(function (checkbox) {
        const addon = addonPrices[checkbox.value];

        if (addon) {
            addEstimateBreakdownItem(addon.label);
        }
    });

    estimateResult.hidden = false;

    estimateResult.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

if (estimateForm) {
    estimateForm.addEventListener(
        "submit",
        calculateEstimate
    );
}
