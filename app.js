const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000

app.get('/', (req,res) => res.send('Hello World'));

app.use(cors());

let products = [
    {
        id:1,
        name:'product 1',
        price:4
    },
    {
        id:2,
        name:'product 2',
        price:6
    },
]

//get all products

app.get("/productlist", (req,res) => {
    res.json(products);
});

app.listen(port, () => console.log(`App is on port ${port}`))