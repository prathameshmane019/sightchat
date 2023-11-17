import mongoose from 'mongoose';
import { models,Schema } from 'mongoose';
const messageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    reciverId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = models.Message || mongoose.model('Message', messageSchema);

export default Message;
