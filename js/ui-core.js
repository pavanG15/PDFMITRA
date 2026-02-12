/**
 * PDFMitra UI Core
 * Automatically injects the shared Navbar and Footer into standalone pages.
 */

(function () {
    // 1. Determine base path relative to the root (where index.html sits)
    const scripts = document.getElementsByTagName('script');
    let basePath = './';
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.endsWith('ui-core.js')) {
            const pathParts = scripts[i].src.split('/');
            // If the script is in /js/, the root is one level up from /js/
            const jsIndex = pathParts.indexOf('js');
            if (jsIndex > -1) {
                // This is a bit complex for file:// - let's simplify for this project structure
                // Assuming script is included as src="js/ui-core.js" or "../js/ui-core.js"
            }
        }
    }

    // SIMPLIFIED PATH DETECTION for PDFMitra
    // If we are in /blog/article-1.html, we need ../
    const isSubdir = window.location.pathname.includes('/blog/');
    const relPath = isSubdir ? '../' : './';

    // 2. Inject Styles and Fonts
    const head = document.head;
    const links = `
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
            :root {
                --primary: #00897b;
                --primary-dark: #004d40;
                --accent: #fb8c00;
                --bg: #f8fafc;
                --text-dark: #1f2937;
                --text-light: #64748b;
                --footer-bg: #002b26;
                --glass: rgba(255, 255, 255, 0.8);
            }
            body { 
                margin: 0; 
                font-family: 'Poppins', sans-serif; 
                background: 
                    radial-gradient(at 0% 0%, rgba(0, 137, 123, 0.04) 0px, transparent 50%),
                    radial-gradient(at 100% 0%, rgba(251, 140, 0, 0.04) 0px, transparent 50%),
                    linear-gradient(135deg, #f0fdfa 0%, #f8fafc 100%);
                background-attachment: fixed;
                color: var(--text-dark);
                display: flex;
                flex-direction: column;
                min-height: 100vh;
            }
            .navbar {
                background: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(16px) saturate(180%);
                -webkit-backdrop-filter: blur(16px) saturate(180%);
                padding: 15px 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.02);
                position: sticky;
                top: 0;
                z-index: 1000;
                border-bottom: 1px solid rgba(255, 255, 255, 0.4);
            }
            .logo-wrapper {
                display: flex;
                align-items: center;
                transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .logo-wrapper:hover {
                transform: scale(1.05);
            }
            .logo img {
                height: 68px;
                width: auto;
                display: block;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.05));
            }
            .nav-links { display: flex; gap: 30px; align-items: center; }
            .nav-links a { 
                text-decoration: none; 
                color: var(--text-dark); 
                font-weight: 600; 
                font-size: 15px; 
                transition: all 0.3s;
                opacity: 0.8;
            }
            .nav-links a:hover { color: var(--primary); opacity: 1; }
            
            .nav-search-wrapper { position: relative; flex: 1; max-width: 350px; display: flex; align-items: center; margin: 0 40px; }
            .nav-search-input { 
                width: 100%; 
                padding: 10px 15px 10px 42px; 
                border-radius: 14px; 
                border: 1.5px solid rgba(0, 137, 123, 0.1); 
                background: rgba(255, 255, 255, 0.6);
                font-size: 14px; 
                font-weight: 500;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .nav-search-input:focus {
                outline: none;
                border-color: var(--primary);
                background: white;
                box-shadow: 0 10px 25px rgba(0, 137, 123, 0.08);
            }
            .nav-search-icon { position: absolute; left: 16px; color: var(--primary); font-size: 14px; opacity: 0.6; }

            /* Premium Footer Styles */
            .site-footer {
                background: var(--footer-bg);
                color: rgba(255, 255, 255, 0.8);
                padding: 80px 40px 30px;
                margin-top: auto;
                font-size: 14px;
            }
            .footer-grid {
                max-width: 1200px;
                margin: 0 auto;
                display: grid;
                grid-template-columns: 2.5fr 1fr 1fr 1fr;
                gap: 50px;
                margin-bottom: 60px;
            }
            .footer-brand p {
                line-height: 1.6;
                margin-top: 20px;
                max-width: 300px;
            }
            .footer-logo-wrap {
                background: white;
                padding: 10px 18px;
                border-radius: 12px;
                display: inline-block;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }
            .footer-logo-wrap img { height: 54px; width: auto; display: block; }
            .footer-col h4 {
                color: white;
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 25px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .footer-links { list-style: none; padding: 0; margin: 0; }
            .footer-links li { margin-bottom: 15px; }
            .footer-links a {
                color: rgba(255, 255, 255, 0.6);
                text-decoration: none;
                transition: all 0.3s;
                font-weight: 500;
            }
            .footer-links a:hover {
                color: white;
                padding-left: 5px;
            }
            .footer-bottom {
                max-width: 1200px;
                margin: 0 auto;
                padding-top: 30px;
                border-top: 1px solid rgba(255, 255, 255, 0.05);
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 20px;
                font-size: 12px;
                opacity: 0.6;
            }
            .india-tag {
                background: rgba(251, 140, 0, 0.1);
                color: var(--accent);
                padding: 4px 12px;
                border-radius: 20px;
                font-weight: 700;
                display: inline-flex;
                align-items: center;
                gap: 6px;
            }

            /* --- NEW BUTTON STYLES (Step Id: 105) --- */
            .btn-primary-new, .btn-main.btn-primary, .upload-section .btn-primary, .upload-card .btn-primary {
                background: var(--primary) !important;
                color: white !important;
                padding: 12px 30px !important;
                border-radius: 50px !important;
                font-weight: 600 !important;
                font-size: 16px !important;
                border: none !important;
                cursor: pointer !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 12px !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                text-decoration: none !important;
                box-shadow: 0 4px 15px rgba(0, 137, 123, 0.2) !important;
                width: fit-content !important;
                height: auto !important;
                min-height: 48px !important;
            }

            .btn-primary-new:hover, .btn-main.btn-primary:hover, .upload-section .btn-primary:hover, .upload-card .btn-primary:hover {
                background: var(--primary-dark) !important;
                transform: translateY(-2px) !important;
                box-shadow: 0 6px 20px rgba(0, 137, 123, 0.3) !important;
            }

            .btn-primary-new i, .btn-main.btn-primary i, .upload-section .btn-primary i, .upload-card .btn-primary i {
                font-size: 20px !important;
            }

            /* Logo Image Styling */
            .logo img {
                height: 42px;
                width: auto;
                object-fit: contain;
            }

            /* Mobile Menu Toggle */
            .mobile-menu-toggle {
                display: none;
                background: none;
                border: none;
                font-size: 24px;
                color: var(--primary);
                cursor: pointer;
                padding: 8px;
            }

            @media (max-width: 768px) {
                .navbar { 
                    padding: 12px 15px; 
                    flex-wrap: wrap;
                    gap: 12px;
                }
                .logo { font-size: 22px; }
                .logo-icon { font-size: 26px; }
                
                /* Show hamburger menu on mobile */
                .mobile-menu-toggle {
                    display: block;
                }
                
                /* Hide nav links by default on mobile */
                .nav-links { 
                    display: none;
                    flex-direction: column;
                    width: 100%;
                    order: 4;
                    gap: 0;
                    background: white;
                    padding: 10px 0;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                
                /* Show nav links when active */
                .nav-links.active {
                    display: flex;
                }
                
                .nav-links a {
                    padding: 12px 20px;
                    border-bottom: 1px solid var(--border);
                }
                
                .nav-links a:last-child {
                    border-bottom: none;
                }
                
                .nav-search-wrapper { 
                    flex: 1 1 100%;
                    max-width: 100%;
                    margin: 0;
                    order: 3;
                }
                .nav-search-input {
                    padding: 12px 12px 12px 40px;
                    font-size: 15px;
                }
            }
        </style>
    `;
    head.insertAdjacentHTML('beforeend', links);

    // 3. Inject Navbar
    if (!document.querySelector('.navbar')) {
        const navbarHTML = `
            <nav class="navbar">
                <a href="${relPath}index.html" class="logo">
                    <div class="logo-wrapper">
                        <img src="${relPath}assets/logo.png" alt="PDFMitra">
                    </div>
                </a>
                <div class="nav-search-wrapper">
                    <i class="fas fa-search nav-search-icon"></i>
                    <input type="text" class="nav-search-input" placeholder="Quick find tools..." 
                        onkeyup="if(event.key === 'Enter') window.location.href='${relPath}index.html?search=' + encodeURIComponent(this.value)">
                </div>
                <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle menu">
                    <i class="fas fa-bars"></i>
                </button>
                <div class="nav-links" id="navLinks">
                    <a href="${relPath}index.html">All Tools</a>
                    <a href="${relPath}about.html">About Us</a>
                    <a href="${relPath}blog/index.html">Blog</a>
                    <a href="${relPath}donate.html">Donate</a>
                </div>
            </nav>
        `;
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);

        // Mobile menu toggle functionality
        setTimeout(() => {
            const menuToggle = document.getElementById('mobileMenuToggle');
            const navLinks = document.getElementById('navLinks');

            if (menuToggle && navLinks) {
                menuToggle.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                    const icon = menuToggle.querySelector('i');
                    if (navLinks.classList.contains('active')) {
                        icon.className = 'fas fa-times';
                    } else {
                        icon.className = 'fas fa-bars';
                    }
                });
            }
        }, 100);
    }

    // --- FOOTER INJECTION ---
    window.addEventListener('load', () => {
        if (!document.querySelector('footer.site-footer')) {
            const footerHTML = `
            <footer class="site-footer">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <div class="footer-logo-wrap">
                            <img src="${relPath}assets/logo.png" alt="PDFMitra">
                        </div>
                        <p>Join millions of users who rely on PDFMitra for secure, local-first PDF processing. Professional results, zero data leaves your device.</p>
                    </div>
                    
                    <div class="footer-col">
                        <h4>Popular Tools</h4>
                        <ul class="footer-links">
                            <li><a href="${relPath}merge.html">Merge PDF</a></li>
                            <li><a href="${relPath}compress.html">Compress PDF</a></li>
                            <li><a href="${relPath}pdf-to-word.html">PDF to Word</a></li>
                            <li><a href="${relPath}unlock.html">Unlock PDF</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-col">
                        <h4>Company</h4>
                        <ul class="footer-links">
                            <li><a href="${relPath}about.html">About Us</a></li>
                            <li><a href="${relPath}blog/index.html">Blog</a></li>
                            <li><a href="${relPath}privacy.html">Privacy Policy</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-col">
                        <h4>Support</h4>
                        <ul class="footer-links">
                            <li><a href="${relPath}donate.html" style="color: var(--accent);">Donate</a></li>
                            <li><a href="mailto:support@pdfmitra.com">Contact Us</a></li>
                            <li><a href="${relPath}layout.html?page=faq">FAQ</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>© 2026 PDFMitra. All rights reserved.</p>
                    <div class="india-tag">
                        <span>🇮🇳</span> Proudly Made in India
                    </div>
                    <p>Designed with ❤️ for a Secure Web.</p>
                </div>
            </footer>
            `;

            const existingFooter = document.querySelector('footer');
            if (existingFooter) {
                existingFooter.outerHTML = footerHTML;
            } else {
                document.body.insertAdjacentHTML('beforeend', footerHTML);
            }
        }
    });
})();
