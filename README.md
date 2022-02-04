# Getting Started
**Prerequisition**
1. Make sure you are already have installed **nodejs** on your machine. You probably consider to `nvm` in case of your don't need to fix a version or need to dynamicly version by project. In this project uses nodejs version `v16.13.2`.
2. Load all dependencies to running the project.
    ```sh
    $ npm i
    ```

## Run

```sh
npm run dev
```

>The command is going to initialize the server you can access the server via [localhost:3000]()

**Health Check**

[localhost:3000/health]() to probe the server health status

## Test
```sh
npm run test
```

## Result

### Swagger UI
You can reach api collection here [localhost:3000/documentation]()

### cURL
#### JSON Transformer API
Utility to transform unstructure JSON to parent-childs structure.
```sh
curl --location --request POST 'localhost:3000/v1/transform/json' \
--header 'Content-Type: application/json' \
--data-raw '{
    "0": [
        {
            "id": 10,
            "title": "House",
            "level": 0,
            "children": [],
            "parent_id": null
        }
    ],
    "1": [
        {
            "id": 12,
            "title": "Red Roof",
            "level": 1,
            "children": [],
            "parent_id": 11
        },
        {
            "id": 18,
            "title": "Blue Roof",
            "level": 1,
            "children": [],
            "parent_id": 11
        },
        {
            "id": 13,
            "title": "Wall",
            "level": 1,
            "children": [],
            "parent_id": 11
        },
        {
            "id": 20,
            "title": "ggez",
            "level": 1,
            "children": [],
            "parent_id": 10
        }
    ],
    "2": [
        {
            "id": 17,
            "title": "Blue Window",
            "level": 2,
            "children": [],
            "parent_id": 12
        },
        {
            "id": 16,
            "title": "Door",
            "level": 2,
            "children": [],
            "parent_id": 13
        },
        {
            "id": 15,
            "title": "Red Window",
            "level": 2,
            "children": [],
            "parent_id": 12
        }
    ]
}'
```

#### Github Public Repository Searcher
[http://localhost:3000/github/search?q=nodejs&page=1]()
| Query      | Description |
| ----------- | ----------- |
| q      | search keyword (default: nodejs)       |
| page   | specific page search (default: 1)        |