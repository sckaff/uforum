package controllers

import (
	"net/http"

	"cen/backend/models"
	"cen/backend/utils/token"

	"github.com/gin-gonic/gin"
)

// create a make user an admin function (change to admin only after project is done)
func SetUserAsAdmin(c *gin.Context) {
	user_id := c.Param("id")

	var user models.User
	if err := models.DB.Where("id = ?", user_id).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found!"})
		return
	}

	user.IsAdmin = true
	if err := models.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to set user as admin!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User has been set as admin."})
}

func DeleteUser(c *gin.Context) { // WIP
	//finds username and checks if user is admin
	userID, err := token.ExtractTokenID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	adminuser, err := models.GetUserByID(userID)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if !adminuser.IsAdmin {
		c.JSON(http.StatusBadRequest, gin.H{"error": "You are not authorized to perform this action!"})
		return
	}
	var user models.User
	if err := models.DB.Where("username = ?", c.Param("username")).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	models.DB.Delete(&user)

	//if user is admin else error(in progress).
	c.JSON(http.StatusOK, gin.H{"data": true})
}

func AdminDeletePost(c *gin.Context) {
	//finds username and checks if user is admin
	userID, err := token.ExtractTokenID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := models.GetUserByID(userID)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if !user.IsAdmin {
		c.JSON(http.StatusBadRequest, gin.H{"error": "You are not authorized to perform this action!"})
		return
	}

	var post models.Post
	if err := models.DB.Where("id = ?", c.Param("id")).First(&post).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Post not found!"})
		return
	}

	models.DB.Delete(&post)
	c.JSON(http.StatusOK, gin.H{"data": true})
}

func AdminDeleteComment(c *gin.Context) {
	//finds username and checks if user is admin
	userID, err := token.ExtractTokenID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := models.GetUserByID(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if !user.IsAdmin {
		c.JSON(http.StatusBadRequest, gin.H{"error": "You are not authorized to perform this action!"})
		return
	}

	var comment models.Comment
	if err := models.DB.Where("id = ?", c.Param("id")).First(&comment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Comment not found!"})
		return
	}

	models.DB.Delete(&comment)
	c.JSON(http.StatusOK, gin.H{"data": true})
}
