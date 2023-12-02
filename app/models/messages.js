import mongoose from 'mongoose';
import { models,Schema } from 'mongoose';
const messageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    reciverId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
  },
  { timestamps: true }
);

const Message = models.Message || mongoose.model('Message', messageSchema);

export default Message;
