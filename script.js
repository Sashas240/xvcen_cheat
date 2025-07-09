// Данные читов
const cheatsData = {
    delta: {
        name: 'Delta Client',
        image: 'assets/DeltaClient.png',
        version: '1.16.5'
    },
    wexside: {
        name: 'Wexside Client',
        image: 'assets/WexsideClient.png',
        version: '1.16.5'
    },
    venus: {
        name: 'Venus Free',
        image: 'assets/VenusFree.png',
        version: '1.16.5'
    }
};

// DOM элементы
const modal = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const downloadBtn = document.getElementById('download-btn');
const notification = document.getElementById('notification');

// Функция открытия модального окна
function openModal(cheatId) {
    const cheat = cheatsData[cheatId];
    
    if (!cheat) return;
    
    // Заполняем данные в модальном окне
    modalTitle.textContent = cheat.name;
    modalImg.src = cheat.image;
    modalImg.alt = cheat.name;
    
    // Показываем модальное окно
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Фокус на модальном окне для accessibility
    modal.focus();
}

// Функция закрытия модального окна
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Функция показа уведомления
function showNotification() {
    notification.classList.add('show');
    
    // Скрываем уведомление через 3 секунды
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Инициализация событий
function initializeEvents() {
    // Обработчики для карточек читов
    const cheatCards = document.querySelectorAll('.cheat-card');
    cheatCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const cheatId = card.dataset.cheat;
            openModal(cheatId);
        });
        
        // Добавляем доступность клавиатуры
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const cheatId = card.dataset.cheat;
                openModal(cheatId);
            }
        });
        
        // Делаем карточки доступными для фокуса
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
    });
    
    // Обработчик закрытия модального окна
    modalClose.addEventListener('click', closeModal);
    
    // Закрытие модального окна по клику на overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Закрытие модального окна по нажатию ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Обработчик кнопки скачивания
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification();
        
        // Можно добавить реальную логику скачивания здесь
        // например, создание и клик по скрытой ссылке
    });
}

// Функция для динамического добавления новых читов
function addCheat(id, name, imagePath, version = '1.16.5') {
    // Добавляем данные в объект
    cheatsData[id] = {
        name: name,
        image: imagePath,
        version: version
    };
    
    // Создаем HTML элемент карточки
    const catalog = document.querySelector('.catalog');
    const cardHTML = `
        <div class="cheat-card" data-cheat="${id}" tabindex="0" role="button">
            <div class="card-image">
                <img src="${imagePath}" alt="${name}" loading="lazy">
            </div>
            <div class="card-content">
                <h3 class="card-title">${name}</h3>
                <div class="card-version">
                    <svg class="version-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                    </svg>
                    <span>${version}</span>
                </div>
            </div>
        </div>
    `;
    
    catalog.insertAdjacentHTML('beforeend', cardHTML);
    
    // Добавляем обработчики событий для новой карточки
    const newCard = catalog.lastElementChild;
    newCard.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(id);
    });
    
    newCard.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(id);
        }
    });
}

// Функция для плавной прокрутки страницы
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Функция для обработки ошибок загрузки изображений
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', (e) => {
            // Создаем fallback изображение
            const fallbackSvg = `
                <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="200" fill="#1a1a1a"/>
                    <path d="M100 80L120 100L100 120L80 100L100 80Z" fill="#ff0000"/>
                    <rect x="70" y="130" width="60" height="4" fill="#666"/>
                    <rect x="80" y="140" width="40" height="4" fill="#666"/>
                </svg>
            `;
            
            const canvas = document.createElement('canvas');
            canvas.width = 200;
            canvas.height = 200;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(0, 0, 200, 200);
            
            // Простой fallback
            e.target.style.background = '#1a1a1a';
            e.target.style.display = 'flex';
            e.target.style.alignItems = 'center';
            e.target.style.justifyContent = 'center';
            e.target.style.color = '#666';
            e.target.style.fontSize = '14px';
            e.target.innerHTML = 'Изображение не найдено';
        });
    });
}

// Функция для анимации появления карточек
function animateCards() {
    const cards = document.querySelectorAll('.cheat-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    initializeEvents();
    smoothScroll();
    handleImageErrors();
    animateCards();
    
    // Логируем, что приложение запущено
    console.log('Minecraft Cheats Catalog - Готов к работе!');
});

// Экспорт функции для добавления новых читов (для удобства разработки)
window.addCheat = addCheat;
