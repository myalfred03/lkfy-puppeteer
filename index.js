const puppeteer = require('puppeteer');
 const { Pool } = require('pg');

 
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
    headless: true
     });
  let movie_url = 'https://www.imdb.com/title/tt0063350';

  const page = await browser.newPage();
  await page.goto(movie_url);
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
  //const obj1 = JSON.parse(data);
  str = data.ratingCount.replace(/[^\d\.\-]/g, ""); 
  insertData(data.title, Number(data.rating), Number(str));
 }
 catch (error) {
  console.log(error);
}

}

run ();