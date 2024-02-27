// https://airtable.com/appfYtO0pGcnIVEfW/api/docs#javascript/table:updated%20leads%20view:list

import Airtable from 'airtable';
import { airtableAccesstoken,
    airtableSalesBaseID,
    airtableSalesUpdatedLeadsViewID
} from '../constants.js';

type ReturnData = {
    id: string,
    createdTime: string,
    fields: {}
}

const base = new Airtable({apiKey: airtableAccesstoken}).base(airtableSalesBaseID);

const getRecord = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let airtableResponse = await fetch('https://api.airtable.com/v0/appfYtO0pGcnIVEfW/Updated%20Leads%20View/rec42w0aTRp6NSeFc', {
                headers: {Authorization: `Bearer ${airtableAccesstoken}`}
            });

            const returnData = await airtableResponse.json() as ReturnData;
            resolve([returnData.fields]);
        } catch (e) {
            reject(e);
        }
    })
}

// const getRecords = () => {
//     return new Promise((resolve, reject) => {
//         let results: any = [];

//         base(airtableSalesUpdatedLeadsViewID).select({
//             maxRecords: 2,
//             view: "ALL"
//         }).eachPage(
//             function page(records, fetchNextPage) {
//                 // This function (`page`) will get called for each page of records.
//                 records.forEach(function(record) {
//                     results.push(record.fields);
//                 });
            
//                 // To fetch the next page of records, call `fetchNextPage`.
//                 // If there are more records, `page` will get called again.
//                 // If there are no more records, `done` will get called.
//                 fetchNextPage();
//             },
//             function done(err) {
//                 if (err) { 
//                     reject(err);
//                 } else {
//                     resolve(results);
//                 }
//             }
//         )
//     }    
// )};

// const getTableMetadata = () => {
//     return base(airtableSalesUpdatedLeadsViewID).select({
//             maxRecords: 2,
//             view: "ALL"
//         })
// }

export const airtableController = {
    getRecord,
    // getRecords,
    // getTableMetadata
};
