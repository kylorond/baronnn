document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                document.getElementById('loading').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loading').style.display = 'none';
                }, 500);
            }, 1000);

            AOS.init({
                duration: 800,
                once: true,
                offset: 100
            });

            const images = document.querySelectorAll('.carousel-image');
            if (images.length > 0) {
                let currentImageIndex = 0;
                images[0].classList.add('active');

                const showNextImage = () => {
                    images[currentImageIndex].classList.remove('active');
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                    images[currentImageIndex].classList.add('active');
                }
                setInterval(showNextImage, 5000);
            }

            const particlesContainer = document.getElementById('particles');
            if (particlesContainer) {
                for (let i = 0; i < 50; i++) {
                    const particle = document.createElement('div');
                    particle.classList.add('particle');

                    const size = Math.random() * 10 + 2;
                    const posX = Math.random() * 100;
                    const posY = Math.random() * 100;
                    const delay = Math.random() * 5;
                    const duration = Math.random() * 5 + 5;

                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    particle.style.left = `${posX}%`;
                    particle.style.top = `${posY}%`;
                    particle.style.animationDelay = `${delay}s`;
                    particle.style.animationDuration = `${duration}s`;

                    particlesContainer.appendChild(particle);
                }
            }

            const statElements = document.querySelectorAll('.stat-number');
            const options = {
                threshold: 0.5
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const target = parseInt(element.getAttribute('data-count'));
                        let count = 0;
                        const duration = 2000;
                        const increment = target / (duration / 16);

                        const updateCount = () => {
                            if (count < target) {
                                count += increment;
                                element.textContent = Math.ceil(count);
                                requestAnimationFrame(updateCount);
                            } else {
                                element.textContent = target;
                            }
                        };

                        updateCount();
                        observer.unobserve(element);
                    }
                });
            }, options);

            statElements.forEach(el => {
                observer.observe(el);
            });

            window.addEventListener('scroll', () => {
                const backToTop = document.querySelector('.back-to-top');
                if (window.scrollY > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });

            const contactForm = document.querySelector('form');
            if (contactForm) {
                contactForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    alert('Terima kasih! Pesan Anda telah dikirim. Kami akan segera menghubungi Anda.');
                    contactForm.reset();
                });
            }

            const navbar = document.getElementById('navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    navbar.classList.add('navbar-solid');
                    navbar.classList.remove('navbar-transparent');
                } else {
                    navbar.classList.remove('navbar-solid');
                    navbar.classList.add('navbar-transparent');
                }
            });

            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();

                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;

                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            document.querySelectorAll('.mobile-menu-item, .mobile-menu-item + div a').forEach(item => {
                item.addEventListener('click', () => {
                    mobileMenuOpen = false;
                });
            });
        });
