// Theme Toggle
var themeToggle = document.getElementById('theme-toggle');
var body = document.body;

if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// Initialize
var currentType = 'court';
var originalCards = [];

// Collect all cards and store them
window.onload = function() {
    var allCards = document.querySelectorAll('.card');
    for (var i = 0; i < allCards.length; i++) {
        originalCards.push(allCards[i].cloneNode(true));
    }
    displayAllCards('court'); // Display initial cards
};

function resetSelections() {
    for (var i = 0; i < originalCards.length; i++) {
        var card = originalCards[i];
        card.setAttribute('data-player', 'none');
        var select = card.querySelector('select');
        if (select) select.value = 'none';
        var description = card.querySelector('.description');
        if (description) description.style.display = 'none';
    }
    displayAllCards(currentType);
}

function toggleDescription(select) {
    var cardDiv = select.closest('.card');
    var description = cardDiv.querySelector('.description');
    var value = select.value;
    if (value === 'none') {
        description.style.display = 'none';
    } else {
        description.style.display = 'block';
    }
    // Update the data-player attribute
    cardDiv.setAttribute('data-player', value);
}

function displayAllCards(type) {
    currentType = type;
    var cardList = document.getElementById('card-list');
    cardList.innerHTML = "";

    // Update active navigation button
    var navButtons = document.querySelectorAll('.nav-button');
    for (var i = 0; i < navButtons.length; i++) {
        var button = navButtons[i];
        button.classList.toggle('active', button.getAttribute('data-type') === type);
    }

    // Filter and sort cards
    var filteredCards = [];
    for (var i = 0; i < originalCards.length; i++) {
        var card = originalCards[i];
        if (card.getAttribute('data-type') === type) {
            filteredCards.push(card);
        }
    }

    filteredCards.sort(function(a, b) {
        return a.getAttribute('data-title').localeCompare(b.getAttribute('data-title'));
    });

    for (var i = 0; i < filteredCards.length; i++) {
        var card = filteredCards[i];
        var clonedCard = card.cloneNode(true);

        // Generate card content
        var titleText = clonedCard.getAttribute('data-title');
        var descriptionText = clonedCard.getAttribute('data-description');
        var playerValue = clonedCard.getAttribute('data-player') || 'none';

        clonedCard.innerHTML = '';

        var title = document.createElement("h2");
        title.textContent = titleText;

        var description = document.createElement("div");
        description.classList.add("description");
        description.textContent = descriptionText;
        if (playerValue !== "none") {
            description.style.display = 'block';
        } else {
            description.style.display = 'none';
        }

        var playerPicker = document.createElement("div");
        playerPicker.classList.add("player-picker");

        var select = document.createElement("select");
        var pickerOptions = ''
            + '<option value="none"' + (playerValue === "none" ? " selected" : "") + '>None</option>'
            + '<option value="red"' + (playerValue === "red" ? " selected" : "") + '>Red</option>'
            + '<option value="blue"' + (playerValue === "blue" ? " selected" : "") + '>Blue</option>'
            + '<option value="gold"' + (playerValue === "gold" ? " selected" : "") + '>Gold</option>'
            + '<option value="white"' + (playerValue === "white" ? " selected" : "") + '>White</option>';
        var cardType = clonedCard.getAttribute('data-type');
        if (cardType === 'court') {
            pickerOptions = '<option value="court"' + (playerValue === "court" ? " selected" : "") + '>Court</option>' + pickerOptions;
        } else if (cardType === 'leader' || cardType === 'lore') {
            pickerOptions = '<option value="draft"' + (playerValue === "draft" ? " selected" : "") + '>Draft</option>' + pickerOptions;
        }
        select.innerHTML = pickerOptions;

        select.addEventListener("change", function() {
            var selectValue = this.value;
            var parentCard = this.closest('.card');
            parentCard.setAttribute('data-player', selectValue);
            toggleDescription(this);
        });

        playerPicker.appendChild(select);

        clonedCard.appendChild(title);
        clonedCard.appendChild(description);
        clonedCard.appendChild(playerPicker);

        cardList.appendChild(clonedCard);
    }
}

