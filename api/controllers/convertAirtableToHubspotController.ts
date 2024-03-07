import { ConvertedRecord } from "./types";

const emailRegex = /^.+@.+\.[\w-]{2,4}$/;
const datetimeRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z$/;
const dateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}/;

const convertAirtableToHubspot = (airtableData: any) => {
    let convertedData: ConvertedRecord[] = [];

    airtableData.forEach((el: any) => {
        const convertedRecord: ConvertedRecord = {
            airtableRecordId: el.airtableRecordId,
            deal: {
                properties: {
                    imported_from_airtable_via_api: 'true', // to flag which records were imported via this code (makes cleanup easier)
                },
                associations: []
            },
            contact: {
                properties: {
                    imported_from_airtable_via_api: 'true',
                },
                associations: []
            },
            dealNotes: {
                properties: {},
            },
        };
        
        if (typeof el['Lead Reference'] == 'string') convertedRecord.deal.properties.deal_reference_number = el['Lead Reference'];
        if (+el['Requested Quotes'] > 0) convertedRecord.deal.properties.requested_quotes = el['Requested Quotes'].toString();
        if (convertRegion(el['Region'])) convertedRecord.deal.properties.region = convertRegion(el['Region']);
        if (convertISODatetime(el['Date Submitted'])) convertedRecord.deal.properties.date_submitted = convertISODatetime(el['Date Submitted']);
        if (convertTimeframe(el['Timeframe'])) convertedRecord.deal.properties.timeframe = convertTimeframe(el['Timeframe']);
        if (typeof convertHomeVisit(el['Home Visit']) == 'boolean') convertedRecord.deal.properties.site_visit_required = convertHomeVisit(el['Home Visit']);
        if (convertSystemPriceType(el['System Price Type'])) convertedRecord.deal.properties.system_price_type = convertSystemPriceType(el['System Price Type']);
        if (typeof el['First Name'] == 'string') convertedRecord.contact.properties.firstname = el['First Name'];
        if (typeof el['Last name'] == 'string') convertedRecord.contact.properties.lastname = el['Last name'];
        if (emailRegex.test(el['Email'])) convertedRecord.contact.properties.email = el['Email'];
        if (convertContactNumber(el['Contact Number'])) convertedRecord.contact.properties.phone = convertContactNumber(el['Contact Number']);
        if (convertAddressFields(el['Address'], el['Suburb'], el['Postcode 1'], el['State'])) convertedRecord.deal.properties.site_address = convertAddressFields(el['Address'], el['Suburb'], el['Postcode 1'], el['State']);
        if (convertRoofType(el['Roof Type'])) convertedRecord.deal.properties.roof_type = convertRoofType(el['Roof Type']);
        if (convertRoofSlope(el['Roof Slope'])) convertedRecord.deal.properties.roof_pitch = convertRoofSlope(el['Roof Slope']);
        if (convertStories(el['Storeys'])) convertedRecord.deal.properties.storeys = convertStories(el['Storeys']);
        if (convertSystemSize(el['System Size'], el['System Size 2'], el['System Size 3'])) convertedRecord.deal.properties.system_size_requested = convertSystemSize(el['System Size'], el['System Size 2'], el['System Size 3']);
        if (convertFeatures(el['Features 2'])) convertedRecord.deal.properties.customer_notes = convertFeatures(el['Features 2']);
        if (el['Proposal']) {
            if (convertedRecord.dealNotes.properties.attachments) {
                convertedRecord.dealNotes.properties.attachments = [...convertedRecord.dealNotes.properties.attachments, ...el['Proposal']];
            } else {
                convertedRecord.dealNotes.properties.attachments = el['Proposal'];
            }
        }
        if (convertStatus(el['Status'], el['Status 1'], el['Status (Solar Choice)'])) convertedRecord.deal.properties.dealstage = convertStatus(el['Status'], el['Status 1'], el['Status (Solar Choice)']);
        if (convertQuotingNotes(el['Quoting Notes'])) {
            if (convertedRecord.dealNotes.properties.note) {
                convertedRecord.dealNotes.properties.note += convertQuotingNotes(el['Quoting Notes']);
            } else {
                convertedRecord.dealNotes.properties.note = convertQuotingNotes(el['Quoting Notes']);
            }
        }
        if (el['Proposal 2']) {
            if (convertedRecord.dealNotes.properties.attachments) {
                convertedRecord.dealNotes.properties.attachments = [...convertedRecord.dealNotes.properties.attachments, ...el['Proposal 2']];
            } else {
                convertedRecord.dealNotes.properties.attachments = el['Proposal 2'];
            }
        }
        if (el['Fronius Warranty Certificates 2']) {
            if (convertedRecord.dealNotes.properties.attachments) {
                convertedRecord.dealNotes.properties.attachments = [...convertedRecord.dealNotes.properties.attachments, ...el['Fronius Warranty Certificates 2']];
            } else {
                convertedRecord.dealNotes.properties.attachments = el['Fronius Warranty Certificates 2'];
            }
        }
        if (el['Fronius Warrant Certificate 2']) {
            if (convertedRecord.dealNotes.properties.attachments) {
                convertedRecord.dealNotes.properties.attachments = [...convertedRecord.dealNotes.properties.attachments, ...el['Fronius Warrant Certificate 2']];
            } else {
                convertedRecord.dealNotes.properties.attachments = el['Fronius Warrant Certificate 2'];
            }
        }
        if (el['Fronius Warranty Certificates']) {
            if (convertedRecord.dealNotes.properties.attachments) {
                convertedRecord.dealNotes.properties.attachments = [...convertedRecord.dealNotes.properties.attachments, ...el['Fronius Warranty Certificates']];
            } else {
                convertedRecord.dealNotes.properties.attachments = el['Fronius Warranty Certificates'];
            }
        }
        if (el['Fronius Warranty Certificate']) {
            if (convertedRecord.dealNotes.properties.attachments) {
                convertedRecord.dealNotes.properties.attachments = [...convertedRecord.dealNotes.properties.attachments, ...el['Fronius Warranty Certificate']];
            } else {
                convertedRecord.dealNotes.properties.attachments = el['Fronius Warranty Certificate'];
            }
        }
        if (el['Fronius Warrant Certificate']) {
            if (convertedRecord.dealNotes.properties.attachments) {
                convertedRecord.dealNotes.properties.attachments = [...convertedRecord.dealNotes.properties.attachments, ...el['Fronius Warrant Certificate']];
            } else {
                convertedRecord.dealNotes.properties.attachments = el['Fronius Warrant Certificate'];
            }
        }
        if (convertCommission(el['Commission on Inverter Size (kW)'])) convertedRecord.deal.properties.commission_amount = convertCommission(el['Commission on Inverter Size (kW)']);
        if (convertDateToDatetime(el['Commission Paid '])) convertedRecord.deal.properties.commission_paid_date = convertDateToDatetime(el['Commission Paid ']);
        if (el['CES, EWR and Post Installation Form']) {
            if (convertedRecord.dealNotes.properties.attachments) {
                convertedRecord.dealNotes.properties.attachments = [...convertedRecord.dealNotes.properties.attachments, ...el['CES, EWR and Post Installation Form']];
            } else {
                convertedRecord.dealNotes.properties.attachments = el['CES, EWR and Post Installation Form'];
            }
        }
        if (el['CES, EWR and Post Installation Form 2']) {
            if (convertedRecord.dealNotes.properties.attachments) {
                convertedRecord.dealNotes.properties.attachments = [...convertedRecord.dealNotes.properties.attachments, ...el['CES, EWR and Post Installation Form 2']];
            } else {
                convertedRecord.dealNotes.properties.attachments = el['CES, EWR and Post Installation Form 2'];
            }
        }
        if (el['Photos and documents 2']) {
            if (convertedRecord.dealNotes.properties.attachments) {
                convertedRecord.dealNotes.properties.attachments = [...convertedRecord.dealNotes.properties.attachments, ...el['Photos and documents 2']];
            } else {
                convertedRecord.dealNotes.properties.attachments = el['Photos and documents 2'];
            }
        }
        if (el['Approved SPA  2']) {
            if (convertedRecord.dealNotes.properties.attachments) {
                convertedRecord.dealNotes.properties.attachments = [...convertedRecord.dealNotes.properties.attachments, ...el['Approved SPA  2']];
            } else {
                convertedRecord.dealNotes.properties.attachments = el['Approved SPA  2'];
            }
        }
        if (el['Receipts 2']) {
            if (convertedRecord.dealNotes.properties.attachments) {
                convertedRecord.dealNotes.properties.attachments = [...convertedRecord.dealNotes.properties.attachments, ...el['Receipts 2']];
            } else {
                convertedRecord.dealNotes.properties.attachments = el['Receipts 2'];
            }
        }
        if (el['Equipment Ordered 2']) {
            if (convertedRecord.dealNotes.properties.attachments) {
                convertedRecord.dealNotes.properties.attachments = [...convertedRecord.dealNotes.properties.attachments, ...el['Equipment Ordered 2']];
            } else {
                convertedRecord.dealNotes.properties.attachments = el['Equipment Ordered 2'];
            }
        }
        if (el['Equipment Ordered']) {
            if (convertedRecord.dealNotes.properties.attachments) {
                convertedRecord.dealNotes.properties.attachments = [...convertedRecord.dealNotes.properties.attachments, ...el['Equipment Ordered']];
            } else {
                convertedRecord.dealNotes.properties.attachments = el['Equipment Ordered'];
            }
        }
        if (el['Attachments 2']) {
            if (convertedRecord.dealNotes.properties.attachments) {
                convertedRecord.dealNotes.properties.attachments = [...convertedRecord.dealNotes.properties.attachments, ...el['Attachments 2']];
            } else {
                convertedRecord.dealNotes.properties.attachments = el['Attachments 2'];
            }
        }
        if (convertSoldBy(el['Sold by'] || el['Sold by 2'] || el['Salesperson Assigned'] || null)) convertedRecord.deal.properties.sales_person = convertSoldBy(el['Sold by'] || el['Sold by 2'] || el['Salesperson Assigned'] || null);
        if (convertSource(el['Source'] || el['Source (Energy Matters)'] || el['Source 2'] || null)) convertedRecord.deal.properties.lead_source = convertSource(el['Source'] || el['Source (Energy Matters)'] || el['Source 2'] || null);
        if (convertDateToDatetime(el['Date Sold'] || el['Date Sold 2'] || null)) convertedRecord.deal.properties.sold_date = convertDateToDatetime(el['Date Sold'] || el['Date Sold 2'] || null);
        if (convertDateToDatetime(el['All Leads Date Added'] || el['Added Date (for organic leads)'] || el['Added Date 2'] || el['Date Added'] || null)) convertedRecord.deal.properties.createdate = convertDateToDatetime(el['All Leads Date Added'] || el['Added Date (for organic leads)'] || el['Added Date 2'] || el['Date Added'] || null);
        if (el['Quote']) {
            if (convertedRecord.dealNotes.properties.attachments) {
                convertedRecord.dealNotes.properties.attachments = [...convertedRecord.dealNotes.properties.attachments, ...el['Quote']];
            } else {
                convertedRecord.dealNotes.properties.attachments = el['Quote'];
            }
        }
        if (convertSiteInspectionCompleted(el['Site Inspection Completed'])) convertedRecord.deal.properties.inspection_date = convertSiteInspectionCompleted(el['Site Inspection Completed']);
        if (convertPriorityResponse(el['Priority Response'])) convertedRecord.deal.properties.hs_priority = convertPriorityResponse(el['Priority Response']);
        if (el['Photos and documents']) {
            if (convertedRecord.dealNotes.properties.attachments) {
                convertedRecord.dealNotes.properties.attachments = [...convertedRecord.dealNotes.properties.attachments, ...el['Photos and documents']];
            } else {
                convertedRecord.dealNotes.properties.attachments = el['Photos and documents'];
            }
        }
        if (el['Approved SPA ']) {
            if (convertedRecord.dealNotes.properties.attachments) {
                convertedRecord.dealNotes.properties.attachments = [...convertedRecord.dealNotes.properties.attachments, ...el['Approved SPA ']];
            } else {
                convertedRecord.dealNotes.properties.attachments = el['Approved SPA '];
            }
        }
        if (el['Receipts']) {
            if (convertedRecord.dealNotes.properties.attachments) {
                convertedRecord.dealNotes.properties.attachments = [...convertedRecord.dealNotes.properties.attachments, ...el['Receipts']];
            } else {
                convertedRecord.dealNotes.properties.attachments = el['Receipts'];
            }
        }
        if (el['Attachments']) {
            if (convertedRecord.dealNotes.properties.attachments) {
                convertedRecord.dealNotes.properties.attachments = [...convertedRecord.dealNotes.properties.attachments, ...el['Attachments']];
            } else {
                convertedRecord.dealNotes.properties.attachments = el['Attachments'];
            }
        }
        if (convertRevenue(el['Revenue Ex GST'])) convertedRecord.deal.properties.amount = convertRevenue(el['Revenue Ex GST']);
        if (convertCheckbox(el['CES uploaded'])) convertedRecord.deal.properties.uploaded_ces_to_formbay = convertCheckbox(el['CES uploaded']);
        if (convertCheckbox(el['Site Installation Complete'])) convertedRecord.deal.properties.is_installed = convertCheckbox(el['Site Installation Complete']);
        if (convertReferralPromoSent(el['Referral Promo Email Sent'])) {
            if (convertedRecord.dealNotes.properties.note) {
                convertedRecord.dealNotes.properties.note += convertReferralPromoSent(el['Referral Promo Email Sent']);
            } else {
                convertedRecord.dealNotes.properties.note = convertReferralPromoSent(el['Referral Promo Email Sent']);
            }
        }
        if (createDealName(convertedRecord)) convertedRecord.deal.properties.dealname = createDealName(convertedRecord);
        if (setPipeline(convertedRecord.deal.properties.dealstage)) convertedRecord.deal.properties.pipeline = setPipeline(convertedRecord.deal.properties.dealstage);

        convertedData.push(convertedRecord);
    })

    return convertedData;
}

