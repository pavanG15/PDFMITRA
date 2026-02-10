// Scan Engine - Camera and Document Scanning Logic
// Uses jscanify for document detection and pdf-lib for PDF generation

class ScanEngine {
    constructor() {
        this.pages = [];
        this.currentStream = null;
        this.scanner = null;
        this.facingMode = 'environment'; // Start with back camera
        this.flashEnabled = false;

        // DOM elements
        this.video = document.getElementById('cameraFeed');
        this.canvas = document.getElementById('overlayCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.statusMessage = document.getElementById('statusMessage');
        this.pageCount = document.getElementById('pageCount');
        this.previewScreen = document.getElementById('previewScreen');
        this.previewContent = document.getElementById('previewContent');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.loadingText = document.getElementById('loadingText');

        this.init();
    }

    async init() {
        // Setup error screen buttons first (before camera access)
        document.getElementById('retryBtn').addEventListener('click', () => {
            window.location.reload();
        });

        document.getElementById('backToHomeBtn').addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        try {
            // Initialize jscanify scanner
            if (typeof scanner !== 'undefined') {
                this.scanner = scanner;
            }

            // Start camera
            await this.startCamera();

            // Setup event listeners
            this.setupEventListeners();

            // Start video processing loop
            this.processVideoFrame();

            this.showStatus('Point camera at document', 'success');
        } catch (error) {
            console.error('Initialization error:', error);
            this.showErrorScreen();
        }
    }

    async startCamera() {
        try {
            // Stop existing stream if any
            if (this.currentStream) {
                this.currentStream.getTracks().forEach(track => track.stop());
            }

            // Request camera with high resolution
            const constraints = {
                video: {
                    facingMode: this.facingMode,
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                }
            };

            this.currentStream = await navigator.mediaDevices.getUserMedia(constraints);
            this.video.srcObject = this.currentStream;

            // Wait for video to load
            await new Promise(resolve => {
                this.video.onloadedmetadata = () => {
                    this.video.play();
                    // Resize canvas to match video
                    this.canvas.width = this.video.videoWidth;
                    this.canvas.height = this.video.videoHeight;
                    resolve();
                };
            });

            // Hide error screen if it was showing
            document.getElementById('errorScreen').classList.remove('active');

        } catch (error) {
            console.error('Camera error:', error);
            throw error;
        }
    }

    setupEventListeners() {
        // Capture button
        document.getElementById('captureBtn').addEventListener('click', () => {
            this.captureImage();
        });

        // Back button
        document.getElementById('backBtn').addEventListener('click', () => {
            this.stopCamera();
            window.location.href = 'index.html';
        });

        // Flash toggle
        document.getElementById('flashBtn').addEventListener('click', () => {
            this.toggleFlash();
        });

        // Camera switch
        document.getElementById('switchCameraBtn').addEventListener('click', () => {
            this.switchCamera();
        });

        // View pages button
        document.getElementById('viewPagesBtn').addEventListener('click', () => {
            this.showPreview();
        });

        // Preview screen controls
        document.getElementById('closePreviewBtn').addEventListener('click', () => {
            this.hidePreview();
        });

        document.getElementById('addMoreBtn').addEventListener('click', () => {
            this.hidePreview();
        });

        document.getElementById('generatePdfBtn').addEventListener('click', () => {
            this.generatePDF();
        });
    }

    processVideoFrame() {
        if (!this.video.paused && !this.video.ended) {
            // Clear canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Draw semi-transparent overlay for guidance
            this.drawGuidanceOverlay();

            // Optional: Add document detection here using jscanify
            // For MVP, we'll just show the guidance overlay

            // Continue loop
            requestAnimationFrame(() => this.processVideoFrame());
        }
    }

    drawGuidanceOverlay() {
        // Draw corner guides
        const cornerSize = 40;
        const margin = 50;

        this.ctx.strokeStyle = 'rgba(124, 58, 237, 0.8)';
        this.ctx.lineWidth = 4;

        // Top-left
        this.ctx.beginPath();
        this.ctx.moveTo(margin + cornerSize, margin);
        this.ctx.lineTo(margin, margin);
        this.ctx.lineTo(margin, margin + cornerSize);
        this.ctx.stroke();

        // Top-right
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvas.width - margin - cornerSize, margin);
        this.ctx.lineTo(this.canvas.width - margin, margin);
        this.ctx.lineTo(this.canvas.width - margin, margin + cornerSize);
        this.ctx.stroke();

        // Bottom-left
        this.ctx.beginPath();
        this.ctx.moveTo(margin, this.canvas.height - margin - cornerSize);
        this.ctx.lineTo(margin, this.canvas.height - margin);
        this.ctx.lineTo(margin + cornerSize, this.canvas.height - margin);
        this.ctx.stroke();

        // Bottom-right
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvas.width - margin - cornerSize, this.canvas.height - margin);
        this.ctx.lineTo(this.canvas.width - margin, this.canvas.height - margin);
        this.ctx.lineTo(this.canvas.width - margin, this.canvas.height - margin - cornerSize);
        this.ctx.stroke();
    }

    async captureImage() {
        try {
            this.showLoading('Capturing...');

            // Create a canvas to capture the current video frame
            const captureCanvas = document.createElement('canvas');
            captureCanvas.width = this.video.videoWidth;
            captureCanvas.height = this.video.videoHeight;
            const captureCtx = captureCanvas.getContext('2d');

            // Draw current video frame
            captureCtx.drawImage(this.video, 0, 0);

            // Convert to blob
            const blob = await new Promise(resolve => {
                captureCanvas.toBlob(resolve, 'image/jpeg', 0.95);
            });

            // Convert blob to base64 for storage
            const dataUrl = await this.blobToDataURL(blob);

            // Add to pages array
            this.pages.push({
                id: Date.now(),
                dataUrl: dataUrl,
                timestamp: new Date().toLocaleString()
            });

            // Update UI
            this.updatePageCount();
            this.showStatus(`Page ${this.pages.length} captured!`, 'success');

            // Haptic feedback if available
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }

            this.hideLoading();

        } catch (error) {
            console.error('Capture error:', error);
            this.showStatus('Capture failed. Please try again.', 'error');
            this.hideLoading();
        }
    }

    blobToDataURL(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    updatePageCount() {
        const count = this.pages.length;
        this.pageCount.textContent = `${count} ${count === 1 ? 'page' : 'pages'}`;

        if (count > 0) {
            this.pageCount.classList.add('show');
            document.getElementById('viewPagesBtn').style.visibility = 'visible';
        } else {
            this.pageCount.classList.remove('show');
            document.getElementById('viewPagesBtn').style.visibility = 'hidden';
        }
    }

    showPreview() {
        // Clear preview content
        this.previewContent.innerHTML = '';

        // Add each page
        this.pages.forEach((page, index) => {
            const pageEl = document.createElement('div');
            pageEl.className = 'page-preview';
            pageEl.innerHTML = `
                <img src="${page.dataUrl}" class="page-thumbnail" alt="Page ${index + 1}">
                <div class="page-info">
                    <h3>Page ${index + 1}</h3>
                    <p>${page.timestamp}</p>
                </div>
                <div class="page-actions">
                    <button class="icon-btn danger" onclick="scanEngine.deletePage(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            this.previewContent.appendChild(pageEl);
        });

        this.previewScreen.classList.add('active');
    }

    hidePreview() {
        this.previewScreen.classList.remove('active');
    }

    deletePage(index) {
        this.pages.splice(index, 1);
        this.updatePageCount();
        this.showPreview(); // Refresh preview
        this.showStatus('Page deleted', 'success');
    }

    async generatePDF() {
        if (this.pages.length === 0) {
            this.showStatus('No pages to generate PDF', 'error');
            return;
        }

        try {
            this.showLoading('Generating PDF...');

            const { PDFDocument } = PDFLib;
            const pdfDoc = await PDFDocument.create();

            // Add each page
            for (const page of this.pages) {
                const imageBytes = await fetch(page.dataUrl).then(res => res.arrayBuffer());
                const image = await pdfDoc.embedJpg(imageBytes);

                const pdfPage = pdfDoc.addPage([image.width, image.height]);
                pdfPage.drawImage(image, {
                    x: 0,
                    y: 0,
                    width: image.width,
                    height: image.height,
                });
            }

            // Set metadata
            pdfDoc.setTitle('Scanned Document');
            pdfDoc.setCreator('PDFMitra');
            pdfDoc.setProducer('PDFMitra Scan');
            pdfDoc.setCreationDate(new Date());

            // Serialize PDF
            const pdfBytes = await pdfDoc.save();

            // Download
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Scanned_${new Date().toISOString().slice(0, 10)}.pdf`;
            a.click();
            URL.revokeObjectURL(url);

            this.hideLoading();
            this.showStatus('PDF generated successfully!', 'success');

            // Clear pages after successful generation
            setTimeout(() => {
                this.pages = [];
                this.updatePageCount();
                this.hidePreview();
            }, 1500);

        } catch (error) {
            console.error('PDF generation error:', error);
            this.showStatus('Failed to generate PDF', 'error');
            this.hideLoading();
        }
    }

    async switchCamera() {
        this.facingMode = this.facingMode === 'environment' ? 'user' : 'environment';
        await this.startCamera();
        this.showStatus('Camera switched', 'success');
    }

    async toggleFlash() {
        try {
            const track = this.currentStream.getVideoTracks()[0];
            const capabilities = track.getCapabilities();

            if (capabilities.torch) {
                this.flashEnabled = !this.flashEnabled;
                await track.applyConstraints({
                    advanced: [{ torch: this.flashEnabled }]
                });
                this.showStatus(this.flashEnabled ? 'Flash on' : 'Flash off', 'success');
            } else {
                this.showStatus('Flash not supported', 'error');
            }
        } catch (error) {
            console.error('Flash error:', error);
        }
    }

    showStatus(message, type = 'info') {
        this.statusMessage.textContent = message;
        this.statusMessage.classList.add('show');
        setTimeout(() => {
            this.statusMessage.classList.remove('show');
        }, 3000);
    }

    showLoading(text = 'Processing...') {
        this.loadingText.textContent = text;
        this.loadingSpinner.classList.add('active');
    }

    hideLoading() {
        this.loadingSpinner.classList.remove('active');
    }

    showErrorScreen() {
        document.getElementById('errorScreen').classList.add('active');
    }

    stopCamera() {
        if (this.currentStream) {
            this.currentStream.getTracks().forEach(track => track.stop());
            this.currentStream = null;
        }
    }
}

// Initialize scan engine when page loads
let scanEngine;
window.addEventListener('load', () => {
    scanEngine = new ScanEngine();
});
