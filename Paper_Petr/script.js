document.addEventListener('DOMContentLoaded', () => {

    // --- Функция для эффекта "печатной машинки" ---
    const typeWriter = (element) => {
        const text = element.textContent.trim(); // Убираем лишние пробелы
        let originalContent = element.innerHTML; // Сохраняем внутренний HTML
        element.textContent = ''; // Очищаем текст
        element.style.visibility = 'visible'; // Делаем элемент видимым

        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                // После печати можно вернуть исходный HTML, если там были другие теги
                // В данном случае просто убираем курсор
            }
        }, 50); // Скорость печати
    };


    // --- Intersection Observer для анимаций при прокрутке ---
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Анимация появления блока
                entry.target.classList.add('visible');
                
                // Находим заголовки внутри видимого блока для "печати"
                const headers = entry.target.querySelectorAll('[data-typewriter]');
                headers.forEach((header, index) => {
                    // Проверяем, не печатался ли заголовок ранее
                    if (!header.dataset.typed) {
                         // Добавляем задержку для каждого следующего заголовка
                        setTimeout(() => {
                            typeWriter(header);
                        }, index * 200);
                        header.dataset.typed = 'true'; // Помечаем, что анимация выполнена
                    }
                });
                
                // После того как блок стал видимым, его можно больше не отслеживать
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Прячем заголовки до начала анимации
    document.querySelectorAll('[data-typewriter]').forEach(header => {
        header.style.visibility = 'hidden';
    });

    const hiddenElements = document.querySelectorAll('.article.hidden');
    hiddenElements.forEach(el => observer.observe(el));


    // --- Анимация имперской печати ---
    const sealPrompt = document.getElementById('seal-prompt');
    if (sealPrompt) {
        const stampTheSeal = () => {
            sealPrompt.classList.add('stamped');
            sealPrompt.removeEventListener('click', stampTheSeal);
        };
        sealPrompt.addEventListener('click', stampTheSeal);
    }
});