const convertRegion = (airtableRegion: string): string | undefined => {
    if (airtableRegion == 'Winki Solar Geelong' || airtableRegion == 'Geelong') {
        return 'Geelong';
    } else if (airtableRegion == 'Melbourne') {
        return 'Melbourne';
    }

    return undefined;
}

const convertISODatetime = (airtableDateSubmitted: string): string | undefined => {
    if (datetimeRegex.test(airtableDateSubmitted)) {
        return airtableDateSubmitted.slice(0, -14);
    }
    return undefined;
}

const convertTimeframe = (airtableTimeframe: string): string | undefined => {
    if (airtableTimeframe == 'Immediately') {
        return 'Immediately';
    } else if (airtableTimeframe == 'In the next 4 weeks') {
        return 'Next month';
    } else if (airtableTimeframe == 'In the next 3 months') {
        return 'Next 3 months';
    }
    return undefined;
}

const convertHomeVisit = (airtableHomeVisit: string): string | undefined => {
    if (airtableHomeVisit == 'Yes' || airtableHomeVisit == 'yes') {
        return 'true';
    } else {
        return 'false';
    }
}

const convertSystemPriceType = (airtableSystemPriceType: string): string | undefined => {
    if (airtableSystemPriceType == 'A good mix of quality and price') {
        return 'A good mix of quality and price';
    } else if (airtableSystemPriceType == 'A good budget system') {
        return 'A good budget system';
    } else if (airtableSystemPriceType == 'Top quality (most expensive)') {
        return 'Top quality (most expensive)';
    }
    return undefined;
}

