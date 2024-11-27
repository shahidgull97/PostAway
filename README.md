#Social Media Backend App 🌐
##Overview 📖
This is the backend of a Social Media Application that provides robust APIs for users to interact with features like posting content, liking and commenting on posts, sending and managing friend requests, and more. Built with scalability and performance in mind, this backend enables seamless social interactions.

##Features 🚀
User Authentication: Secure user login and registration with JWT.
####Posts:
Create, edit, and delete posts.
View all posts or specific user posts.
####Likes and Comments:
Like/unlike posts.
Add and manage comments.
####Friend Requests:
Send, accept, and reject friend requests.
View friend lists.

<!-- Notifications: Real-time notifications for likes, comments, and friend requests.
Search and Discover:
Search for users by username.
Discover public posts. -->

🛠️ ##Tech Stack
Backend Framework: Node.js with Express.js
Database: MongoDB (NoSQL database for scalability)
Authentication: JSON Web Tokens (JWT) and bcrypt for password hashing

##API Endpoints 📜
###Users
Method Endpoint Description
POST /api/users/signup Register a new user
POST /api/users/signin Login and get a JWT token
POST /api/users/logout Logout from the device
GET /api/users/get-details/:userId Get user Details
GET /api/users/get-all-details Get all users details
PUT /api/users/update-details/:userId Update the details of a user
POST /api/user/logout-all-devices Logout from all devices

Method Endpoint Description
GET /api/posts Get all posts
POST /api/posts Create a new post
PUT /api/posts/:id Edit a specific post
DELETE /api/posts/:id Delete a post
###Comments
Method Endpoint Description
POST /api/posts/:id/comments Add a comment to a post
GET /api/posts/:id/comments Get all comments for a post
###Likes
Method Endpoint Description
POST /api/posts/:id/like Like a post
DELETE /api/posts/:id/unlike Unlike a post
###Friend Requests
Method Endpoint Description
POST /api/friends/request Send a friend request
PUT /api/friends/accept Accept a friend request
DELETE /api/friends/reject Reject a friend request
GET /api/friends/list Get a list of all friends
##Installation and Setup 🏗️
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/social-media-backend.git
cd social-media-backend
Install dependencies:

bash
Copy code
npm install
Set up environment variables: Create a .env file in the root directory and configure the following:

env
Copy code
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_secret_key
PORT=5000
Start the server:

bash
Copy code
npm start
Test the APIs: Use tools like Postman or Swagger.

##Future Enhancements📈

<ul>
<li>Add a notification system for likes, comments, and friend requests.</li>
<li>Implement advanced search filters.</li>
<li>Integrate cloud storage for media uploads (e.g., AWS S3).</li>
<li>Enable user analytics and reporting.</li>
</ul>
##Contributions 👩‍💻 
Contributions are welcome! Please feel free to submit a pull request or open an issue for feature suggestions or bug fixes.

Contact 📧
For questions or collaboration, reach out to:

Name: Shahid Gull

<!-- Email: your.email@example.com
GitHub: Your GitHub Profile -->
