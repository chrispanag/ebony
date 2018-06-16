function threadControlWebhook(db) {
    const collection = db.collection('users');
    
    return entry => {
        if (entry.pass_thread_control) {
            console.log(entry);
            const id = entry.sender.id;
            return collection.findOneAndUpdate({ id }, { $set: { handovered: false } });
        }
    }
}

module.exports = threadControlWebhook;
