// DOM Elements
const modal = document.getElementById('purchaseModal');
const closeBtn = document.querySelector('.close');
const purchaseForm = document.getElementById('purchaseForm');
const contactForm = document.getElementById('contactForm');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// تسجيل الدخول
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginModal = document.getElementById('loginModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const loginForm = document.getElementById('loginForm');
const welcomeUser = document.getElementById('welcomeUser');

// بيانات مستخدمين افتراضية (يمكنك تعديلها أو تطويرها لاحقاً)
const users = [
    { username: "admin", password: "123456" },
    { username: "user1", password: "pass1" }
];

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Purchase modal functionality
function buyBits(bits, price) {
    // تحويل المستخدم إلى صفحة التذاكر أو الدعم
    window.open('https://discord.gg/4mBfSVHzTD', '_blank');
    showNotification('تم تحويلك لفتح تذكرة دعم. يرجى التواصل معنا هناك لتحديد موعد التسليم!', 'info');
}
// Close modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Handle purchase form submission
purchaseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('robloxUsername').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const bits = document.getElementById('modalBits').textContent;
    const price = document.getElementById('modalPrice').textContent;
    
    if (!username || !paymentMethod) {
        showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    if (paymentMethod === 'robux') {
        // تحويل المستخدم إلى صفحة المتجر في روبلوكس
        window.open('https://www.roblox.com/games/126986053067803/mat3ar-temchees-Place#store', '_blank');
        showNotification('تم تحويلك إلى صفحة الشراء في روبلوكس. أكمل عملية الشراء هناك!', 'info');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        purchaseForm.reset();
        return;
    }
    
    // Simulate purchase process
    showNotification('جاري معالجة طلبك...', 'info');
    
    setTimeout(() => {
        // Here you would typically send the data to your backend
        console.log('Purchase Details:', {
            username,
            paymentMethod,
            bits,
            price
        });
        
        showNotification('تم إرسال طلبك بنجاح! سنتواصل معك قريباً', 'success');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        purchaseForm.reset();
    }, 2000);
});

// Handle contact form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    // Simulate sending message
    showNotification('جاري إرسال رسالتك...', 'info');
    
    setTimeout(() => {
        console.log('Contact Form:', { name, email, message });
        showNotification('تم إرسال رسالتك بنجاح! سنرد عليك قريباً', 'success');
        contactForm.reset();
    }, 1500);
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex: 1;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1rem;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        }
        .notification-close:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#28a745';
        case 'error': return '#dc3545';
        case 'warning': return '#ffc107';
        default: return '#667eea';
    }
}

// Add scroll effects
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Add loading animation for buttons
document.querySelectorAll('.buy-button, .submit-button, .purchase-button').forEach(button => {
    button.addEventListener('click', function() {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
        }, 2000);
    });
});

