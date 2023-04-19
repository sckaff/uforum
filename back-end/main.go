package main

import (
	"cen/backend/controllers"
	"cen/backend/middlewares"
	"cen/backend/models"

	"github.com/gin-gonic/gin"
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

	r.GET("/posts", controllers.GetPosts)                                  //Grab all posts
	r.GET("/posts/:id", controllers.GetPostByID)                           //Grab individual post
	r.GET("/categories", controllers.GetCategories)                        //Grab list of categories
	r.GET("/users", controllers.GetUsers)                                  //Grab list of users
	r.GET("/getpostsbycategory/:category", controllers.GetPostsByCategory) //Grab all posts by category

	r.POST("/register", controllers.Register)                      //Register new user
	r.POST("/login", controllers.Login)                            //Login user
	r.POST("/categories", controllers.CreateCategory)              //Create new category (SHOULD BE ADMIN ONLY ONCE IMPLEMENTED)
	r.GET("/getcomments/:postid", controllers.GetCommentsByPostID) //Grab all comments by post

	r.PATCH("/addadmin/:id", controllers.SetUserAsAdmin) //Set user as admin (SHOULD BE ADMIN ONLY ONCE IMPLEMENTED)

	user := r.Group("/user")
	user.Use(middlewares.JwtAuthMiddleware())
	user.GET("/", controllers.CurrentUser)
	user.GET("/posts", controllers.GetUserPosts)                 //Grab all posts by user
	user.POST("/createpost", controllers.CreatePost)             //Create new post
	user.DELETE("/deletepost/:id", controllers.DeletePost)       //Delete Post
	user.PATCH("/updatepost/:id", controllers.PatchPost)         //Update Post
	user.POST("/createcomment", controllers.CreateComment)       //Create new comment
	user.PATCH("/editcomment/:id", controllers.EditComment)      //Edit a comment
	user.DELETE("/deletecomment/:id", controllers.DeleteComment) //Delete a comment
	user.PATCH("/likepost/:id", controllers.LikePost)            //Likes a post and removes a dislike if there is one
	user.PATCH("/dislikepost/:id", controllers.DislikePost)      //Dislikes a post and removes a like if there is one
	user.PATCH("/clearrating/:id", controllers.ClearPostLikes)   //Clears a user's rating on a post

	admin := user.Group("/admin")
	admin.DELETE("/deletepost/:id", controllers.AdminDeletePost)       //Delete a post (admin only)
	admin.DELETE("/deletecomment/:id", controllers.AdminDeleteComment) //Delete a comment (admin only)
	//admin.DELETE("/deleteuser/:id", controllers.AdminDeleteUser) //Delete a user(in progress)
	admin.POST("createcategory", controllers.CreateCategory)   //Create new category (admin only)
	admin.PATCH("/editcategory/:id", controllers.EditCategory) //Edit a category (admin only)

	r.Run()
}
