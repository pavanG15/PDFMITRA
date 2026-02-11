(function () {

    // --- Detect correct base path for all pages ---
    // index.html is at root → /
    // Other tools are also at root → /xyz.html
    // Blog only is inside /blog/

    let relPath = "./";
    if (window.location.pathname.startsWith("/blog/")) {
        relPath = "../";
    }

    // --- Inject Fonts + Core Styles ---
    const head = document.head;
    head.insertAdjacentHTML("beforeend", `
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    `);

    // --- Inject Navbar ---
    const navbar = `
        <nav class="navbar">
            <a href="${relPath}index.html" class="logo">
                <i class="fas fa-hands-helping logo-icon"></i>
                <div>PDF<span class="mitra">Mitra</span></div>
            </a>
            <div class="nav-search-wrapper">
                <i class="fas fa-search nav-search-icon"></i>
                <input type="text" class="nav-search-input" placeholder="Quick find tools..."
                    onkeyup="if(event.key==='Enter') window.location.href='${relPath}index.html?search=' + encodeURIComponent(this.value)">
            </div>

            <button class="mobile-menu-toggle" id="mobileMenuToggle">
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

    document.body.insertAdjacentHTML("afterbegin", navbar);

    // --- Mobile Menu Toggle ---
    setTimeout(() => {
        const menuBtn = document.getElementById("mobileMenuToggle");
        const navLinks = document.getElementById("navLinks");

        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuBtn.innerHTML = navLinks.classList.contains("active")
                ? `<i class="fas fa-times"></i>`
                : `<i class="fas fa-bars"></i>`;
        });
    }, 200);

})();