// Add hover effects for product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '') + 
                                    (counter.textContent.includes('%') ? '%' : '') +
                                    (counter.textContent.includes('K') ? 'K' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent.replace(/^\d+/, target);
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when about section is visible
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    observer.observe(aboutSection);
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Initialize tooltips for better UX
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.dataset.tooltip;
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                font-size: 0.8rem;
                z-index: 1000;
                pointer-events: none;
                white-space: nowrap;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });
        
        element.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// نقل جميع ربط الأحداث إلى داخل DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {
    // زر تغيير اللغة
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            setLanguage(currentLang === 'ar' ? 'en' : 'ar');
        });
        langToggle.innerHTML = `<i class='fas fa-globe'></i> <span class='lang-text'>${currentLang === 'ar' ? 'EN' : 'عربي'}</span>`;
    }
    // تسجيل الدخول
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginModal = document.getElementById('loginModal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const loginForm = document.getElementById('loginForm');
    const welcomeUser = document.getElementById('welcomeUser');
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    const registerModal = document.getElementById('registerModal');
    const closeRegisterModal = document.getElementById('closeRegisterModal');
    const registerForm = document.getElementById('registerForm');

    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', () => {
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    if (closeLoginModal && loginModal) {
        closeLoginModal.addEventListener('click', () => {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    if (loginModal) {
        window.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    if (showRegisterBtn && registerModal && loginModal) {
        showRegisterBtn.addEventListener('click', () => {
            loginModal.style.display = 'none';
            registerModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    if (closeRegisterModal && registerModal) {
        closeRegisterModal.addEventListener('click', () => {
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    if (registerModal) {
        window.addEventListener('click', (e) => {
            if (e.target === registerModal) {
                registerModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('registerUsername').value.trim();
            const password = document.getElementById('registerPassword').value;
            if (!username || !password) {
                showNotification('يرجى إدخال اسم المستخدم وكلمة المرور', 'error');
                return;
            }
            let usersArr = JSON.parse(localStorage.getItem('robloxBitsUsers')) || users;
            if (usersArr.find(u => u.username === username)) {
                showNotification('اسم المستخدم مستخدم بالفعل، اختر اسم آخر', 'error');
                return;
            }
            usersArr.push({ username, password });
            localStorage.setItem('robloxBitsUsers', JSON.stringify(usersArr));
            showNotification('تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن.', 'success');
            registerModal.style.display = 'none';
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            registerForm.reset();
        });
    }
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value;
            let usersArr = JSON.parse(localStorage.getItem('robloxBitsUsers')) || users;
            const user = usersArr.find(u => u.username === username && u.password === password);
            if (!user) {
                showNotification('اسم المستخدم أو كلمة المرور غير صحيحة', 'error');
                return;
            }
            localStorage.setItem('robloxBitsUser', username);
            showNotification('مرحباً بك يا ' + username + '!', 'success');
            setUserUI(username);
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            loginForm.reset();
        });
    }
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('هل أنت متأكد أنك تريد تسجيل الخروج؟ سيتم فقدان اسم المستخدم.')) {
                localStorage.removeItem('robloxBitsUser');
                setUserUI(null);
                showNotification('تم تسجيل الخروج بنجاح', 'warning');
            }
        });
    }
    // عند تحميل الصفحة تحقق من حالة الدخول
    const username = localStorage.getItem('robloxBitsUser');
    setUserUI(username);
    // تحقق من وجود حقل الإيميل قبل إضافة الحدث
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#dc3545';
                showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
            } else {
                this.style.borderColor = '#28a745';
            }
        });
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Add form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add loading state for the entire page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add a subtle entrance animation
    const elements = document.querySelectorAll('.hero-content, .product-card, .feature');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}); 

const langToggle = document.getElementById('langToggle');
const htmlTag = document.documentElement;
const heroWelcome = document.getElementById('heroWelcome');

// نصوص الموقع باللغتين
const translations = {
    ar: {
        home: 'الرئيسية', products: 'المنتجات', about: 'حولنا', contact: 'اتصل بنا',
        login: 'دخول', logout: 'خروج', welcome: 'مرحباً، ',
        heroTitle: 'أفضل البتات لخريطة Steal a Brainrot',
        heroSubtitle: 'احصل على البتات بأفضل الأسعار وأسرع التوصيل',
        shopNow: 'تسوق الآن',
        faq: 'الأسئلة الشائعة',
        faqQ1: 'كيف أستلم البتات بعد الشراء؟', faqA1: 'سيتم التواصل معك عبر ديسكورد أو روبلوكس لتسليم البتات خلال دقائق.',
        faqQ2: 'هل يمكنني الدفع بروبوكس فقط؟', faqA2: 'نعم، يمكنك الدفع بروبوكس أو بطرق أخرى مثل البطاقات والعملات الرقمية.',
        faqQ3: 'هل يوجد ضمان استرداد؟', faqA3: 'نعم، إذا واجهت أي مشكلة ولم تستلم البتات يمكنك استرداد أموالك بالكامل.',
        // ... أضف باقي النصوص حسب الحاجة
    },
    en: {
        home: 'Home', products: 'Products', about: 'About', contact: 'Contact',
        login: 'Login', logout: 'Logout', welcome: 'Welcome, ',
        heroTitle: 'Best Bits for Steal a Brainrot Map',
        heroSubtitle: 'Get bits at the best prices and fastest delivery',
        shopNow: 'Shop Now',
        faq: 'FAQ',
        faqQ1: 'How do I receive bits after purchase?', faqA1: 'We will contact you via Discord or Roblox to deliver your bits within minutes.',
        faqQ2: 'Can I pay with Robux only?', faqA2: 'Yes, you can pay with Robux or other methods like cards and crypto.',
        faqQ3: 'Is there a refund guarantee?', faqA3: 'Yes, if you face any issue and do not receive your bits, you can get a full refund.',
        // ... add more as needed
    }
};
let currentLang = 'ar';

