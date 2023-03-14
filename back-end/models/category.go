
package models

type Category struct {
    ID     uint  `json:"id" gorm:"primary_key"`
    Title  string  `json:"title"`
    Description string  `json:"description"`
}