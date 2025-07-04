import QRCode from 'qrcode';
import fs from 'fs';

const url = process.env.APP_URL || 'http://your-domain.com';  // Replace with your domain
const outputFile = 'career-evaluator-qr.png';

QRCode.toFile(outputFile, url, {
  color: {
    dark: '#000',
    light: '#FFF'
  },
  width: 1000,
  margin: 1
}, function(err) {
  if (err) throw err;
  console.log('QR Code generated!');
}); 