const { login } = require("../controller/AuthController")

exports.swagger_options = {
    routePrefix: '/documentation',
    exposeRoute: true,
    swaggerDefinition: {
        info: {
            title: 'Blog API',
            version: '1.0.0',
            description: 'Blog api management (Enter Auth api => Bearer + token)',
            contact: {
                name: 'Vo Dinh Nghia',
                url: 'https://blogofme.store/',
                email: 'vodinhnghia85@gmail.com'
            }
        },
        host: 'localhost:8887',
        basePath: '/api/',
        consumes: ['application/json'],
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "Bearer + token",
            }
        },
        tags: [{ "name": "Auth" },
            { "name": "Update" },
            { "name": "ErrorCode" },
            { "name": "NewPost" },
            { "name": "User" },
            { "name": "Contact" },
            { "name": "Notify" },
            { "name": "Follow" },
            { "name": "Message" },
            { "name": "Search" },
            { "name": "Topic" }
        ],
        paths: {
            "/auth/register": {
                "post": {
                    "tags": [
                        "Auth"
                    ],
                    "description": "Register account",
                    "parameters": [{
                        "name": "body",
                        "in": "body",
                        "description": "The username of the user",
                        "example": {
                            "UserName": "string",
                            "Email": "string",
                            "PassWord": "string",
                            "Mobile": 365728889,
                            "Gender": 1
                        },
                        "required": true
                    }],
                    "responses": {
                        "200": {
                            "description": "Register susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/auth/login": {
                "post": {
                    "tags": [
                        "Auth"
                    ],
                    "description": "Login account",
                    "parameters": [{
                        "name": "body",
                        "in": "body",
                        "description": "The username of the user",
                        "example": {
                            "UserName": "string",
                            "PassWord": "string"
                        },
                        "required": true
                    }],
                    "responses": {
                        "200": {
                            "description": "Login susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/getpass": {
                "post": {
                    "tags": [
                        "Contact"
                    ],
                    "description": "Get password",
                    "parameters": [{
                        "name": "body",
                        "in": "body",
                        "description": "Get password",
                        "example": {
                            "UserName": "string",
                            "EmailUser": "string"
                        },
                        "required": true
                    }],
                    "responses": {
                        "200": {
                            "description": "Get password susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/auth/me": {
                "get": {
                    "tags": [
                        "User"
                    ],
                    "description": "Info account",
                    "parameters": [{
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Info of me.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/list/avatar": {
                "get": {
                    "tags": [
                        "User"
                    ],
                    "description": "List avatar of me.",
                    "parameters": [{
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "List avatar of me.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            // "/list-user": {
            //     "get": {
            //         "tags": [
            //             "User"
            //         ],
            //         "description": "List account user",
            //         "parameters": [{
            //             "name": "Authorization",
            //             "in": "header",
            //             "description": "Authorization bearer token",
            //             "required": true
            //         }],
            //         "security": [{
            //             "type": "http",
            //             "scheme": "bearer",
            //             "bearerFormat": "JWT",
            //         }],
            //         "responses": {
            //             "200": {
            //                 "description": "List account user.",
            //                 "content": {
            //                     "application/json": {
            //                         "schema": {
            //                             "type": "array"
            //                         }
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // },
            "/info/{id}": {
                "get": {
                    "tags": [
                        "User"
                    ],
                    "description": "List account user",
                    "parameters": [{
                            "name": "id",
                            "in": "path",
                            "description": "id user",
                            "example": {
                                "id": "string"
                            },
                            "required": true
                        },
                        {
                            "name": "Authorization",
                            "in": "header",
                            "description": "Authorization bearer token",
                            "required": true
                        }
                    ],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "List account user.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/update/avatar/{id}": {
                "get": {
                    "tags": [
                        "Update"
                    ],
                    "description": "Update avatar.",
                    "parameters": [{
                            "name": "id",
                            "in": "path",
                            "description": "id avatar",
                            "example": {
                                "id": "int"
                            },
                            "required": true
                        },
                        {
                            "name": "Authorization",
                            "in": "header",
                            "description": "Authorization bearer token",
                            "required": true
                        }
                    ],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Update avatar success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/delete/avatar/{id}": {
                "delete": {
                    "tags": [
                        "Update"
                    ],
                    "description": "Delete avatar.",
                    "parameters": [{
                            "name": "id",
                            "in": "path",
                            "description": "id avatar",
                            "example": {
                                "id": "int"
                            },
                            "required": true
                        },
                        {
                            "name": "Authorization",
                            "in": "header",
                            "description": "Authorization bearer token",
                            "required": true
                        }
                    ],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Delete avatar success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/contact": {
                "post": {
                    "tags": [
                        "Contact"
                    ],
                    "description": "request support ",
                    "parameters": [{
                        "name": "body",
                        "in": "body",
                        "description": "Content contact",
                        "example": {
                            "Content": "string",
                        },
                        "required": true
                    }, {
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "List account user.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/update/profile": {
                "put": {
                    "tags": [
                        "Update"
                    ],
                    "description": "Update info account",
                    "parameters": [{
                            "name": "Update profile",
                            "in": "body",
                            "description": "Params update",
                            "example": {
                                "UserName": "string",
                                "Mobile": "string",
                                "Gender": 1,
                                "Avatar": "string",
                                "Country": "string"
                            },
                            "required": true
                        },
                        {
                            "name": "Authorization",
                            "in": "header",
                            "description": "Authorization bearer token",
                            "required": true
                        }
                    ],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Register susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/insert/avatar": {
                "post": {
                    "tags": [
                        "Update"
                    ],
                    "description": "Insert avatar into table ManagementAvatar",
                    "parameters": [{
                            "name": "body",
                            "in": "body",
                            "description": "Params update",
                            "example": {
                                "Avatar": "string"
                            },
                            "required": true
                        },
                        {
                            "name": "Authorization",
                            "in": "header",
                            "description": "Authorization bearer token",
                            "required": true
                        }
                    ],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Register susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/list/avatar/user/{id}": {
                "get": {
                    "tags": [
                        "User"
                    ],
                    "description": "Get list avatar of user.",
                    "parameters": [{
                            "name": "id",
                            "in": "path",
                            "description": "id user",
                            "example": {
                                "id": "int"
                            },
                            "required": true
                        },
                        {
                            "name": "Authorization",
                            "in": "header",
                            "description": "Authorization bearer token",
                            "required": true
                        }
                    ],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Get list success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/update/change-password": {
                "put": {
                    "tags": [
                        "Update"
                    ],
                    "description": "Change password",
                    "parameters": [{
                            "name": "Change password",
                            "in": "body",
                            "description": "Change password",
                            "example": {
                                "CurrentPass": "string",
                                "NewPassword": "string"
                            },
                            "required": true
                        },
                        {
                            "name": "Authorization",
                            "in": "header",
                            "description": "Authorization bearer token",
                            "required": true
                        }
                    ],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Register susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/new/post": {
                "post": {
                    "tags": [
                        "NewPost"
                    ],
                    "description": "New post (use postman to test)",
                    "parameters": [{
                            "name": "New post",
                            "in": "body",
                            "description": "Params post",
                            "example": {
                                "TitlePost": "string",
                                "ContentPost": "string",
                                "FileImage": "string",
                                "Privacy": 0
                            },
                            "required": true
                        },
                        {
                            "name": "Authorization",
                            "in": "header",
                            "description": "Authorization bearer token",
                            "required": true
                        }
                    ],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Post susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/edit/post": {
                "post": {
                    "tags": [
                        "NewPost"
                    ],
                    "description": "Edit post (use postman to test)",
                    "parameters": [{
                            "name": "body",
                            "in": "body",
                            "description": "Params post",
                            "example": {
                                "IdPost": 1,
                                "TitlePost": "string",
                                "ContentPost": "string",
                                "FileImage": "string",
                                "Privacy": 0
                            },
                            "required": true
                        },
                        {
                            "name": "Authorization",
                            "in": "header",
                            "description": "Authorization bearer token",
                            "required": true
                        }
                    ],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Post susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/list/post/me": {
                "get": {
                    "tags": [
                        "NewPost"
                    ],
                    "description": "list post of me.",
                    "parameters": [{
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Get list success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/list/post/user/{id}": {
                "get": {
                    "tags": [
                        "NewPost"
                    ],
                    "description": "Get list post of user.",
                    "parameters": [{
                            "name": "id",
                            "in": "path",
                            "description": "id user",
                            "example": {
                                "id": "int"
                            },
                            "required": true
                        },
                        {
                            "name": "Authorization",
                            "in": "header",
                            "description": "Authorization bearer token",
                            "required": true
                        }
                    ],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Get list success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/delete/post/{id}": {
                "delete": {
                    "tags": [
                        "NewPost"
                    ],
                    "description": "Delete post.",
                    "parameters": [{
                            "name": "id",
                            "in": "path",
                            "description": "id post",
                            "example": {
                                "id": "int"
                            },
                            "required": true
                        },
                        {
                            "name": "Authorization",
                            "in": "header",
                            "description": "Authorization bearer token",
                            "required": true
                        }
                    ],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Delete success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/comment/post": {
                "post": {
                    "tags": [
                        "NewPost"
                    ],
                    "description": "Comment post (use postman to test)",
                    "parameters": [{
                            "name": "body",
                            "in": "body",
                            "description": "Params comment",
                            "example": {
                                "IdPost": 1,
                                "Comment": "string"
                            },
                            "required": true
                        },
                        {
                            "name": "Authorization",
                            "in": "header",
                            "description": "Authorization bearer token",
                            "required": true
                        }
                    ],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Post susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/list/ten-post": {
                "get": {
                    "tags": [
                        "NewPost"
                    ],
                    "description": "List 10 new post.",
                    "parameters": [{
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Get list success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/info-post/{id}": {
                "get": {
                    "tags": [
                        "NewPost"
                    ],
                    "description": "Get info post.",
                    "parameters": [{
                            "name": "id",
                            "in": "path",
                            "description": "id post",
                            "example": {
                                "id": "int"
                            },
                            "required": true
                        },
                        {
                            "name": "Authorization",
                            "in": "header",
                            "description": "Authorization bearer token",
                            "required": true
                        }
                    ],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Get info post success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/like/post/{id}": {
                "get": {
                    "tags": [
                        "NewPost"
                    ],
                    "description": "Like post.",
                    "parameters": [{
                            "name": "id",
                            "in": "path",
                            "description": "id post",
                            "example": {
                                "id": "int"
                            },
                            "required": true
                        },
                        {
                            "name": "Authorization",
                            "in": "header",
                            "description": "Authorization bearer token",
                            "required": true
                        }
                    ],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Like post success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/data/sharelikecomment": {
                "get": {
                    "tags": [
                        "NewPost"
                    ],
                    "description": "List data user share like and comment post.",
                    "parameters": [{
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Get list success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/follow/{id}": {
                "get": {
                    "tags": [
                        "Follow"
                    ],
                    "description": "I am follow user...",
                    "parameters": [{
                            "name": "id",
                            "in": "path",
                            "description": "id user",
                            "example": {
                                "id": "string"
                            },
                            "required": true
                        },
                        {
                            "name": "Authorization",
                            "in": "header",
                            "description": "Authorization bearer token",
                            "required": true
                        }
                    ],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Follow success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/check/follow/{id}": {
                "get": {
                    "tags": [
                        "Follow"
                    ],
                    "description": "Check status follow user...",
                    "parameters": [{
                            "name": "id",
                            "in": "path",
                            "description": "id user",
                            "example": {
                                "id": "string"
                            },
                            "required": true
                        },
                        {
                            "name": "Authorization",
                            "in": "header",
                            "description": "Authorization bearer token",
                            "required": true
                        }
                    ],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Follow success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/delete/follow/{id}": {
                "delete": {
                    "tags": [
                        "Follow"
                    ],
                    "description": "Remove follow user...",
                    "parameters": [{
                            "name": "id",
                            "in": "path",
                            "description": "id user",
                            "example": {
                                "id": "string"
                            },
                            "required": true
                        },
                        {
                            "name": "Authorization",
                            "in": "header",
                            "description": "Authorization bearer token",
                            "required": true
                        }
                    ],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Follow success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/list/post/user-follow": {
                "get": {
                    "tags": [
                        "Follow"
                    ],
                    "description": "List all post of user...",
                    "parameters": [{
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Follow success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/list/user/follow-me": {
                "get": {
                    "tags": [
                        "Follow"
                    ],
                    "description": "List all user folow me...",
                    "parameters": [{
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Follow success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/list/me-follow": {
                "get": {
                    "tags": [
                        "Follow"
                    ],
                    "description": "List all user me follow",
                    "parameters": [{
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Follow success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/notify/message": {
                "get": {
                    "tags": [
                        "Notify"
                    ],
                    "description": "Number message not read.",
                    "parameters": [{
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Get list success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/list/notify-slc": {
                "get": {
                    "tags": [
                        "Notify"
                    ],
                    "description": "List all notify of me.",
                    "parameters": [{
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Get list success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/notify/sharelikecomment": {
                "get": {
                    "tags": [
                        "Notify"
                    ],
                    "description": "Number notify share like comment.",
                    "parameters": [{
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Get list success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/read/notify/{id}": {
                "get": {
                    "tags": [
                        "Notify"
                    ],
                    "description": "Update status notify is read already",
                    "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "id notify",
                        "required": true
                    }, {
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/pagination-page/{id}": {
                "get": {
                    "tags": [
                        "NewPost"
                    ],
                    "description": "pagination page",
                    "parameters": [{
                            "name": "id",
                            "in": "path",
                            "description": "Number page",
                            "required": true
                        },
                        {
                            "name": "Authorization",
                            "in": "header",
                            "description": "Authorization bearer token",
                            "required": true
                        }
                    ],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "pagination page.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/list-post": {
                "get": {
                    "tags": [
                        "NewPost"
                    ],
                    "description": "List all post.",
                    "parameters": [{
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Get list success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/message/unread": {
                "get": {
                    "tags": [
                        "Message"
                    ],
                    "description": "Message of user send to me but I unread (mess)",
                    "parameters": [{
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Get susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/message/read": {
                "get": {
                    "tags": [
                        "Message"
                    ],
                    "description": "Message of user send to me and I read already (all_user_mess).",
                    "parameters": [{
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Get susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/list/user/sendmess": {
                "get": {
                    "tags": [
                        "Message"
                    ],
                    "description": "List all user message with me.",
                    "parameters": [{
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Get susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/list/mysend/unread": {
                "get": {
                    "tags": [
                        "Message"
                    ],
                    "description": "Message of me send to user but unread (mess_send).",
                    "parameters": [{
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Get susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/list/message/get-send/{id}": {
                "get": {
                    "tags": [
                        "Message"
                    ],
                    "description": "List all message of me and user (mess_user).",
                    "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "id user",
                        "required": true
                    }, {
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Get susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/list/message/mygetfrom/{id}": {
                "get": {
                    "tags": [
                        "Message"
                    ],
                    "description": "List all message my get from user (mess_user_me).",
                    "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "id user",
                        "required": true
                    }, {
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Get susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/send/message": {
                "post": {
                    "tags": [
                        "Message"
                    ],
                    "description": "send message",
                    "parameters": [{
                        "name": "body",
                        "in": "body",
                        "description": "key search",
                        "example": {
                            "IdUserGet": 1,
                            "ContentMess": "string"
                        },
                        "required": true
                    }, {
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/reply/message": {
                "post": {
                    "tags": [
                        "Message"
                    ],
                    "description": "reply message",
                    "parameters": [{
                        "name": "body",
                        "in": "body",
                        "description": "key search",
                        "example": {
                            "IdUserGet": 1,
                            "ContentMess": "string"
                        },
                        "required": true
                    }, {
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/search/user": {
                "post": {
                    "tags": [
                        "Search"
                    ],
                    "description": "Search user",
                    "parameters": [{
                        "name": "body",
                        "in": "body",
                        "description": "key search",
                        "example": {
                            "search": "string",
                        },
                        "required": true
                    }, {
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Info user.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/search/date": {
                "post": {
                    "tags": [
                        "Search"
                    ],
                    "description": "Search post of once date.",
                    "parameters": [{
                        "name": "body",
                        "in": "body",
                        "description": "key search",
                        "example": {
                            "searchDate": "/07/18/2021",
                        },
                        "required": true
                    }, {
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Info search.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/search/post": {
                "post": {
                    "tags": [
                        "Search"
                    ],
                    "description": "Search post",
                    "parameters": [{
                        "name": "body",
                        "in": "body",
                        "description": "key search",
                        "example": {
                            "search": "string",
                        },
                        "required": true
                    }, {
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Info user.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/create/topic": {
                "post": {
                    "tags": [
                        "Topic"
                    ],
                    "description": "Create a my topic",
                    "parameters": [{
                        "name": "body",
                        "in": "body",
                        "description": "key search",
                        "example": {
                            "NameTopic": "string",
                        },
                        "required": true
                    }, {
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Create topic success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/create/problem": {
                "post": {
                    "tags": [
                        "Topic"
                    ],
                    "description": "Create a my problem",
                    "parameters": [{
                        "name": "body",
                        "in": "body",
                        "description": "problem",
                        "example": {
                            "IdTopic": 1,
                            "ContentProblem": "string"
                        },
                        "required": true
                    }, {
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Create topic success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/create/solution": {
                "post": {
                    "tags": [
                        "Topic"
                    ],
                    "description": "Create a my solution for problem",
                    "parameters": [{
                        "name": "body",
                        "in": "body",
                        "description": "solution",
                        "example": {
                            "IdProblem": 1,
                            "ContentSolution": "string"
                        },
                        "required": true
                    }, {
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Create topic success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/list/topic": {
                "get": {
                    "tags": [
                        "Topic"
                    ],
                    "description": "Get all topic of me.",
                    "parameters": [{
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Get susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/recycle/topic-ofme": {
                "get": {
                    "tags": [
                        "Topic"
                    ],
                    "description": "Get all topic has delete temp.",
                    "parameters": [{
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Get susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/description/topic": {
                "post": {
                    "tags": [
                        "Topic"
                    ],
                    "description": "Update description of topic",
                    "parameters": [{
                        "name": "body",
                        "in": "body",
                        "description": "key search",
                        "example": {
                            "IdDesc": 1,
                            "ContentDesc": "string"
                        },
                        "required": true
                    }, {
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Update description success.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/delete/topic/{id}": {
                "delete": {
                    "tags": [
                        "Topic"
                    ],
                    "description": "Delete topic.",
                    "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "id topic",
                        "required": true
                    }, {
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Delete topic susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/delete/solution/{id}": {
                "delete": {
                    "tags": [
                        "Topic"
                    ],
                    "description": "Delete solution.",
                    "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "id solution",
                        "required": true
                    }, {
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Delete solution susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/delete/problem/{id}": {
                "delete": {
                    "tags": [
                        "Topic"
                    ],
                    "description": "Delete problem.",
                    "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "id problem",
                        "required": true
                    }, {
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Delete problem susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/restore/topic/{id}": {
                "get": {
                    "tags": [
                        "Topic"
                    ],
                    "description": "Restore topic.",
                    "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "id topic",
                        "required": true
                    }, {
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Restore topic susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/list/problem/{id}": {
                "get": {
                    "tags": [
                        "Topic"
                    ],
                    "description": "list all problem of topic.",
                    "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "id topic",
                        "required": true
                    }, {
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Get susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/info/topic/{id}": {
                "get": {
                    "tags": [
                        "Topic"
                    ],
                    "description": "get info of a topic.",
                    "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "id topic",
                        "required": true
                    }, {
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Get susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/list/solution/{id}": {
                "get": {
                    "tags": [
                        "Topic"
                    ],
                    "description": "list all solution of problem.",
                    "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "id problem",
                        "required": true
                    }, {
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Get susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/info/problem/{id}": {
                "get": {
                    "tags": [
                        "Topic"
                    ],
                    "description": "get info of a problem.",
                    "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "id problem",
                        "required": true
                    }, {
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Get susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/auth/logout": {
                "post": {
                    "tags": [
                        "Auth"
                    ],
                    "description": "Logout account",
                    "parameters": [{
                        "name": "Authorization",
                        "in": "header",
                        "description": "Authorization bearer token",
                        "required": true
                    }],
                    "security": [{
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT",
                    }],
                    "responses": {
                        "200": {
                            "description": "Logout susscess.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/error": {
                "get": {
                    "tags": [
                        "ErrorCode"
                    ],
                    "description": "List error code api.",
                    "responses": {
                        "200": {
                            "description": "List error code api.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    basedir: __dirname,
    apis: ['api.js']
}
