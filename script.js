const tabsContainer = document.querySelector(".tabs");
const newTabButton = document.querySelector(".new-tab");

const addressInput = document.querySelector("#address-input");
const backButton = document.querySelector("#back");
const forwardButton = document.querySelector("#forward");
const reloadButton = document.querySelector("#reload");


// =========================
// KARTY
// =========================

function activateTab(tab) {
    document.querySelectorAll(".tab").forEach(t => {
        t.classList.remove("active");
    });

    tab.classList.add("active");
}


function setupTab(tab) {

    tab.addEventListener("click", (event) => {

        if (event.target.classList.contains("close-tab")) {
            return;
        }

        activateTab(tab);
    });


    const closeButton = tab.querySelector(".close-tab");

    closeButton.addEventListener("click", (event) => {

        event.stopPropagation();

        const wasActive = tab.classList.contains("active");

        tab.remove();

        if (wasActive) {

            const remainingTabs =
                document.querySelectorAll(".tab");

            if (remainingTabs.length > 0) {
                activateTab(
                    remainingTabs[remainingTabs.length - 1]
                );
            }
        }
    });
}


// Istniejąca karta
document.querySelectorAll(".tab").forEach(tab => {
    setupTab(tab);
});


// Nowa karta
newTabButton.addEventListener("click", () => {

    const newTab = document.createElement("div");

    newTab.classList.add("tab");

    newTab.innerHTML = `
        <span class="tab-icon">•••</span>
        <span class="tab-title">Wyszukiwanie</span>
        <button class="close-tab">×</button>
    `;

    setupTab(newTab);

    tabsContainer.insertBefore(newTab, newTabButton);

    activateTab(newTab);

    // Czyścimy pasek wyszukiwania
    addressInput.value = "";
    addressInput.focus();
});


// =========================
// WYSZUKIWANIE
// =========================

function searchOrOpen() {

    const value = addressInput.value.trim();

    if (value === "") {
        return;
    }


    // Jeśli wygląda jak adres
    if (
        value.startsWith("http://") ||
        value.startsWith("https://")
    ) {
        window.location.href = value;
        return;
    }


    // Jeśli wygląda jak domena
    if (
        value.includes(".") &&
        !value.includes(" ")
    ) {
        window.location.href = "https://" + value;
        return;
    }


    // Zwykły tekst → Google
    const searchUrl =
        "https://www.google.com/search?q=" +
        encodeURIComponent(value);

    window.location.href = searchUrl;
}


// Enter w pasku
addressInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        searchOrOpen();
    }

});


// =========================
// PRZYCISKI
// =========================

// Wstecz
backButton.addEventListener("click", () => {
    history.back();
});


// Dalej
forwardButton.addEventListener("click", () => {
    history.forward();
});


// Odśwież
reloadButton.addEventListener("click", () => {
    location.reload();
});
