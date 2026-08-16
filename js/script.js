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
const contactEstimateSummary = document.querySelector(
    "#contact-estimate-summary"
);

const contactEstimateRange = document.querySelector(
    "#contact-estimate-range"
);

const contactEstimateDetails = document.querySelector(
    "#contact-estimate-details"
);

const contactProjectType = document.querySelector(
    "#project-type"
);

const estimateRangeField = document.querySelector(
    "#estimate-range-field"
);

const estimateDetailsField = document.querySelector(
    "#estimate-details-field"
);
const contactUrlParams = new URLSearchParams(
    window.location.search
);

const incomingProjectType =
    contactUrlParams.get("projectType");

const incomingEstimateRange =
    contactUrlParams.get("estimateRange");

const incomingEstimateDetails =
    contactUrlParams.get("estimateDetails");
    if (
    contactEstimateSummary &&
    incomingEstimateRange
) {
    contactEstimateSummary.hidden = false;

    if (contactEstimateRange) {
        contactEstimateRange.textContent =
            incomingEstimateRange;
    }

    if (
        contactEstimateDetails &&
        incomingEstimateDetails
    ) {
        contactEstimateDetails.textContent =
            incomingEstimateDetails;
    }

    if (estimateRangeField) {
        estimateRangeField.value =
            incomingEstimateRange;
    }

    if (estimateDetailsField) {
        estimateDetailsField.value =
            incomingEstimateDetails || "";
    }

    if (
        contactProjectType &&
        incomingProjectType
    ) {
        contactProjectType.value =
            incomingProjectType;
    }
}
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



// Rough remodeling and handyman estimate calculator
const estimateForm = document.querySelector("#estimate-form");
const estimateResult = document.querySelector("#estimate-result");
const estimateRange = document.querySelector("#estimate-range");
const consultationLink = document.querySelector(
    "#consultation-link"
);
const estimateBreakdown = document.querySelector(
    "#estimate-breakdown"
);

const projectTypeField = document.querySelector(
    "#estimate-project-type"
);

const remodelingFields = document.querySelector(
    "#remodeling-fields"
);

const remodelingAddons = document.querySelector(
    "#remodeling-addons"
);

const handymanFields = document.querySelector(
    "#handyman-fields"
);

// Demonstration pricing only.
// Alex should replace these values with verified ALX pricing.
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

// Demonstration handyman pricing per item or repair.
const handymanRates = {
    tvMounting: {
        label: "Television mounting",
        low: 150,
        high: 300
    },

    furnitureAssembly: {
        label: "Furniture assembly",
        low: 100,
        high: 250
    },

    shelfMounting: {
        label: "Shelf, picture, or wall décor mounting",
        low: 75,
        high: 200
    },

    doorRepair: {
        label: "Interior door repair or adjustment",
        low: 125,
        high: 400
    },

    lockReplacement: {
        label: "Lock or deadbolt replacement",
        low: 100,
        high: 250
    },

    faucetReplacement: {
        label: "Faucet replacement",
        low: 150,
        high: 350
    },

    toiletService: {
        label: "Toilet repair or replacement",
        low: 175,
        high: 450
    },

    lightFixture: {
        label: "Light fixture replacement",
        low: 125,
        high: 300
    },

    ceilingFan: {
        label: "Ceiling fan installation",
        low: 200,
        high: 450
    },

    drywallPatch: {
        label: "Small drywall patch or repair",
        low: 150,
        high: 450
    },

    caulking: {
        label: "Interior caulking or sealing",
        low: 100,
        high: 300
    },

    detectorInstallation: {
        label: "Smoke or carbon-monoxide detector installation",
        low: 75,
        high: 175
    }
};

const usdFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
});

/**
 * Shows or hides a calculator section and enables or
 * disables the form controls inside it.
 */
function setEstimateSectionState(section, enabled) {
    if (!section) {
        return;
    }

    section.hidden = !enabled;

    const fields = section.querySelectorAll(
        "input, select, textarea"
    );

    fields.forEach(function (field) {
        field.disabled = !enabled;
    });
}

