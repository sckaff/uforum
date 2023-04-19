package main

import (
	"bytes"
	"cen/backend/controllers"
	"cen/backend/models"
	"cen/backend/utils/token"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

// Test to check whether we can GET all posts
func TestGetPosts(t *testing.T) {

	models.ConnectDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())
	r.GET("/posts", controllers.GetPosts)

	ts := httptest.NewServer(r)

	res, err := http.Get(ts.URL + "/posts")
	if err != nil {
		t.Fatal(err)
	}

	assert.Equal(t, http.StatusOK, res.StatusCode, "OK response is expected")
}

// Test to check whether we can GET all users
func TestGetUsers(t *testing.T) {

	models.ConnectDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())
	r.GET("/users", controllers.GetUsers)

	ts := httptest.NewServer(r)

	res, err := http.Get(ts.URL + "/users")
	if err != nil {
		t.Fatal(err)
	}

	assert.Equal(t, http.StatusOK, res.StatusCode, "OK response is expected")
}

func TestLogin(t *testing.T) {
	models.ConnectDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())
	r.POST("/login", controllers.Login)

	ts := httptest.NewServer(r)

	// Test case 1: successful login
	input := controllers.LoginInput{
		Username: "fernando",
		Password: "fernando",
	}

	payload, err := json.Marshal(input)
	if err != nil {
		t.Fatal(err)
	}

	res, err := http.Post(ts.URL+"/login", "application/json", bytes.NewBuffer(payload))
	if err != nil {
		t.Fatal(err)
	}

	assert.Equal(t, http.StatusOK, res.StatusCode, "OK response is expected")

	var resData struct {
		Token string `json:"token"`
	}

	err = json.NewDecoder(res.Body).Decode(&resData)
	if err != nil {
		t.Fatal(err)
	}

	assert.NotEmpty(t, resData.Token, "JWT token should not be empty")

	// Test case 2: login with incorrect credentials
	input = controllers.LoginInput{
		Username: "your-username",
		Password: "wrong-password",
	}
	payload, err = json.Marshal(input)
	if err != nil {
		t.Fatal(err)
	}
	res, err = http.Post(ts.URL+"/login", "application/json", bytes.NewBuffer(payload))
	if err != nil {
		t.Fatal(err)
	}
	assert.Equal(t, http.StatusBadRequest, res.StatusCode, "Bad Request response is expected")
	var errorRes struct {
		Error string `json:"error"`
	}
	err = json.NewDecoder(res.Body).Decode(&errorRes)
	if err != nil {
		t.Fatal(err)
	}
	assert.Equal(t, "username or password is incorrect.", errorRes.Error, "Error message should be 'username or password is incorrect.'")
}

func TestRegister(t *testing.T) {
	models.ConnectDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())
	r.POST("/register", controllers.Register)

	ts := httptest.NewServer(r)

	input := controllers.RegisterInput{
		Username: "joesamcat",
		Password: "fernandoscat",
		Email:    "joesam@ufl.edu",
	}

	payload, err := json.Marshal(input)
	if err != nil {
		t.Fatal(err)
	}
	res, err := http.Post(ts.URL+"/register", "application/json", bytes.NewBuffer(payload))
	if err != nil {
		t.Fatal(err)
	}
	assert.Equal(t, http.StatusOK, res.StatusCode, "OK response is expected")
}

func TestGetPostByID(t *testing.T) {
	models.ConnectDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())
	r.GET("/posts/:id", controllers.GetPostByID)

	ts := httptest.NewServer(r)

	// Test case 1: successful get request
	res, err := http.Get(fmt.Sprintf("%s/posts/%d", ts.URL, 1))
	if err != nil {
		t.Fatal(err)
	}
	assert.Equal(t, http.StatusOK, res.StatusCode, "OK response is expected")
}

func TestCreateComment(t *testing.T) {
	models.ConnectDatabase()

	// Create a new post to comment on
	post := models.Post{Title: "Test Post", Body: "This is a test post body."}
	models.DB.Create(&post)

	// Create a new user to associate with the comment
	user := models.User{Username: "testuser", Password: "testpassword"}
	models.DB.Create(&user)

	// Generate a JWT token for the user
	tokenString, err := token.GenerateToken(user.ID)
	if err != nil {
		t.Fatal(err)
	}

	// Create a new comment to add to the post
	commentInput := controllers.CreateCommentInput{Body: "This is a test comment body.", PostID: post.ID}
	commentPayload, err := json.Marshal(commentInput)
	if err != nil {
		t.Fatal(err)
	}

	// Create a new request with the JWT token and comment payload
	req, err := http.NewRequest("POST", "/comments", bytes.NewBuffer(commentPayload))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", tokenString))

	// Perform the request
	r := gin.Default()
	r.POST("/comments", controllers.CreateComment)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	// Check that the response is successful
	assert.Equal(t, http.StatusOK, w.Code, "OK response is expected")

	// Check that the response contains the created comment
	var resData struct {
		Data models.Comment `json:"data"`
	}
	err = json.Unmarshal(w.Body.Bytes(), &resData)
	if err != nil {
		t.Fatal(err)
	}
	assert.Equal(t, commentInput.Body, resData.Data.Body, "Comment body should match the input")
	assert.Equal(t, user.Username, resData.Data.User, "Comment should be associated with the correct user")
	assert.Equal(t, post.ID, resData.Data.PostID, "Comment should be associated with the correct post")
}

func TestLikePost(t *testing.T) {
	models.ConnectDatabase()

	// Create a new user to associate with the post
	user := models.User{Username: "testuser", Password: "testpassword"}
	models.DB.Create(&user)

	// Generate a JWT token for the user
	tokenString, err := token.GenerateToken(user.ID)
	if err != nil {
		t.Fatal(err)
	}

	// Create a new post to like
	post := models.Post{Title: "Test Post", Body: "This is a test post body.", User: user.Username}
	models.DB.Create(&post)

	// Create a request to like the post
	req, err := http.NewRequest("POST", fmt.Sprintf("/posts/%d/like", post.ID), nil)
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", tokenString))

	// Perform the request
	r := gin.Default()
	r.POST("/posts/:id/like", controllers.LikePost)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	// Check that the response is successful
	assert.Equal(t, http.StatusOK, w.Code, "OK response is expected")

	// Check that the post was liked
	var resData struct {
		Data models.Post `json:"data"`
	}
	err = json.Unmarshal(w.Body.Bytes(), &resData)
	if err != nil {
		t.Fatal(err)
	}
	assert.True(t, strings.Contains(resData.Data.Likes, user.Username), "User should have liked the post")
}

func TestGetCategories(t *testing.T) {

	models.ConnectDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())
	r.GET("/categories", controllers.GetCategories)

	ts := httptest.NewServer(r)

	res, err := http.Get(ts.URL + "/categories")
	if err != nil {
		t.Fatal(err)
	}

	assert.Equal(t, http.StatusOK, res.StatusCode, "OK response is expected")
}