const convertContactNumber = (airtableContactNumber: string): string | undefined => {
    if (!airtableContactNumber) {
        return undefined;
    }

    airtableContactNumber = airtableContactNumber.replace(/\s+/g, '').replace(/\+61/, '0'); //remove spaces and '+61' code
    if (/^\d+$/.test(airtableContactNumber)) {
        return airtableContactNumber;
    } else {
        return undefined;
    }
}

const convertAddressFields = (airtableAddress: string, airtableSuburb: string, airtablePostcode: string, airtableState: string): string | undefined => {
    let convertedAddress = '';
    if (airtableAddress) convertedAddress = convertedAddress + airtableAddress;
    if (airtableSuburb) convertedAddress = convertedAddress + ', ' + airtableSuburb;
    if (airtableState) convertedAddress = convertedAddress + ', ' + airtableState;
    if (airtablePostcode) convertedAddress = convertedAddress + ', ' + airtablePostcode;

    
    if (airtableAddress && airtableAddress.length > 0) return convertedAddress;
    else return undefined;
}

const convertRoofType = (airtableRoofType: string): string | undefined => {
    if (airtableRoofType == 'Tile') {
        return 'Tile'
    } else if(airtableRoofType == 'Terracotta') {
        return 'Terracotta';
    } else if (airtableRoofType == 'Tin / Colourbond') {
        return 'Colourbond';
    } else if (airtableRoofType == 'Kliplock' || airtableRoofType == 'kliplock') {
        return 'Kliplok';
    }
    return undefined
}

