import Caller from '../models/caller.js';

// Save caller details function
export const save = (newCaller) => {
    const caller = new Caller(newCaller);
    return caller.save();
}

// Get caller details function
export const get = (id) => {
    const caller = Caller.findById(id).exec();
    return caller;
}

export const update = (updatedCaller) => {
    const caller = Caller.findByIdAndUpdate(updatedCaller.id, updatedCaller, {new: true}).exec();
    return caller;
}