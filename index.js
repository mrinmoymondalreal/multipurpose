const express = require("express");
const bcrypt = require("bcrypt");
const app = express();

const bodyParser = require("body-parser");
const sql = require("./db");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res)=>{
  res.send("OOPS! no GUI avaialble to help you");
});

app.post('/set_works', async (req, res)=>{
  let { date, name, link, des, cover } = req.body;
  if(await bcrypt.compare(req.headers.authorization, "$2b$10$lvKA7OVI6S9.qqVwsu9VeO2/97m.YZ/.HEDrLDOt3pdWZfR0Blb7K")){
    if(Object.values({ date, name, link, des, cover }).includes(undefined)){
      res.send({ status: 200, message: "invalid inputs" });
    }else{
      console.log({ date, name, link, des, cover });
      let result = await sql`INSERT INTO works (date, name, link, short_description, cover) VALUES (${date}, ${name}, ${link}, ${des}, ${cover});`;
      res.send({ status: 200, message: "success" });
    }
  }else{
    res.status(400).send({ status: 400, reason: "invalid key" })
  }
});

app.get('/get_works', async (req, res)=>{
  let result = await sql`SELECT * FROM works ORDER BY date DESC LIMIT 5;`;
  res.send({ status: 200, data: result });
});

app.listen(PORT, ()=>{
  console.log(`listening on http://localhost:${PORT}`);
})