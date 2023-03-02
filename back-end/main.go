package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	_ "github.com/mattn/go-sqlite3"
)

// User schema
type User struct {
	ID        string `json:"uID"`
	Username  string `json:"username"`
	Password  string `json:"password"`
	Email     string `json:"email"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}

// Post schema
type Post struct {
	ID       string `json:"pID"`
	UserName string `json:"userName"`
	Title    string `json:"title"`
	Body     string `json:"body"`
}

var db *sql.DB

// ----------------------------- OPEN SERVER ----------------------------- //
func openDB() *sql.DB {
	db, err := sql.Open("sqlite3", "./sqlite3/uf_forum.db")
	if err != nil {
		fmt.Println(err)
		return nil
	}
	return db
}

// ----------------------------- USER FUNCTION CALLS ----------------------------- //
// Returns the id and emails of all users
func getUsers(w http.ResponseWriter, r *http.Request) {
	db = openDB()
	fmt.Println("getting first line at getUsers")
	w.Header().Set("Content-Type", "application/json")
	var users []User
	result, err := db.Query("SELECT uID, username, password, email, first_name, last_name from users")
	if err != nil {
		panic(err.Error())
	}

	defer result.Close()

	for result.Next() {
		var user User
		err := result.Scan(&user.ID, &user.Username, &user.Email, &user.FirstName, &user.LastName)
		if err != nil {
			panic(err.Error())
		}
		users = append(users, user)
		fmt.Println(user.ID + " " + user.Email)
	}

	json.NewEncoder(w).Encode(users)
}

// Creates a new user. This function requires the inputted uf_email value to be unique
func newUser(w http.ResponseWriter, r *http.Request) {
	db = openDB()
	w.Header().Set("Content-Type", "application/json")

	stmt, err := db.Prepare("INSERT INTO users(username,password,email,first_name,last_name) VALUES(?,?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}

	/*keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	fmt.Println(keyVal)
	email := keyVal["uf_email"]
	password := keyVal["password"]
	first_name := keyVal["first_name"]
	last_name := keyVal["last_name"]
	_, err = stmt.Exec(email, password, first_name, last_name)
	if err != nil {
		panic(err.Error())
	}*/

	var user User
	err = json.Unmarshal(body, &user)
	if err != nil {
		panic(err.Error())
	}

	_, err = stmt.Exec(user.Username, user.Password, user.Email, user.FirstName, user.LastName)
	if err != nil {
		panic(err.Error())
	}

	fmt.Fprintf(w, "New user was created")
}

// Returns a specific user based on inputted uID
func getUser(w http.ResponseWriter, r *http.Request) {
	db = openDB()

	fmt.Println("user gotten")
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	fmt.Println("Param Userid: " + params["uID"])

	result, err := db.Query("SELECT uID, username, email, first_name, last_name FROM users WHERE userid = ?", params["uID"])

	if err != nil {
		panic(err.Error())
	}

	defer result.Close()

	var user User

	for result.Next() {
		err := result.Scan(&user.ID, &user.Username, &user.Email, &user.FirstName, &user.LastName)
		fmt.Println(user)
		if err != nil {
			panic(err.Error())
		}
	}

	json.NewEncoder(w).Encode(user)
}

// Used to validate email and password match.
// * Should return HTTP Success or Failure
func validateUser(w http.ResponseWriter, r *http.Request) {
	db = openDB()

	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	fmt.Println("Param uf_email: " + params["email"])
	fmt.Println("Param password " + params["password"])

	result, err := db.Query("SELECT password FROM users WHERE email = ?", params["email"])

	if err != nil {
		panic(err.Error())
	}

	defer result.Close()

	var password string

	for result.Next() {
		err := result.Scan(&password)
		fmt.Println(password)
		if err != nil {
			panic(err.Error())
		}
	}

	if password == params["password"] {
		w.WriteHeader(http.StatusOK) // Set HTTP status code to 200 (OK) when password matches
		w.Write([]byte("Success"))
	} else {
		w.WriteHeader(http.StatusUnauthorized) // Set HTTP status code to 401 when password does not match
		w.Write([]byte("Failure"))
	}
}

// Updates the profile of a given user (work in progress)
func updateProfile(w http.ResponseWriter, r *http.Request) {
	db = openDB()
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	stmt, err := db.Prepare("UPDATE users SET email = ? WHERE uID = ?")
	if err != nil {
		panic(err.Error())
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}

	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	newEmail := keyVal["email"]

	_, err = stmt.Exec(newEmail, params["uID"])
	if err != nil {
		panic(err.Error())
	}

	fmt.Fprintf(w, "User with ID = %s was updated", params["uID"])
}

// Deletes a specified user based on its userid
func deleteUserByID(w http.ResponseWriter, r *http.Request) {
	db = openDB()
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	stmt, err := db.Prepare("DELETE FROM users WHERE uID = ?")
	if err != nil {
		panic(err.Error())
	}

	_, err = stmt.Exec(params["uID"])
	if err != nil {
		panic(err.Error())
	}

	fmt.Fprintf(w, "User with ID = %s was deleted", params["uID"])
}

// ----------------------------- POST FUNCTION CALLS ----------------------------- //
// Returns all the posts in the database by userid
func getPosts(w http.ResponseWriter, r *http.Request) {
	db = openDB()
	fmt.Println("getting first line at getPosts")
	w.Header().Set("Content-Type", "application/json")
	var posts []Post
	result, err := db.Query("SELECT pID, userName, title, body from posts")
	if err != nil {
		panic(err.Error())
	}

	defer result.Close()

	for result.Next() {
		var post Post
		err := result.Scan(&post.ID, &post.UserName, &post.Title, &post.Body)
		if err != nil {
			panic(err.Error())
		}
		posts = append(posts, post)
	}

	json.NewEncoder(w).Encode(posts)
}

// creates a new post
func createPost(w http.ResponseWriter, r *http.Request) {
	db = openDB()
	w.Header().Set("Content-Type", "application/json")

	stmt, err := db.Prepare("INSERT INTO posts(userName, title, body) VALUES(?,?,?)")
	if err != nil {
		panic(err.Error())
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}

	/*keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	title := keyVal["title"]*/

	var post Post
	err = json.Unmarshal(body, &post)
	if err != nil {
		panic(err.Error())
	}

	_, err = stmt.Exec(post.UserName,post.Title,post.Body)
	if err != nil {
		panic(err.Error())
	}

	fmt.Fprintf(w, "New post was created")
}

// Get a specific post
func getPost(w http.ResponseWriter, r *http.Request) {
	db = openDB()
	fmt.Println("post gotten")
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	fmt.Println("Param ID: " + params["pID"])

	result, err := db.Query("SELECT pID, userName, title, body FROM posts WHERE pID = ?", params["pID"])

	if err != nil {
		panic(err.Error())
	}

	defer result.Close()

	var post Post

	for result.Next() {
		err := result.Scan(&post.ID, &post.UserName, &post.Title, &post.Body)
		if err != nil {
			panic(err.Error())
		}
	}

	json.NewEncoder(w).Encode(post)
}

// Updates the post's properties
func updatePost(w http.ResponseWriter, r *http.Request) {
	db = openDB()
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	stmt, err := db.Prepare("UPDATE posts SET body = ? WHERE pID = ?")
	if err != nil {
		panic(err.Error())
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}

	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	newBody := keyVal["body"]

	_, err = stmt.Exec(newBody, params["pID"])
	if err != nil {
		panic(err.Error())
	}

	fmt.Fprintf(w, "Post with ID = %s was updated", params["pID"])
}

// Deletes a post
func deletePostByID(w http.ResponseWriter, r *http.Request) {
	db = openDB()
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	stmt, err := db.Prepare("DELETE FROM posts WHERE pID = ?")
	if err != nil {
		panic(err.Error())
	}

	_, err = stmt.Exec(params["pID"])
	if err != nil {
		panic(err.Error())
	}

	fmt.Fprintf(w, "Post with ID = %s was deleted", params["pID"])
}

func main() {
	router := mux.NewRouter()

	// User
	router.HandleFunc("/users", newUser).Methods("POST")
	router.HandleFunc("/users", getUsers).Methods("GET")
	router.HandleFunc("/users/{userid}", getUser).Methods("GET")
	router.HandleFunc("/users/{userid}", updateProfile).Methods("PUT")
	router.HandleFunc("/users/{userid}", deleteUserByID).Methods("DELETE")
	router.HandleFunc("/users/validate/{uf_email}/{password}", validateUser).Methods("GET")

	// Posts
	router.HandleFunc("/posts", getPosts).Methods("GET")
	router.HandleFunc("/posts", createPost).Methods("POST")
	router.HandleFunc("/posts/{pID}", getPost).Methods("GET")
	router.HandleFunc("/posts/{pID}", updatePost).Methods("PUT")
	router.HandleFunc("/posts/{pID}", deletePostByID).Methods("DELETE")

	fmt.Println("Server started!")

	methods := []string{"GET", "POST", "PUT", "DELETE"}
	headers := []string{"Content-Type"}
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(handlers.AllowedMethods(methods), handlers.AllowedHeaders(headers))(router)))
}