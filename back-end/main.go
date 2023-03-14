package main

import (
	"github.com/gin-gonic/gin"
	"cen/backend/models"
	"cen/backend/controllers"
	"cen/backend/middlewares"
	// "github.com/gin-contrib/cors"
  )
  
func CORSMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
        c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }

        c.Next()
    }
}

func main() {
	r := gin.Default()
	r.Use(CORSMiddleware())

	models.ConnectDatabase()

	r.GET("/posts", controllers.GetPosts) //Grab all posts 
	r.GET("/posts/:id", controllers.GetPostByID) //Grab individual post
	r.GET("/categories", controllers.GetCategories) //Grab list of categories
	r.GET("/users", controllers.GetUsers) //Grab list of users
  
	r.POST("/register", controllers.Register) //Register new user
	r.POST("/login", controllers.Login) //Login user
	r.POST("/categories", controllers.CreateCategory) //Create new category (SHOULD BE ADMIN ONLY ONCE IMPLEMENTED)

	user := r.Group("/user")
	user.Use(middlewares.JwtAuthMiddleware())
	user.GET("/",controllers.CurrentUser)
	user.GET("/posts", controllers.GetUserPosts) //Grab all posts by user
	user.POST("/createpost",controllers.CreatePost) //Create new post
	user.DELETE("/deletepost/:id", controllers.DeletePost) //Delete Post
	user.PATCH("/updatepost/:id", controllers.PatchPost) //Update Post

	r.Run()
}