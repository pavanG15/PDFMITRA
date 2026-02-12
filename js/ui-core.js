/**
 * PDFMitra UI Core - FIXED
 * Automatically injects the Navbar and Footer.
 */

(function () {
    // 1. Determine base path
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
            }
            body { 
                margin: 0; 
                font-family: 'Poppins', sans-serif; 
                background: radial-gradient(at 0% 0%, rgba(0, 137, 123, 0.04) 0px, transparent 50%),
                            radial-gradient(at 100% 0%, rgba(251, 140, 0, 0.04) 0px, transparent 50%),
                            linear-gradient(135deg, #f0fdfa 0%, #f8fafc 100%);
                background-attachment: fixed;
                color: var(--text-dark);
                display: flex;
                flex-direction: column;
                min-height: 100vh;
            }
            
            /* Navbar Styles */
            .navbar {
                background: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
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
            .logo-wrapper { display: flex; align-items: center; transition: transform 0.2s; }
            .logo-wrapper:hover { transform: scale(1.05); }
            
            /* Navbar Logo Sizing */
            .navbar .logo img { height: 45px; width: auto; display: block; }

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
            }
            .nav-search-input:focus { outline: none; border-color: var(--primary); background: white; box-shadow: 0 10px 25px rgba(0, 137, 123, 0.08); }
            .nav-search-icon { position: absolute; left: 16px; color: var(--primary); font-size: 14px; opacity: 0.6; }

            /* Footer Styles */
            .site-footer {
                background: var(--footer-bg);
                color: rgba(255, 255, 255, 0.8);
                padding: 80px 40px 30px;
                margin-top: auto;
                font-size: 14px;
            }
            .footer-grid {
                max-width: 1200px; margin: 0 auto;
                display: grid; grid-template-columns: 2.5fr 1fr 1fr 1fr;
                gap: 50px; margin-bottom: 60px;
            }
            .footer-brand p { line-height: 1.6; margin-top: 20px; max-width: 300px; }
            
            /* Footer Logo Wrapper - Makes JPG look transparent/integrated */
            .footer-logo-wrap {
                background: white;
                padding: 8px 15px;
                border-radius: 8px;
                display: inline-block;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }
            .footer-logo-wrap img { height: 40px; width: auto; display: block; }
            
            .footer-col h4 { color: white; font-size: 16px; font-weight: 700; margin-bottom: 25px; text-transform: uppercase; }
            .footer-links { list-style: none; padding: 0; margin: 0; }
            .footer-links li { margin-bottom: 15px; }
            .footer-links a { color: rgba(255, 255, 255, 0.6); text-decoration: none; transition: all 0.3s; }
            .footer-links a:hover { color: white; padding-left: 5px; }
            
            .footer-bottom {
                max-width: 1200px; margin: 0 auto; padding-top: 30px;
                border-top: 1px solid rgba(255, 255, 255, 0.05);
                display: flex; justify-content: space-between; align-items: center;
                font-size: 12px; opacity: 0.6;
            }

            /* Mobile Menu */
            .mobile-menu-toggle { display: none; background: none; border: none; font-size: 24px; color: var(--primary); cursor: pointer; }
            
            @media (max-width: 768px) {
                .navbar { padding: 12px 15px; flex-wrap: wrap; gap: 12px; }
                .mobile-menu-toggle { display: block; }
                .nav-links { 
                    display: none; flex-direction: column; width: 100%; order: 4; 
                    background: white; padding: 10px 0; border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .nav-links.active { display: flex; }
                .nav-search-wrapper { flex: 1 1 100%; max-width: 100%; margin: 0; order: 3; }
                .footer-grid { grid-template-columns: 1fr; gap: 30px; }
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
                        <img src="${relPath}logo.jpg" alt="PDFMitra">
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
                    <a href="${relPath}contact.html">Contact</a>
                </div>
            </nav>
        `;
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);

        // Mobile Menu Logic
        setTimeout(() => {
            const menuToggle = document.getElementById('mobileMenuToggle');
            const navLinks = document.getElementById('navLinks');
            const icon = menuToggle.querySelector('i');

            if (menuToggle && navLinks) {
                menuToggle.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                    // Toggle Icon
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

    // 4. Inject Footer (This part was missing in your original code)
    if (!document.querySelector('.site-footer')) {
        const footerHTML = `
            <footer class="site-footer">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <div class="footer-logo-wrap">
                            <img src="${relPath}logo.jpg" alt="PDFMitra">
                        </div>
                        <p>Making PDF management simple, fast, and secure for everyone. No installation required.</p>
                    </div>
                    <div class="footer-col">
                        <h4>Tools</h4>
                        <ul class="footer-links">
                            <li><a href="${relPath}merge-pdf.html">Merge PDF</a></li>
                            <li><a href="${relPath}split-pdf.html">Split PDF</a></li>
                            <li><a href="${relPath}compress-pdf.html">Compress</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>Company</h4>
                        <ul class="footer-links">
                            <li><a href="${relPath}about.html">About Us</a></li>
                            <li><a href="${relPath}blog/index.html">Blog</a></li>
                            <li><a href="${relPath}terms.html">Terms</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>Connect</h4>
                        <ul class="footer-links">
                            <li><a href="#"><i class="fab fa-twitter"></i> Twitter</a></li>
                            <li><a href="#"><i class="fab fa-facebook"></i> Facebook</a></li>
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