const convertRoofSlope = (airtableRoofSlope: string | number): string | undefined => {
    if (typeof airtableRoofSlope == 'string') {
        airtableRoofSlope = Number(airtableRoofSlope.replace(/[^\d.-]/g,'')); // removes all non integers, '.' and '-'
    }

    if (airtableRoofSlope <= 20 && airtableRoofSlope > 0) {
        return 'Low (0°-20°)';
    } else if(airtableRoofSlope > 20 && airtableRoofSlope < 25) {
        return 'Medium (20°-20°)'; //this was originally a typo, and is now the internal hubspot value
    } else if (airtableRoofSlope >= 25 && airtableRoofSlope < 100) {
        return 'High (25°+)'
    }
    return undefined;
}

const convertStories = (airtableStories: string | number): string | undefined => {
    if (typeof airtableStories == 'number' || +airtableStories > 0) {
        airtableStories = +airtableStories;
        if (airtableStories == 1 || airtableStories == 2 || airtableStories == 3) {
            return airtableStories.toString();
        } else if ( airtableStories > 3 && airtableStories < 9) {
            return '4+'
        }
    }
    return undefined;
}

const convertSystemSize = (airtableSystemSize: string, airtableSystemSize2: string, airtableSystemSize3: string): string | undefined => {
    let inputSystemSize = airtableSystemSize2 || airtableSystemSize || airtableSystemSize3 || null;
    
    if (inputSystemSize) {
        return inputSystemSize.replace(/(\r\n|\n|\r|\|)/gm, ''); // removes all new lines
    }
    return undefined
}

