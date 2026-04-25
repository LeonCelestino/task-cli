#!/usr/bin/env node

const execute = require("./src/executeApp");
const parsedArgs = process.argv.slice(2);

execute(parsedArgs);