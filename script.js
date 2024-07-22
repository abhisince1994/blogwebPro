const apiUrl = "https://crudcrud.com/api/bff28bfddb944eadb8ae87958cd840eb/blogs"; // Replace with your unique endpoint

document.addEventListener("DOMContentLoaded", loadBlogs);
document.getElementById("post-blog-btn").addEventListener("click", handleFormSubmit);

function loadBlogs() {
    axios.get(apiUrl)
        .then(response => {
            const blogs = response.data;
            displayBlogs(blogs);
        })
        .catch(error => console.error("Error fetching blogs:", error));
}

function displayBlogs(blogs) {
    const blogsDiv = document.getElementById("blogs");
    const blogCount = document.getElementById("blog-count");
    blogsDiv.innerHTML = "";
    blogCount.textContent = blogs.length;

    blogs.forEach(blog => {
        const blogDiv = document.createElement("div");
        blogDiv.className = "blog-item";
        blogDiv.innerHTML = `
            <img src="${blog.imageUrl}" alt="Blog Image">
            <h2>${blog.title}</h2>
            <p>${blog.description}</p>
            <button onclick="editBlog('${blog._id}')">Edit</button>
            <button onclick="deleteBlog('${blog._id}')">Delete</button>
        `;
        blogsDiv.appendChild(blogDiv);
    });
}

function handleFormSubmit(event) {
    const blogId = document.getElementById("blog-id").value;
    const imageUrl = document.getElementById("blog-image-url").value;
    const title = document.getElementById("blog-title").value;
    const description = document.getElementById("blog-description").value;

    const blogData = { imageUrl, title, description };

    if (blogId) {
        axios.put(`${apiUrl}/${blogId}`, blogData)
            .then(response => {
                loadBlogs();
                resetForm();
            })
            .catch(error => console.error("Error updating blog:", error));
    } else {
        axios.post(apiUrl, blogData)
            .then(response => {
                loadBlogs();
                resetForm();
            })
            .catch(error => console.error("Error posting blog:", error));
    }
}

function editBlog(blogId) {
    axios.get(`${apiUrl}/${blogId}`)
        .then(response => {
            const blog = response.data;
            document.getElementById("blog-id").value = blog._id;
            document.getElementById("blog-image-url").value = blog.imageUrl;
            document.getElementById("blog-title").value = blog.title;
            document.getElementById("blog-description").value = blog.description;
        })
        .catch(error => console.error("Error fetching blog for edit:", error));
}

function deleteBlog(blogId) {
    axios.delete(`${apiUrl}/${blogId}`)
        .then(response => loadBlogs())
        .catch(error => console.error("Error deleting blog:", error));
}

function resetForm() {
    document.getElementById("blog-id").value = "";
    document.getElementById("blog-image-url").value = "";
    document.getElementById("blog-title").value = "";
    document.getElementById("blog-description").value = "";
}
