# **UForum - University of Florida Forum**
UForum is a semester-long project that we created as part of our Software Engineering coursework at the University of Florida. It is a full-stack website designed for students and faculty members of the university to connect and discuss various topics related to their courses, campus events, and much more.

## **Getting Started**
To get started with UForum, follow these instructions —
### **Prerequisites**
To run this project, you must have the following software installed on your machine:
- Node.js
- Go
- SQLite

### **Installing**
1. Clone the repository to your local machine using Git:
```
git clone https://github.com/your-username/UForum.git
```
2. Install the required dependencies for both the front-end and back-end by running the following commands:
```
cd ./frontend
npm install

cd ../backend
go mod tidy
```

3. Run both front-end and back-end in separate terminals
#### **Front-End**
![front.gif](./img/front.gif)
#### **Back-End**
![back.gif](./img/back.gif)
This will start the server and make it available at http://localhost:3000.

## **Features**
Once you have UForum up and running, you can use the following features:

### **Registering and Logging In**
To register a new user, click on the "Login" button in the navigation bar and then click on register right below. Enter your details. Once you have registered, you can log in using your email address and password.

![login.gif](./img/login.gif)

### **Creating a Post**
To create a new post, click on the "Create Post" button on the right-corner of the navigation bar. Enter a title and description for your post, select a category, and click on "Create Post".

![post.gif](./img/post.gif)

### **Upvoting a Post**
To upvote a post, click on the "upvote" button on the post card. The number next to the upvote button will increase by one. You can also remove your upvote, downvote a post, and remove it.

![upvote.gif](./img/upvote.gif)

### **Commenting on a Post**
To comment on a post, scroll down to the comments section on the post page and enter your comment in the input field. Click on "Submit" to add your comment to the post.

![comment.gif](./img/comment.gif)

## **Developers**
- Front-End: Brian Nielsen, Christian Scaff
- Back-End: Dylan Zhao, Fernando Sckaff

## **License**
This project is licensed under the MIT License - see the [LICENSE](https://github.com/Sckaff/UForum/blob/main/LICENSE) file for details.