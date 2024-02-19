import { airtableController } from './controllers/airtableController.js';
import { hubspotController } from './controllers/hubspotController.js';
import { convertAirtableToHubspot } from './controllers/convertAirtableToHubspotController.js';

const main = async () => {
    try {
        let airtableData = await airtableController.getRecords();
        convertAirtableToHubspot(airtableData);
        // hubspotController.createRecord(airtableData);
    } catch (e) {
        console.log(e);
    }
}

main();
