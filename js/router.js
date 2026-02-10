/**
 * PDFMitra Router
 * Handles loading of tool partials into the master layout.
 */

async function loadTool() {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    const contentArea = document.getElementById('app-content');

    // If no page is specified in layout.html context, redirect to standalone index.html
    if (!page) {
        window.location.href = 'index.html';
        return;
    }

    try {
        // Show immediate indicator
        contentArea.innerHTML = '<div style="text-align:center; padding:100px; color:var(--text-light);"><i class="fas fa-spinner fa-spin" style="font-size:40px; margin-bottom:20px; display:block;"></i><p style="font-weight:600;">Loading tool...</p></div>';

        const filename = page.endsWith('.html') ? page : `${page}.html`;

        let response;
        try {
            response = await fetch(filename);
        } catch (fetchErr) {
            // Handle cases where fetch fails (like CORS or file:// protocol restrictions)
            if (window.location.protocol === 'file:') {
                throw new Error("PROT_ERR");
            }
            throw fetchErr;
        }

        if (!response.ok) throw new Error("Could not load " + filename);

        const html = await response.text();

        // 1. Inject the HTML content
        contentArea.innerHTML = html;

        // 2. Extract and execution scripts sequentially
        const scripts = Array.from(contentArea.querySelectorAll('script'));
        for (const oldScript of scripts) {
            await loadScript(oldScript);
        }

        // Update Title - Heuristic: Find first H1 or use page name
        const h1 = contentArea.querySelector('h1');
        const toolTitle = h1 ? h1.innerText : page.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        document.title = `${toolTitle} - PDFMitra`;

        // Scroll to top
        window.scrollTo(0, 0);

    } catch (err) {
        console.error(err);
        let errorTitle = "Error Loading Tool";
        let errorMsg = `Could not load "${page}". Please check the URL or try again.`;

        if (err.message === "PROT_ERR") {
            errorTitle = "Browser Security Block";
            errorMsg = `Your browser is blocking local file access (file://). <br><br> 
                        <b>Solution:</b> To use these tools locally, please run a local web server 
                        (e.g., VS Code Live Server, Python -m http.server, or NPM serve).`;
        }

        contentArea.innerHTML = `
            <div style="padding:100px; text-align:center; max-width:600px; margin:0 auto;">
                <i class="fas fa-exclamation-triangle" style="font-size:60px; color:var(--danger); margin-bottom:20px;"></i>
                <h2 style="font-weight:800; margin-bottom:10px;">${errorTitle}</h2>
                <p style="color:var(--text-light); margin-bottom:30px; line-height:1.6;">${errorMsg}</p>
                <a href="index.html" style="background:var(--primary); color:white; padding:12px 30px; border-radius:12px; text-decoration:none; font-weight:700; display:inline-block;">Return to Home</a>
            </div>
        `;
    }
}

/**
 * Helper to load and execute scripts sequentially
 */
function loadScript(oldScript) {
    return new Promise((resolve, reject) => {
        const newScript = document.createElement('script');

        // Copy attributes
        Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });

        if (oldScript.src) {
            newScript.src = oldScript.src;
            newScript.onload = resolve;
            newScript.onerror = () => {
                console.error("Failed to load script: " + oldScript.src);
                resolve(); // Resolve anyway to continue with other scripts
            };
        } else {
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            // Inline scripts execute immediately upon insertion
            oldScript.parentNode.replaceChild(newScript, oldScript);
            resolve();
            return;
        }

        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}

// Handle browser navigation events
window.onpopstate = loadTool;
window.onload = loadTool;

