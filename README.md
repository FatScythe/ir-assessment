# Blog
#### Comprehensive and complex coding challenge designed to evaluate an experienced backend developer. The challenge focuses on CRUD functionality and incorporates various aspects such as database design, API creation, authentication, and deployment.

#### Framework ✨ - NestJS with TypeORM
#### Database ✨ - MySQL
---

### 📚 Getting Started

## 🛠️ Installation
1. Clone the project or download zip file
2. Navigate to the project directory
   ```bash
   cd ir-assessment
   ```
3. Install dependencies with ``` npm install ```
4. create an SQL db, and get the username, password and database name
5. Use ```example.env``` in the ```_env``` to configure the ```.env``` 
6. Run ```npm run dev ``` to start server in dev mode and ```npm run start ``` in production


## Authentication (Bearer Token)
Authentication is enabled in this app using JWT.
Token is sent on login, token is added to the header on each request.
### API Documentation
[Postman](https://app.getpostman.com/join-team?invite_code=5dd65c35c25144d305a91b9154cbf33d)

## API Endpoints:

### User Endpoints:
- GET /api/posts - Retrieve all posts (Paginated)
- GET /api/posts/:id - Retrieve a single post by ID
- POST /api/posts - Create a new post (Authenticated)
- PUT /api/posts/:id - Update a post by ID (Authenticated & Author only)
- DELETE /api/posts/:id - Delete a post by ID (Authenticated & Author only)

### Comment Endpoints:

- GET /api/posts/:postId/comments - Retrieve all comments for a post (Paginated)
- POST /api/posts/:postId/comments - Create a new comment on a post (Authenticated)
- PUT /api/comments/:id - Update a comment by ID (Authenticated & Author only)
- DELETE /api/comments/:id - Delete a comment by ID (Authenticated & Author only)

## Error Handling
All unforeseen error are handled gracefully by the ```AllExceptionsFilter``` class, it return an object like the one below. With a status code of 400

```JSON
{
    "status": "failed",
    "error_description": "I did not see that coming",
    "error": "bad_request",
    "error_details": {}
}
```

###  Deployment
Can be found in the docker folder

## Testing
> Not Available
```