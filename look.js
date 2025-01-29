function renderCards(cardList, popupStateKey, popUpElement) {

    function checkPopupState() {
        let storedState = localStorage.getItem(popupStateKey);
        if (storedState === "true") {
            popUpElement.show();
            localStorage.removeItem(popupStateKey)
        } else {
            popUpElement.close()
        }
    }

    checkPopupState();
    cardList.innerHTML = "";

    function getCardData() {
        try {
            const storedCardData = localStorage.getItem('lookCardData'); // Измените ключ на gameCardData
            if (storedCardData) {
                return JSON.parse(storedCardData);
            }
        } catch (error) {
            console.error("Error parsing card data from localStorage:", error);
        }
        return null;
    }

    // Отображение карточек, если есть данные в хранилище
    const storedCards = getCardData();
if (storedCards) {
    storedCards.forEach(function (storedCardData) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('list__card');
        cardDiv.dataset.cardId = storedCardData.id;
        const textDiv = document.createElement('div');
        textDiv.classList.add('list__text');

        let cardHTML = '';
        if (storedCardData.image) {
            cardHTML += `<img src="${storedCardData.image}" alt="Картинка" style="max-width: 200px; display: block">`;
        }
        cardHTML += `
            <h1 class="text__title">${storedCardData.name}</h1>
            <p>Лера: ${storedCardData.leraRating}</p>
            <p>Артем: ${storedCardData.artemRating}</p>
        `;
        textDiv.innerHTML = cardHTML;
        cardDiv.appendChild(textDiv);
        cardList.appendChild(cardDiv);
        cardDiv.addEventListener('click', () => {
            window.location.href = `creature_look.html?id=${storedCardData.id}`;
        });
    });
}
}

