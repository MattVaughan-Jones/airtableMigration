import * as hubspot from '@hubspot/api-client'
import { hubspotAccessToken } from '../constants.js';

const hubspotClient = new hubspot.Client({ accessToken: hubspotAccessToken });

const contactObj = {
    properties: {
        firstname: 'apiFakeFirstName',
        lastname: 'apiFakeLastName',
    },
    associations: []
}

const createContact = async () => {
    const createContactResponse = await hubspotClient.crm.contacts.basicApi.create(contactObj)
}

export const hubspotController = {
    createContact
};
