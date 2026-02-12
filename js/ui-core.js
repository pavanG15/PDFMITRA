/**
 * PDFMitra UI Core - Fixed & Polished
 * - Injects Navbar & Footer
 * - Handles JPG Logo on Dark Footer (Badge Style)
 * - Mobile Menu Logic
 */

(function () {
    // 1. Determine base path (Handle subdirectories like /blog/)
    const isSubdir = window.location.pathname.includes('/blog/');
    const relPath = isSubdir ? '../' : './';

    // 2. Inject CSS Styles & Fonts
    const head = document.head;
    const styleHTML = `
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
            :root {
                --primary: #00897b;
                --primary-dark: #004d40;
                --accent: #fb8c00;
                --text-dark: #1f2937;
                --text-light: #64748b;
                --footer-bg: #002b26; /* Dark Green from your screenshot */
            }

            /* --- Navbar Styles --- */
            .navbar {
                background: rgba(255, 255, 255, 0.95);
                padding: 15px 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
                position: sticky;
                top: 0;
                z-index: 1000;
                border-bottom: 1px solid rgba(0,0,0,0.05);
            }
            .logo-wrapper img { height: 42px; width: auto; display: block; }
            
            .nav-search-wrapper { 
                position: relative; flex: 1; max-width: 400px; margin: 0 40px; 
                display: flex; align-items: center; 
            }
            .nav-search-input { 
                width: 100%; padding: 10px 15px 10px 40px; border-radius: 50px; 
                border: 1px solid #e2e8f0; background: #f8fafc; font-size: 14px; 
            }
            .nav-search-icon { position: absolute; left: 15px; color: var(--text-light); }

            .nav-links { display: flex; gap: 25px; align-items: center; }
            .nav-links a { 
                text-decoration: none; color: var(--text-dark); 
                font-weight: 600; font-size: 15px; transition: 0.3s; 
            }
            .nav-links a:hover { color: var(--primary); }

            /* --- Footer Styles --- */
            .site-footer {
                background: var(--footer-bg);
                color: rgba(255, 255, 255, 0.8);
                padding: 60px 40px 20px;
                margin-top: auto;
                font-size: 14px;
            }
            .footer-grid {
                max-width: 1200px; margin: 0 auto;
                display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
                gap: 40px; margin-bottom: 50px;
            }
            
            /* The FIX for JPG Logo on Dark Background */
            .footer-logo-badge {
                background: white;
                padding: 10px 20px;
                border-radius: 12px;
                display: inline-block;
                margin-bottom: 20px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            }
            .footer-logo-badge img { height: 38px; width: auto; display: block; }

            .footer-col h4 { 
                color: white; font-weight: 700; margin-bottom: 20px; 
                text-transform: uppercase; letter-spacing: 1px; font-size: 14px;
            }
            .footer-links { list-style: none; padding: 0; margin: 0; }
            .footer-links li { margin-bottom: 12px; }
            .footer-links a { 
                color: rgba(255, 255, 255, 0.6); text-decoration: none; transition: 0.3s; 
            }
            .footer-links a:hover { color: var(--accent); padding-left: 5px; }

            .footer-bottom {
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                padding-top: 20px;
                text-align: center;
                font-size: 13px;
                opacity: 0.7;
                max-width: 1200px; margin: 0 auto;
                display: flex; justify-content: space-between; flex-wrap: wrap;
            }

            /* Mobile Responsive */
            .mobile-menu-toggle { display: none; font-size: 24px; color: var(--primary); background:none; border:none; }
            @media (max-width: 768px) {
                .navbar { padding: 15px 20px; flex-wrap: wrap; }
                .nav-links { display: none; width: 100%; flex-direction: column; padding-top: 20px; }
                .nav-links.active { display: flex; }
                .mobile-menu-toggle { display: block; }
                .nav-search-wrapper { order: 3; width: 100%; margin: 15px 0 0; max-width: none; }
                .footer-grid { grid-template-columns: 1fr; gap: 30px; text-align: center; }
                .footer-logo-badge { display: inline-block; } /* Center logo on mobile */
                .footer-bottom { flex-direction: column; gap: 10px; }
            }
        </style>
    `;
    head.insertAdjacentHTML('beforeend', styleHTML);

    // 3. Inject Navbar (If not present)
    if (!document.querySelector('.navbar')) {
        const navbarHTML = `
            <nav class="navbar">
                <a href="${relPath}index.html" class="logo-wrapper">
                    <img src="${relPath}logo.jpg" alt="PDFMitra Logo">
                </a>
                
                <div class="nav-search-wrapper">
                    <i class="fas fa-search nav-search-icon"></i>
                    <input type="text" class="nav-search-input" placeholder="Quick find tools..." 
                           onkeyup="if(event.key === 'Enter') window.location.href='${relPath}index.html?search=' + encodeURIComponent(this.value)">
                </div>

                <button class="mobile-menu-toggle" id="mobileMenuToggle">
                    <i class="fas fa-bars"></i>
                </button>

                <div class="nav-links" id="navLinks">
                    <a href="${relPath}index.html">All Tools</a>
                    <a href="${relPath}about.html">About Us</a>
                    <a href="${relPath}blog/index.html">Blog</a>
                    <a href="${relPath}contact.html">Contact</a>
                </div>
            </nav>
        `;
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);

        // Mobile Menu Logic (Fixed the broken code)
        setTimeout(() => {
            const menuToggle = document.getElementById('mobileMenuToggle');
            const navLinks = document.getElementById('navLinks');
            
            if (menuToggle && navLinks) {
                menuToggle.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                    const icon = menuToggle.querySelector('i');
                    if (navLinks.classList.contains('active')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                    } else {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                });
            }
        }, 100);
    }

    // 4. Inject Footer (If not present)
    if (!document.querySelector('.site-footer')) {
        const footerHTML = `
            <footer class="site-footer">
                <div class="footer-grid">
                    <div class="footer-col">
                        <div class="footer-logo-badge">
                            <img src="${relPath}logo.jpg" alt="PDFMitra">
                        </div>
                        <p style="line-height: 1.6;">
                            Making PDF management simple, fast, and secure for everyone. 
                            100% client-side processing ensuring your data never leaves your device.
                        </p>
                    </div>
                    
                    <div class="footer-col">
                        <h4>Tools</h4>
                        <ul class="footer-links">
                            <li><a href="${relPath}merge.html">Merge PDF</a></li>
                            <li><a href="${relPath}split.html">Split PDF</a></li>
                            <li><a href="${relPath}compress.html">Compress PDF</a></li>
                            <li><a href="${relPath}pdf-to-word.html">PDF to Word</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-col">
                        <h4>Company</h4>
                        <ul class="footer-links">
                            <li><a href="${relPath}about.html">About Us</a></li>
                            <li><a href="${relPath}blog/index.html">Blog</a></li>
                            <li><a href="${relPath}terms.html">Terms of Service</a></li>
                            <li><a href="${relPath}privacy.html">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div class="footer-col">
                        <h4>Connect</h4>
                        <ul class="footer-links">
                            <li><a href="#"><i class="fab fa-twitter"></i> Twitter</a></li>
                            <li><a href="#"><i class="fab fa-facebook"></i> Facebook</a></li>
                            <li><a href="#"><i class="fab fa-instagram"></i> Instagram</a></li>
                            <li><a href="mailto:support@pdfmitra.com">Email Us</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <span>© ${new Date().getFullYear()} PDFMitra. All rights reserved.</span>
                    <span>Made with <i class="fas fa-heart" style="color:#fb8c00;"></i> in India</span>
                </div>
            </footer>
        `;
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
})();
