document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const body = document.body;
    const mainHeader = document.getElementById('main-header');
    const themeToggle = document.getElementById('theme-toggle');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('#main-header nav');
    const navLinks = document.querySelectorAll('#main-header nav ul li a');
    const yearSpan = document.getElementById('year');
    
    // --- 1. THEME TOGGLE FUNCTIONALITY (Dark/Light Mode) ---
    
    // Helper function to set the theme state
    function setTheme(isDark) {
        const icon = themeToggle.querySelector('i');
        if (isDark) {
            body.classList.add('dark-theme');
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    }

    // Load saved theme preference on page load
    const savedTheme = localStorage.getItem('theme');
    // Check if system preference is dark (only applies if no theme saved in localStorage)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
        setTheme(true);
    } else {
        setTheme(false);
    }

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTheme(!body.classList.contains('dark-theme'));
        });
    }

    // --- 2. MOBILE MENU & NAVIGATION ---

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            const isMenuOpen = navMenu.classList.contains('active');
            
            icon.classList.replace(isMenuOpen ? 'fa-bars' : 'fa-times', isMenuOpen ? 'fa-times' : 'fa-bars');
        });
    }
    
    // Close menu when a link is clicked
    if (navLinks.length > 0 && navMenu) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                // Ensure the icon resets to fa-bars when menu closes
                const icon = menuToggle.querySelector('i');
                icon.classList.replace('fa-times', 'fa-bars');
            });
        });
    }

    // --- 3. IMPROVED SMOOTH SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                 const headerHeight = mainHeader ? mainHeader.offsetHeight : 0;
                 const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
                 
                 window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                 });
            } else if (targetId === '#home') {
                 // Fallback for home link
                 window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // --- 4. HEADER SHRINK/STICKY ON SCROLL (Bonus Feature) ---
    function handleScroll() {
        if (window.scrollY > 50) {
            mainHeader.classList.add('header-scrolled');
        } else {
            mainHeader.classList.remove('header-scrolled');
        }
    }
    
    if (mainHeader) {
        window.addEventListener('scroll', handleScroll);
        // Run once on load to check position
        handleScroll();
    }


    // --- 5. AUTOMATIC YEAR IN FOOTER ---
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});