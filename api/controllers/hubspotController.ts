import * as hubspot from '@hubspot/api-client'
import { hubspotAccessToken } from '../constants.js';

const hubspotClient = new hubspot.Client({ accessToken: hubspotAccessToken });

const createContact = async (airtableData: any) => {

    console.log(airtableData);

    // const getCorrespondingContactId = (dealResponseIndex: number): string => {
    //     let objIndex = mainObj.findIndex((el) => {
    //         return el.dealName === createDealResponse.results[dealResponseIndex].properties.dealname;
    //     });

    //     let contactIndex = createContactResponse.results.findIndex((el) => {
    //         return el.properties.email === mainObj[objIndex].email;
    //     });

    //     return createContactResponse.results[contactIndex].id;
    // }

    // const mainObj = [
    //     {
    //         email: 'apiemail1@mail.com',
    //         firstName: 'apifirstName1',
    //         lastName: 'apilastName1',
    //         dealName: 'apidealName1'
    //     },
    //     {
    //         email: 'apiemail2@mail.com',
    //         firstName: 'apifirstName2',
    //         lastName: 'apilastName2',
    //         dealName: 'apidealName2'
    //     },
    //     {
    //         email: 'apiemail3@mail.com',
    //         firstName: 'apifirstName3',
    //         lastName: 'apilastName3',
    //         dealName: 'apidealName3'
    //     },
    //     {
    //         email: 'apiemail4@mail.com',
    //         firstName: 'apifirstName4',
    //         lastName: 'apilastName4',
    //         dealName: 'apidealName4'
    //     },
    //     {
    //         email: 'apiemail5@mail.com',
    //         firstName: 'apifirstName5',
    //         lastName: 'apilastName5',
    //         dealName: 'apidealName5'
    //     },
    //     {
    //         email: 'apiemail6@mail.com',
    //         firstName: 'apifirstName6',
    //         lastName: 'apilastName6',
    //         dealName: 'apidealName6'
    //     },
    //     {
    //         email: 'apiemail7@mail.com',
    //         firstName: 'apifirstName7',
    //         lastName: 'apilastName7',
    //         dealName: 'apidealName7'
    //     },
    // ];

    // const contactObj = {"inputs":
    //     [
    //         {
    //             properties: {
    //                 email: mainObj[0].email,
    //                 firstname: mainObj[0].firstName,
    //                 lastname: mainObj[0].lastName,
    //             },
    //             associations: []
    //         },
    //         {
    //             properties: {
    //                 email: mainObj[1].email,
    //                 firstname: mainObj[1].firstName,
    //                 lastname: mainObj[1].lastName,
    //             },
    //             associations: []
    //         },
    //         {
    //             properties: {
    //                 email: mainObj[2].email,
    //                 firstname: mainObj[2].firstName,
    //                 lastname: mainObj[2].lastName,
    //             },
    //             associations: []
    //         },
    //         {
    //             properties: {
    //                 email: mainObj[3].email,
    //                 firstname: mainObj[3].firstName,
    //                 lastname: mainObj[3].lastName,
    //             },
    //             associations: []
    //         },
    //         {
    //             properties: {
    //                 email: mainObj[4].email,
    //                 firstname: mainObj[4].firstName,
    //                 lastname: mainObj[4].lastName,
    //             },
    //             associations: []
    //         },
    //         {
    //             properties: {
    //                 email: mainObj[5].email,
    //                 firstname: mainObj[5].firstName,
    //                 lastname: mainObj[5].lastName,
    //             },
    //             associations: []
    //         },
    //         {
    //             properties: {
    //                 email: mainObj[6].email,
    //                 firstname: mainObj[6].firstName,
    //                 lastname: mainObj[6].lastName,
    //             },
    //             associations: []
    //         },
    //     ]
    // };
    
    // const dealObj = {'inputs': [
    //     {
    //         properties: {
    //             dealname: mainObj[0].dealName,
    //         },
    //         associations: []
    //     },
    //     {
    //         properties: {
    //             dealname: mainObj[1].dealName,
    //         },
    //         associations: []
    //     },
    //     {
    //         properties: {
    //             dealname: mainObj[2].dealName,
    //         },
    //         associations: []
    //     },
    //     {
    //         properties: {
    //             dealname: mainObj[3].dealName,
    //         },
    //         associations: []
    //     },
    //     {
    //         properties: {
    //             dealname: mainObj[4].dealName,
    //         },
    //         associations: []
    //     },
    //     {
    //         properties: {
    //             dealname: mainObj[5].dealName,
    //         },
    //         associations: []
    //     },
    //     {
    //         properties: {
    //             dealname: mainObj[6].dealName,
    //         },
    //         associations: []
    //     }
    // ]};

    // const createDealResponse = await hubspotClient.crm.deals.batchApi.create(dealObj)
    // const createContactResponse = await hubspotClient.crm.contacts.batchApi.create(contactObj);

    

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
    createContact
}
