package models

type Post struct {
	ID       uint      `json:"id" gorm:"primary_key"`
	Title    string    `json:"title"`
	Body     string    `json:"body"`
	Category string    `json:"category"`
	User     string    `json:"user"`
	Comment  []Comment `json:"comment" gorm:"foreignkey:ID"`
}
