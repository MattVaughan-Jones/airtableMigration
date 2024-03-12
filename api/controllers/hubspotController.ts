import * as hubspot from '@hubspot/api-client'
import { hubspotAccessToken } from '../constants.js';
import { ConvertedRecord, ConvertedContactRecord, ConvertedDealRecord } from './types.js';
import { logger } from './../logger.js';
import {
    BatchResponseSimplePublicObject,
    AssociationSpecAssociationCategoryEnum,
    BatchInputSimplePublicObjectInputForCreate
} from '@hubspot/api-client/lib/codegen/crm/companies/index.js';

// TODO - figure out how to create attachments on deals
// TODO - figure out how to create notes on deals
// TODO - the log of unmigrated records contains newline characters. Figure out why.
// TODO - what happens if there are fewer than 'batchSize' items left to process? Does it just do a smaller batch?

let allUnmigratedRecords: string[] = [];

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

    const getCorrespondingContactId = (airtableRecordId: string, createContactResponse: BatchResponseSimplePublicObject): string => {
        let createContactResponseIndex = createContactResponse.results.findIndex((el) => {
            return el.properties.airtable_record_id === airtableRecordId;
        });

        return createContactResponse.results[createContactResponseIndex].id;
    }

    const getCorrespondingDealId = (airtableRecordId: string, createDealResponse: BatchResponseSimplePublicObject): string => {
        let createDealResponseIndex = createDealResponse.results.findIndex((el) => {
            return el.properties.airtable_record_id === airtableRecordId;
        });

        return createDealResponse.results[createDealResponseIndex].id;
    }

    const batchSize = 5; // TODO - setTimeout around the try/catch to keep below 100 API calls per 10s.
    for (let i = 0; i < cleanData.length; i += batchSize) {
        let cleanDataBatch = cleanData.slice(i, i + batchSize);

        let dealsArrBatch = cleanDataBatch.map((el) => {
            return el.deal;
        });

        let contactsArrBatch = cleanDataBatch.map((el) => {
            return el.contact;
        });
        
        try {
            // let createContactsResponse = await hubspotClient.crm.contacts.batchApi.create({inputs: contactsArrBatch});
            let createDealsResponse = await hubspotClient.crm.deals.batchApi.create({inputs: dealsArrBatch});

            let createNotesObj: BatchInputSimplePublicObjectInputForCreate = {
                inputs: []
            };

            for (let i=0 ; i < cleanData.length ; i++) {
                if (cleanData[i].dealNotes.properties.note && cleanData[i].deal.properties.closedate) {
                    let input = {
                            "associations": [
                                {
                                    "types": [{
                                        "associationCategory": "HUBSPOT_DEFINED" as AssociationSpecAssociationCategoryEnum,
                                        "associationTypeId": 214 // Note-to-deal
                                    }],
                                    "to": {
                                        "id": getCorrespondingDealId(cleanData[i].deal.properties.airtable_record_id, createDealsResponse)
                                    }
                                }
                            ],
                            "properties":{
                                "hs_note_body": cleanData[i].dealNotes.properties.note,
                                "hs_timestamp": cleanData[i].deal.properties.closedate,
                                "hubspot_owner_id": "699030157"
                            }
                        }

                    // @ts-ignore
                    createNotesObj.inputs.push(input);
                }    
            }

            let createNotesResponse = await hubspotClient.crm.objects.notes.batchApi.create(createNotesObj);
            console.log(createNotesResponse);

            // if (cleanData[0].dealNotes.properties.note && cleanData[0].deal.properties.closedate) {
            //     const createNotesObj = {
            //         inputs: [
            //             {
            //                 "associations": [
            //                     {
            //                         "types": [{
            //                             "associationCategory": "HUBSPOT_DEFINED" as AssociationSpecAssociationCategoryEnum,
            //                             "associationTypeId": 214 // Note-to-deal
            //                         }],
            //                         "to": {
            //                             "id": getCorrespondingDealId(cleanData[0].deal.properties.airtable_record_id, createDealsResponse)
            //                         }
            //                     }
            //                 ],
            //                 "properties":{
            //                     "hs_note_body": cleanData[0].dealNotes.properties.note,
            //                     "hs_timestamp": cleanData[0].deal.properties.closedate,
            //                     "hubspot_owner_id": "699030157"
            //                 }
            //             },
            //             {
            //                 "associations": [
            //                     {
            //                         "types": [{
            //                             "associationCategory": "HUBSPOT_DEFINED" as AssociationSpecAssociationCategoryEnum,
            //                             "associationTypeId": 214 // Note-to-deal
            //                         }],
            //                         "to": {
            //                             "id": getCorrespondingDealId(cleanData[0].deal.properties.airtable_record_id, createDealsResponse)
            //                         }
            //                     }
            //                 ],
            //                 "properties":{
            //                     "hs_note_body": 'other note',
            //                     "hs_timestamp": cleanData[0].deal.properties.closedate,
            //                     "hubspot_owner_id": "699030157"
            //                 }
            //             }
            //         ]
            //     }

            //     let createNotesResponse = await hubspotClient.crm.objects.notes.batchApi.create(createNotesObj);
            //     console.log(createNotesResponse);
            // }

            // let associationsObj: any = {
            //     inputs: []
            // }

            // TODO - can I batch create notes and therefore set up the notes obj at the same time as the associations obj?
            // createDealsResponse.results.forEach((el) => {
            //     associationsObj.inputs.push(
            //         {
            //             _from: { id: getCorrespondingContactId(el.properties.airtable_record_id as string, createContactsResponse) },
            //             to: { id: el.id },
            //             type: 'contact_to_deal'
            //         }
            //     );
            // });

            // let createAssociationResponse = await hubspotClient.crm.associations.batchApi.create(
            //     'contacts',
            //     'deals',
            //     associationsObj
            // );


        } catch (e) {
            contactsArrBatch.forEach((el) => {
                allUnmigratedRecords.push(el.properties.airtable_record_id);
            });

            logger.error('====================================');
            logger.error(e);
        }
    }

    // TODO - based on this list, re-do the migration, on only these records that weren't migrated originally
    logger.info('Unmigrated records: %s', allUnmigratedRecords);
};

export const hubspotController = {
    createRecord
}
