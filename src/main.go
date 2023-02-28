/*
Initializing a server:
	- INITIALIZE ENVIRONMENT:
		$ go mod init example/server-folder/
	- AFTER IMPORTING PACKAGES:
		$ go get .
	- START SERVER:
		go run .

Functions:
	- getPosts:
		$ curl http://localhost:8080/posts

	- postNew:
		$ curl http://localhost:8080/posts \
		  --include \
		  --header "Content-Type: application/json" \
		  --request "POST" \
		  --data '{"id": "4", "user": "BeeBop57","title": "Why is Sckaff > Scaff?","body": "Excepteur sint occaecat cupidatat non proident."}'

	- getPostByID:
		$ curl http://localhost:8080/posts/2

	- deletePostByID
		$ curl -X DELETE http://localhost:8080/posts/2
*/

package main

import (
	"fmt"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// album represents data about a record album.
type post struct {
	ID    string `json:"id"`
	User  string `json:"user"`
	Title string `json:"title"`
	Body  string `json:"body"`
}

type user struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// albums slice to seed record album data.
var posts = []post{
	{ID: "1", User: "John33", Title: "RTS Bus Stop", Body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
	{ID: "2", User: "Mary42", Title: "Drama on CDA3101", Body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
	{ID: "3", User: "John234", Title: "Sarah Vaughan and Clifford Brown", Body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},
}

func main() {
	router := gin.Default()
	router.Use(cors.Default())
	router.GET("/posts", getPosts)
	router.GET("/posts/:id", getPostByID)
	router.DELETE("/posts/:id", deletePostByID)
	router.POST("/posts", postNew)

	router.Run("localhost:8080")
}

// Helper function to remove element from array
// Taken from https://stackoverflow.com/questions/37334119/how-to-delete-an-element-from-a-slice-in-golang
func RemoveIndex(s []post, index int) []post {
	return append(s[:index], s[index+1:]...)
}

// getPosts responds with the list of all posts as JSON.
func getPosts(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, posts)
}

// getPostByID locates the album whose ID value matches the id
// parameter sent by the client, then returns that post as a response.
func getPostByID(c *gin.Context) {
	id := c.Param("id")

	// Loop over the list of albums, looking for
	// an album whose ID value matches the parameter.
	for _, a := range posts {
		if a.ID == id {
			c.IndentedJSON(http.StatusOK, a)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "post not found"})
}

// deletePostByID will remove the post based on the post's ID
// anywhere on the database
func deletePostByID(c *gin.Context) {
	fmt.Println("ran delete function")
	id := c.Param("id")

	// Loop over the list of albums, looking for
	// an album whose ID value matches the parameter.
	for index, a := range posts {
		if a.ID == id {
			posts = RemoveIndex(posts, index)
			c.IndentedJSON(http.StatusOK, gin.H{"success": "Post #" + id + " deleted"})
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "could not find post to delete"})
}

// postNew adds a post from JSON received in the request body.
func postNew(c *gin.Context) {
	var newPost post

	// Call BindJSON to bind the received JSON to
	// postNew.
	if err := c.BindJSON(&newPost); err != nil {
		return
	}

	// Add the new post to the slice.
	posts = append(posts, newPost)
	c.IndentedJSON(http.StatusCreated, newPost)
}