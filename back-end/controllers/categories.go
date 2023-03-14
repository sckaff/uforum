package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"cen/backend/models"
)

type CreateCategoryInput struct {
	Title  string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
  }

func GetCategories(c *gin.Context) {
	var categories []models.Category
	models.DB.Find(&categories)

	c.JSON(http.StatusOK, gin.H{"data": categories})
}

func CreateCategory(c *gin.Context) {
	var input CreateCategoryInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	category := models.Category{Title: input.Title, Description: input.Description}
	models.DB.Create(&category)

	c.JSON(http.StatusOK, gin.H{"data": category})
}