package controllers

import (
	"net/http"

	"cen/backend/models"
	"cen/backend/utils/token"

	"github.com/gin-gonic/gin"
)

type CreateCommentInput struct {
	Body   string `json:"body" binding:"required"`
	PostID uint   `json:"postid" binding:"required"`
}

type EditCommentInput struct {
	Body string `json:"body"`
}

func CreateComment(c *gin.Context) {

	// Extract user ID from token
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

	var commentInput CreateCommentInput
	if err := c.ShouldBindJSON(&commentInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := models.DB.Find(&models.Post{}, "id = ?", commentInput.PostID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Post not found!"})
		return
	}

	comment := models.Comment{Body: commentInput.Body, PostID: uint(commentInput.PostID), User: username}
	models.DB.Create(&comment)

	// Return the created comment
	c.JSON(http.StatusOK, gin.H{"data": comment})
}

func GetCommentsByPostID(c *gin.Context) {
	postID := c.Param("postid")

	var comments []models.Comment
	if err := models.DB.Where("post_id = ?", postID).Find(&comments).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve comments"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": comments})
}

func EditComment(c *gin.Context) {
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

	var old_comment models.Comment
	if err := models.DB.Where("id = ?", c.Param("id")).First(&old_comment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "comment not found!"})
		return
	}

	var comment_input EditCommentInput
	if err := c.ShouldBindJSON(&comment_input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if old_comment.User != username {
		c.JSON(http.StatusBadRequest, gin.H{"error": "You are not authorized to edit this comment!"})
	} else {
		new_comment := models.Comment{Body: comment_input.Body, User: username}
		models.DB.Model(&old_comment).Updates(new_comment)

		c.JSON(http.StatusOK, gin.H{"data": new_comment})
	}
}

func DeleteComment(c *gin.Context) {
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

	var comment models.Comment
	if err := models.DB.Where("id = ?", c.Param("id")).First(&comment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Comment not found!"})
		return
	}

	// Check if the comment belongs to the user, delete if it does
	if comment.User != username {
		c.JSON(http.StatusBadRequest, gin.H{"error": "You are not authorized to delete this post!"})
		return
	} else {
		models.DB.Delete(&comment)
		c.JSON(http.StatusOK, gin.H{"data": true})
	}
}