function filterCards(color) {
    var cardList = document.getElementById("card-list");
    cardList.innerHTML = "";

    // Update active filter button
    var filterButtons = document.querySelectorAll('.filter-button');
    for (var i = 0; i < filterButtons.length; i++) {
        var button = filterButtons[i];
        button.classList.toggle('active', button.getAttribute('data-color') === color);
    }

    // Filter and sort cards
    var filteredCards = [];
    for (var i = 0; i < originalCards.length; i++) {
        var card = originalCards[i];
        if (card.getAttribute('data-player') === color) {
            filteredCards.push(card);
        }
    }

    filteredCards.sort(function(a, b) {
        var aType = a.getAttribute('data-type');
        var bType = b.getAttribute('data-type');
        if (aType === 'leader' && bType !== 'leader') return -1;
        if (bType === 'leader' && aType !== 'leader') return 1;
        if (aType === 'lore' && bType !== 'lore') return -1;
        if (bType === 'lore' && aType !== 'lore') return 1;
        return a.getAttribute('data-title').localeCompare(b.getAttribute('data-title'));
    });

    for (var i = 0; i < filteredCards.length; i++) {
        var card = filteredCards[i];
        var clonedCard = card.cloneNode(true);

        // Generate card content
        var titleText = clonedCard.getAttribute('data-title');
        var descriptionText = clonedCard.getAttribute('data-description');
        var playerValue = clonedCard.getAttribute('data-player') || 'none';

        clonedCard.innerHTML = '';

        var title = document.createElement("h2");
        title.textContent = titleText;

        var description = document.createElement("div");
        description.classList.add("description");
        description.textContent = descriptionText;
        description.style.display = 'block';

        var playerPicker = document.createElement("div");
        playerPicker.classList.add("player-picker");

        var select = document.createElement("select");
        var pickerOptions = ''
            + '<option value="none"' + (playerValue === "none" ? " selected" : "") + '>None</option>'
            + '<option value="red"' + (playerValue === "red" ? " selected" : "") + '>Red</option>'
            + '<option value="blue"' + (playerValue === "blue" ? " selected" : "") + '>Blue</option>'
            + '<option value="gold"' + (playerValue === "gold" ? " selected" : "") + '>Gold</option>'
            + '<option value="white"' + (playerValue === "white" ? " selected" : "") + '>White</option>';
        var cardType = clonedCard.getAttribute('data-type');
        if (cardType === 'court') {
            pickerOptions = '<option value="court"' + (playerValue === "court" ? " selected" : "") + '>Court</option>' + pickerOptions;
        } else if (cardType === 'leader' || cardType === 'lore') {
            pickerOptions = '<option value="draft"' + (playerValue === "draft" ? " selected" : "") + '>Draft</option>' + pickerOptions;
        }
        select.innerHTML = pickerOptions;

        select.addEventListener("change", function() {
            var selectValue = this.value;
            var parentCard = this.closest('.card');
            parentCard.setAttribute('data-player', selectValue);
            toggleDescription(this);
        });

        playerPicker.appendChild(select);

        clonedCard.appendChild(title);
        clonedCard.appendChild(description);
        clonedCard.appendChild(playerPicker);

        cardList.appendChild(clonedCard);
    }
}

// Event Listeners for Navigation and Filter Buttons
var navButtons = document.querySelectorAll('.nav-button');
for (var i = 0; i < navButtons.length; i++) {
    (function(button) {
        button.addEventListener('click', function() {
            var type = button.getAttribute('data-type');
            displayAllCards(type);
        });
    })(navButtons[i]);
}

var filterButtons = document.querySelectorAll('.filter-button');
for (var i = 0; i < filterButtons.length; i++) {
    (function(button) {
        button.addEventListener('click', function() {
            var color = button.getAttribute('data-color');
            filterCards(color);
        });
    })(filterButtons[i]);
}
