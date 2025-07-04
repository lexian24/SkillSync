import QRCode from 'qrcode';

const url = 'http://157.180.120.247';
const outputFile = 'career-evaluator-production-qr.png';

QRCode.toFile(outputFile, url, {
  color: {
    dark: '#000',
    light: '#FFF'
  },
  width: 1000,
  margin: 1,
  errorCorrectionLevel: 'H'
}, function(err) {
  if (err) throw err;
  console.log('🎉 Production QR Code generated!');
  console.log('📱 Your app is available at:', url);
  console.log('🖼️ QR code saved as:', outputFile);
}); 