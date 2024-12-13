import * as http from 'http'


const port: number = 2006

const server = http.createServer((req,res) =>{
res.statusCode = 200
res.setHeader("Content-type","text/html")
res.write("<html><h1 style= color:green>Ready to go</h1></html>")    
})

server.listen(port,()=>{
    console.log(`Server is running at port`)
}) 