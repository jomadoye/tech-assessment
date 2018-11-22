[![Known Vulnerabilities](https://snyk.io/test/github/andela-jomadoye/jeddoc-manager/badge.svg)](https://snyk.io/test/github/andela-jomadoye/jeddoc-manager)    [![Dependencies](https://david-dm.org/andela-jomadoye/JedDoc-Manager.svg)](https://api.travis-ci.org/andela-jomadoye/JedDoc-Manager)
[![Coverage Status](https://coveralls.io/repos/github/andela-jomadoye/JedDoc-Manager/badge.svg?branch=feedback)](https://coveralls.io/github/andela-jomadoye/JedDoc-Manager?branch=feedback) 
[![Code Climate](https://codeclimate.com/github/andela-jomadoye/JedDoc-Manager/badges/gpa.svg)](https://codeclimate.com/github/andela-jomadoye/JedDoc-Manager) [![Test Coverage](https://codeclimate.com/github/andela-jomadoye/JedDoc-Manager/badges/issue_count.svg)](https://codeclimate.com/github/andela-jomadoye/JedDoc-Manager)
[![CircleCI](https://circleci.com/gh/andela-jomadoye/JedDoc-Manager.svg?style=svg)](https://circleci.com/gh/andela-jomadoye/JedDoc-Manager)
[![Build Status](https://travis-ci.org/andela-jomadoye/JedDoc-Manager.svg?branch=develop)](https://travis-ci.org/andela-jomadoye/JedDoc-Manager)
[![Build Status](https://semaphoreci.com/api/v1/jedidiah/jeddoc-manager/branches/develop/badge.svg)](https://semaphoreci.com/jedidiah/jeddoc-manager)


About the Application
-------------
This is a Document Management System, with user and documents roles and privileges. Each document has access levels, the document defines which users can access it. 
Also, each document specifies the date it was published, when it was last updated, and the author who published it.

### **API Features**

The following features make up the Document Management System API:

##### Authentication
- It uses JSON Web Token (JWT) for authentication.  
- It generates a token upon successul login.   
- It verifies the token to ensures a user is authenticated to access protected endpoints.

##### Users
- It allows users to be created.  
- It allows users to login and obtain a token  
- It allows authenticated users to retrieve and edit their information only.   
- All users can be retrieved, modified and deleted by the admin user.

##### Roles
- It ensures that users have roles.   
- It ensures user roles could be `admin`, `tester` or `regular`, or as created by the admin .   
- It ensures roles can be created, retrieved and deleted by an admin user. 
- A non-admin user cannot create, retrieve, modify, or delete roles.  

##### Documents
- It allows new documents to be created by authenticated users.  
- It ensures all documents have access roles defined as `public`, `role` or `private`.  
- It allows admin users to create, retrieve, modify, and delete all documents.
- It allows `private` access documents to be retrieved by its owners.    
- It ensures users can delete, edit and update documents that they own.   
- It allows users to retrieve all documents they own.
- It allows users to set a access for any document they create.   


##### Search
- It allows users to search `public` and `role` documents that belong to other users (as well as documents that belong to the user).
- It allows admin to retrieve all documents that matches search term, be it `public`, `role` or `private`.

Tech Stack
--------------
* [React] - A javascript library for building user interfaces
* [Redux] - A predictable state container for JavaScript apps.
* [Enzyme] - A JavaScript Testing utility for React
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [Webpack] - the streaming build system
* [Sequelize] - Sequelize is a promise-based ORM for Node.js and io.js.
* [JWT] - To authenticate routes
* [Postgresql and Sequelize ORM]
* [Material-css] - Material design components for react
* [React-materialize] - Material design components for react
* [Babel] - A javascript compiler
* [eslint] - Lints JavaScript
* [Mocha] - JavaScript testing library
* [webpack] - Bundler with plugin system and integrated development server

Local Development
--------------
Document Mnagement System requires [Node.js](https://nodejs.org/) v6+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ git clone https://github.com/andela-jomadoye/JedDoc-Manager.git
$ cd JedDoc-Manager
$ npm install
$ Rename `.env Sample` to `.env` and add the required DATABASE URL, also add the DATABASE_TEST_URL for testing.
$ Create Postgresql database and run migrations npm run db:migrate.
$ Start the express server `npm start`.
$ Run the test with `npm test`.
```

# API Documentation
The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.
## Authentication
Users are assigned a token when signup or signin. This token is needed for subsequent HTTP requests to the API for authentication and can be attached as values to the header's `authorization` key. API requests made without authentication will fail with the status code `401: Unauthorized Access`.
## Below are the API endpoints and their functions
EndPoint                      |   Functionality
------------------------------|------------------------
POST /api/users/login         |   Logs a user in.
POST /api/users/logout        |   Logs a user out.
POST /api/users/              |   Creates a new user.
GET /api/users/               |   Find matching instances of user.
GET /api/users/<id>           |   Find user.
PUT /api/users/<id>           |   Update user attributes.
DELETE /api/users/<id>        |   Delete user.
POST /api/documents/          |   Creates a new document instance.
GET /api/documents/           |   Find matching instances of document.
GET /api/documents/<id>       |   Find document.
PUT /api/documents/<id>       |   Update document attributes.
DELETE /api/documents/<id>    |   Delete document.
GET /api/users/<id>/documents |   Find all documents belonging to the user.
GET /search/users/?q={username}      |   Gets all users with username contain the search term
GET /search/documents/?q={doctitle}| Get all document owned by `userId` with title containing the search term
The following are some sample request and response from the API.
- [Roles](#roles)
  - [Get roles](#get-roles)
- [Users](#users)
  - [Create user](#create-user)
  - [Get user](#get-user)
- [Documents](#documents)
  - [Get All documents](#get-all-documents)
  - [Create document](#create-document)
  - [Get document](#get-document)
  - [Edit document](#edit-document)
  - [Delete document](#delete-document)
- [Search](#search)
  - [Search Documents](#search-documents)
  - [Search Users] (#search-users)
## Roles
Endpoint for Roles API.
### Get Roles
#### Request
- Endpoint: GET: `/api/roles`
- Requires: Authentication
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "success": true,
  "message": "This are the roles",
  "roles": [
    {
      "id": 1,
      "title": "Administrator",
      "createdAt": "2017-05-24T01:37:54.742Z",
      "updatedAt": "2017-05-24T01:37:54.742Z"
    },
    {
      "id": 2,
      "title": "Tester",
      "createdAt": "2017-05-24T01:37:54.742Z",
      "updatedAt": "2017-05-24T01:37:54.742Z"
    },
    {
      "id": 3,
      "title": "Basic",
      "createdAt": "2017-05-24T01:37:54.742Z",
      "updatedAt": "2017-05-24T01:37:54.742Z"
    }
  ]
}
```
## Users
Endpoint for Users API.
### Create User
#### Request
- Endpoint: POST: `api/users`
- Body `(application/json)`
```json
{
  "username": "uniqueuser",
  "fullNames": "Unique User",
  "email": "uniqueuser@unique.com",
  "RoleId": 1,
  "password": "password"
}
```
#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
{
  "success": true,
  "message": "User successfully created",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo1LCJ1c2VybmFtZSI6IlNsaW1KZWQiLCJmdWxsbmFtZSI6Ik9tYWRveWUgSmVkaWRpYWgiLCJyb2xlSWQiOjEsImVtYWlsIjoiamVkQGVtYWlsLmNvbSJ9LCJpYXQiOjE0OTU1OTAwNTksImV4cCI6MTQ5NTY3NjQ1OX0.ExUrrz5w3FKCs09kDFhGXJxpwRrrGcGRMf-UnUy_cTI",
  "user": {
    "id": 5,
    "fullname": "Omadoye Jedidiah",
    "username": "SlimJed",
    "password": "$2a$08$cJlpGS74kQdlSDMnZv6Fyu9dqWZ5zS5PfylIDgmWzpiATW3fDp.TS",
    "email": "jed@email.com",
    "roleId": 1,
    "updatedAt": "2017-05-24T01:40:59.386Z",
    "createdAt": "2017-05-24T01:40:59.386Z"
  }
}
```
### Get Users
#### Request
- Endpoint: GET: `api/users`
- Requires: Authentication, Admin Role
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[
  {
    "id": 20,
    "fullname": "Kailee Bradtke",
    "username": "Euna.Deckow",
    "email": "Jaeden_VonRueden@gmail.com",
    "roleId": 1,
    "password": "$2a$08$KYsSvsvd0UtMBy5lLoBpnelGOiyaCYghMfgQ5XhnW5JyY1T.zDXfi",
    "createdAt": "2017-05-24T01:37:54.745Z",
    "updatedAt": "2017-05-24T01:37:54.753Z"
  },
  {
    "id": 21,
    "fullname": "Savannah Collier",
    "username": "Greg.Ankunding",
    "email": "Iva8@gmail.com",
    "roleId": 2,
    "password": "$2a$08$pNI8NPcRjnagYUGQ4KG0KuczO9/cf26aVqcn4U6nGXwA5953Qb4Pu",
    "createdAt": "2017-05-24T01:37:54.745Z",
    "updatedAt": "2017-05-24T01:37:54.753Z"
  },
  {
    "id": 1,
    "fullname": "Sam Kihn",
    "username": "Damaris82",
    "email": "Asia.McKenzie73@yahoo.com",
    "roleId": 3,
    "password": "$2a$08$y/4gGJi15AbY8SGF50VAteHMPCMojOei2LXRHsWg2LyZd/KEb.J1y",
    "createdAt": "2017-05-24T01:37:54.745Z",
    "updatedAt": "2017-05-24T01:37:54.753Z"
  }]
```
## Documents
Endpoint for document API.
### Get All Documents
#### Request
- Endpoint: GET: `/api/documents`
- Requires: Authentication, Admin Role
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "success": true,
  "message": "Document is shown below",
  "document": [
    {
      "id": 1,
      "title": "placeat et et",
      "body": "Et dolorem a earum id.",
      "access": "private",
      "ownerRoleId": 2,
      "createdAt": "2017-05-24T01:37:54.893Z",
      "updatedAt": "2017-05-24T01:37:54.893Z",
      "userId": 1,
      "User": {
        "fullname": "Sam Kihn"
      }
    },
    {
      "id": 2,
      "title": "Fake title document",
      "body": "Ipsa a accusamus placeat repellendus. Iusto nihil voluptatem sit aut cupiditate deserunt. Harum sequi cupiditate in nemo occaecati quia similique nihil. Nesciunt aut enim praesentium. Dolore voluptates accusantium quam repellendus voluptatem et.",
      "access": "public",
      "ownerRoleId": 2,
      "createdAt": "2017-05-24T01:37:54.893Z",
      "updatedAt": "2017-05-24T01:37:54.893Z",
      "userId": 1,
      "User": {
        "fullname": "Sam Kihn"
      }
    },
    {
      "id": 3,
      "title": "test document 2",
      "body": "Iste sed quasi debitis. Aut quis tempora. Deleniti repudiandae numquam dolor dolores porro soluta iusto. Adipisci numquam deserunt perferendis ipsum perferendis rerum. Laborum odio voluptas beatae numquam nesciunt vitae. Iure ducimus qui animi iure.",
      "access": "public",
      "ownerRoleId": 2,
      "createdAt": "2017-05-24T01:37:54.893Z",
      "updatedAt": "2017-05-24T01:37:54.893Z",
      "userId": 1,
      "User": {
        "fullname": "Sam Kihn"
      }
    }]
```
### Create Document
#### Request
- Endpoint: POST: `/api/documents`
- Requires: Authentication
- Body `(application/json)`
```json
{
  "title": "Just a Title",
  "content": "This placeholder should not always be a lorem generated document",
  "OwnerId": 1,
  "permission": "private"
}
```
#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
{
  "success": true,
  "message": "Document created successfully.",
  "document": {
    "access": "public",
    "id": 20,
    "title": "jedidiah is a boss",
    "body": "jedidiah is still a boss",
    "userId": 4,
    "ownerRoleId": 1,
    "updatedAt": "2017-05-24T01:44:30.206Z",
    "createdAt": "2017-05-24T01:44:30.206Z"
  }
}
```
### Get Document
#### Request
- Endpoint: GET: `/api/documents/:id`
- Requires: Authentication
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "success": true,
  "message": "This is your document.",
  "document": {
    "id": 20,
    "title": "jedidiah is a boss",
    "body": "jedidiah is still a boss",
    "access": "public",
    "ownerRoleId": 1,
    "createdAt": "2017-05-24T01:44:30.206Z",
    "updatedAt": "2017-05-24T01:44:30.206Z",
    "userId": 4
  }
}
```
### Edit Document
#### Request
- Endpoint: PUT: `/api/documents/:id`
- Requires: Authentication
- Body `(application/json)`:
```json
{
  "body": "jedidiah is still a boss updated",
}
```
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "success": true,
  "message": "Document successfuly updated",
  "document": {
    "id": 20,
    "title": "jedidiah is a boss",
    "body": "jedidiah is still a boss updated",
    "access": "public",
    "ownerRoleId": 1,
    "createdAt": "2017-05-24T01:44:30.206Z",
    "updatedAt": "2017-05-24T01:45:49.112Z",
    "userId": 4
  }
}
```
### Delete Document
#### Request
- Endpoint: DELETE: `/api/documents/:id`
- Requires: Authentication
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "success": true,
  "message": "Document deleted successfully."
}
```
### Search
#### Documents
#### Request
- Endpoint: GET: `/search/documents/?q={:test}`
- Requires: Authentication
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "success": true,
  "message": "This is your document.",
  "document": [
    {
      "id": 3,
      "title": "test document 2",
      "body": "Iste sed quasi debitis. Aut quis tempora. Deleniti repudiandae numquam dolor dolores porro soluta iusto. Adipisci numquam deserunt perferendis ipsum perferendis rerum. Laborum odio voluptas beatae numquam nesciunt vitae. Iure ducimus qui animi iure.",
      "access": "public",
      "ownerRoleId": 2,
      "createdAt": "2017-05-24T01:37:54.893Z",
      "updatedAt": "2017-05-24T01:37:54.893Z",
      "userId": 1,
      "User": {
        "fullname": "Sam Kihn"
      }
    },
    {
      "id": 4,
      "title": "test document 3",
      "body": "Dolor reprehenderit aspernatur quas. Possimus deserunt officia perspiciatis. Rem maxime culpa nihil eveniet tempore libero voluptates et dolore.",
      "access": "public",
      "ownerRoleId": 2,
      "createdAt": "2017-05-24T01:37:54.893Z",
      "updatedAt": "2017-05-24T01:37:54.893Z",
      "userId": 1,
      "User": {
        "fullname": "Sam Kihn"
      }
    }
  ]}
```
### Users
#### Request
- Endpoint: GET: `/search/users/?q={:jed}`
- Requires: Authentication, Admin Role
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "success": true,
  "message": "This is your user.",
  "user": [
    {
      "id": 5,
      "fullname": "Omadoye Jedidiah",
      "username": "SlimJed",
      "email": "jed@email.com",
      "roleId": 1,
      "password": "$2a$08$cJlpGS74kQdlSDMnZv6Fyu9dqWZ5zS5PfylIDgmWzpiATW3fDp.TS",
      "createdAt": "2017-05-24T01:40:59.386Z",
      "updatedAt": "2017-05-24T01:40:59.386Z",
      "documents": []
    }
  ]
}
```

#### Limitations:
The limitations to the Document Management System API are as follows:

* Users can only create plain textual documents and retrieve same when needed. 
* Users cannot share documents with people, but can make document `public` to make it available to other users.
* Users login and obtain a token which is verified on every request, but users cannot logout (nullify the token), however tokens become invalid when it expires (after 1 day).

#### _**Contributing**_
1. Fork this repository to your GitHub account
2. Clone the forked repository and cd into it
3. Create a .env file in the root of the project using the sample .env.sample in the root directory

5. Install all dependencies by running this command below in your terminal/shell
    ````
    npm install
    ````
6. Run the command below in your terminal/shell (initializes and seeds the database tables)
    ```` 
    npm db:migrate
    npm db:seed
    ````
7. To run the development server enter the command below in your terminal/shell
    ````
    npm run start
    ````
8. Run the tests via `npm test` to get familliar with the features of the code base
8. Create your feature branch
9. Commit your changes
10. Push to the remote branch
11. Open a Pull Request

