import fs from 'fs';

const outputLog = fs.createWriteStream('./outputLog.log');
const errorsLog = fs.createWriteStream('./errorsLog.log');

export const consoler = new console.Console(outputLog, errorsLog);
