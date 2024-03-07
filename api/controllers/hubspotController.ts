import * as hubspot from '@hubspot/api-client'
import { hubspotAccessToken } from '../constants.js';
import { ConvertedRecord, ConvertedContactRecord, ConvertedDealRecord } from './types.js';

// TODO - create a file which contains only an object to record the status of converted records
//        Form
// [{
//     airtableID: string,
//     converted: boolean,
//     attemptedHSMigration: boolean,
//     createdContactSuccessfully: boolean,
//     createdDealSuccessfully: boolean,
//     createdAssociationSuccessfully: boolean,
//     errorMessage?: string
// }]

type HubspotContactsArr = {
    inputs: ConvertedContactRecord[]
}

type HubspotDealsArr = {
    inputs: ConvertedDealRecord[]
}

const hubspotClient = new hubspot.Client({ accessToken: hubspotAccessToken });

const createRecord = async (airtableData: ConvertedRecord[]) => {
    // const getCorrespondingContactId = (dealResponseIndex: number): string => {
    //     let objIndex = mainObj.findIndex((el) => {
    //         return el.dealName === createDealResponse.results[dealResponseIndex].properties.dealname;
    //     });

    //     let contactIndex = createContactResponse.results.findIndex((el) => {
    //         return el.properties.email === mainObj[objIndex].email;
    //     });

    //     return createContactResponse.results[contactIndex].id;
    // }

    const mainObj = [
        {
            email: 'apiemail1@mail.com',
            firstName: 'apifirstName1',
            lastName: 'apilastName1',
            dealName: 'apidealName1'
        },
        {
            email: 'apiemail2@mail.com',
            firstName: 'apifirstName2',
            lastName: 'apilastName2',
            dealName: 'apidealName2'
        },
        {
            email: 'apiemail3@mail.com',
            firstName: 'apifirstName3',
            lastName: 'apilastName3',
            dealName: 'apidealName3'
        },
        {
            email: 'apiemail4@mail.com',
            firstName: 'apifirstName4',
            lastName: 'apilastName4',
            dealName: 'apidealName4'
        },
        {
            email: 'apiemail5@mail.com',
            firstName: 'apifirstName5',
            lastName: 'apilastName5',
            dealName: 'apidealName5'
        },
        {
            email: 'apiemail6@mail.com',
            firstName: 'apifirstName6',
            lastName: 'apilastName6',
            dealName: 'apidealName6'
        },
        {
            email: 'apiemail7@mail.com',
            firstName: 'apifirstName7',
            lastName: 'apilastName7',
            dealName: 'apidealName7'
        },
    ];

    const contactsObj: HubspotContactsArr = { "inputs": [] };

    airtableData.forEach((el) => {
        contactsObj.inputs.push(el.contact)
    });

    const dealssObj: HubspotDealsArr = { "inputs": [] };

    airtableData.forEach((el) => {
        dealssObj.inputs.push(el.deal)
    });

    const createDealResponse = await hubspotClient.crm.deals.batchApi.create(dealssObj)
    // const createContactResponse = await hubspotClient.crm.contacts.batchApi.create(contactsObj);
    console.log(createDealResponse);
    

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
