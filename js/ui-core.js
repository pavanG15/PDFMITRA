<body>
    <script src="js/ui-core.js"></script>

(function () {
    /* ------------------------------
       1) Inject Fonts + Global CSS
    ------------------------------ */
    const head = document.head;
    head.insertAdjacentHTML("beforeend", `
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
                --border: #e2e8f0;
            }

            body {
                margin: 0;
                font-family: "Poppins", sans-serif;
            }

            /* NAVBAR */
            .navbar {
                background: rgba(255,255,255,0.97) !important;
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                padding: 14px 28px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: sticky;
                top: 0;
                z-index: 2000;
                border-bottom: 1px solid rgba(0,0,0,0.05);
            }

            .logo {
                font-size: 24px;
                text-decoration: none;
                font-weight: 700;
                color: var(--text-dark);
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .logo-icon { color: var(--primary); font-size: 28px; }
            .mitra { color: var(--accent); }

            .nav-search-wrapper {
                position: relative;
                width: 260px;
            }

            .nav-search-input {
                width: 100%;
                padding: 8px 12px 8px 34px;
                border-radius: 8px;
                border: 2px solid var(--primary);
                background: white;
                font-size: 14px;
                font-weight: 500;
            }

            .nav-search-icon {
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
                color: var(--primary);
                font-size: 12px;
            }

            .nav-links {
                display: flex;
                gap: 22px;
            }
            .nav-links a {
                text-decoration: none;
                color: var(--text-dark);
                font-weight: 600;
                font-size: 14px;
            }
            .nav-links a:hover {
                color: var(--primary);
            }

            /* MOBILE NAV */
            .mobile-menu-toggle {
                display: none;
                background: none;
                border: none;
                font-size: 26px;
                color: var(--primary);
            }

            @media(max-width:768px) {
                .nav-search-wrapper { display:none; }
                .mobile-menu-toggle { display:block; }

                .nav-links {
                    display: none;
                    flex-direction: column;
                    background: white;
                    width: 100%;
                    margin-top: 10px;
                    border-radius: 10px;
                    padding: 10px 0;
                }

                .nav-links a {
                    padding: 12px 20px;
                    border-bottom: 1px solid var(--border);
                }
                .nav-links a:last-child { border-bottom: none; }

                .nav-links.active { display: flex; }
            }
        </style>
    `);


    /* ------------------------------
       2) Determine folder depth
    ------------------------------ */
    const page = window.location.pathname;
    let base = "./";

    if (page.includes("/blog/")) base = "../";
    if (page.includes("/numbering") || page.includes("/watermark") || page.includes("/merge") || page.includes("/compress"))
        base = "./";


    /* ------------------------------
       3) Inject NAVBAR into placeholder
    ------------------------------ */
    const navbar = `
        <nav class="navbar">
            <a href="${base}index.html" class="logo">
                <i class="fas fa-file-pdf logo-icon"></i>
                PDF<span class="mitra">Mitra</span>
            </a>

            <div class="nav-search-wrapper">
                <i class="fas fa-search nav-search-icon"></i>
                <input type="text" class="nav-search-input" placeholder="Quick find tools..."
                    onkeyup="if(event.key === 'Enter') window.location.href='${base}index.html?search=' + this.value">
            </div>

            <button class="mobile-menu-toggle" id="mobileMenuToggle">
                <i class="fas fa-bars"></i>
            </button>

            <div class="nav-links" id="navLinks">
                <a href="${base}index.html">All Tools</a>
                <a href="${base}about.html">About Us</a>
                <a href="${base}blog/index.html">Blog</a>
                <a href="${base}donate.html">Donate</a>
            </div>
        </nav>
    `;

    const place = document.getElementById("navbar-container");
    if (place) place.innerHTML = navbar;

    /* ------------------------------
       4) Mobile Menu Toggle
    ------------------------------ */
    setTimeout(() => {
        let toggle = document.getElementById("mobileMenuToggle");
        let links = document.getElementById("navLinks");

        if (toggle && links) {
            toggle.addEventListener("click", () => {
                links.classList.toggle("active");
                toggle.innerHTML = links.classList.contains("active") ?
                    '<i class="fas fa-times"></i>' :
                    '<i class="fas fa-bars"></i>';
            });
        }
    }, 200);

})();

