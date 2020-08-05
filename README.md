# Movies collection CRUD application


This application contains following:
- page with collections
  - collection has name and movies count
  - form for adding new collection
- page with specific collection
  - movies list
  - movie has name
  - form for adding new movie
  - remove movie from collection


## Clone

Just clone this repo

```bash
git clone https://github.com/abdulgafur24/movies-stock-frontend.git
```


## How to start locally

```bash
cd movies-stock-frontend

npm install
npm run dev
# or
yarn
yarn dev
```

By default it will connect to already deployed API.

### Change Api url

Go to root directory and open `next.config.js` file and simply change value for `API_URL` key.
