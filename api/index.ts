import { airtableController } from './controllers/airtableController.js';
import { hubspotController } from './controllers/hubspotController.js';
import { convertAirtableToHubspot } from './controllers/convertAirtableToHubspotController.js';

// TODO - Status column in airtable is often out of date and will result in clutter if bad
// leads are placed in active deal stages. Need sales team AND NASHIE to update any leads
// they want to keep working on, and then put all other deals in 'closed lost'
const main = async () => {
    console.log('========new run==========');
    try {
        // let airtableData = await airtableController.getRecords();
        let testRecord = await airtableController.getTestRecord();
        let convertedData = convertAirtableToHubspot(testRecord);
        // let convertedData = convertAirtableToHubspot(airtableData);
        hubspotController.createRecord(convertedData);
    } catch (e) {
        console.log(e);
    }
}

main();
