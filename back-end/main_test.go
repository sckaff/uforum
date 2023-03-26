package main

import (
	"cen/backend/controllers"
	"cen/backend/models"
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
