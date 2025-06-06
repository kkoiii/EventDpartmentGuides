// Scroll animation for sections
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
});

// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Collapsible Sections
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all collapsible sections
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
    
    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('i');
            
            // Toggle active class
            header.classList.toggle('active');
            content.classList.toggle('active');
            
            // Toggle icon rotation
            if (header.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0)';
            }
        });
    });

    // Progress Bar
    const progressBar = document.querySelector('.progress-bar');
    const planningSection = document.getElementById('planning');
    
    window.addEventListener('scroll', () => {
        if (planningSection) {
            const sectionTop = planningSection.offsetTop;
            const sectionHeight = planningSection.offsetHeight;
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // Calculate progress
            const progress = Math.min(
                100,
                Math.max(
                    0,
                    ((scrollPosition - sectionTop + windowHeight) / (sectionHeight + windowHeight)) * 100
                )
            );
            
            progressBar.style.width = `${progress}%`;
        }
    });

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scroll for Quick Navigation
    const quickNavLinks = document.querySelectorAll('.quick-nav a');
    
    quickNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Adjust based on your header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight Active Section in Quick Navigation
    const sections = document.querySelectorAll('.planning-section, .planning-overview, .positions-box, .activities-box');
    
    function highlightActiveSection() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const correspondingLink = document.querySelector(`.quick-nav a[href="#${section.id}"]`);
                
                if (correspondingLink) {
                    // Remove active class from all links
                    quickNavLinks.forEach(link => link.classList.remove('active'));
                    // Add active class to current link
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Initial check
});