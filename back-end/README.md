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
* GetPostsByCategory()
    - Get all posts from a given category
* GetCommentsByPostID
    - Get all comments from a post by a given post id

## User Functions:
* GetUserPosts()
    - Grab all the user's posts
* CreatePost()
    - Creates a new post and adds it to the database
* DeletePost()
    - Deletes a post made by the user. Only the post creator (or admin) can delete the post
* PatchPost()
    - Updates the post. Only the post creator (or admin) can change the post
* CreateComment()
    - Creates a new comment and adds it to the database
* EditComment()
    - Edits a comment. Only the comment creator (or admin) can edi the comment
* DeleteComment()
    - Deletes a comment made by the user. Only the comment creator (or admin) can delete the comment

## Admin Functions:
* CreateCategory()
    - Creates a category. Only an admin can create a category.
* EditCategory()
    - Edits a category. Only an admin can create a category.
* AdminDeletePost()
    - Has the same functionality as DeletePost() but only the admin can access this function and can delete any post.
* AdminDeleteComment()
    - Has the same functionality as DeleteCommen() but only the admin can access this function and can delete any comment.
* SetUserAsAdmin()
    - Gives a user admin status. For now the method does not require admin access.

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

---

# Sqlite3 
INSTALL:
    `sudo port install sqlite3`
OPEN:
    `sqlite3 uforum.db`
