package controllers

import (
	"net/http"

	"cen/backend/models"
	"cen/backend/utils/token"

	"github.com/gin-gonic/gin"
)

func AdminDeletePost(c *gin.Context) {
	//figure out admin list and how to check if user is admin
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
