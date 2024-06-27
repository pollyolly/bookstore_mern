### Initialize npm
```
$cd backend/
$npm init
```
### package.json
Allow use of es6 module (import and export)
```
{
  "type":"module"
}
```
### Modify the npm run command in package.json
```
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }

$npm run start
$npm run dev
```
