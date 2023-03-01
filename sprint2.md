# Sprint 2

## Detailed Work Done

### Front End

- Created simple home page where categories of different posts are available to view in pop-down cards. Ex. (Popular Categories, Classwork Related, Campus Related, Other) as well as a "Latest Posts" section.
- Created a navigation bar that incldes buttons to navigate to home, the page for creating and viewing posts, the log-in page as well as a profile page that is only accessible when logged-in.
- Seperated CSS into individual files for each component.
- Updated Login page to have a more appealing design and created a register page that mimics the design.
- Implemented API calls into login/register page for user authentication.
- Created a very basic profile page that details user information such as username, email, and access token.
- Implemented Cypress tests.

### Back End

- Redid backend to work with a SQLite database in order to permanently store back end data even after closing the server.
- Changed from Gin HTTP web framework to Mux GoLang package due to there being more avaible information on Mux and SQLite being used in unision.
- Implemented Login/Register Functions on the Back End.

## Front End Unit/Cypress Tests
- Created single e2e test that goes to the main page and checks the the homebar properly routes to our different components. This test also makes sure a basic aspect works at each route.
- Created 3 unit tests (one for each main component on the website). Each test throughouly examines the functionality of its corresponding component and confirms backend-frontend connectivity if used.
## Back End Unit Tests
## Back End API Documentation