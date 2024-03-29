import fs from 'fs';

export const configData = (() => {
    try {

      return JSON.parse(fs.readFileSync('./config.json', 'utf8'));
    } catch (error) {
      console.error('Failed read configFile', error);
      return null;
    }
  })();
