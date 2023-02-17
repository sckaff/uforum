// Dylan Zhao 2/13/2023
package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/mattn/go-sqlite3"
)

type Post struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	Body  string `json:"body"`
}

var db *sql.DB

// returns all the posts in the database by userid
func getPosts(w http.ResponseWriter, r *http.Request) {
	db = openDB()
	fmt.Println("getting first line at getPosts")
	w.Header().Set("Content-Type", "application/json")
	var posts []Post
	result, err := db.Query("SELECT id, title from posts")
	if err != nil {
		panic(err.Error())
	}

	defer result.Close()

	for result.Next() {
		var post Post
		err := result.Scan(&post.ID, &post.Title)
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

	stmt, err := db.Prepare("INSERT INTO posts(title) VALUES(?)")
	if err != nil {
		panic(err.Error())
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}

	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	title := keyVal["title"]

	_, err = stmt.Exec(title)
	if err != nil {
		panic(err.Error())
	}

	fmt.Fprintf(w, "New post was created")
}

func openDB() *sql.DB {
	db, err := sql.Open("sqlite3", "C:/Users/dylan/GolangStuff/golangProject/sqlite3/uf_forum.db")
	if err != nil {
		fmt.Println(err)
		return nil
	}
	return db
}

func getPost(w http.ResponseWriter, r *http.Request) {
	db = openDB()

	fmt.Println("post gotten")
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	fmt.Println("Param ID: " + params["id"])

	result, err := db.Query("SELECT id, title FROM posts WHERE id = ?", params["id"])

	if err != nil {
		panic(err.Error())
	}

	defer result.Close()

	var post Post

	for result.Next() {
		err := result.Scan(&post.ID, &post.Title)
		if err != nil {
			panic(err.Error())
		}
	}

	json.NewEncoder(w).Encode(post)
}

// updates the post's properties
func updatePost(w http.ResponseWriter, r *http.Request) {
	db = openDB()
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	stmt, err := db.Prepare("UPDATE posts SET title = ? WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}

	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	newTitle := keyVal["title"]

	_, err = stmt.Exec(newTitle, params["id"])
	if err != nil {
		panic(err.Error())
	}

	fmt.Fprintf(w, "Post with ID = %s was updated", params["id"])
}

// deletes a post
func deletePost(w http.ResponseWriter, r *http.Request) {
	db = openDB()
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	stmt, err := db.Prepare("DELETE FROM posts WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}

	_, err = stmt.Exec(params["id"])
	if err != nil {
		panic(err.Error())
	}

	fmt.Fprintf(w, "Post with ID = %s was deleted", params["id"])
}

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/posts", getPosts).Methods("GET")
	router.HandleFunc("/posts", createPost).Methods("POST")
	router.HandleFunc("/posts/{id}", getPost).Methods("GET")
	router.HandleFunc("/posts/{id}", updatePost).Methods("PUT")
	router.HandleFunc("/posts/{id}", deletePost).Methods("DELETE")

	fmt.Println("server started")

	/*//test query
	result, err := db.Query("SELECT id, title FROM posts WHERE id = ?", 1)
	if err != nil {
		panic(err.Error())
	}

	defer result.Close()

	var post Post

	for result.Next() {
		err := result.Scan(&post.ID, &post.Title)
		if err != nil {
			panic(err.Error())
		}
	}
	fmt.Println(post.ID + " " + post.Title)*/

	http.ListenAndServe(":8000", router)
}