const convertFeatures = (airtableFeatures2: string): string | undefined => {
    if (airtableFeatures2) {
        return airtableFeatures2.toString().replace(',', ', ');
    }
    return undefined;
}

const convertStatus = (airtableStatus: string, airtableStatus1: string, airtableStatusSC: string): string | undefined => {
    let inputStatus = airtableStatus1 || airtableStatus || airtableStatusSC || null;
    
    switch (inputStatus){
        case 'HS Sales - Lead':
            return '148145969';
        case 'HS Sales - Appointment scheduled':
            return '147850248';
        case 'HS Sales - Appointment completed':
            return '153833746';
        case 'HS Sales - Proposal Sent':
            return '148145970';
        case 'HS Sales - Sold':
        case 'Sold':
        case 'sold':
            return '152485748';
        case 'HS Sales - Closed lost':
            return '147850254';
        case 'HS Ops - Awaiting Solar VIC approval':
            return '147875762';
        case 'HS Ops - Ready':
            return '152420622';
        case 'HS Ops - Install in progress':
            return '147875766';
        case 'HS Ops - Installed':
            return '147875767';
        case 'HS Ops - Connected + rebates claimed':
            return '152485748';
        case 'HS Ops - Install aborted':
            return '147875768';
    }
    
    return '147850254';
}

// TODO - make sure the note created in Hubspot also has new lines, not just a literal \n.
const convertQuotingNotes = (airtableQuotingNotes: string): string | undefined => {
    if (airtableQuotingNotes) {
        return airtableQuotingNotes + '.\n';
    }
    return undefined;
}

const convertCommission = (airtableCommOnInverterSize: string): string | undefined => {
    if (airtableCommOnInverterSize) {
        const amount = airtableCommOnInverterSize.replace(/[^\d.-]/g, '');
        if (+amount > 0) return amount;
    } else {
        return undefined;
    }
}

const convertDateToDatetime = (airtableCommPaidDate: string): string | undefined => {
    const adjustedDate = airtableCommPaidDate;
    if (dateRegex.test(adjustedDate)) {
        return adjustedDate;
    }
    return undefined;
}

const convertSoldBy = (airtableSoldBy: string): string | undefined => {
    // const inputSoldBy = airtableSoldBy2 || airtableSoldBy || null;
    if (airtableSoldBy == 'Andrew') return 'Andrew Upward';
    else if (airtableSoldBy == 'Dex') return 'Dexter Magpantay';
    else if (airtableSoldBy == 'ken' || airtableSoldBy == 'Ken') return 'Ken Pedlow';
    else if (airtableSoldBy == 'Steve') return 'Steve Cox';
    else if (airtableSoldBy == 'Heath') return 'Heath Nash';
    else if (airtableSoldBy == 'Dennis') return 'Dennis';
    else return undefined;
}

