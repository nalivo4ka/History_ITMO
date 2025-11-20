document.addEventListener('DOMContentLoaded', function() {
    const slides = Array.from(document.querySelectorAll('.slide'));
    const prevArea = document.getElementById('prevArea');
    const nextArea = document.getElementById('nextArea');
    const tabs = document.querySelectorAll('.tab-btn');
    
    let currentIndex = 0;

    // Функция обновления локального счетчика (Слайд X из Y внутри раздела)
    function updateLocalCounter(slideElement) {
        const sectionId = slideElement.getAttribute('data-section');
        // Находим все слайды этого раздела
        const sectionSlides = slides.filter(s => s.getAttribute('data-section') === sectionId);
        
        // Находим индекс текущего слайда внутри массива этого раздела
        const localIndex = sectionSlides.indexOf(slideElement) + 1;
        const totalInSection = sectionSlides.length;
        
        // Ищем элемент счетчика внутри текущего слайда
        const counterEl = slideElement.querySelector('.local-counter');
        if (counterEl) {
            counterEl.textContent = `Слайд ${localIndex} из ${totalInSection}`;
        }
    }

    function showSlide(index) {
        // Убираем активность
        slides.forEach(slide => slide.classList.remove('active'));
        
        const currentSlide = slides[index];
        currentSlide.classList.add('active');
        
        // Обновляем вкладки
        const currentSection = currentSlide.getAttribute('data-section');
        tabs.forEach(tab => {
            if (tab.getAttribute('data-target-section') === currentSection) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Обновляем счетчик конкретно для этого слайда
        updateLocalCounter(currentSlide);
    }

    // Инициализация первого слайда
    showSlide(currentIndex);

    // Навигация Вперед
    nextArea.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        showSlide(currentIndex);
    });

    // Навигация Назад
    prevArea.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }
        showSlide(currentIndex);
    });

    // Вкладки
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetSection = tab.getAttribute('data-target-section');
            const targetIndex = slides.findIndex(slide => slide.getAttribute('data-section') === targetSection);
            
            if (targetIndex !== -1) {
                currentIndex = targetIndex;
                showSlide(currentIndex);
            }
        });
    });

    // Клавиатура
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextArea.click();
        if (e.key === 'ArrowLeft') prevArea.click();
    });
});