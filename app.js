const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000


let blogs = [
    {
        id:1,
        title:'blog 1',
        author: 'author 1',
        content: 'adcsdc'
    },
    {
        id:2,
        title:'blog  2',
        author: 'author 2',
        content: 'acasdcas'
    },
];

app.use(cors());
app.use(express.json());

app.use(express.static('public'));

//get all blogs

app.get("/bloglist", (req,res) => {
    res.json(blogs);
});

//create new blog
app.post("/blogadd", (req,res) => {
    const {id, title, author, content } = req.body;

    if (!id || !title || !author || !content) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }

    const newBlog = {id, title, author, content};
    blogs.push(newBlog);

    res.status(201).json(newBlog);
});

//Delete Blog by ID
app.delete("/blogdelete", (req,res) => {
    const blogId = parseInt(req.body.id);
    const index = blogs.findIndex((blog) => blog.id === blogId);

    if (index !== -1) {
        blogs.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: "Blog not found" });
    }

});

//edit blog

app.put("/blogedit", (req, res) => {
    const blogId = parseInt(req.body.id);
    const { title, author, content } = req.body;
  
    // Find the blog in the array
    const blogIndex = blogs.findIndex((blog) => blog.id === blogId);
  
    // Check if the blog exists
    if (blogIndex === -1) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }
  
    // Update the book information
    blogs[blogIndex].title = title || blogs[blogIndex].title;
    blogs[blogIndex].author = author || blogs[blogIndex].author;
    blogs[blogIndex].content = content || blogs[blogIndex].content
  
    res.json(blogs[blogIndex]);
  });

app.listen(port, () => console.log(`App is on port ${port}`))