package main

import (
	"bytes"
	"cen/backend/controllers"
	"cen/backend/models"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
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

	// Test case 1: successful registration
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

	// Test case 2: registration with existing username
	// [TEST AFTER USERNAME IS UNIQUE. IT IS NOT CURRENTLY UNIQUE. NEITHER EMAIL.]
	//
	// input = controllers.RegisterInput{
	// 	Username: "fernando",
	// 	Password: "fernando",
	// 	Email:    "fernando@ufl.edu",
	// }

	// payload, err = json.Marshal(input)
	// if err != nil {
	// 	t.Fatal(err)
	// }
	// res, err = http.Post(ts.URL+"/register", "application/json", bytes.NewBuffer(payload))
	// if err != nil {
	// 	t.Fatal(err)
	// }
	// assert.Equal(t, http.StatusBadRequest, res.StatusCode, "Bad Request response is expected")
}

func TestGetPostByID(t *testing.T) {
	models.ConnectDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())
	r.GET("/posts/:id", controllers.GetPostByID)

	ts := httptest.NewServer(r)

	// Test case 1: successful get request
	res, err := http.Get(fmt.Sprintf("%s/posts/%d", ts.URL, 3))
	if err != nil {
		t.Fatal(err)
	}
	assert.Equal(t, http.StatusOK, res.StatusCode, "OK response is expected")
}

func TestCreatePost(t *testing.T) {
	// Connect to the database
	models.ConnectDatabase()

	// Create a new Gin router
	r := gin.Default()
	r.Use(CORSMiddleware())

	// Define the "/posts" endpoint with the CreatePost controller function
	r.POST("/posts", controllers.CreatePost)

	// Start a new test server
	ts := httptest.NewServer(r)

	// Log in as a user and get a valid JWT token
	loginInput := controllers.LoginInput{
		Username: "fernando",
		Password: "fernando",
	}
	loginPayload, err := json.Marshal(loginInput)
	if err != nil {
		t.Fatal(err)
	}

	loginRes, err := http.Post(ts.URL+"/login", "application/json", bytes.NewBuffer(loginPayload))
	if err != nil {
		t.Fatal(err)
	}
	assert.Equal(t, http.StatusOK, loginRes.StatusCode, "OK response is expected")

	var loginResData struct {
		Token string `json:"token"`
	}
	err = json.NewDecoder(loginRes.Body).Decode(&loginResData)
	if err != nil {
		t.Fatal(err)
	}

	// Create a new post payload
	postInput := controllers.CreatePostInput{
		Title:    "Test Post",
		Body:     "This is a test post",
		Category: "testing",
	}
	postPayload, err := json.Marshal(postInput)
	if err != nil {
		t.Fatal(err)
	}

	// Create a new HTTP request with the JWT token and post payload
	req, err := http.NewRequest("POST", ts.URL+"/posts", bytes.NewBuffer(postPayload))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Authorization", "Bearer "+loginResData.Token)
	req.Header.Set("Content-Type", "application/json")

	// Make the request and check the response
	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		t.Fatal(err)
	}
	assert.Equal(t, http.StatusOK, res.StatusCode, "OK response is expected")

	var resData struct {
		ID       uint   `json:"id"`
		Title    string `json:"title"`
		Body     string `json:"description"`
		Category string `json:"category"`
	}
	err = json.NewDecoder(res.Body).Decode(&resData)
	if err != nil {
		t.Fatal(err)
	}

	assert.NotZero(t, resData.ID, "Post ID should not be zero")
	assert.Equal(t, postInput.Title, resData.Title, "Post title should match")
	assert.Equal(t, postInput.Body, resData.Body, "Post description should match")
	assert.Equal(t, postInput.Category, resData.Category, "Post category should match")
}
