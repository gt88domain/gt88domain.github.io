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
        const words = text.split(/\s+/);
        let part = '';
        let partNum = 1;
        
        for (let i = 0; i < words.length; i++) {
            part += words[i] + ' ';
            if ((i + 1) % 2000 === 0 || i === words.length - 1) {
                createDownloadLink(part, `Part_${partNum}.txt`);
                part = ''; // Reset part
                partNum++;
            }
        }
    };
    reader.readAsText(file);
}

function createDownloadLink(text, filename) {
    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
    downloadLink.download = filename;
    downloadLink.textContent = `Download ${filename}`;
    
    const container = document.getElementById('downloadLinks');
    container.appendChild(downloadLink);
    container.appendChild(document.createElement('br'));
}
