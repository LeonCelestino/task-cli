const findKeyWithId = require("./findKeyWithId");
const {getJson} = require("./handleJson");


const path_to_dir = "src/db";
const path_to_file = "src/db/tasks.json";

const tasks = getJson(path_to_file);


function add(args, status) {
    const obj = {
        "id": 0,
        "description": null,
        "status": null,
        "createdAt": null,
        "updatedAt": null,
    }

    const value = args[1];
    const description = args[2];

    if (tasks[[value]]) throw new Error("Task already exists. If you want to update it, type in \"my-cli update your_id your_new_description\"");

    tasks[value] = obj;

    const newTask = tasks[value];
    const tasksKeys = Object.keys(tasks);
    const lastID = tasks[tasksKeys[tasksKeys.length - 2] || tasksKeys[tasksKeys.length - 1]]["id"];


    newTask["id"] = String(Number(lastID) + 1);
    newTask["description"] = description || value;
    newTask["status"] = status["mark-todo"];
    newTask["createdAt"] = new Date().toISOString().replaceAll(/[A-Za-z]/g, " ");
    newTask["updatedAt"] = newTask["createdAt"];

    return tasks;

}

function update(args) {
    const id = args[1];
    const newDescription = args[2];

    const keyWithTheId = findKeyWithId(tasks, id);

    tasks[keyWithTheId]["description"] = newDescription || tasks[keyWithTheId]["description"];
    tasks[keyWithTheId]["updatedAt"] = new Date().toISOString().replaceAll(/[A-Za-z]/g, " ");

    return tasks;
}

function deleteTask(args) {
    const id = args[1];
    const keyWithTheId = findKeyWithId(tasks, id);

    delete tasks[keyWithTheId];

    return tasks;
}

function changeProgress(args, status) {
    const id = args[1];
    const keyWithTheId = findKeyWithId(tasks, id);


    tasks[keyWithTheId]["status"] = status;
    update(args);

    return tasks;
}

function list(args, status) {
    const taskKeys = Object.keys(tasks);
    const stat = args[1];

    if (!taskKeys.length) throw new Error("No tasks could be found. Please, create your tasks before listing them.");
    if (!(Object.values(status).includes(stat)) && stat) throw new Error("The status doesn't exist. Please, enter either:\n\n\ttodo;\n\tin-progress;\n\tdone");

    for (let key of taskKeys) {
        if (!stat) {
            console.log(`Task: ${key}, description: ${tasks[key]["description"]}, created at ${tasks[key]["createdAt"]}, last updated in ${tasks[key]["updatedAt"]}, with the status of ${tasks[key]["status"]} \n`);
        }
        
        if (tasks[key]["status"] === stat) {
            console.log(`Task: ${key}, description: ${tasks[key]["description"]}, created at ${tasks[key]["createdAt"]}, last updated in ${tasks[key]["updatedAt"]}, with the status of ${tasks[key]["status"]} \n`);
        }
    }

    return tasks;
}


function handleOptions(options, args, status) {
    const option = args[0];

    if (!options[option]) throw new Error("Option not found. Please, read list-of-options.md to check all options available.");

    if (option === "add") return add(args, status);

    if (option === "update") return update(args);

    if (option === "delete") return deleteTask(args);

    if (Object.keys(status).includes(option)) return changeProgress(args, status[option]);

    if (option === "list") return list(args, status);
    
}


module.exports = {
    handleOptions
    
}