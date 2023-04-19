package models

// create a comment struct
type Comment struct {
	ID     uint   `json:"id" gorm:"primary_key"`
	Body   string `json:"body"`
	User   string `json:"user"`
	PostID uint   `json:"postid"`
}
