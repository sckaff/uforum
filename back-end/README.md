# API Documentation
## User Functions:
* newUser()
    - Creates a new user and new user is inserted in the database.
* getUser()
    - Returns the user based on ID.
* getUsers()
    - Returns all the users in the database.
* updateProfile()
    - Updates the profile of the user. Can only be done by User or Admin
* deleteUserByID()
    - Deletes the user based on the User's ID. (OBS - might change to UNIQUE Username)
* validateUser()
    - Validates the user log-in attempt. (verify username and password)

## Post Functions:
* getPosts()
    - Returns the JSON of all posts in the database.
* createPost()
    - Creates a new post and adds it to the database
* getPost()
    - Returns a specific post based on index
* updatePost()
    - Updates the post. Only the post creator (or admin) can change the post.
* deletePostByID()
    - Deletes the post from the database based on the ID

---

# Testing functions on CMD
## User Functions:
getUsers:

newUser:

getUser:

validateUser:

updateProfile:

deleteUserByID:


## Post Functions:
- getPosts:
    `curl http://localhost:8080/posts`

- postNew:
    ```
    curl http://localhost:8080/posts \
    --include \
    --header "Content-Type: application/json" \
    --request "POST" \
    --data '{"id": "4", "user": "BeeBop57","title": "Why is Sckaff > Scaff?","body": "Excepteur sint occaecat cupidatat non proident."}'
    ```

- getPostByID:
    `curl http://localhost:8080/posts/2`

- deletePostByID
    `curl -X DELETE http://localhost:8080/posts/2`

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