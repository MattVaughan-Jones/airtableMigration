import * as hubspot from '@hubspot/api-client'
import { hubspotAccessToken } from '../constants.js';
import { ConvertedRecord, ConvertedContactRecord, ConvertedDealRecord } from './types.js';
import { logger } from './../logger.js';
import {
    BatchResponseSimplePublicObject,
    AssociationSpecAssociationCategoryEnum,
    BatchInputSimplePublicObjectInputForCreate
} from '@hubspot/api-client/lib/codegen/crm/companies/index.js';
import https from 'https';
import http from 'http';
import fs from 'fs';
import request from 'request';
import axios from 'axios';
import {fileFromPath} from 'formdata-node/file-from-path'

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
    } // TODO - delete faulty data

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

    const downloadAirtableFiles = (dataBatch: ConvertedRecord[]) => {
        let returnData: {
                airtableRecordID: string,
                files: {tempFileName: string, originalFileName: string}[]
            }[] = [];

        dataBatch.forEach((record) => {
            record.dealNotes.properties.attachments?.forEach((attachment) => {
                let tempFileName = attachment.id + '.' + attachment.filename.split('.',).pop();
                
                let file = fs.createWriteStream('tmp/airtable_files/' + tempFileName);
                
                https.get(attachment.url, function(response) {
                    response.pipe(file);
    
                    // after download completed close filestream
                    file.on("finish", () => {
                        file.close();
                    });
                });
            });
        });

        return returnData;
    }

    const uploadFilesToHS = async () => {
        // filesArray.forEach((file) => {
        //     let buffer = {
        //         data: Buffer,
        //         name: file
        //     };

        //     await hubspotClient.files.filesApi.upload(file: '@/tmp/airtable_files/att0IMq6ria7RlMK9.png', folderId: '160809862233');
        // });

        let file = fs.readFileSync("./tmp/airtable_files/attypYiTfZbsqlk4r.png");
        let uploadResponse = await hubspotClient.files.filesApi.upload(
            {
            data: Buffer.from(file),
            name: "testfile2.png",
            },
            '160809862233',
            undefined,
            undefined,
            undefined,
            JSON.stringify({ access: "PUBLIC_NOT_INDEXABLE" })
        );
    }

    const batchSize = 2; // TODO - setTimeout around the try/catch to keep below 100 API calls per 10s.
    for (let batchIndex = 0; batchIndex < cleanData.length; batchIndex += batchSize) {
        let cleanDataBatch = cleanData.slice(batchIndex, batchIndex + batchSize);

        let dealsArrBatch = cleanDataBatch.map((el) => {
            return el.deal;
        });

        let contactsArrBatch = cleanDataBatch.map((el) => {
            return el.contact;
        });
        
        try {
            // TODO - probably need some try/catch blocks around creation of non-essential objects, to allow other objects to be created if something fails
            // let createContactsResponse = await hubspotClient.crm.contacts.batchApi.create({inputs: contactsArrBatch});
            let createDealsResponse = await hubspotClient.crm.deals.batchApi.create({inputs: dealsArrBatch});

            // let createNotesObj: BatchInputSimplePublicObjectInputForCreate = {
            //     inputs: []
            // };

            // // for each record with a note, push it to the createNotesObj.inputs array
            // for (let notesBatchIndex=0 ; notesBatchIndex < cleanDataBatch.length ; notesBatchIndex++) {
            //     if (cleanDataBatch[notesBatchIndex].dealNotes.properties.note && cleanDataBatch[notesBatchIndex].deal.properties.closedate) {
            //         let input = {
            //                 "associations": [
            //                     {
            //                         "types": [{
            //                             "associationCategory": "HUBSPOT_DEFINED" as AssociationSpecAssociationCategoryEnum,
            //                             "associationTypeId": 214 // Note-to-deal
            //                         }],
            //                         "to": {
            //                             "id": getCorrespondingDealId(cleanDataBatch[notesBatchIndex].deal.properties.airtable_record_id, createDealsResponse)
            //                         }
            //                     }
            //                 ],
            //                 "properties":{
            //                     "hs_note_body": cleanDataBatch[notesBatchIndex].dealNotes.properties.note,
            //                     "hs_timestamp": cleanDataBatch[notesBatchIndex].deal.properties.closedate,
            //                     "hubspot_owner_id": "699030157"
            //                 }
            //             }

            //         // @ts-ignore
            //         createNotesObj.inputs.push(input);
            //     }    
            // }

            // if (createNotesObj.inputs.length > 0) {
            //     let createNotesResponse = await hubspotClient.crm.objects.notes.batchApi.create(createNotesObj);
            // }

            // let associationsObj: any = {
            //     inputs: []
            // }

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

            // cleanDataBatch[0].dealNotes.properties.attachments?.forEach((el) => {

            // })

            downloadAirtableFiles(cleanDataBatch);

            const folderId = 160809862233;
            
            uploadFilesToHS();

        } catch (e) {
            contactsArrBatch.forEach((el) => {
                allUnmigratedRecords.push(el.properties.airtable_record_id);
            });

            logger.error('====================================');
            logger.error(e);
        }
    }

    console.log('last item migrated');

    // TODO - based on this list, re-do the migration, on only these records that weren't migrated originally
    logger.info('Unmigrated records: %s', allUnmigratedRecords);
};

const createFolder = async() => {
    let response = await hubspotClient.files.foldersApi.create({name: 'files-from-airtable'});
    return response;
}

export const hubspotController = {
    createRecord,
}
