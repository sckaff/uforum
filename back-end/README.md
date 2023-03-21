# API Documentation
## General Functions:
* GetPosts()
    - Grab all posts
* GetPostByID()
    - Grab individual post based on its ID
* GetCategories()
    - Grab list of posts' categories
* GetUsers()
    - Grab lists of all users
* Register()
    - Registers a new user
* Login()
    - Performs a sucessful login if credentials are right, outputs an error message otherwise

## User Functions:
* GetUserPosts()
    - Grab all the user's posts
* CreatePost()
    - Creates a new post and adds it to the database
* DeletePost()
    - Deletes a post made by the user. Only the post creator (or admin) can delete the post
* PatchPost()
    - Updates the post. Only the post creator (or admin) can change the post

## Admin Functions:
* CreateCategory()
    - Updates the post. Only the post creator (or admin) can change the post.

---

# Initializing the server:
## First time:
INITIALIZE ENVIRONMENT:
    `go mod init example/server-folder/`

AFTER IMPORTING PACKAGES:
    `go get .`

## Recurrent:
START SERVER: \
    `go mod tidy` \
    `go run main.go`