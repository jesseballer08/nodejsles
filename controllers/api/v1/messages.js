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
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ status: 'fail', data: { message: 'Message not found' } });
        }
        res.json({ status: 'success', data: { message } });
    } catch (error) {
        res.status(400).json({ status: 'fail', data: { message: 'Invalid id' } });
    }
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

export const update = async (req, res)=>{
    try {
        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { text: req.body.text, username: req.body.username },
            { returnDocument: 'after', runValidators: true }
        );
        if (!message) {
            return res.status(404).json({ status: 'fail', data: { message: 'Message not found' } });
        }
        res.json({ status: 'success', data: { message } });
    } catch (error) {
        res.status(400).json({ status: 'fail', data: { message: error.message } });
    }
};

export const remove = async (req, res)=>{
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) {
            return res.status(404).json({ status: 'fail', data: { message: 'Message not found' } });
        }
        res.json({ status: 'success', data: null });
    } catch (error) {
        res.status(400).json({ status: 'fail', data: { message: 'Invalid id' } });
    }
};
