import { airtableController } from './controllers/airtableController.js';
import { hubspotController } from './controllers/hubspotController.js';
import { convertAirtableToHubspot } from './controllers/convertAirtableToHubspotController.js';

//TODO - go through all TODOs
const main = async () => {
    try {
        // let airtableData = await airtableController.getRecords();
        let testRecord = await airtableController.getRecord();
        // convertAirtableToHubspot(airtableData);
        convertAirtableToHubspot(testRecord);
        // hubspotController.createRecord(airtableData);
    } catch (e) {
        console.log(e);
    }
}

main();
