// Given by the professor through email. Sample back-end code.

// 1. HELPER FUNCTIONS
package util
import (
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "runtime/debug"
)

// DecodeJSONRequest unmarshals a JSON from src and stores it in dst (must be a pointer).
// If the unmarshalling fails, a 400 with an error message is written on w.
func DecodeJSONRequest(dst interface{}, src io.Reader, w http.ResponseWriter) (succeeded bool) {

if err := json.NewDecoder(src).Decode(dst); err != nil {

    w.WriteHeader(http.StatusBadRequest)
    fmt.Fprintf(w, "Bad request JSON (%v).", err)
    return false

}
    return true
}

// EncodeJSONResponse marshals an object to JSON and sends a 200 with the
// object, or sends a 500 with an error message if marshalling fails.
func EncodeJSONResponse(w http.ResponseWriter, response interface{}) {
    if raw, err := json.Marshal(response); err != nil {
        w.WriteHeader(http.StatusInternalServerError)
        fmt.Fprintf(w, "Failed to encode query result to JSON (%v).", err)
    }
    else {
        w.Header().Add("Content-Type", "application/json; charset=utf-8")
        w.Write(raw)
    }
}

// 2.

// * **Back-end**
//     * Implements a router (GorillaMux)
//     * Send information form FE to handling functions
//         * make sure info is "reasonable"
//         * error and permission handling
//         * Ways to send info:
//             * encode in URL: GET, POST, PUT,  DELETE
//             * query parameters: GET (POST, PUT, DELETE)
//             * body of the request: POST, PUT
//     * Use info to lookup/change in memory data-structure
//         * Reason 1: cache database info
//         * Reason 2: info only in memory. Sessions.
//     * Interact with a  database
//         * Gorm:
//         * Persistent
//         * Multiple backend processes using the same database
//     * Sending an answer:
//         * Send an error message
//         * Send a reply:
//             * OK: 200, delete action
//             * JSON: most common
//         * Binary reply,
// * **Database**
//     * Almost all applications can work with SQLite3
//     * Can use Database Servers: MySQL/MariaDB, PostgresSQL, Oracle, MS SQLserver, ....
//     * Data holder
//     * Hardest to SCALE
//     * Usage:
//         * Manage collections: CRUD interface
//         * Compute statistics
//             * Dashboards
//             * GROUP BY, COUNT, SUM...
//     * BLOBS: binary data

// Component

title: string; // title of new book
author: string; //  name of author
books: BookInfo[];

async addBook(){
    // Promise interface
    booksService.addBook(this.title, this.author).then(
      books => {
        this.books = books;
      }, err => {

      }
    )

    // Alternative
    this.books = await booksService.addBook(this.title, this.author)
}

// Service:

class BooksService {

    addBook(title: string, author: string): Promise<BookInfo[]>{
        return this.http.post<BookInfo[]>("/books", {
             title, author
        }).toPromise()
    }

}


