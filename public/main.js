const blogTableBody = document.getElementById('blogTableBody')
const createBlogButton = document.getElementById('createBlogButton');
const searchInput = document.querySelector('input[name="q"]');

let blogs = [];

searchInput.addEventListener('keyup', (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();
  const searchWords = searchTerm.split(/\s+/);

  blogTableBody.innerHTML = '';

  const filteredBlogs = blogs.filter((blog) => {
    return searchWords.every((word) => {
      return blog.title.toLowerCase().includes(word) ||
        blog.author.toLowerCase().includes(word) ||
        blog.content.toLowerCase().includes(word);
    });
  });

  displayBlogs(filteredBlogs);
});



const generateId = () => {
    return Math.floor(Math.random() * 10000) + 1;
};

// add blog
const addBlog = () => {
  const id = generateId();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const content = document.getElementById("content").value;
    console.log(id, title, author, content);

    fetch('/blogadd', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({id, title, author, content}),
    })
    .then(response => response.json())
    .then(blog => {
        const row = document.createElement('tr');
        const idCell = document.createElement('td');
        const titleCell = document.createElement('td');
        const authorCell = document.createElement('td');
        const contentCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        idCell.textContent = blog.id;
        titleCell.textContent = blog.title;
        authorCell.textContent = blog.author;
        contentCell.textContent = blog.content;
        editButton.textContent = 'Edit';
        deleteButton.textContent = 'Delete';

        row.appendChild(idCell);
        row.appendChild(titleCell);
        row.appendChild(authorCell);
        row.appendChild(contentCell);
        row.appendChild(actionCell);

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        blogTableBody.appendChild(row);

        // edit button
        editButton.addEventListener('click', () => editBlog(blog.id));

        // delete button
        deleteButton.addEventListener('click', () => deleteBlog(blog.id));
  })
    
}

const editBlog = (blogId) => {
  const title = prompt("title");
  const author = prompt("author");
  const content = prompt("content");

    fetch('/blogedit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: blogId, title, author, content }),
    })
    .then(response => response.json())
    .then(updatedBlog => {
      const rows = blogTableBody.getElementsByTagName('tr');
  
      for (let i = 0; i < rows.length; i++) {
        const idCell = rows[i].getElementsByTagName('td')[0];
  
        if (parseInt(idCell.textContent) === updatedBlog.id) {
          const titleCell = rows[i].getElementsByTagName('td')[1];
          const authorCell = rows[i].getElementsByTagName('td')[2];
          const contentCell = rows[i].getElementsByTagName('td')[3];
  
          titleCell.textContent = updatedBlog.title;
          authorCell.textContent = updatedBlog.author;
          contentCell.textContent = updatedBlog.content;
  
          break;
        }
      }
    })
    .catch(error => console.error('Error:', error));
  };


//delete
const deleteBlog = (blogId) => {

    fetch('/blogdelete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: blogId }),
    })
    .then(response => {
      if (response.status === 204) {
        // Remove the corresponding table row
        const rows = blogTableBody.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
          const idCell = rows[i].getElementsByTagName('td')[0];
          if (parseInt(idCell.textContent) === blogId) {
            rows[i].remove();
            break;
          }
        }
      } else {
        console.error('Error:', response.status);
      }
    })
    .catch(error => console.error('Error:', error));
  };
  

    createBlogButton.addEventListener('click', addBlog);
  
    function displayBlogs(blogs) {
      blogs.forEach((blog) => {
        const row = createTableRow(blog);
        blogTableBody.appendChild(row);
      });
    }
    
    function createTableRow(blog) {
      const row = document.createElement('tr');
      const idCell = document.createElement('td');
      const titleCell = document.createElement('td');
      const authorCell = document.createElement('td');
      const contentCell = document.createElement('td');
      const actionCell = document.createElement('td');
      const editButton = document.createElement('button');
      const deleteButton = document.createElement('button');
    
      idCell.textContent = blog.id;
      titleCell.textContent = blog.title;
      authorCell.textContent = blog.author;
      contentCell.textContent = blog.content;
      editButton.textContent = 'Edit';
      deleteButton.textContent = 'Delete';
    
      row.appendChild(idCell);
      row.appendChild(titleCell);
      row.appendChild(authorCell);
      row.appendChild(contentCell);
      row.appendChild(actionCell);
    
      actionCell.appendChild(editButton);
      actionCell.appendChild(deleteButton);
    
      // Event listener for the edit button
      editButton.addEventListener('click', () => editBlog(blog.id));
    
      // Event listener for the delete button
      deleteButton.addEventListener('click', () => deleteBlog(blog.id));
    
      return row;
    }
    


    fetch('/bloglist')
    .then(response => response.json())
    .then(data => {
        blogs = data;  // Save the blogs to a global variable
        displayBlogs(blogs);  // Display all blogs initially
    })
    .catch(error => console.error('Error:', error));
    