const fs = require('fs');
const path = require('path');

// Tentukan ukuran file (dalam MB)
const fileSizeInMB = 100; // Ukuran file dummy yang akan dibuat dalam MB

// Tentukan lokasi file yang akan dibuat
const filePath = path.join(__dirname, 'largeFile.bin');

// Membuat stream untuk menulis ke file
const fileStream = fs.createWriteStream(filePath);

// Membuat buffer 1MB untuk ditulis ke file
const buffer = Buffer.alloc(1024 * 1024);  // 1MB buffer

// Menulis data ke file sebanyak ukuran yang diinginkan
for (let i = 0; i < fileSizeInMB; i++) {
  fileStream.write(buffer);  // Menulis 1MB ke file
}

// Menutup stream setelah selesai menulis
fileStream.end();
console.log('File dummy besar telah dibuat.');
