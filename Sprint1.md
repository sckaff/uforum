
## User Stories

Frontend Forum Stories:
- As a user, I want an outlet to discuss classwork with peers and a way to find people to study with on the fly.
- As a user, I want a simple way to meet other UF students with similar interests.
- As a user, I want a simplified way to discover all clubs and their meetup times through one centralized portal
- As a user, I want a discussion board about the campus that is more organized by topic boards compared to the UF reddit.
- As a user, I want a place where it is easy to find links about information on clubs to attend.
- As a user, I am a freshman and want to find an easy place to communicate with upperclassmen more familiar with the stuff around UF and recommended class schedules.

Frontend Login: Stories:
- As a user, I want a simple way to register and then access my personal account where my forum data such as my post history and activity are stored.
- As a user, I want a secure account that can only be accessed by me through a unique password.

Backend API Story:
- As a user, I want a simple way to post, see all the posts, and access any posts by ID.

Backend Authentication Stories:
- As a user, I want a simple way to create an account, and be sure that every account is from a UF student.
- As a user, I want to be able to update my user profile, such as my password or profile picture.

## Planned Issues

Frontend:
- The frontend team wants to create a basic forum page that allowed users to make anonymous posts that sync with the backend. There is no need to make any of the GUI pretty but things will hopefully be tuned in the future. 
- The frontend team also wants to make a basic login page that takes user input. Since this last feature is fairly complex we're not too worried about getting this done in sprint 1.

Backend:
- The backend team wants to create a basic forum API which allows for GET POST AND DELETE calls that the frontend and user can use to store their data in
- The backend team also wants to create a basic way of storing this data via GORM and an underterminded SQL library through GORM. While it does not need to be fully fleshed out, the groundworks of the library should be in place.

## Completed Issues

Frontend:
- The frontend team completed both these goals with a fully interactive but artisticlly simple forum page and a simple partially implemented login page.

Backend:
- The backend team completed the main goal of a basic forum API but has not quite finished the GORM implementation yet. They hope to finish it early on in the work for sprint 2.

## Reasons for incompletion

Backend:
- Our main focus was getting a polished front to back end interaction going by the end of Sprint 1 so most of our time went into working the tweaks out of our current system. Now that everything is completed in regards to the API, work on storing the data can be started quickly.

## Videos

Frontend: https://youtu.be/zejWRIxYJa0

Backend: https://www.youtube.com/watch?v=updddDywpPE