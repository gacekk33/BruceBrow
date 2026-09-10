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

    // Kliknięcie karty
    tab.addEventListener("click", (event) => {

        if (event.target.classList.contains("close-tab")) {
            return;
        }

        activateTab(tab);
    });


    // Przycisk zamykania
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


// Istniejące karty
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
});
