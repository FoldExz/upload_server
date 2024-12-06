const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import cors

const app = express();
const port = 3000;

// Setup CORS untuk mengizinkan permintaan dari semua origin
app.use(cors()); // Izinkan semua origin (untuk pengembangan)

// Setup multer untuk menangani upload
const upload = multer({
  dest: 'uploads/', // Tempat penyimpanan sementara file yang diupload
});

// Pastikan folder 'uploads' ada
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Endpoint untuk upload file
app.post('/upload', upload.single('file'), (req, res) => {
  console.log('Request method:', req.method); // Mengetahui apakah ini POST
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  console.log('Received file:', req.file);
  const filePath = path.join(__dirname, 'uploads', req.file.filename);
  console.log(`File uploaded: ${filePath}`);
  res.status(200).send({
    message: 'File uploaded successfully',
    filename: req.file.originalname,
  });
});

// Endpoint untuk download file (untuk testing download speed)
app.get('/download', (req, res) => {
    const filePath = path.join(__dirname, 'largeFile.bin');  // File dummy besar yang akan digunakan untuk download
    const fileSize = fs.statSync(filePath).size;
  
    res.setHeader('Content-Length', fileSize);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=largeFile.bin');
  
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);  // Mengirimkan file ke client
  });
  

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


