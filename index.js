const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function main() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://accounts.craigslist.org/login');
    // Auto input the input field
    await page.type('input#inputEmailHandle', 'Youremail', {
      delay: 100
    });
    await page.type('input#inputPassword', 'YourPassword');
    await page.click('button#login');
    //await page.waitForNavigation();
    await page.waitFor(1000);
    await page.goto(
      'https://accounts.craigslist.org/login/home?show_tab=billing'
    );

    // Cheerio
    const content = await page.content();
    const $ = await cheerio.load(content);
    console.log($('body > article > section > fieldset > b').text());
  } catch (error) {
    console.log(error);
  }
}

main();
