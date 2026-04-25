const {createDb, writeToJson} = require("./utils/handleJson");


const path_to_dir = "src/db";
const path_to_file = "src/db/tasks.json";

createDb(path_to_dir, path_to_file);


const {handleOptions} = require("./utils/helpers");
const {options, status} = require("./options");


function execute(args) {
    try {
        const tasks = handleOptions(options, args, status);
        writeToJson(path_to_file, tasks);

    } catch (error) {
        console.error(error.message);
    }
}


module.exports = execute;