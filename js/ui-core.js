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
                --primary-dark: #00695c;
                --accent: #fb8c00;
                --bg: #f8fafc;
                --text-dark: #1f2937;
                --text-light: #64748b;
                --card-bg: rgba(255, 255, 255, 0.95);
                --border: #e2e8f0;
                --shadow: 0 4px 20px -5px rgba(0, 137, 123, 0.1);
                --glass: rgba(255, 255, 255, 0.8);
            }
            body { 
                margin: 0; 
                font-family: 'Poppins', sans-serif; 
                background: 
                    radial-gradient(at 0% 0%, rgba(0, 137, 123, 0.05) 0px, transparent 50%),
                    radial-gradient(at 100% 0%, rgba(251, 140, 0, 0.05) 0px, transparent 50%),
                    radial-gradient(at 100% 100%, rgba(0, 137, 123, 0.05) 0px, transparent 50%),
                    radial-gradient(at 0% 100%, rgba(251, 140, 0, 0.05) 0px, transparent 50%),
                    linear-gradient(135deg, #f0fdfa 0%, #f8fafc 100%);
                background-attachment: fixed;
                color: var(--text-dark);
                display: flex;
                flex-direction: column;
                min-height: 100vh;
            }
            /* Glassmorphism for main containers */
            .tool-container, .index-container, .about-container, .priv-container, .don-container, .cmp-container, .unlock-container, .protect-container, .crop-container, .wm-container {
                background: var(--glass) !important;
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 30px;
                padding: 40px !important;
                margin-top: 40px !important;
                margin-bottom: 40px !important;
                box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.05);
            }
            .navbar {
                background: rgba(255, 255, 255, 0.85);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                padding: 15px 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
                position: sticky;
                top: 0;
                z-index: 1000;
                border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            }
            .logo {
                font-size: 26px;
                font-weight: 700;
                color: var(--text-dark);
                display: flex;
                align-items: center;
                gap: 12px;
                text-decoration: none;
            }
            .logo-icon { color: var(--primary); font-size: 32px; }
            .logo .mitra { color: var(--accent); }
            .nav-links { display: flex; gap: 30px; }
            .nav-links a { text-decoration: none; color: var(--text-dark); font-weight: 500; font-size: 15px; transition: color 0.3s; }
            .nav-links a:hover { color: var(--primary); }
            
            .nav-search-wrapper { position: relative; flex: 1; max-width: 300px; display: flex; align-items: center; margin: 0 20px; }
            .nav-search-input { 
                width: 100%; 
                padding: 8px 12px 8px 35px; 
                border-radius: 10px; 
                border: 2px solid var(--primary); 
                background: linear-gradient(135deg, #ffffff 0%, #f0fdfa 100%);
                font-size: 14px; 
                font-weight: 600;
                box-shadow: 0 4px 12px -4px rgba(0, 137, 123, 0.3);
                transition: all 0.3s;
            }
            .nav-search-input:focus {
                outline: none;
                border-color: var(--accent);
                box-shadow: 0 0 0 3px rgba(251, 140, 0, 0.15), 0 8px 16px -4px rgba(251, 140, 0, 0.4);
            }
            .nav-search-icon { position: absolute; left: 12px; color: var(--primary); font-size: 13px; font-weight: bold; }

            @media (max-width: 768px) {
                .navbar { 
                    padding: 12px 15px; 
                    flex-wrap: wrap;
                    gap: 12px;
                }
                .logo { font-size: 22px; }
                .logo-icon { font-size: 26px; }
                .nav-links { display: none; }
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
    const navbarHTML = `
        <nav class="navbar">
            <a href="${relPath}index.html" class="logo">
                <i class="fas fa-hands-helping logo-icon"></i>
                <div>PDF<span class="mitra">Mitra</span></div>
            </a>
            <div class="nav-search-wrapper">
                <i class="fas fa-search nav-search-icon"></i>
                <input type="text" class="nav-search-input" placeholder="Quick find tools..." 
                    onkeyup="if(event.key === 'Enter') window.location.href='${relPath}index.html?search=' + encodeURIComponent(this.value)">
            </div>
            <div class="nav-links">
                <a href="${relPath}index.html">All Tools</a>
                <a href="${relPath}about.html">About Us</a>
                <a href="${relPath}blog/index.html">Blog</a>
            </div>
        </nav>
    `;
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
})();
