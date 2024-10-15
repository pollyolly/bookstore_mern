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
### PM2 (ecosystem.config.cjs to support import module)
```
$pm2 start ecosystem.config.cjs 
```
### Mongodb
```
$service mongod start
```
### Backup Database
````
$mongodump --host 162.220.160.183 --port 27017 --username user --authenticationDatabase bookstore-mern -d bookstore-mern --out db_bookstore-mern
```
