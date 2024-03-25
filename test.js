import fs from 'fs';

const alredadyDownlaoded = async () => {
    return fs.readdirSync('/Users/mattvaughan-jones/Projects/winki/airtableMigration/tmp/airtable_files', {withFileTypes: true})
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

let alreadyDownloaded = await alredadyDownlaoded();

console.log(alreadyDownloaded.length);