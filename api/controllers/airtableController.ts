// https://airtable.com/appfYtO0pGcnIVEfW/api/docs#javascript/table:updated%20leads%20view:list

import Airtable from 'airtable';
import { airtableAccesstoken,
    airtableSalesBaseID,
    airtableSalesUpdatedLeadsViewID
} from '../constants.js';

type ReturnData = {
    id: string,
    createdTime: string,
    fields: {
        [key: string]: any;
    }
}

const maxRecords = 2;

const base = new Airtable({apiKey: airtableAccesstoken}).base(airtableSalesBaseID);

const getTestRecord = async () => {
        try {
            let airtableResponse = await fetch(`https://api.airtable.com/v0/appfYtO0pGcnIVEfW/Updated%20Leads%20View/rec42w0aTRp6NSeFc`,
            {
                headers: {
                    Authorization: `Bearer ${airtableAccesstoken}`,
                }
            });

            let returnData = await airtableResponse.json() as ReturnData;
            returnData.fields.airtableRecordId = returnData.id;
            return [returnData.fields];
        } catch (e) {
            return e;
        }
}

// const getRecords2 = async () => {
//     console.log('runs correctly');
//     try {
//         let airtableResponse = await fetch(`https://api.airtable.com/v0/${airtableSalesBaseID}/${airtableSalesUpdatedLeadsViewID}?maxRecords=4&view=ALL&pageSize=2&offset=${offset}`,
//         {
//             headers: {
//                 Authorization: `Bearer ${airtableAccesstoken}`,
//             }
//         });

//         const returnData = await airtableResponse.json() as ReturnData;  // TODO - make new type for array of responses
//         console.log(returnData);
//         // return [returnData.fields];
//     } catch (e) {
//         return e;
//     }
// }

const getRecords = () => {
    return new Promise((resolve, reject) => {
        let results: {}[] = [];

        base(airtableSalesUpdatedLeadsViewID).select({
            maxRecords: 1,
            view: "ALL",
            // pageSize: 2
        }).eachPage(
            function page(records, fetchNextPage) {
                // This function (`page`) will get called for each page of records.
                records.forEach((record) => {
                    results.push(record.fields);
                });
            
                // To fetch the next page of records, call `fetchNextPage`.
                // If there are more records, `page` will get called again.
                // If there are no more records, `done` will get called.
                fetchNextPage();
            },
            function done(err) {
                if (err) { 
                    reject(err);
                } else {
                    resolve(results);
                }
            }
        )
    }    
)};

export const airtableController = {
    getTestRecord,
    getRecords,
};
