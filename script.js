const tabsContainer = document.querySelector(".tabs");
const newTabButton = document.querySelector(".new-tab");


// Aktywowanie karty
function activateTab(tab) {
    document.querySelectorAll(".tab").forEach(t => {
        t.classList.remove("active");
    });

    tab.classList.add("active");
}


// Obsługa karty
function setupTab(tab) {
    tab.addEventListener("click", () => {
        activateTab(tab);
    });
}


// Istniejące karty
document.querySelectorAll(".tab").forEach(tab => {
    setupTab(tab);
});


// Tworzenie nowej karty
newTabButton.addEventListener("click", () => {
    const newTab = document.createElement("div");

    newTab.classList.add("tab");
    newTab.textContent = "Nowa karta";

    setupTab(newTab);

    tabsContainer.insertBefore(newTab, newTabButton);

    activateTab(newTab);
});
