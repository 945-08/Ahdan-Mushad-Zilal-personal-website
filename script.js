document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. THEME TOGGLE (DARK / LIGHT MODE)
       ========================================== */
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector('i');

    // Cek preferensi tema sebelumnya dari localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun'; // Tampilkan ikon matahari saat dark mode
        } else {
            themeIcon.className = 'fa-solid fa-moon'; // Tampilkan ikon bulan saat light mode
        }
    }


    /* ==========================================
       2. MOBILE NAVBAR MENU (HAMBURGER)
       ========================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Menutup menu mobile ketika link navigasi diklik
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    /* ==========================================
       3. TYPING ANIMATION (HERO MOTTO)
       ========================================== */
    const typedTextSpan = document.getElementById('typed-text');
    const words = [
        "Teknologi adalah Alat, Kreativitas adalah Kekuatan",
        "Memanfaatkan AI untuk menyelesaikan masalah",
        "Belajar lewat praktik dan kolaborasi",
        "Terus berkembang dan memberi kontribusi"
    ];
    const typingSpeed = 75;    // kecepatan ketik per karakter (ms)
    const erasingSpeed = 40;   // kecepatan hapus per karakter (ms)
    const newWordDelay = 2000; // jeda waktu sebelum mengetik kata baru (ms)
    let wordIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < words[wordIndex].length) {
            typedTextSpan.textContent += words[wordIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newWordDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = words[wordIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, typingSpeed + 500);
        }
    }

    // Memulai efek animasi ketik pertama kali
    if (words.length) setTimeout(type, 1000);

    /* ==========================================
       3b. LOAD EXTERNAL AVATAR IF PROVIDED
       Checks for common avatar file names under /assets and replaces the SVG.
    ========================================== */
    (function tryLoadAvatar() {
        const imgPaths = ['assets/avatar.jpg', 'assets/avatar.png', 'assets/avatar.webp'];
        const svgEl = document.querySelector('.avatar-svg');
        if (!svgEl) return;

        let loaded = false;
        imgPaths.forEach((path) => {
            if (loaded) return;
            const img = new Image();
            img.src = path;
            img.onload = () => {
                if (loaded) return;
                loaded = true;
                const imgEl = document.createElement('img');
                imgEl.src = path;
                imgEl.alt = 'Foto Profil';
                imgEl.className = 'avatar-img';
                imgEl.style.width = '100%';
                imgEl.style.height = '100%';
                imgEl.style.objectFit = 'cover';
                svgEl.parentNode.replaceChild(imgEl, svgEl);
            };
            img.onerror = () => {
                // ignore and try next
            };
        });
    })();


    /* ==========================================
       4. SCROLL ACTIVE LINK & NAVBAR STICKY
       ========================================== */
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 150; // offset tinggi navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    /* ==========================================
       5. BACK TO TOP BUTTON
       ========================================== */
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    /* ==========================================
       6. FORM HUBUNGI KONTAK (SIMULASI SEND)
       ========================================== */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Mencegah form reload halaman

        // Mengambil nilai input
        const nameInput = document.getElementById('name').value.trim();
        const emailInput = document.getElementById('email').value.trim();
        const messageInput = document.getElementById('message').value.trim();

        if (nameInput === '' || emailInput === '' || messageInput === '') {
            showStatus('Mohon isi semua kolom terlebih dahulu.', 'error');
            return;
        }

        // Tampilkan animasi kirim sederhana
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Mengirim... <i class="fa-solid fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        // Menstimulasi pengiriman data (delay 1.5 detik)
        setTimeout(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            showStatus(`Terima kasih, ${nameInput}! Pesanmu berhasil disimulasikan terkirim.`, 'success');
            contactForm.reset(); // Reset form setelah sukses
        }, 1500);
    });

    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        // Pastikan status terlihat
        formStatus.style.display = 'block';
        // Hilangkan status setelah 5 detik
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
});