const convertSource = (airtableSource: string): string | undefined => {
    if (airtableSource == 'SolarQuotes') return 'Solar QSolar Quotesuotes'; // was originally a typo and now we're stuck with it...
    else if (airtableSource == 'Website') return 'Website';
    else if (airtableSource == 'Referral') return 'Word of Mouth';
    else if (airtableSource == 'Steve') return 'Personal connection to Winki';
    else if (airtableSource == 'Scott Cassidy') return 'Personal connection to Winki';
    else if (airtableSource == 'REDBACK') return 'Word of Mouth';
    else if (airtableSource == 'Brighte Finance') return 'Word of Mouth';
    else if (airtableSource == 'SolarQuotes') return 'Word of Mouth';
    else if (airtableSource == 'Or') return 'Unknown';
    else if (airtableSource == 'Organic') return 'Unknown';
    else if (airtableSource == 'Dex') return 'Personal connection to Winki';
    else if (airtableSource == 'Phone call to Steve') return 'Unknown';
    else if (airtableSource == 'Grant') return 'Personal connection to Winki';
    else if (airtableSource == 'Heath Nash') return 'Personal connection to Winki';
    else if (airtableSource == 'Michael Vallence') return 'Personal connection to Winki';
    else if (airtableSource == 'Energy Matters') return 'Word of Mouth';
    else if (airtableSource == '3Quotes') return 'Other';
    else if (airtableSource == 'Solar Choice') return 'Solar Choice';
    else if (airtableSource == 'JetCharge Customer') return 'Word of Mouth';
    else if (airtableSource == 'Rob Powerwell') return 'Other';
    else if (airtableSource == 'Ken') return 'Personal connection to Winki';
    else return undefined;
}

const convertSiteInspectionCompleted = (airtableSiteInspectionCompleted: string): string | undefined => {
    const adjustedDate = airtableSiteInspectionCompleted;
    if (dateRegex.test(adjustedDate)) {
        return adjustedDate;
    }
    return undefined;
}

const convertPriorityResponse = (airtablePriorityResponse: string): string | undefined => {
    if (airtablePriorityResponse == 'Low') return 'low';
    else if (airtablePriorityResponse == 'Medium') return 'medium';
    else if (airtablePriorityResponse == 'High' || airtablePriorityResponse == 'Urgent') return 'high';
    else return undefined;
}

const convertRevenue = (airtableRevenue: number): string | undefined => {
    if (airtableRevenue && /^\d*\.?\d*$/.test(airtableRevenue.toString()) && airtableRevenue > 0) {
        return airtableRevenue.toFixed(2).toString();
    }
    return undefined;
}

const convertCheckbox = (airtableCheckboxField: string): string | undefined => {
    if (airtableCheckboxField) {
        return 'true';
    }
    return undefined;
}

const convertReferralPromoSent = (airtablePromoSent: string): string | undefined => {
    if (airtablePromoSent) {
        return `Referral promo email sent on ${airtablePromoSent}.\n`;
    }
    return undefined;
}

const createDealName = (convertedRecord: ConvertedRecord): string => {
    if (convertedRecord.deal.properties.site_address) {
        return convertedRecord.deal.properties.site_address;
    } else if (convertedRecord.contact.properties.firstname && convertedRecord.contact.properties.lastname) {
        return convertedRecord.contact.properties.firstname + ' ' + convertedRecord.contact.properties.lastname;
    } else if (convertedRecord.contact.properties.firstname) {
        return convertedRecord.contact.properties.firstname;
    } else if (convertedRecord.contact.properties.lastname) {
        return convertedRecord.contact.properties.lastname;
    }
    return 'imported from airtable'
}

const setPipeline = (dealstage: string | undefined): string => {
    switch (dealstage){
        case '148145969':
        case '147850248':
        case '153833746':
        case '148145970':
        case '152485748':
        case '147850254':
            return '77794118'; // sales pipeline

        case '147875762':
        case '152420622':
        case '147875766':
        case '147875767':
        case '152485748':
        case '147875768':
            return '77807782'; // ops pipeline
    }

    return 'unable to find deal pipeline';
}

export {
    convertAirtableToHubspot,
}