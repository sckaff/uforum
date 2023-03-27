package models

import (
	"log"
	// "os"
	// "fmt"
	"gorm.io/gorm"
	//   "gorm.io/driver/mysql"
	"github.com/joho/godotenv"
	"gorm.io/driver/sqlite"
)

var DB *gorm.DB

func ConnectDatabase() {

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	// DbHost := os.Getenv("DB_HOST")
	// DbUser := os.Getenv("DB_USER")
	// DbPassword := os.Getenv("DB_PASSWORD")
	// DbName := os.Getenv("DB_NAME")
	// DbPort := os.Getenv("DB_PORT")

	// DBURL := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", DbUser, DbPassword, DbHost, DbPort, DbName)

	database, err := gorm.Open(sqlite.Open("uforum.db"), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database!")
	}

	err = database.AutoMigrate(&Post{})
	if err != nil {
		return
	}
	err = database.AutoMigrate(&Category{})
	if err != nil {
		return
	}
	err = database.AutoMigrate(&User{})
	if err != nil {
		return
	}
	err = database.AutoMigrate(&Comment{})
	if err != nil {
		return
	}

	DB = database
}
