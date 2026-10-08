import Message from '../../../models/api/v1/Message.js';


export const list = async (req, res)=>{
    const messages = await Message.find({});

    
    const result = {
        'status': 'success',
        'data': {
            'messages': messages
        }
    }
    res.json(result);
};

export const get = async (req, res)=>{
    const message = await Message.findById(req.params.id);
    res.json(message);
};

export const create = async (req, res)=>{
    const message = new Message();
    message.text = req.body.text;
    message.username = req.body.username;

    try {
        await message.save();
    } catch (error) {
        return res.status(400).json({ status: 'error', message: error.message });
    }

    const result = {
        'status' : 'success',
        'data' : {
            'message': 'Message created successfully'
        }
    }
    res.json(result);
};

