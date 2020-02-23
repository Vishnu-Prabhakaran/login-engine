const request = require('request-promise').defaults({ jar: true });
const fs = require('fs');

async function main() {
  try {
    const html = await request.post('https://accounts.craigslist.org/login', {
      form: {
        inputEmailHandle: 'YourEmail',
        inputPassword: 'YourPassword'
      },
      header: {
        Referer:
          'https://accounts.craigslist.org/login?rt=L&rp=%2Flogin%2Fhome',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36'
      },
      simple: false,
      followAllRedirects: true
    });
    fs.writeFileSync('./login.html', html);

    const billingHtml = await request.get(
      'https://accounts.craigslist.org/login/home?show_tab=billing'
    );
    fs.writeFileSync('./billing.html', billingHtml);
  } catch (error) {
    console.log(error);
  }
}
main();
