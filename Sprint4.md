# Sprint 4
## Detailed Work Done
### Front End
- Added an upvote-downvote system on each cell in the home-page
- Re-iterated the overall design to look more clean and finished (Home Page, Search UI, Profile, Login/Register, Post Cards, Post Pages, Create Post Page)
- Reworked home page to have proper functionality as per design (Events tab holds events, Recents tab holds recents)
- Categories tabs on home page navigate to category tabs
- Created delete button for comments
- Added more apparent and modern warning indications/messages for the UI

### Back End
- Created categories for each post
- Created Admin-specific functions to moderate UForum
- Created a profile view variant for front-end
- Implemented post rating feature by means of upvoting and downvoting
- Created a comment schema on database and implemented comments on posts
- Implemented a filter search of post categories 

## Front End Unit/End To End Tests
- New e2e test for categories and comment system
- All unit cypress and e2e cypress tests updated around new ui layout
- New jest unit test for login page functionality

## Back End Unit Tests
- GetPosts
- GetUsers
- Login
- Register
- GetPostByID
- LikePost (NEW)
- CreateComment (NEW)
- GetCategories (NEW)

## Video Link
TODO

### A Note on Cypress Tests
While Jest is a more general testing framework that can be used for testing various types of applications, Cypress component testing is tailored specifically for testing React components in a browser environment. Both tools serve the same purpose of ensuring that components are working as expected, but the approaches they take are different. Depending on the specific needs of a project, developers may choose to use one or both tools to test their React components. Even when comparing syntax between jest and cypress component testing the two look very similar because they preform the very same function.

We believe cypress component testing is equivalent to unit testing which is why we created mostly cypress component tests. Furthermore, other students who only completed cypress testing got full credit for their component tests as unit tests and we didn’t last sprint which feels like a double standard.