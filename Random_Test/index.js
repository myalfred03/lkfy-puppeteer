const puppeteer = require('puppeteer');
 const { Pool } = require('pg');
 const prompt = require('prompt-sync')();

 
const config = {
  host: 'localhost',
  user: 'postgres',
  password: '22103',
  database: 'lokafyreviews'
};

const pool = new Pool(config);

const getData = async () => {
  try {
      const res = await pool.query('select * from scraping');
      // console.log(res)
      console.log(res.rows);
      pool.end();
  } catch (e) {
      console.log(e);
  }
};



//getData();

const insertData = async (title, rating, ratingcount) => {
  try {
      const text = 'INSERT INTO scraping1(data1, data2, data3) VALUES ($1, $2, $3)';
      const values = [title, rating,ratingcount];

      const res = await pool.query(text, values);
     console.log(title)
      pool.end();
  } catch (e) {
      console.log(e);
  }
};



// function insertData(title, rating, ratingcount) {

//   return new Promise(resolve => {
//     setTimeout(function() {
//       resolve("slow")


//       const text = 'INSERT INTO scraping1(data1, data2, data3) VALUES ($1, $2, $3)';
//       const values = [title, rating,ratingcount];
//       const res = pool.query(text, values);
//       pool.end();
//       console.log(title)


//     }, 2000)
//   })

// }


async function run () {
  try { 
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    headless: false
     });
  let movie_url = 'https://www.imdb.com/';


  const movie = prompt('What is your favorite movie?');
  console.log(`Hey there ${movie}`);


  const page = await browser.newPage();
  await page.goto(movie_url);
  await page.waitForSelector('[type="text"]');
  await page.focus('[type="text"]');
  await page.keyboard.type(movie, {delay: 500});
  //await page.waitFor(1000);
  await page.keyboard.press("ArrowDown", {delay: 100});
  await page.keyboard.press("Enter", {delay: 100});
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
  insertData(data.title, Number(data.rating), Number(str));
 }
 catch (error) {
  console.log(error);
}

}

run ();