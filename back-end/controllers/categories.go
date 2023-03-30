package controllers

import (
	"net/http"

	"cen/backend/models"
	"cen/backend/utils/token"

	"github.com/gin-gonic/gin"
)

type CreateCategoryInput struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
}

type EditCategoryInput struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

func GetCategories(c *gin.Context) {
	var categories []models.Category
	models.DB.Find(&categories)

	c.JSON(http.StatusOK, gin.H{"data": categories})
}

func CreateCategory(c *gin.Context) {
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
		c.JSON(http.StatusBadRequest, gin.H{"error": "You are not authorized to create categories!"})
		return
	}

	var input CreateCategoryInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	category := models.Category{Title: input.Title, Description: input.Description}
	models.DB.Create(&category)

	c.JSON(http.StatusOK, gin.H{"data": category})
}

func DeleteCategory(c *gin.Context) { //not tested yet
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
		c.JSON(http.StatusBadRequest, gin.H{"error": "You are not authorized to create categories!"})
		return
	}

	var category models.Category
	if err := models.DB.Where("id = ?", c.Param("id")).First(&category).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	models.DB.Delete(&category)

	//if user is admin else error(in progress).
	c.JSON(http.StatusOK, gin.H{"data": true})
}

func EditCategory(c *gin.Context) {
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
		c.JSON(http.StatusBadRequest, gin.H{"error": "You are not authorized to create categories!"})
		return
	}

	var old_category models.Category
	if err := models.DB.Where("id = ?", c.Param("id")).First(&old_category).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	var category_input EditCategoryInput
	if err := c.ShouldBindJSON(&category_input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	new_category := models.Category{Title: category_input.Title, Description: category_input.Description}
	models.DB.Model(&old_category).Updates(new_category)

	c.JSON(http.StatusOK, gin.H{"data": new_category})
}
