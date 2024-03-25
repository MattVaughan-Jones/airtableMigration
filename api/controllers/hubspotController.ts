import * as hubspot from '@hubspot/api-client'
import { hubspotAccessToken } from '../constants.js';
import { ConvertedRecord } from './types.js';
import { logger } from './../logger.js';
import {
    BatchResponseSimplePublicObject, 
    BatchInputSimplePublicObjectInputForCreate, 
    AssociationSpecAssociationCategoryEnum,
    BatchResponseSimplePublicObjectWithErrors,
} from '@hubspot/api-client/lib/codegen/crm/companies/index.js';
import https from 'https';
import fs from 'fs';
import test from 'node:test';

// TODO - the log of unmigrated records contains newline characters. Figure out why.

let allUnmigratedRecords: string[] = [];

const uploadFiles = async () => {

    const alredadyDownlaoded = async () => {
        return fs.readdirSync('/Users/mattvaughan-jones/Projects/winki/airtableMigration/tmp/airtable_files', {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    }

    let downloadedFiles = await alredadyDownlaoded();

    const allHubspotDeals = await hubspotClient.crm.deals.getAll(
        undefined,
        undefined,
        ['airtable_record_id', 'hs_object_id'],
        undefined,
        undefined,
        undefined
    );
    
    const hubspotDealsNeedingAttachments = allHubspotDeals.filter((el) => {
        return downloadedFiles.includes(el.properties.airtable_record_id as string)
    });

    const getDealIdFromAirtableRecordId = (airtableRecordId: string) => {
        let thing  = hubspotDealsNeedingAttachments.filter((el) => {
            el.properties.airtable_record_id == airtableRecordId;
        });

        console.log(thing);
    }

    for (let folderIndex = 0 ; folderIndex < 1/*downloadedFiles.length*/ ; folderIndex ++) {

        try {
            // create folder
            let createFolderResponse = await hubspotClient.files.foldersApi.create({
                name: downloadedFiles[folderIndex],
                parentPath: '/files-from-airtable'
            });

            let uploadedFileIds: string[] = [];

            // upload files to folder
            // discover all files in the local directory, and run callback on each of them
            let filesToUpload = fs.readdir(`/Users/mattvaughan-jones/Projects/winki/airtableMigration/tmp/airtable_files/${downloadedFiles[folderIndex]}`, (err, files) => {
                if (err) {
                    logger.error('ERROR finding list of flies in folder. See next error');
                    logger.error(err)
                } else {
                    // files.forEach(async (file) => {
                    
                    //     // upload file
                    //     let filePath = fs.readFileSync(`/Users/mattvaughan-jones/Projects/winki/airtableMigration/tmp/airtable_files/${downloadedFiles[folderIndex]}/${file}`);
                    //     let uploadResponse = await hubspotClient.files.filesApi.upload(
                    //         {
                    //         data: Buffer.from(filePath),
                    //         name: file,
                    //         },
                    //         createFolderResponse.id,
                    //         undefined,
                    //         file,
                    //         undefined,
                    //         JSON.stringify({ access: "PUBLIC_NOT_INDEXABLE" })
                    //     );
                    //     uploadedFileIds.push(uploadResponse.id)
                    // })
                }
            });

            // upload files

            // create note
            // let createNoteResponse = await hubspotClient.crm.objects.notes.basicApi.create({
            //     "associations": [
            //         {
            //             "types": [{
            //                 "associationCategory": "HUBSPOT_DEFINED" as AssociationSpecAssociationCategoryEnum,
            //                 "associationTypeId": 214 // note-to-deal
            //             }],
            //             "to": {
            //                 "id": getDealIdFromAirtableRecordId(downloadedFiles[folderIndex])
            //             }
            //         }
            //     ],
            //     "properties":{
            //         "hs_timestamp": 'todo',
            //         "hubspot_owner_id": "699030157"
            //     }
            // });

            let dealId = getDealIdFromAirtableRecordId(downloadedFiles[folderIndex])

            console.log('dealID: ' + dealId);

            // associate files to note

            // associate note to deal

            console.log('upload number ' + folderIndex);
        } catch(e) {
            logger.error('ERROR creating folders and uploading. See next error');
            logger.error(e)
        }
    }

    console.log('done');
}

const findContactByEmail = async (email: string): Promise<BatchResponseSimplePublicObject> => {
    let BatchReadInputSimplePublicObjectId = {
        idProperty: 'email',
        inputs: [{'id': email as string}],
        properties: ['email', 'hs_object_id'],
        propertiesWithHistory: []
    };

    const apiResponse = await hubspotClient.crm.contacts.batchApi.read(
        BatchReadInputSimplePublicObjectId
    );

    return apiResponse;
}

const associateDealToContact = async (
    createDealsResponse: BatchResponseSimplePublicObject | BatchResponseSimplePublicObjectWithErrors,
    contactId: string
) => {
    let contactToDealAssociation: any = {
        inputs: []
    }

    createDealsResponse.results.forEach((el) => {
        contactToDealAssociation.inputs.push(
            {
                _from: { id: contactId },
                to: { id: el.id },
                type: 'contact_to_deal'
            }
        );
    });

    // associate contact to deal (unless error already thrown if contact already exists)
    await hubspotClient.crm.associations.batchApi.create(
        'contacts',
        'deals',
        contactToDealAssociation
    );
};

const getCorrespondingContactId = (airtableRecordId: string, createContactResponse: BatchResponseSimplePublicObject): string => {
    let createContactResponseIndex = createContactResponse.results.findIndex((el) => {
        return el.properties.airtable_record_id === airtableRecordId;
    });

    return createContactResponse.results[createContactResponseIndex].id;
}

const downloadAirtableFiles = async (cleanData: ConvertedRecord[]) => {

    const alredadyDownlaoded = async () => {
        return fs.readdirSync('/Users/mattvaughan-jones/Projects/winki/airtableMigration/tmp/airtable_files', {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    }

    let alreadyDownloaded = await alredadyDownlaoded();

    let recordsWithAttachments = cleanData.filter(el => {
        return el.dealNotes.properties.attachments
    })

    console.log('already downloaded: ' + alreadyDownloaded.length);
    console.log('number of records with attachments: ' + recordsWithAttachments.length)

    cleanData.forEach((record) => {
        if (record.dealNotes.properties.attachments && !alreadyDownloaded.includes(record.deal.properties.airtable_record_id)) {

            let subDirectoryPath = `./tmp/airtable_files/${record.deal.properties.airtable_record_id}`

            // make a folder for each airtable record
            fs.mkdir(subDirectoryPath, (e) => {
                if (e) {
                    logger.error('ERROR creating directory. See next error');
                    logger.error(e);
                };
            });

            for (let attachmentIndex = 0; attachmentIndex < record.dealNotes.properties.attachments.length ; attachmentIndex++) {
                let attachment = record.dealNotes.properties.attachments[attachmentIndex];

                try {
                    let writeStream = fs.createWriteStream(`${subDirectoryPath}/file${attachmentIndex}-${attachment.filename}`);

                    https.get(attachment.url, function(response) {
                        response.pipe(writeStream);
                        writeStream.on("finish", () => {
                            writeStream.close();
                        });
                    });
                } catch (e) {
                    logger.error('ERROR downloading file. See next error');
                    logger.error(e);
                }
            }

            console.log(new Date() + ': downloaded files from ' + record.deal.properties.airtable_record_id);
        }
    })
}

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

    const getCorrespondingDealId = (airtableRecordId: string, createDealResponse: BatchResponseSimplePublicObject): string => {
        let createDealResponseIndex = createDealResponse.results.findIndex((el) => {
            return el.properties.airtable_record_id === airtableRecordId;
        });
        return createDealResponse.results[createDealResponseIndex].id;
    }

    const batchSize = 1;
    for (let batchIndex = 0; batchIndex < cleanData.length; batchIndex += batchSize) {
        let cleanDataBatch = cleanData.slice(batchIndex, batchIndex + batchSize);

        let dealsArrBatch = cleanDataBatch.map((el) => {
            return el.deal;
        });

        let contactsArrBatch = cleanDataBatch.map((el) => {
            return el.contact;
        });
        
        try {
            // create deal
            let createDealsResponse = await hubspotClient.crm.deals.batchApi.create({inputs: dealsArrBatch});

            try {
                // create contact
                let createContactsResponse = await hubspotClient.crm.contacts.batchApi.create({inputs: contactsArrBatch});

                let contactId = getCorrespondingContactId(createDealsResponse.results[0].properties.airtable_record_id as string, createContactsResponse)

                associateDealToContact(createDealsResponse, contactId);

            } catch (e: any) {
                // TODO - if contact already exists, find it, and associate it with the created deal
                if (e.body.message = 'Contact already exists.') {
                    try {
                        contactsArrBatch.forEach(async (contact) => {
                            if (contact.properties.email) {
                                let existingContactsWithEmail = await findContactByEmail(contact.properties.email as string);
                                if (existingContactsWithEmail && existingContactsWithEmail.results && existingContactsWithEmail.results[0] && existingContactsWithEmail.results[0].id) {
                                    associateDealToContact(createDealsResponse, existingContactsWithEmail.results[0].id)
                                }
                            }
                        });
                    } catch(e) {
                        logger.error('================= Error associating deal to existing contact ===================');
                        logger.error(e)
                    }
                } else {
                    logger.error('================= Error processing batch ===================');
                    logger.error(e);
                }
            }

            let createNotesObj: BatchInputSimplePublicObjectInputForCreate = {
                inputs: []
            };

            // for each record with a note, push it to the createNotesObj.inputs array
            for (let notesBatchIndex=0 ; notesBatchIndex < cleanDataBatch.length ; notesBatchIndex++) {
                if (cleanDataBatch[notesBatchIndex].dealNotes.properties.note && cleanDataBatch[notesBatchIndex].deal.properties.closedate) {
                    let input = {
                            "associations": [
                                {
                                    "types": [{
                                        "associationCategory": "HUBSPOT_DEFINED" as AssociationSpecAssociationCategoryEnum,
                                        "associationTypeId": 214 // Note-to-deal
                                    }],
                                    "to": {
                                        "id": getCorrespondingDealId(cleanDataBatch[notesBatchIndex].deal.properties.airtable_record_id, createDealsResponse)
                                    }
                                }
                            ],
                            "properties":{
                                "hs_note_body": cleanDataBatch[notesBatchIndex].dealNotes.properties.note,
                                "hs_timestamp": cleanDataBatch[notesBatchIndex].deal.properties.closedate,
                                "hubspot_owner_id": "699030157"
                            }
                        }

                    // @ts-ignore
                    createNotesObj.inputs.push(input);
                }    
            }

            if (createNotesObj.inputs.length > 0) {
                await hubspotClient.crm.objects.notes.batchApi.create(createNotesObj);
            }

            // try {
            //     downloadAirtableFiles(cleanDataBatch);
            // } catch(e) {
            //     logger.error('ERROR when calling downloadAirtableFiles(). See next error for details');
            //     logger.error(e);
            // }

        } catch (e) {
            contactsArrBatch.forEach((el) => {
                allUnmigratedRecords.push(el.properties.airtable_record_id);
            });

            logger.error('================= Error processing batch ===================');
            logger.error(e);
        }
        console.log('item migrated at: ' + new Date());
    }

    console.log('last item migrated');

    // TODO - based on this list, re-do the migration, on only these records that weren't migrated originally
    logger.info(`Unmigrated records: ${allUnmigratedRecords}`);
};

const createFolder = async() => {
    let response = await hubspotClient.files.foldersApi.create({name: 'files-from-airtable'});
    return response;
}

export const hubspotController = {
    createRecord,
    downloadAirtableFiles,
    uploadFiles
}
