package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"cen/backend/models"
)

func GetUsers(c *gin.Context) {
	var users []models.User
	models.DB.Find(&users)

	c.JSON(http.StatusOK, gin.H{"data": users})
}