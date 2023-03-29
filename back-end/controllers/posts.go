package controllers

import (
	"net/http"

	"cen/backend/models"
	"cen/backend/utils/token"

	"github.com/gin-gonic/gin"
)

type CreatePostInput struct {
	Title    string `json:"title" binding:"required"`
	Body     string `json:"body" binding:"required"`
	Category string `json:"category" binding:"required"`
}

type UpdatePostInput struct {
	Title    string `json:"title"`
	Body     string `json:"body"`
	Category string `json:"category" binding:"required"`
}

func GetPosts(c *gin.Context) {
	var posts []models.Post
	models.DB.Find(&posts)

	c.JSON(http.StatusOK, gin.H{"data": posts})
}

// REQUIRES LOGIN
func GetUserPosts(c *gin.Context) {
	user_id, err := token.ExtractTokenID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	u, err := models.GetUserByID(user_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var username = u.Username

	var posts []models.Post
	models.DB.Where("User = ?", username).Find(&posts)

	c.JSON(http.StatusOK, gin.H{"data": posts})
}

// REQUIRES LOGIN
func CreatePost(c *gin.Context) {
	user_id, err := token.ExtractTokenID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	u, err := models.GetUserByID(user_id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var username = u.Username

	var post_input CreatePostInput
	if err := c.ShouldBindJSON(&post_input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := models.DB.Find(&models.Category{}, "title = ?", post_input.Category).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Category not found!"})
		return
	}

	post := models.Post{Title: post_input.Title, Body: post_input.Body, Category: post_input.Category, User: username}
	models.DB.Create(&post)

	c.JSON(http.StatusOK, gin.H{"data": post})
}

func GetPostByID(c *gin.Context) {
	var post models.Post

	if err := models.DB.Where("id = ?", c.Param("id")).First(&post).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": post})
}

// REQUIRES LOGIN
func PatchPost(c *gin.Context) {
	user_id, err := token.ExtractTokenID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	u, err := models.GetUserByID(user_id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var username = u.Username

	var old_post models.Post
	if err := models.DB.Where("id = ?", c.Param("id")).First(&old_post).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Post not found!"})
		return
	}

	var post_input UpdatePostInput
	if err := c.ShouldBindJSON(&post_input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := models.DB.Find(&models.Category{}, "title = ?", post_input.Category).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Category not found!"})
		return
	}

	if old_post.User != username {
		c.JSON(http.StatusBadRequest, gin.H{"error": "You are not authorized to edit this post!"})
	} else {
		new_post := models.Post{Title: post_input.Title, Body: post_input.Body, Category: post_input.Category, User: username}
		models.DB.Model(&old_post).Updates(new_post)

		c.JSON(http.StatusOK, gin.H{"data": new_post})
	}

}

// REQUIRES LOGIN
func DeletePost(c *gin.Context) {
	user_id, err := token.ExtractTokenID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	u, err := models.GetUserByID(user_id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var username = u.Username

	var post models.Post
	if err := models.DB.Where("id = ?", c.Param("id")).First(&post).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Post not found!"})
		return
	}

	// Check if the post belongs to the user, delete if it does
	if post.User != username {
		c.JSON(http.StatusBadRequest, gin.H{"error": "You are not authorized to delete this post!"})
		return
	} else {
		models.DB.Delete(&post)
		c.JSON(http.StatusOK, gin.H{"data": true})
	}
}

func GetPostsByCategory(c *gin.Context) {
	categoryTitle := c.Param("category")

	var posts []models.Post

	if err := models.DB.Where("category = ?", categoryTitle).Find(&posts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": posts})
}
