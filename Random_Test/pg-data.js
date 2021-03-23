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

module.exports = { getData, insertData };
