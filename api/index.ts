import { airtableController } from './controllers/airtableController.js';
import { hubspotController } from './controllers/hubspotController.js';

const main = async () => {
    let airtableData = await airtableController.listRecords();
    hubspotController.createContact(airtableData);
}

console.log('======call main==========');
main();
