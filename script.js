const tabsContainer = document.querySelector(".tabs");
const newTabButton = document.querySelector(".new-tab");

let tabNumber = 1;


// Ustawia aktywną kartę
function activateTab(tab) {
    document.querySelectorAll(".tab").forEach(t => {
        t.classList.remove("active");
    });

    tab.classList.add("active");
}


// Tworzy kartę
function setupTab(tab) {
    tab.addEventListener("click", (event) => {

        // Jeśli kliknięto przycisk zamykania,
        // nie aktywujemy karty
        if (event.target.classList.contains("close-tab")) {
            return;
        }

        activateTab(tab);
    });
}


// Dodajemy zamykanie do istniejących kart
document.querySelectorAll(".tab").forEach(tab => {
    setupTab(tab);
});


// Tworzenie nowej karty
newTabButton.addEventListener("click", () => {

    tabNumber++;

    const newTab = document.createElement("div");
    newTab.classList.add("tab");

    newTab.innerHTML = `
        <span>Nowa karta ${tabNumber}</span>
        <button class="close-tab">×</button>
    `;

    // Zamykanie karty
    newTab.querySelector(".close-tab").addEventListener("click", () => {
        const wasActive = newTab.classList.contains("active");

        newTab.remove();

        // Jeśli zamknęliśmy aktywną kartę,
        // aktywujemy ostatnią dostępną
        if (wasActive) {
            const remainingTabs = document.querySelectorAll(".tab");

            if (remainingTabs.length > 0) {
                activateTab(remainingTabs[remainingTabs.length - 1]);
            }
        }
    });

    setupTab(newTab);

    tabsContainer.insertBefore(newTab, newTabButton);

    activateTab(newTab);
});