/**
 * Changes the calculator fields based on project type.
 */
function updateEstimateFormMode() {
    if (!projectTypeField) {
        return;
    }

    const selectedType = projectTypeField.value;
    const isHandyman = selectedType === "handyman";

    const isRemodeling =
        selectedType !== "" &&
        selectedType !== "handyman";

    setEstimateSectionState(
        remodelingFields,
        isRemodeling
    );

    setEstimateSectionState(
        remodelingAddons,
        isRemodeling
    );

    setEstimateSectionState(
        handymanFields,
        isHandyman
    );

    if (estimateResult) {
        estimateResult.hidden = true;
    }
}

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
 * Calculates and displays the rough estimate.
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

    let lowEstimate = 0;
    let highEstimate = 0;

    estimateBreakdown.replaceChildren();

    /*
    Handyman jobs use per-item pricing instead of
    square-footage pricing.
    */
    if (projectType === "handyman") {
        const handymanJob = String(
            formData.get("handymanJob") || ""
        );

        const quantity = Number(
            formData.get("handymanQuantity")
        );

        const selectedJob =
            handymanRates[handymanJob];

        if (
            !selectedJob ||
            !Number.isInteger(quantity) ||
            quantity < 1
        ) {
            return;
        }

        lowEstimate =
            selectedJob.low * quantity;

        highEstimate =
            selectedJob.high * quantity;

        addEstimateBreakdownItem(
            selectedJob.label
        );

        addEstimateBreakdownItem(
            `Quantity: ${quantity}`
        );
    } else {
        /*
        Remodeling jobs use square footage, finish level,
        minimum project amounts, and optional add-ons.
        */
        const squareFeet = Number(
            formData.get("squareFeet")
        );

        const qualityLevel = String(
            formData.get("qualityLevel") || ""
        );

        const selectedProject =
            projectRates[projectType];

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

        lowEstimate = Math.max(
            squareFeet * selectedProject.lowRate,
            selectedProject.minimumLow
        );

        highEstimate = Math.max(
            squareFeet * selectedProject.highRate,
            selectedProject.minimumHigh
        );

        lowEstimate *=
            selectedQuality.multiplier;

        highEstimate *=
            selectedQuality.multiplier;

        const selectedAddons =
            estimateForm.querySelectorAll(
                'input[name="addons"]:checked'
            );

        selectedAddons.forEach(function (checkbox) {
            const addon =
                addonPrices[checkbox.value];

            if (!addon) {
                return;
            }

            lowEstimate += addon.low;
            highEstimate += addon.high;
        });

        addEstimateBreakdownItem(
            `${selectedProject.label}: ` +
            `${squareFeet.toLocaleString("en-US")} square feet`
        );

        addEstimateBreakdownItem(
            selectedQuality.label
        );

        selectedAddons.forEach(function (checkbox) {
            const addon =
                addonPrices[checkbox.value];

            if (addon) {
                addEstimateBreakdownItem(
                    addon.label
                );
            }
        });
    }

    // Round the final range to the nearest $25.
    lowEstimate =
        Math.round(lowEstimate / 25) * 25;

    highEstimate =
        Math.round(highEstimate / 25) * 25;

    estimateRange.textContent =
        `${usdFormatter.format(lowEstimate)} – ` +
        `${usdFormatter.format(highEstimate)}`;

    const breakdownItems = Array.from(
    estimateBreakdown.querySelectorAll("li")
).map(function (item) {
    return item.textContent;
});

const estimateDetails =
    breakdownItems.join(" | ");

if (consultationLink) {
    const consultationParams = new URLSearchParams({
        projectType: projectType,
        estimateRange: estimateRange.textContent,
        estimateDetails: estimateDetails
    });

    consultationLink.href =
        `contact.html?${consultationParams.toString()}`;
}
    estimateResult.hidden = false;

    estimateResult.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

if (projectTypeField) {
    projectTypeField.addEventListener(
        "change",
        updateEstimateFormMode
    );

    updateEstimateFormMode();
}

if (estimateForm) {
    estimateForm.addEventListener(
        "submit",
        calculateEstimate
    );
}
