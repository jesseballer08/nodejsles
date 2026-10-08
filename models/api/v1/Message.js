import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true }
}, {
    // Toon ook "user" en "message" in de JSON, zoals in de opdracht
    toJSON: { virtuals: true, versionKey: false, transform: (doc, ret) => { delete ret.id; return ret; } }
});

messageSchema.virtual('user')
    .get(function () { return this.username; })
    .set(function (v) { this.username = v; });

messageSchema.virtual('message')
    .get(function () { return this.text; })
    .set(function (v) { this.text = v; });

const Message = mongoose.model('Message', messageSchema);

export default Message;
