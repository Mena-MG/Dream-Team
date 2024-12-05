document.addEventListener('DOMContentLoaded', function() {
    // Slider class to handle multiple sliders
    class Slider {
        constructor(container, options = {}) {
            this.container = container;
            this.cards = container.querySelector('.coach-cards, .testimonial-cards');
            this.prevBtn = container.querySelector('.prev');
            this.nextBtn = container.querySelector('.next');
            this.dots = [...container.nextElementSibling.querySelectorAll('.dot')];
            
            this.currentIndex = 0;
            this.cardWidth = options.cardWidth || this.cards.children[0].offsetWidth + 32; // Including gap
            this.totalCards = this.cards.children.length;
            this.autoplayInterval = options.autoplayInterval || 5000;
            
            this.initializeSlider();
        }

        initializeSlider() {
            // Add button listeners
            this.prevBtn.addEventListener('click', () => this.slideTo(this.currentIndex - 1));
            this.nextBtn.addEventListener('click', () => this.slideTo(this.currentIndex + 1));
            
            // Add dot listeners
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.slideTo(index));
            });

            // Start autoplay
            this.startAutoplay();

            // Pause autoplay on hover
            this.container.addEventListener('mouseenter', () => this.stopAutoplay());
            this.container.addEventListener('mouseleave', () => this.startAutoplay());
        }

        slideTo(index) {
            if (index < 0) {
                index = this.totalCards - 1;
            } else if (index >= this.totalCards) {
                index = 0;
            }
            
            this.currentIndex = index;
            this.cards.style.transform = `translateX(-${this.currentIndex * this.cardWidth}px)`;
            this.updateDots();
        }

        updateDots() {
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
        }

        startAutoplay() {
            this.stopAutoplay();
            this.autoplayTimer = setInterval(() => {
                this.slideTo(this.currentIndex + 1);
            }, this.autoplayInterval);
        }

        stopAutoplay() {
            if (this.autoplayTimer) {
                clearInterval(this.autoplayTimer);
            }
        }
    }

    // Initialize Coaches Slider
    const coachesSlider = new Slider(document.querySelector('.coaches-slider'), {
        autoplayInterval: 5000
    });

    // Initialize Testimonials Slider
    const testimonialsSlider = new Slider(document.querySelector('.testimonials-slider'), {
        autoplayInterval: 6000 // Slightly different timing to avoid synchronization
    });
});
