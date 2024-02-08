import dotenv from 'dotenv';
import { airtable } from './controllers/airtableController.js';

dotenv.config();

airtable.listRecords();
