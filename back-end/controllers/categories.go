package controllers

import (
	"net/http"

	"cen/backend/models"

	"github.com/gin-gonic/gin"
)

type CreateCategoryInput struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
}

func GetCategories(c *gin.Context) {
	var categories []models.Category
	models.DB.Find(&categories)

	c.JSON(http.StatusOK, gin.H{"data": categories})
}

func CreateCategory(c *gin.Context) {
	//try to figure out how to narrow down to only admin users
	/*user_id, err := token.ExtractTokenID(c)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

	    u, err := models.GetUserByID(user_id)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}*/

	var input CreateCategoryInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	category := models.Category{Title: input.Title, Description: input.Description}
	models.DB.Create(&category)

	//if user is admin else error.
	c.JSON(http.StatusOK, gin.H{"data": category})
}

func GetPostsByCategory(c *gin.Context) {
	var category models.Category

	if err := models.DB.Where("title = ?", c.Param("title")).First(&category).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": category})
}
