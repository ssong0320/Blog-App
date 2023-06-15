const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000

app.get('/', (req,res) => res.send('Hello World'));

app.use(cors());

let blogs = [
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

app.get("/bloglist", (req,res) => {
    res.json(blogs);
});

app.listen(port, () => console.log(`App is on port ${port}`))