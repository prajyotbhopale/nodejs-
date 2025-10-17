const fs = require('fs');
const http = require('http');
const path = require('path');

const port = 3000;

const server = http.createServer((req,res) => {
   const filepath = path.join(__dirname, req.url === '/' ? 'index.html' :req.url);

   console.log(filepath);
   
   const extname =String(path.extname(filepath).toLowerCase());

   const mimetypes ={

    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'text/png',
   }

   const contentType = mimetypes[extname] || 'application/octet-stream';
   fs.readFile(filepath, (err,content)=>{
    if(err){
        if(err.code == 'ENOENT'){
            res.writeHead(404, {'Content-type': 'text/html'});
            res.end("404: Page Not Found Bro")
        }

    }else{
        res.writeHead(200, {'Content-type': contentType});
        res.end(content, 'utf-8');

    }
   })
})

server.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});     