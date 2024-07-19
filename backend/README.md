# Recipe Management App - APIs

## Introduction
Backend functionality to provide The Recipe Management App with RESTful APIs developed in Django

## Technologies Used
- Django
- Docker
- Postgres
- AWS Elastic Beanstalk

## Architecture
//TODO

## Local Deployment
1. `cd backend`
2. run `make` command from Makefile to spin up local env

## Deploy on AWS
1. `cd backend`
2. `eb deploy`
//TODO add more info on dependencies

## APIs

### GET /api - to fecth all available apis
```
 curl --location 'http://localhost:8000/api'
```
response
```
{
    "categories": "http://localhost:8000/api/categories/",
    "ingredients": "http://localhost:8000/api/ingredients/",
    "recipes": "http://localhost:8000/api/recipes/",
    "recipe-ingredients": "http://localhost:8000/api/recipe-ingredients/"
}
```

### Category create

```
POST /api/categories/
HTTP 201 Created
Allow: GET, POST, HEAD, OPTIONS
Content-Type: application/json
Vary: Accept

{
    "id": 2,
    "name": "Category2"
}
```

### Ingredient List

```
GET /api/ingredients/
HTTP 200 OK
Allow: GET, POST, HEAD, OPTIONS
Content-Type: application/json
Vary: Accept

[
    {
        "id": 1,
        "name": "Ing1"
    }
]
```

### Ingredients List

```
GET /api/ingredients/
HTTP 200 OK
Allow: GET, POST, HEAD, OPTIONS
Content-Type: application/json
Vary: Accept

[
    {
        "id": 1,
        "name": "Ing1"
    }
]
```

### Recipe-Ingredient List

```
GET /api/recipe-ingredients/?format=api
HTTP 200 OK
Allow: GET, POST, HEAD, OPTIONS
Content-Type: application/json
Vary: Accept

[
    {
        "name": 'Ingredient1',
        "quantity": 10
    }
]
```


