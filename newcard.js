const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
const createForm = document.getElementById('createForm');
const storageKey = "gameCardData";
const saveButton = document.getElementById('open-btn');
const deleteButton = document.getElementById('delete-btn');
const popupStateKey = "popupState";
const urlParams = new URLSearchParams(window.location.search);
const cardId = urlParams.get('id');
const popUpElement = document.getElementById('pop-up');

// Функция для показа всплывающего окна
function showPopup(message) {
    popUpElement.innerText = message;
    popUpElement.showModal();
    setTimeout(() => {
        popUpElement.close();
    }, 2000); // Закрыть всплывающее окно через 2 секунды
}

imageUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;  // Устанавливаем src для предварительного просмотра
            imagePreview.style.display = 'block';  // Показываем изображение
        };
        reader.readAsDataURL(file);  // Читаем файл как Data URL
    }
});

function saveCardData(card) {
    let storedCards = JSON.parse(localStorage.getItem(storageKey)) || []; // Правильная инициализация
    storedCards.push(card);
    localStorage.setItem(storageKey, JSON.stringify(storedCards));
}

saveButton.addEventListener('click', function(event) {
    const name = document.getElementById('name').value;
    const leraRating = document.getElementById('leraRating').value;
    const artemRating = document.getElementById('artemRating').value;
    const imageSrc = imagePreview.src;
    
    let storedCards = JSON.parse(localStorage.getItem(storageKey)) || [];

    const newCardData = {
        id: Date.now().toString(),
        name: name,
        leraRating: leraRating,
        artemRating: artemRating,
        image: imageSrc
    };

    if (cardId) {
        storedCards = storedCards.map(card => {
            if (card.id === cardId) {
                return { ...card, name, leraRating, artemRating, image: imageSrc };
            }
            return card;
        });
        alert("Карточка изменена");

    } else {
        storedCards.push(newCardData);
        alert("Карточка создана");

    }

    localStorage.setItem(storageKey, JSON.stringify(storedCards));
    window.location.href = 'game.html';
});


if (cardId) {
    let storedCards = JSON.parse(localStorage.getItem(storageKey)) || [];
    const cardToEdit = storedCards.find(card => card.id === cardId);
    if (cardToEdit) {
        document.getElementById('name').value = cardToEdit.name;
        document.getElementById('leraRating').value = cardToEdit.leraRating;
        document.getElementById('artemRating').value = cardToEdit.artemRating;
        imagePreview.src = cardToEdit.image;
        imagePreview.style.display = 'block';  // Показываем изображение при редактировании
        deleteButton.dataset.cardId = cardId;
    }
}

function deleteCard(cardId) {
    if (cardId) {
        let storedCards = JSON.parse(localStorage.getItem(storageKey)) || [];
        storedCards = storedCards.filter(card => card.id !== cardId);
        localStorage.setItem(storageKey, JSON.stringify(storedCards));
        alert("Карточка удалена");
        window.location.href = 'game.html';
    }
}

deleteButton.addEventListener('click', function(event) {
    event.preventDefault();
    const cardIdToDelete = deleteButton.dataset.cardId;
    deleteCard(cardIdToDelete);
});