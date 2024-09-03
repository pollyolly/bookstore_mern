### bookstore-mern
```vim
$cd frontend/
$npm run dev
```
```vim
$cd backend/
$npm run dev
```
### Update Node Js
```vim
$ sudo npm cache clean -f
$ sudo npm install -g n

For Stable Version:
$ sudo n stable

For Latest Version:
$ sudo n latest

Then: Exit/Restart Current Terminal 

Fix Path:
$ sudo apt-get install --reinstall nodejs-legacy

```
### Event Error
```vim
throw er; // Unhandled 'error' event

$sudo killall -9 node
```
### NginX Config
```nginx
server {
        listen 80;
        listen [::]:80;

        return 301 https://bookstore.iwebitechnology.xyz$request_uri;
}
upstream bookstore_api {
        server 127.0.0.1:8080;
}
server {
        listen 443 ssl;

        server_name bookstore.iwebitechnology.xyz *.bookstore.iwebitechnology.xyz;

        access_log /var/log/nginx/bookstore_access.log;
        error_log  /var/log/nginx/bookstore_error.log debug;

        ssl_certificate /etc/cloudflare_ssl/cert.pem;
        ssl_certificate_key /etc/cloudflare_ssl/key.pem;

        location / {
                root /var/www/html/bookstore_mern/frontend/dist;
                index index.html index.html;
                try_files $uri $uri/ /index.html; #we need this for /dist folder to work
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }

        location /books/ {  #/books/ same Base url path in express route found in index.js
                proxy_pass http://bookstore_api;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}
```
