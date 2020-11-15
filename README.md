# REST API WITH ROLES

scaffolding of Rest API in express, mongoose and JWT for custom and personal projects 

## Installation

Install node v10 or later, I'm use and recommend v10.13.0 or 12.16.1 

```bash
git clone this project

npm install
```

## Usage

Routes API

```bash
AUTH: 
Login: [POST] http://localhost:3000/api/v1/auth/login
Register: [POST] http://localhost:3000/api/v1/auth/register

body login: {
    "email": "user@user.com",
    "password": "password"
}

body register: {
	"username": "user",
	"email": "user@user.com",
	"password": "password",
	"roles": ["moderator", "admin", "user"]
}

Header token: x-access-token - tokenKey


USERS: All users routes require administrator role and token

Delete USER: [DELETE] http://localhost:3000/api/v1/users/:id
Get user: [GET] http://localhost:3000/api/v1/users/:id
Get all users: [GET] http://localhost:3000/api/v1/users
Create user: [POST] http://localhost:3000/api/v1/users 
Update user: [POST] http://localhost:3000/api/v1/users/:id


PRODUCTS: The admin and moderator roles can create, delete, and edit products. GET routes are public

Delete product: [DELETE] http://localhost:3000/api/v1/products/:id
Get product: [GET] http://localhost:3000/api/v1/products/:id
Get all products: [GET] http://localhost:3000/api/v1/products
Create product: [POST] http://localhost:3000/api/v1/products
Update product: [POST] http://localhost:3000/api/v1/products/:id

```

## Current Version
In this current version 1.0.0, route authentication and validation middleware was configured.

## Next Version

The next version will add eslint, prettier, joi for validations, passport for registration with social networks, deploy for production, MongoAtlas, and Travis CI. Maybe it can include mocha testing. 


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)