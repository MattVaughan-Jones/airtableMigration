import { airtableController } from './controllers/airtableController.js';
import { hubspotController } from './controllers/hubspotController.js';
import { convertAirtableToHubspot } from './controllers/convertAirtableToHubspotController.js';

// TODO - this code will locally download all files. Need to upload manually, and then associate.
const main = async () => {
    console.log('========new run==========');
    try {
        // let airtableData = await airtableController.getRecords();
        // let convertedData = convertAirtableToHubspot(airtableData);
        // let testRecord = await airtableController.getTestRecord();
        // let convertedData = convertAirtableToHubspot(testRecord);
        // hubspotController.createRecord(convertedData);
        // hubspotController.downloadAirtableFiles(convertedData);
        hubspotController.uploadFiles();
    } catch (e) {
        console.log(e);
    }
}

main();