function setLanguage(lang) {
    currentLang = lang;
    // تغيير اتجاه الصفحة
    htmlTag.lang = lang;
    htmlTag.dir = lang === 'ar' ? 'rtl' : 'ltr';
    // تغيير زر اللغة
    langToggle.innerHTML = `<i class="fas fa-globe"></i> ${lang === 'ar' ? 'EN' : 'عربي'}`;
    // تغيير نصوص القائمة
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks[0].textContent = translations[lang].home;
    navLinks[1].textContent = translations[lang].products;
    navLinks[2].textContent = translations[lang].about;
    navLinks[3].textContent = translations[lang].contact;
    // أزرار الدخول والخروج
    loginBtn.innerHTML = `<i class="fas fa-user"></i> ${translations[lang].login}`;
    logoutBtn.innerHTML = `<i class="fas fa-sign-out-alt"></i> ${translations[lang].logout}`;
    // الهيرو
    document.querySelector('.hero-title').textContent = translations[lang].heroTitle;
    document.querySelector('.hero-subtitle').textContent = translations[lang].heroSubtitle;
    document.querySelector('.cta-button').textContent = translations[lang].shopNow;
    // الأسئلة الشائعة
    document.querySelector('.section-title').textContent = translations[lang].faq;
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length >= 3) {
        faqItems[0].querySelector('h3').textContent = translations[lang].faqQ1;
        faqItems[0].querySelector('p').textContent = translations[lang].faqA1;
        faqItems[1].querySelector('h3').textContent = translations[lang].faqQ2;
        faqItems[1].querySelector('p').textContent = translations[lang].faqA2;
        faqItems[2].querySelector('h3').textContent = translations[lang].faqQ3;
        faqItems[2].querySelector('p').textContent = translations[lang].faqA3;
    }
    // ... أضف تبديل باقي النصوص حسب الحاجة
}

// ضمان عمل زر تغيير اللغة دائماً بعد تحميل الصفحة
window.addEventListener('DOMContentLoaded', function() {
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            setLanguage(currentLang === 'ar' ? 'en' : 'ar');
        });
    }
    // تحديث نص الزر ليكون فيه span.lang-text
    if (langToggle) {
        langToggle.innerHTML = `<i class='fas fa-globe'></i> <span class='lang-text'>${currentLang === 'ar' ? 'EN' : 'عربي'}</span>`;
    }
});

// عند تسجيل الدخول أظهر رسالة ترحيب في الهيرو
function setHeroWelcome(username) {
    if (username) {
        heroWelcome.style.display = 'block';
        heroWelcome.textContent = translations[currentLang].welcome + username + ' 👋';
    } else {
        heroWelcome.style.display = 'none';
    }
} 

// زر صعود لأعلى
window.addEventListener('DOMContentLoaded', function() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    // تفعيل تأثير ظهور العناصر
    const animatedSections = document.querySelectorAll('[data-animate]');
    const animateOnScroll = () => {
        animatedSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                section.classList.add('animate-fade-in', 'visible');
            }
        });
    };
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // عند التحميل
}); 