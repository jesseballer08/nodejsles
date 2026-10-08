import mongoose from 'mongoose';
import Message from '../../../models/api/v1/Message.js';

// Zoek een bericht op MongoDB-id, of op volgnummer (0, 1, 2, ...)
const findMessage = async (id) => {
    if (mongoose.isValidObjectId(id) && String(id).length === 24) {
        return Message.findById(id);
    }
    if (/^\d+$/.test(id)) {
        return Message.findOne().sort({ createdAt: 1 }).skip(Number(id));
    }
    return null;
};

const notFound = (res, id) =>
    res.status(404).json({ status: 'fail', message: `Message ${id} not found`, data: null });

export const list = async (req, res) => {
    const messages = await Message.find({});
    res.json({
        status: 'success',
        message: 'GETTING messages',
        data: { messages }
    });
};

export const get = async (req, res) => {
    const message = await findMessage(req.params.id);
    if (!message) return notFound(res, req.params.id);
    res.json({
        status: 'success',
        message: `GETTING message ${req.params.id}`,
        data: { message }
    });
};

export const create = async (req, res) => {
    const message = new Message();
    message.text = req.body.message ?? req.body.text;
    message.username = req.body.user ?? req.body.username;

    try {
        await message.save();
    } catch (error) {
        return res.status(400).json({ status: 'fail', message: error.message, data: null });
    }

    res.json({
        status: 'success',
        message: 'Message created successfully',
        data: { message }
    });
};

export const update = async (req, res) => {
    const message = await findMessage(req.params.id);
    if (!message) return notFound(res, req.params.id);

    const text = req.body.message ?? req.body.text;
    const username = req.body.user ?? req.body.username;
    if (text !== undefined) message.text = text;
    if (username !== undefined) message.username = username;

    try {
        await message.save();
    } catch (error) {
        return res.status(400).json({ status: 'fail', message: error.message, data: null });
    }

    res.json({
        status: 'success',
        message: `UPDATING message ${req.params.id}`,
        data: { message }
    });
};

export const remove = async (req, res) => {
    const message = await findMessage(req.params.id);
    if (!message) return notFound(res, req.params.id);

    await message.deleteOne();
    res.json({
        status: 'success',
        message: `DELETING message ${req.params.id}`,
        data: { message }
    });
};
