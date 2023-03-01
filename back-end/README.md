# API Documentation
## USER FUNCTIONS:
* newUser()
    - Test
* getUser()
    - Test
* getUsers()
    - Test
* updateProfile()
    - Test
* deleteUserByID()
    - Test
* validateUser()
    - Test

## POST FUNCTIONS:
* getPosts()
    - Test
* createPost()
    - Test
* getPost()
    - Test
* updatePost()
    - Test
* deletePostByID()
    - Test

---

## Testing functions on CMD
# USER FUNCTIONS:
getUsers:

newUser:

getUser:

validateUser:

updateProfile:

deleteUserByID:


# POST FUNCTIONS:
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
START SERVER:
    `go mod tidy (if needed)`<br\>
    `go run main.go`