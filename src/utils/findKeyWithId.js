function findKeyWithId(tasks, id) {
    for (let key in tasks) {
        if (tasks[key]["id"] === id) return key;
    }
}

module.exports = findKeyWithId;