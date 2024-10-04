// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Cards Data (same as before)
const cards = [
    // ... (Your cards data array remains unchanged)
];

// Initialize
let currentType = 'court';

function resetSelections() {
    cards.forEach(card => card.player = 'none');
    displayAllCards(currentType);
}

function toggleDescription(select) {
    const cardDiv = select.closest('.card');
    const description = cardDiv.querySelector('.description');
    if (select.value === 'none' || select.value === 'court' || select.value === 'draft') {
        description.style.display = 'none';
    } else {
        description.style.display = 'block';
    }
}

function displayAllCards(type) {
    currentType = type;
    const cardList = document.getElementById('card-list');
    cardList.innerHTML = "";

    // Update active navigation button
    document.querySelectorAll('.nav-button').forEach(button => {
        button.classList.toggle('active', button.getAttribute('data-type') === type);
    });

    // Filter and sort cards
    let filteredCards = cards.filter(card => card.type === type);

    filteredCards.sort((a, b) => {
        return a.title.localeCompare(b.title);
    });

    filteredCards.forEach(card => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        const title = document.createElement("h2");
        title.textContent = card.title;

        const description = document.createElement("div");
        description.classList.add("description");
        description.textContent = card.description;
        description.style.display = (card.player !== "none" && card.player !== "court" && card.player !== "draft") ? 'block' : 'none';

        const playerPicker = document.createElement("div");
        playerPicker.classList.add("player-picker");

        const select = document.createElement("select");
        let pickerOptions = `
            <option value="none" ${card.player === "none" ? "selected" : ""}>None</option>
            <option value="red" ${card.player === "red" ? "selected" : ""}>Red</option>
            <option value="blue" ${card.player === "blue" ? "selected" : ""}>Blue</option>
            <option value="gold" ${card.player === "gold" ? "selected" : ""}>Gold</option>
            <option value="white" ${card.player === "white" ? "selected" : ""}>White</option>
        `;
        if (card.type === 'court') {
            pickerOptions = `<option value="court" ${card.player === "court" ? "selected" : ""}>Court</option>` + pickerOptions;
        } else if (card.type === 'leader' || card.type === 'lore') {
            pickerOptions = `<option value="draft" ${card.player === "draft" ? "selected" : ""}>Draft</option>` + pickerOptions;
        }
        select.innerHTML = pickerOptions;

        select.addEventListener("change", function() {
            card.player = this.value;
            toggleDescription(this);
        });

        playerPicker.appendChild(select);

        cardDiv.appendChild(title);
        cardDiv.appendChild(description);
        cardDiv.appendChild(playerPicker);

        cardList.appendChild(cardDiv);
    });
}

function filterCards(color) {
    const cardList = document.getElementById("card-list");
    cardList.innerHTML = "";

    // Update active filter button
    document.querySelectorAll('.filter-button').forEach(button => {
        button.classList.toggle('active', button.getAttribute('data-color') === color);
    });

    // Filter and sort cards
    let filteredCards = cards.filter(card => card.player === color);

    filteredCards.sort((a, b) => {
        if (a.type === 'leader' && b.type !== 'leader') return -1;
        if (b.type === 'leader' && a.type !== 'leader') return 1;
        if (a.type === 'lore' && b.type !== 'lore') return -1;
        if (b.type === 'lore' && a.type !== 'lore') return 1;
        return a.title.localeCompare(b.title);
    });

    filteredCards.forEach(card => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        const title = document.createElement("h2");
        title.textContent = card.title;

        const description = document.createElement("div");
        description.classList.add("description");
        description.textContent = card.description;
        description.style.display = 'block';

        const playerPicker = document.createElement("div");
        playerPicker.classList.add("player-picker");

        const select = document.createElement("select");
        let pickerOptions = `
            <option value="none" ${card.player === "none" ? "selected" : ""}>None</option>
            <option value="red" ${card.player === "red" ? "selected" : ""}>Red</option>
            <option value="blue" ${card.player === "blue" ? "selected" : ""}>Blue</option>
            <option value="gold" ${card.player === "gold" ? "selected" : ""}>Gold</option>
            <option value="white" ${card.player === "white" ? "selected" : ""}>White</option>
        `;
        if (card.type === 'court') {
            pickerOptions = `<option value="court" ${card.player === "court" ? "selected" : ""}>Court</option>` + pickerOptions;
        } else if (card.type === 'leader' || card.type === 'lore') {
            pickerOptions = `<option value="draft" ${card.player === "draft" ? "selected" : ""}>Draft</option>` + pickerOptions;
        }
        select.innerHTML = pickerOptions;

        select.addEventListener("change", function() {
            card.player = this.value;
            toggleDescription(this);
        });

        playerPicker.appendChild(select);

        cardDiv.appendChild(title);
        cardDiv.appendChild(description);
        cardDiv.appendChild(playerPicker);

        cardList.appendChild(cardDiv);
    });
}

// Event Listeners for Navigation and Filter Buttons
document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', () => {
        const type = button.getAttribute('data-type');
        displayAllCards(type);
    });
});

document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
        const color = button.getAttribute('data-color');
        filterCards(color);
    });
});

// Initialize the page with all Court cards
displayAllCards('court');
