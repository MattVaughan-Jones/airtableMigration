// https://airtable.com/appfYtO0pGcnIVEfW/api/docs#javascript/table:updated%20leads%20view:list

import dotenv from 'dotenv';
import Airtable from 'airtable';
import { airtableAccesstoken,
    airtableSalesBaseID,
    airtableSalesUpdatedLeadsViewID
} from '../constants.js';

dotenv.config();

const base = new Airtable({apiKey: airtableAccesstoken}).base(airtableSalesBaseID);

const listRecords = () => {
    base(airtableSalesUpdatedLeadsViewID).select({
        maxRecords: 3,
        view: "ALL"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
    
        records.forEach(function(record) {
            console.log('Retrieved', record.get('Priority Response'));
            console.log(record);
        });
    
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
};

export const airtable = {
    listRecords
};
