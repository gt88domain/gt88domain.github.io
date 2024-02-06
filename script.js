function splitText() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please upload a file first.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        // Improved splitting logic to handle various languages
        const parts = text.match(/[\s\S]{1,2000}(?=\s|$)|[\s\S]+/g);

        parts.forEach((part, index) => {
            createDownloadLink(part, `Part_${index + 1}.txt`);
        });
    };
    reader.readAsText(file);
}

function createDownloadLink(text, filename) {
    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
    downloadLink.download = filename;
    downloadLink.textContent = `Download ${filename}`;
    downloadLink.style.display = 'block'; // Makes each link appear on a new line

    const container = document.getElementById('downloadLinks');
    container.appendChild(downloadLink);
}

// Note: Due to browser restrictions, this button won't download all files at once
// but will guide users to manually click each link.
function createDownloadAllButton() {
    const downloadAllButton = document.createElement('button');
    downloadAllButton.textContent = 'Click Each Link to Download All Parts';
    downloadAllButton.onclick = function() {
        document.querySelectorAll('#downloadLinks a').forEach(link => {
            // Note: Directly calling `link.click()` for all links might not work due to browser restrictions
            console.log(`Please click: ${link.getAttribute('download')}`);
        });
    };

    document.body.appendChild(downloadAllButton);
}
