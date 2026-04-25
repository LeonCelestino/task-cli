const fs = require("node:fs");
const path = require("node:path");


function createDb(path_to_dir, path_to_file) {
    const db_dir = path.resolve(require.main.path, path_to_dir);
    const db_file = path.resolve(require.main.path, path_to_file);

    if (!fs.existsSync(db_dir)) {
        fs.mkdirSync(db_dir, { recursive: true });
        fs.writeFileSync(db_file, JSON.stringify({}));
    }

    if (!fs.existsSync(db_file)) {
        fs.writeFileSync(db_file, JSON.stringify({}));
    }
   
}

function getJson(path_to_file) {
    const db_file = path.resolve(require.main.path, path_to_file);

    const json = JSON.parse(fs.readFileSync(db_file, "utf-8"));

    return json;
}

function writeToJson(path_to_file, json) {
    const db_file = path.resolve(require.main.path, path_to_file);
    fs.writeFileSync(db_file, JSON.stringify(json, null, 4));
}

module.exports = {
    createDb,
    getJson,
    writeToJson

};