import * as hubspot from '@hubspot/api-client'
import { hubspotAccessToken } from '../constants.js';
import { ConvertedRecord, ConvertedContactRecord, ConvertedDealRecord } from './types.js';
import { logger } from './../logger.js';

// TODO - create a file which contains only an object to record the status of converted records
//        Form
// [{
//     airtableID: string,
//     createdContactSuccessfully: boolean,
//     createdDealSuccessfully: boolean,
//     createdAssociationSuccessfully: boolean,
//     errorMessage?: string
// }]

// TODO - figure out how to create attachments on deals

const hubspotClient = new hubspot.Client({ accessToken: hubspotAccessToken });

const createRecord = async (cleanData: ConvertedRecord[]) => {

    const faultyData = {
        airtableRecordId: 'fake',
        deal: { 
            properties: {
                imported_from_airtable_via_api: 'true',
                dealname: 'broken test api deal',
                date_submitted: 1
            },
            associations: []
        },
        contact: { 
            properties: {
                imported_from_airtable_via_api: 'true',
                firstname: 1
            },
            associations: []
        },
        dealNotes: { 
            properties: {
                note: 1
            }
        }
    }

    // const getCorrespondingContactId = (dealResponseIndex: number): string => {
    //     let objIndex = mainObj.findIndex((el) => {
    //         return el.dealName === createDealResponse.results[dealResponseIndex].properties.dealname;
    //     });

    //     let contactIndex = createContactResponse.results.findIndex((el) => {
    //         return el.properties.email === mainObj[objIndex].email;
    //     });

    //     return createContactResponse.results[contactIndex].id;
    // }

    const dealsArr = cleanData.map((el) => {
        return el.deal;
    });

    const contactsArr = cleanData.map((el) => {
        return el.contact;
    });

    const batchSize = 20; // TODO - change to something reasonable like 10
    for (let i = 0; i < dealsArr.length; i += batchSize) {
        const dealsArrBatch = dealsArr.slice(i, i + batchSize);
        
        try {
            const createDealResponse = await hubspotClient.crm.deals.batchApi.create({inputs: dealsArrBatch})
            console.log('batch done');
        } catch (e) {
            logger.error('====================================');
            logger.error(e);
            logger.error(dealsArrBatch);
        }
    }

    // const createContactResponse = await hubspotClient.crm.contacts.batchApi.create(contactsObj);

    // TODO - need to collect the associated 'to' record based on the response we receive. Map a known value (dealName) to a known value in the contact and find the right ID)
    // const BatchInputPublicAssociation = { 
    //     inputs: [
    //         {
    //             _from: {
    //                 id : getCorrespondingContactId(0)
    //             },
    //             to: {
    //                 id: createDealResponse.results[0].id
    //             },
    //             type: 'contact_to_deal'
    //         },
    //         {
    //             _from: {
    //                 id : getCorrespondingContactId(1)
    //             },
    //             to: {
    //                 id: createDealResponse.results[1].id
    //             },
    //             type: 'contact_to_deal'
    //         },
    //         {
    //             _from: {
    //                 id : getCorrespondingContactId(2)
    //             },
    //             to: {
    //                 id: createDealResponse.results[2].id
    //             },
    //             type: 'contact_to_deal'
    //         },
    //         {
    //             _from: {
    //                 id : getCorrespondingContactId(3)
    //             },
    //             to: {
    //                 id: createDealResponse.results[3].id
    //             },
    //             type: 'contact_to_deal'
    //         },
    //         {
    //             _from: {
    //                 id : getCorrespondingContactId(4)
    //             },
    //             to: {
    //                 id: createDealResponse.results[4].id
    //             },
    //             type: 'contact_to_deal'
    //         },
    //         {
    //             _from: {
    //                 id : getCorrespondingContactId(5)
    //             },
    //             to: {
    //                 id: createDealResponse.results[5].id
    //             },
    //             type: 'contact_to_deal'
    //         },
    //         {
    //             _from: {
    //                 id : getCorrespondingContactId(6)
    //             },
    //             to: {
    //                 id: createDealResponse.results[6].id
    //             },
    //             type: 'contact_to_deal'
    //         },
    //     ] 
    // };

    // const createAssociationResponse = await hubspotClient.crm.associations.batchApi.create(
    //     'contacts',
    //     'deals',
    //     BatchInputPublicAssociation
    // );

};

export const hubspotController = {
    createRecord
}
