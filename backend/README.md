# MyBlog Backend

This is the backend server for the MyBlog application. It is built using Node.js, Express, and MongoDB, providing a robust API for user authentication, article management, and comment handling.

## Features

- **Authentication**: Secure JWT-based authentication with bcrypt password hashing.
- **Role-Based Access**: Support for different user roles including Admin, Author, and User.
- **Article Management**: API endpoints for creating, reading, updating, and deleting blog posts.
- **Image Uploads**: Integration with Cloudinary for seamless image hosting using Multer.
- **Database**: MongoDB integration using Mongoose for schema definition and data modeling.

## Tech Stack

- **Server**: Node.js & Express
- **Database**: MongoDB & Mongoose ODM
- **Security**: JSON Web Tokens (JWT), Bcrypt.js, CORS, Cookie-parser
- **File Handling**: Multer & Cloudinary

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB instance (local or MongoDB Atlas)
- Cloudinary account for media uploads

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root of the `backend` directory and configure the necessary environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

3. Start the server:
   ```bash
   npm start
   ```
   The server will run on the port specified in your `.env` file (default is `5000`).

## API Testing

You can explore and test the API endpoints using the provided `.http` files located in the root directory:
- `adminrequest.http`
- `authorrequest.http`
- `userrequest.http`

These files contain sample requests for different user roles and actions within the system.
