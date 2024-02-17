import dotenv from 'dotenv';

dotenv.config();

export const airtableAccesstoken = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN as string;
export const airtableSalesBaseID = process.env.AIRTABLE_SALES_BASE_ID as string;
export const airtableSalesUpdatedLeadsViewID = process.env.AIRTABLE_SALES_UPDATED_LEADS_VIEW_ID as string;
export const hubspotAccessToken = process.env.HUBSPOT_ACCESS_TOKEN as string;
