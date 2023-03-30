# Sprint 3

## Detailed Work Done

### Front End

- Changed Front-End Framework from React Material UI to TailWindCSS
- Redesigned Homepage to list three topics: Events, Categories, and Recents
- Events Holds temporary post data; however, we plan to store posts categorized as an "event" in that list
- Categories holds popular categories such as "Campus","Study Groups", and "Events" which store posts in those categories. These categories are not currently accessible from the home page but will be in the future.
- Recents holds recently posted posts which can be clicked on to access their respective post pages.
- Reworked Front End 
- Reworked Log In and Registration Pages + Connected to Back End
- Reworked Profile Page:
- Illustrates account information as well as post history
- All login related functions and calls like createPost and createComment require login
- Reworked Post Creation Page
- Now includes a category dropdown menu to select a category
- Implemented a Search Page with option to filter by category
- Implemented a comment section for each post with the ability to create new comments

### Back End

- Changed Back-End Framework from Gorilla Mux to Gin Gonic
- Added User Registration and Login Features
-Passwords are hashed and users are sent an authentication token to access the API
- Made some functions requires user login to access
- Created comment system
- Some users are now admins with exclusive access to some functions including category management and ability to delete all user’s posts/comments
- Posts can now be accessed by a given category

## Front End Unit/End To End Tests

- Implemented Jest Unit test to confirm that navigation bar contains proper navigation button texts
- Implemented Cypress e2e test that tests login, post creation, post display, and post deletion
- Implemented 3 Component tests for PostView/Comment, Homepage, and Search page that test their basic functionalities

## Back End Unit Tests

- Implemented Unit Tests for GetPosts, GetUsers, Login, Register, GetPostByID, CreatePost that ensure these functions are properly working.

## Back End API Documentation

- The Back End API documentation can be found in a README.md file in the back-end folder of the repo.

## Video Link
(Insert Link Here)
### A Note on Cypress Tests

While Jest is a more general testing framework that can be used for testing various types of applications, Cypress component testing is tailored specifically for testing React components in a browser environment. Both tools serve the same purpose of ensuring that components are working as expected, but the approaches they take are different. Depending on the specific needs of a project, developers may choose to use one or both tools to test their React components. Even when comparing syntax between jest and cypress component testing the two look very similar because they preform the very same function.

We believe cypress component testing is equivalent to unit testing which is why we created mostly cypress component tests. Furthermore, other students who only completed cypress testing got full credit for their component tests as unit tests and we didn’t last sprint which feels like a double standard.


