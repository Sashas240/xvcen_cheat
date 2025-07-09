// Данные читов
const cheatsData = [
    {
        id: 1,
        name: "Delta Client",
        image: "assets/DeltaClient.png",
        version: "1.16.5",
        icon: "🔥"
    },
    {
        id: 2,
        name: "Wexside Client",
        image: "assets/WexsideClient.png",
        version: "1.16.5",
        icon: "⚡"
    },
    {
        id: 3,
        name: "Venus Free",
        image: "assets/VenusFree.png",
        version: "1.16.5",
        icon: "🌟"
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
    
    // Создаем изображение или иконку
    const imageElement = document.createElement('img');
    imageElement.className = 'card-image';
    imageElement.src = cheat.image;
    imageElement.alt = cheat.name;
    imageElement.loading = 'lazy';
    
    // Обработчик ошибки загрузки изображения
    imageElement.onerror = function() {
        const iconDiv = document.createElement('div');
        iconDiv.className = 'card-image';
        iconDiv.textContent = cheat.icon;
        this.parentNode.replaceChild(iconDiv, this);
    };
    
    card.innerHTML = `
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
    
    // Вставляем изображение в начало карточки
    card.insertBefore(imageElement, card.firstChild);
    
    // Добавляем обработчик клика для открытия модального окна
    card.addEventListener('click', () => openModal(cheat));
    
    return card;
}

// Рендер всех карточек
function renderCheats() {
    catalogGrid.innerHTML = '';
    cheatsData.forEach((cheat, index) => {
        const card = createCheatCard(cheat);
        catalogGrid.appendChild(card);
        
        // Анимация появления карточек
        setTimeout(() => {
            card.classList.add('animate');
        }, index * 100);
    });
}

// Открытие модального окна
function openModal(cheat) {
    // Пробуем загрузить изображение
    const img = new Image();
    img.onload = function() {
        modalImage.innerHTML = `<img src="${cheat.image}" alt="${cheat.name}" style="width: 100%; height: 100%; object-fit: cover;">`;
    };
    img.onerror = function() {
        modalImage.textContent = cheat.icon;
    };
    img.src = cheat.image;
    
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
        version: cheatData.version || "1.16.5",
        icon: cheatData.icon || "🎮"
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

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем класс для анимации загрузки
    document.body.classList.add('loaded');
    
    // Инициализируем каталог
    renderCheats();
});

// Добавляем дополнительные функции для работы с читами
window.CheatsCatalog.updateCheat = function(cheatId, newData) {
    const index = cheatsData.findIndex(c => c.id === cheatId);
    if (index > -1) {
        cheatsData[index] = { ...cheatsData[index], ...newData };
        renderCheats();
        return cheatsData[index];
    }
    return null;
};

window.CheatsCatalog.getCheat = function(cheatId) {
    return cheatsData.find(c => c.id === cheatId);
};

window.CheatsCatalog.getAllCheats = function() {
    return [...cheatsData];
};

// Добавляем функцию для изменения темы (если потребуется)
window.CheatsCatalog.changeTheme = function(theme) {
    document.body.className = theme;
};

// Функция для поиска читов
window.CheatsCatalog.searchCheats = function(query) {
    const filteredCheats = cheatsData.filter(cheat => 
        cheat.name.toLowerCase().includes(query.toLowerCase()) ||
        cheat.version.toLowerCase().includes(query.toLowerCase())
    );
    
    catalogGrid.innerHTML = '';
    filteredCheats.forEach((cheat, index) => {
        const card = createCheatCard(cheat);
        catalogGrid.appendChild(card);
        
        setTimeout(() => {
            card.classList.add('animate');
        }, index * 100);
    });
    
    return filteredCheats;
};

// Функция для сортировки читов
window.CheatsCatalog.sortCheats = function(sortBy) {
    let sortedCheats = [...cheatsData];
    
    switch(sortBy) {
        case 'name':
            sortedCheats.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'version':
            sortedCheats.sort((a, b) => a.version.localeCompare(b.version));
            break;
        case 'id':
            sortedCheats.sort((a, b) => a.id - b.id);
            break;
        default:
            break;
    }
    
    catalogGrid.innerHTML = '';
    sortedCheats.forEach((cheat, index) => {
        const card = createCheatCard(cheat);
        catalogGrid.appendChild(card);
        
        setTimeout(() => {
            card.classList.add('animate');
        }, index * 100);
    });
    
    return sortedCheats;
};

// Добавляем обработчики для клавиатурной навигации
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && modalOverlay.classList.contains('active')) {
        e.preventDefault();
        
        const focusableElements = modalOverlay.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
            }
        }
    }
});

// Автофокус на кнопке закрытия при открытии модального окна
const originalOpenModal = openModal;
openModal = function(cheat) {
    originalOpenModal(cheat);
    setTimeout(() => {
        modalClose.focus();
    }, 100);
};
