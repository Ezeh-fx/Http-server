import *as http from 'http'


// Define the type for items in the array
interface Item {
    id: number;
    name: string;
}
 
// In-memory data store
let items: Item[] = [];

// Create HTTP server
const server = http.createServer((req, res) => {
    const { method, url } = req;   

    //Set response header for JSON
    res.setHeader('Content-type', 'application/json');

    // Handle different routes and HTTP methods
    if (url === '/items') {
     if (method=== 'GET'){
        // Read: Get all items 
        res.writeHead(200);
        res.end(JSON.stringify(items));
     } else if (method=== 'POST'){
        // Create: Add a new item
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const newItem: Item = JSON.parse(body);
            items.push(newItem);
            res.writeHead(201);
            res.end(JSON.stringify(newItem));
        });
     }
    } else if (url?.startsWith('/items/')) {
        const id = parseInt(url.split('/')[2]);
        const itemIndex = items.findIndex(item => item.id === id);

     if(method === 'GET') {
        //Read: Get a specific item
        if(itemIndex !== -1) {
            res.writeHead(200);
            res.end(JSON.stringify(items[itemIndex]));
        } else{
            res.writeHead(404);
            res.end(JSON.stringify({message: 'item not found'}));
        }
     } else if (method === 'PUT') {
        //Update: Modify an existing item
        if(itemIndex ! == -1) {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
        });
        req.on('end',() =>{
         const updatedItem: Item = JSON.parse(body);
         items[itemIndex] = {...items[itemIndex], ...updatedItem};
         res.writeHead(200);
         res.end(JSON.stringify(items[itemIndex]));
        });
     } else {
        res.writeHead(404);
        res.end(JSON.stringify({message: 'item not found'}));
     }
    } else if(method === 'DELETE') {
        //Delete:Remove an item
        if(itemIndex !== -1) {
            items.splice(itemIndex, 1);
            res.writeHead(200);
            res.end(JSON.stringify({message: 'item deleted'}));
        } else  {
            res.writeHead(404);
            res.end(JSON.stringify({message: 'item not found'}));
        }
    }
} else {
    res.writeHead(404);
    res.end(JSON.stringify({message: 'Route not found'}));
}
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server running on port 3000');
});