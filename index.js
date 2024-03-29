import puppeteer from 'puppeteer';
import { configData } from './services/index.js';

const user_email = configData.account;
const password = configData.password;

async function fkTwitter() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://twitter.com/i/flow/login');
  await page.waitForNetworkIdle({ idleTime: 1500 });
  /// ////////////////////////////////////////////////////////////////////////////////
  // Select the user input
  await page.waitForSelector('[autocomplete=username]');
  await page.type('input[autocomplete=username]', user_email, { delay: 50 });
  // Press the Next button
  await page.evaluate(() => document.querySelectorAll('div[role="button"]')[2].click());
  await page.waitForNetworkIdle({ idleTime: 1500 });
  /// ////////////////////////////////////////////////////////////////////////////////
  // Sometimes twitter suspect suspicious activties, so it ask for your handle/phone Number
  const extractedText = await page.$eval('*', (el) => el.innerText);
  if (extractedText.includes('Enter your phone number or username')) {
    await page.waitForSelector('[autocomplete=on]');
    await page.evaluate(() => document.querySelectorAll('div[role="button"]')[1].click());
    await page.waitForNetworkIdle({ idleTime: 1500 });
  }
  /// ////////////////////////////////////////////////////////////////////////////////
  // Select the password input
  await page.waitForSelector('[autocomplete="current-password"]');
  await page.type('[autocomplete="current-password"]', password, { delay: 50 });
  // Press the Login button
  await page.evaluate(() => document.querySelectorAll('div[role="button"]')[2].click());
  await page.waitForNetworkIdle({ idleTime: 2000 });

  // Either close the browser and kill the fun, OR make a baby bot to tweet instead of you
  await browser.close();
}

// fkTwitter();
console.log(configData.password);
fkTwitter();