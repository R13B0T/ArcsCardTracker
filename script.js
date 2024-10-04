// Theme Toggle (same as before)

// Initialize
var currentType = 'court';
var originalCards = [];

// Collect all cards and store them
window.onload = function() {
    var allCards = document.querySelectorAll('.card');
    for (var i = 0; i < allCards.length; i++) {
        // Store a reference to the original card
        var card = allCards[i];
        originalCards.push(card);
    }
    displayAllCards('court'); // Display initial cards
};

function resetSelections() {
    for (var i = 0; i < originalCards.length; i++) {
        var card = originalCards[i];
        card.setAttribute('data-player', 'none');
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
    // Update the data-player attribute on both the cloned card and the original card
    var title = cardDiv.getAttribute('data-title');
    updateOriginalCardPlayer(title, value);
}

function updateOriginalCardPlayer(title, playerValue) {
    // Find the original card with the matching title and update its data-player attribute
    for (var i = 0; i < originalCards.length; i++) {
        var card = originalCards[i];
        if (card.getAttribute('data-title') === title) {
            card.setAttribute('data-player', playerValue);
            break;
        }
    }
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
        var clonedCard = card.cloneNode(false); // Clone without children

        // Generate card content
        var titleText = card.getAttribute('data-title');
        var descriptionText = card.getAttribute('data-description');
        var playerValue = card.getAttribute('data-player') || 'none';

        var title = document.createElement("h2");
        title.textContent = titleText;

        var description = document.createElement("div");
        description.classList.add("description");
        description.textContent = descriptionText;
        description.style.display = playerValue !== "none" ? 'block' : 'none';

        var playerPicker = document.createElement("div");
        playerPicker.classList.add("player-picker");

        var select = document.createElement("select");
        var pickerOptions = ''
            + '<option value="none"' + (playerValue === "none" ? " selected" : "") + '>None</option>'
            + '<option value="red"' + (playerValue === "red" ? " selected" : "") + '>Red</option>'
            + '<option value="blue"' + (playerValue === "blue" ? " selected" : "") + '>Blue</option>'
            + '<option value="gold"' + (playerValue === "gold" ? " selected" : "") + '>Gold</option>'
            + '<option value="white"' + (playerValue === "white" ? " selected" : "") + '>White</option>';
        var cardType = card.getAttribute('data-type');
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

        // Set attributes on cloned card
        clonedCard.setAttribute('class', 'card');
        clonedCard.setAttribute('data-type', card.getAttribute('data-type'));
        clonedCard.setAttribute('data-title', titleText);
        clonedCard.setAttribute('data-description', descriptionText);
        clonedCard.setAttribute('data-player', playerValue);

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
        var clonedCard = card.cloneNode(false);

        // Generate card content
        var titleText = card.getAttribute('data-title');
        var descriptionText = card.getAttribute('data-description');
        var playerValue = card.getAttribute('data-player') || 'none';

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
        var cardType = card.getAttribute('data-type');
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

        // Set attributes on cloned card
        clonedCard.setAttribute('class', 'card');
        clonedCard.setAttribute('data-type', card.getAttribute('data-type'));
        clonedCard.setAttribute('data-title', titleText);
        clonedCard.setAttribute('data-description', descriptionText);
        clonedCard.setAttribute('data-player', playerValue);

        cardList.appendChild(clonedCard);
    }
}

// Event Listeners for Navigation and Filter Buttons (same as before)
