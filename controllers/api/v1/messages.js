let messages = [];

export const list = (req, res)=>{
    const result = {
        'status': 'success',
        'data': {
            'messages': messages
        }
    }
    res.json(result);
};

export const get = (req, res)=>{
    res.send("GET message with id " + req.params.id);
};

export const create = (req, res)=>{
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
};
