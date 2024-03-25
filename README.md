# airtableMigration

This code is used to migrate our airtable data to hubspot.

It looks at all fields present in the 'sales updated leads view: ALL' table, validates the data in each field, and transfers it only
if it meets a set of validation criteria. Otherwise, the data is not transferred.

This data is used to create the following objects in HubSpot
- Deals
- Contacts
- Notes on deals

Any files present in airtable are also downloaded locally. These will be manually uploaded, to fasttrack the process.
File names are kept the same as in airtable.
All files from a given airtable record are stored within a folder, named as the airtable record ID. The airtable record ID
is also included as a field in the imported deals, which will allow these files to later be associated with the correct deal,
or at least looked up.