1:配置nginx 
	location /upmap/ {
   #proxy_pass http://172.16.1.37:80;
   proxy_pass http://172.16.19.155:80;
   #proxy_pass http://172.16.254.109:80;
   #proxy_pass http://172.16.5.60;
   #proxy_pass http://172.16.19.15:80;
  }
2:放到静态资源文件夹
url:

http://127.0.0.1/static/pcweb/emergsys/map/selectAddr/index.html?config=/static/pcweb/emergsys/map/selectAddr/config-arciis-3857.json