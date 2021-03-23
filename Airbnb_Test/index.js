const puppeteer = require('puppeteer');
// const { Pool } = require('pg');

 
/* const config = {
  host: 'localhost',
  user: 'postgres',
  password: '22103',
  database: 'lokafyreviews'
};

const pool = new Pool(config); */

/* const getData = async () => {
  try {
      const res = await pool.query('select * from scraping');
      // console.log(res)
      console.log(res.rows);
      pool.end();
  } catch (e) {
      console.log(e);
  }
}; */



//getData();

/* const insertData = async (title, rating, ratingcount) => {
  try {
      const text = 'INSERT INTO scraping1(data1, data2, data3) VALUES ($1, $2, $3)';
      const values = [title, rating,ratingcount];

      const res = await pool.query(text, values);
     console.log(title)
      pool.end();
  } catch (e) {
      console.log(e);
  }
}; */



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
    //executablePath: '/usr/bin/chromium-browser',
    headless: false
     });
  let url = 'https://www.airbnb.com/';

  const page = await browser.newPage();
  const context = browser.defaultBrowserContext();
  await context.overridePermissions("https://www.airbnb.com", ["geolocation"]);
  await page.goto(url);
  await page.setGeolocation({latitude: 12.362335693698254, longitude: -87.02219314942484});    //Rivas latitude: 11.441372270201855, longitude: -85.82358742498008
                                                                                               //Leon  latitude: 12.362335693698254, longitude: -87.02219314942484
  await page.waitForSelector('[class="_1xq16jy"]');
  await page.focus('[class="_1xq16jy"]');
  await page.keyboard.type("Leon", {delay: 500});
  await page.keyboard.press("ArrowDown", {delay: 100});
  await page.keyboard.press("Enter", {delay: 100});
  const form = await page.$('[class="_12fun97"]');
  await form.evaluate( form => form.click() );
  const form2 = await page.$('[class="_12fun97"]');
  await form2.evaluate( form => form.click() );

  await page.waitForNavigation();


/*   await page.waitFor(1000);
  const page2 = await browser.newPage();

  await page2.goto(page.url()); */


  // await page.screenshot({path: 'RIN.png'});
  // var data = await page.evaluate(() => {
  //   navigator.geolocation.getCurrentPosition(({coords})=>
      
  //   console.log(coords)

      
  //     );
  //  // let title = document.querySelector('div[class="title_wrapper"] > h1').innerText;
  //   // let rating = document.querySelector('span[itemprop="ratingValue"]').innerText;
  //   // let ratingCount = document.querySelector('span[itemprop="ratingCount"]').innerText;

  //   //  return {
  //   //    coords
  //   //   // title,
  //   //   // rating,
  //   //   // ratingCount
  //   //  }


  // }); 

  //  console.log(data);
  

  //await browser.close();


  // str = data.ratingCount.replace(/[^\d\.\-]/g, ""); 
  // insertData(data.title, Number(data.rating), Number(str));



 }
 catch (error) {
  console.log(error);
}

}

run ();