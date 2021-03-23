const puppeteer = require('puppeteer');
const prompt = require('prompt-sync')();
const db = require('./pg-data');


async function run () {
  try { 

  const browser = await puppeteer.launch({});

/*   const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    headless: true
     }); */
  let movie_url = 'https://www.imdb.com/';


  const movie = prompt('What is your favorite movie? ');
  console.log(`Searching data of ${movie}...`);


  const page = await browser.newPage();
  await page.goto(movie_url);
  await page.waitForSelector('[type="text"]');
  await page.focus('[type="text"]');
  await page.keyboard.type(movie, {delay: 500});
  //await page.waitFor(1000);
  await page.keyboard.press("ArrowDown", {delay: 150});
  await page.keyboard.press("Enter", {delay: 150});
  await page.waitForNavigation();

  

/*   await page.waitFor(1000);
  const page2 = await browser.newPage();

  await page2.goto(page.url()); */


  // await page.screenshot({path: 'RIN.png'});
  var data = await page.evaluate(() => {

    let title = document.querySelector('div[class="title_wrapper"] > h1').innerText;
    let rating = document.querySelector('span[itemprop="ratingValue"]').innerText;
    let ratingCount = document.querySelector('span[itemprop="ratingCount"]').innerText;

    return {
      title,
      rating,
      ratingCount
    }

   //insertData(title,rating,ratingCount);

  });

  console.log(data);
  

  await browser.close();
  str = data.ratingCount.replace(/[^\d\.\-]/g, ""); 
  db.insertData(data.title, Number(data.rating), Number(str));
 }
 catch (error) {
  console.log(error);
}

}

run ();