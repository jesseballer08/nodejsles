import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true }
}, {
    // JSON exact zoals in de opdracht: { user, text, _id, __v }
    toJSON: {
        transform: (doc, ret) => ({
            user: ret.username,
            text: ret.text,
            _id: ret._id,
            __v: ret.__v
        })
    }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
