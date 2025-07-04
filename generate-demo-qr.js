import QRCode from 'qrcode';
import { networkInterfaces } from 'os';

// Get the local IP address
const getLocalIP = () => {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip internal and non-IPv4 addresses
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
};

const generateQR = async () => {
  const ip = getLocalIP();
  const url = `http://${ip}:3000`;
  const outputFile = 'demo-qr.png';

  console.log(`Generating QR code for: ${url}`);
  
  try {
    await QRCode.toFile(outputFile, url, {
      color: {
        dark: '#000',
        light: '#FFF'
      },
      width: 800,
      margin: 1,
      errorCorrectionLevel: 'H'
    });
    console.log(`QR Code generated! Saved as: ${outputFile}`);
    console.log('Instructions:');
    console.log('1. Make sure your computer and the judges\' devices are on the same WiFi network');
    console.log('2. Start the servers:');
    console.log('   - Backend: cd backend && npm start');
    console.log('   - Frontend: cd frontend && npm start');
    console.log(`3. Test the link yourself first: ${url}`);
    console.log('4. Let judges scan the QR code from demo-qr.png');
  } catch (err) {
    console.error('Error generating QR code:', err);
  }
};

generateQR(); 