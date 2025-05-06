import { model, models, Schema, Types } from 'mongoose';

export interface IInteraction {
  user: Types.ObjectId;
  action: 'viewed' | 'answered' | 'added' | 'upvoted' | 'downvoted';
  actionId: Types.ObjectId;
  actionType: 'question' | 'answer' | 'profile';
}

const InteractionSchema = new Schema<IInteraction>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: {
      type: String,
      enum: ['viewed', 'answered', 'added', 'upvoted', 'downvoted'],
      required: true,
    },
    actionId: { type: Schema.Types.ObjectId, required: true },
    actionType: {
      type: String,
      enum: ['question', 'answer', 'profile'],
      required: true,
    },
  },
  { timestamps: true }
);

const Interaction =
  models.Interaction || model<IInteraction>('Interaction', InteractionSchema);

export default Interaction;
