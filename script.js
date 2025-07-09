// Данные читов
const cheatsData = [
    {
        id: 1,
        name: "Delta Client",
        image: "assets/DeltaClient.png",
        version: "1.16.5"
    },
    {
        id: 2,
        name: "Wexside Client",
        image: "assets/WexsideClient.png",
        version: "1.16.5"
    },
    {
        id: 3,
        name: "Venus Free",
        image: "assets/VenusFree.png",
        version: "1.16.5"
    }
];

// DOM элементы
const catalogGrid = document.getElementById('catalogGrid');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalVersion = document.getElementById('modalVersion');
const downloadBtn = document.getElementById('downloadBtn');
const notification = document.getElementById('notification');

// Создание карточки чита
function createCheatCard(cheat) {
    const card = document.createElement('div');
    card.className = 'cheat-card';
    card.setAttribute('data-cheat-id', cheat.id);
    
    card.innerHTML = `
        <img class="card-image" src="${cheat.image}" alt="${cheat.name}" loading="lazy">
        <div class="card-content">
            <h3 class="card-title">${cheat.name}</h3>
            <div class="card-version">
                <svg class="version-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                </svg>
                <span>Версия: ${cheat.version}</span>
            </div>
        </div>
    `;
    
    // Добавляем обработчик клика для открытия модального окна
    card.addEventListener('click', () => openModal(cheat));
    
    return card;
}

// Рендер всех карточек
function renderCheats() {
    catalogGrid.innerHTML = '';
    cheatsData.forEach(cheat => {
        const card = createCheatCard(cheat);
        catalogGrid.appendChild(card);
    });
}

// Открытие модального окна
function openModal(cheat) {
    modalImage.src = cheat.image;
    modalImage.alt = cheat.name;
    modalTitle.textContent = cheat.name;
    modalVersion.querySelector('span').textContent = `Версия: ${cheat.version}`;
    
    // Сохраняем данные чита для кнопки скачивания
    downloadBtn.setAttribute('data-cheat-name', cheat.name);
    
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Закрытие модального окна
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Показ уведомления
function showNotification() {
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Обработчик скачивания
function handleDownload() {
    const cheatName = downloadBtn.getAttribute('data-cheat-name');
    console.log(`Скачивание: ${cheatName}`);
    
    // Закрываем модальное окно
    closeModal();
    
    // Показываем уведомление
    showNotification();
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', () => {
    renderCheats();
});

// Закрытие модального окна
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Закрытие модального окна по ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// Обработчик кнопки скачивания
downloadBtn.addEventListener('click', handleDownload);

// Функция для добавления нового чита (для расширения)
function addCheat(cheatData) {
    const newId = Math.max(...cheatsData.map(c => c.id)) + 1;
    const newCheat = {
        id: newId,
        name: cheatData.name,
        image: cheatData.image,
        version: cheatData.version || "1.16.5"
    };
    
    cheatsData.push(newCheat);
    renderCheats();
    
    return newCheat;
}

// Функция для удаления чита
function removeCheat(cheatId) {
    const index = cheatsData.findIndex(c => c.id === cheatId);
    if (index > -1) {
        cheatsData.splice(index, 1);
        renderCheats();
        return true;
    }
    return false;
}

// Экспорт функций для возможного использования
window.CheatsCatalog = {
    addCheat,
    removeCheat,
    cheatsData
};

// Плавная анимация загрузки
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.cheat-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Добавляем эффект параллакса для фона
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    document.body.style.background = `
        radial-gradient(circle at ${mouseX * 100}% ${mouseY * 100}%, 
        rgba(255, 0, 64, 0.05) 0%, 
        transparent 50%),
        linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)
    `;
});
