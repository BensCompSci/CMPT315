import mongoose, {Schema, Document} from 'mongoose';
import {Timer} from '../models/Timer';

export interface TimerModel extends Timer, Document {}

const TimerSchema = new Schema(
    {
        owner: {type: String, required: true},
        title: {type: String, required: true},
        description: {type: String, required: false},
        duration: {type: String, required: true},
    },
    {
        timestamps: true,versionKey: false
    }
);

export default mongoose.model<TimerModel>('Timer', TimerSchema);