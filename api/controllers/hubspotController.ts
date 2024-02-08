import * as hubspot from '@hubspot/api-client'
import { hubspotAccessToken } from '../constants.js';

const hubspotClient = new hubspot.Client({ accessToken: hubspotAccessToken });

const createContact = async () => {
    const allContacts = await hubspotClient.crm.contacts.getAll();
    console.log(allContacts);
}

export const hubspotController = {
    createContact
};
