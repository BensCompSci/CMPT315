import TimerDao from '../daos/TimerDao';
import { Timer } from '../models/Timer';


export async function getAllTimers(owner: String): Promise<Timer[]> {
    return TimerDao.find({owner});
}

export async function createTimer(timerData: Partial<Timer>): Promise<Timer> {
    const timer = new TimerDao(timerData);
    return await timer.save();
}

export async function updateTimer(id: string, timerData: Partial<Timer>): Promise<Timer | undefined> {
    const timer = await TimerDao.findById(id);
    if (!timer) {
        return undefined;
    }
    Object.assign(timer, timerData);
    return await timer.save();
}

export async function deleteTimer(id: string): Promise<boolean> {
    const result = await TimerDao.findByIdAndDelete(id);
    return result !== null;
}
