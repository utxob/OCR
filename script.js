 // Handle image file selection
 document.getElementById('imageInput').addEventListener('change', handleImage);
        
 // Handle drag and drop
 document.getElementById('dropZone').addEventListener('click', () => document.getElementById('imageInput').click());
 document.getElementById('dropZone').addEventListener('dragover', (e) => e.preventDefault());
 document.getElementById('dropZone').addEventListener('drop', (e) => {
     e.preventDefault();
     handleImage(e);
 });
 
 function handleImage(event) {
     let file;
     if (event.dataTransfer) {
         file = event.dataTransfer.files[0];  // For drag and drop
     } else {
         file = event.target.files[0];  // For file input
     }

     if (!file) {
         alert('Please select an image first!');
         return;
     }

     let reader = new FileReader();
     reader.onload = function(event) {
         let image = new Image();
         image.src = event.target.result;
         image.onload = function() {
             document.getElementById('imagePreview').innerHTML = `<img src="${image.src}" />`;
         };
     };
     reader.readAsDataURL(file);
 }
 
 // Convert image to text
 document.getElementById('convertBtn').addEventListener('click', () => {
     let imageInput = document.getElementById('imageInput').files[0];
     if (!imageInput) {
         alert('Please select an image first!');
         return;
     }
     
     let reader = new FileReader();
     reader.onload = function(event) {
         let image = new Image();
         image.src = event.target.result;
         image.onload = function() {
             let selectedLang = document.getElementById('languageSelect').value;
             Tesseract.recognize(
                 image.src,
                 selectedLang,
                 {
                     logger: m => console.log(m)
                 }
             ).then(({ data: { text } }) => {
                 document.getElementById('outputText').value = text;
             }).catch(error => {
                 console.error('OCR Error:', error);
                 alert('Failed to extract text. Try another image.');
             });
         };
     };
     reader.readAsDataURL(imageInput);
 });
 
 // Copy text to clipboard
 document.getElementById('copyBtn').addEventListener('click', () => {
     let textArea = document.getElementById('outputText');
     textArea.select();
     document.execCommand('copy');
     alert('Text copied to clipboard!');
 });