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
* GetPostsByCategory()
    - Grab lists of all posts within a specific category
* Register()
    - Registers a new user
* Login()
    - Performs a sucessful login if credentials are right, outputs an error message otherwise
* GetCommentsByPostID()
    - Get all comments from a post by a given post id
* CreateCategory()
    - Create a new category (SERVER ONLY)
---
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
* LikePost()
    - Likes a post. The user is recorded as a username in the post's like list
* DislikePost()
    - Dislikes a post. The user is recorded as a username in the post's dislike list
* ClearPostLikes()
    - Clears any rating a user has made on a post.
---
## Admin Functions:
* CreateCategory()
    - Creates a category. Only an admin can create a category.
* EditCategory()
    - Edits a category. Only an admin can create a category.
* AdminDeletePost()
    - Has the same functionality as DeletePost() but only the admin can access this function and can delete any post.
* AdminDeleteComment()
    - Has the same functionality as DeleteComment() but only the admin can access this function and can delete any comment.
* SetUserAsAdmin()
    - Gives a user admin status.
---
