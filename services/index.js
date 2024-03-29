import fs from 'fs';

export const configData = (() => {
    try {
        
      return JSON.parse(fs.readFileSync('./config.json', 'utf8'));
    } catch (error) {
      console.error('Gagal membaca file konfigurasi:', error);
      return null;
    }
  })();
