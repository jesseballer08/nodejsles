import express from 'express';

const app = express();
const port = 3000;

let messages = [];

app.get('/', (req, res) => {
  res.send('Denzel Coppens');
});

app.get("/api/v1/messages", (req, res)=>{
    const result = {
        'status': 'success',
        'data': {
            'messages': messages
        }
    }
    res.json(result);
});

app.get("/api/v1/messages/:id", (req, res)=>{
    res.send("GET message with id " + req.params.id);
});

app.post("/api/v1/messages", (req, res)=>{
    let message = {
        'user': 'denzel',
        'text': 'hello world'
    };
    messages.push(message);

    const result = {
        'status' : 'succes',
        'data' : {
            'message': message
        }
    }
    res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});