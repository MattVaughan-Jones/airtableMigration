const emailRegex = /^.+@.+\.[\w-]{2,4}$/;
const dateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z$/;

// TODO - check that all required fields are filled

type ConvertedRecord = {
    solarVICQuoteReference?: string | void,
    requestedQuotes?: string | void,
    region?: string,
    dateSubmitted?: string,
    timeframe?: string,
    siteVisitRequired?: boolean,
    systemPriceType?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: string,
    streetAddress?: string,
    roofType?: string,
    roofSlope?: string,
    stories?: string,
    systemSize?: string,
    customerNotes?: string,
    attachments?: {}[],
    dealStageID?: number,
    salesNotesObject?: string,
    commissionAmount?: string,
    commissionPaidDate?: string,
    salesPerson?: string,
    leadSource?: string,
    soldDate?: string,
    createDate?: string,
}
    
const convertAirtableToHubspot = (airtableData: any) => {
    // let arr1 = [
    //     {
    //       id: 'attg3jsNMkzA1WyfS',
    //       url: 'https://v5.airtableusercontent.com/v3/u/26/26/1708840800000/vbJVFxOFWMKDKcxubnwLHQ/ff-0SAt1tLHXJ-DJwVzxZY8lulm3zcwgHMxcUOYdeUzcZhL_G0Tevqj3Md6-DiPJUg2M9zoZjnq5vNUnzEDYMRvhym1por4rZIWOqn6CCCJRHeklaPk5Y0P1w8d2ND37-NOz342hgB4_YNuI4JCAYlSIvvM2wvBZvblAzp_S9tU/417Q-vPFGmbyXe3EAbA1C0i82qf8VJQUt-V4gnt6c6E',
    //       filename: 'Hubspot invoice-13190662-0.pdf',
    //       size: 67061,
    //       type: 'application/pdf',
    //       thumbnails: { small: [Object], large: [Object] }
    //     }
    // ];
    // let arr2 = [
    //     {
    //       id: 'attJ9TxoyuljJkC1g',
    //       width: 1009,
    //       height: 126,
    //       url: 'https://v5.airtableusercontent.com/v3/u/26/26/1708840800000/X4lz-MkOZsyVVrh-ZhmGpg/4T0lheT21pYCCK2ZZmVESbd5S91xVvka_94JCNWAk3G_6-F8O8uMfnBmFz5nmoePeywFwwZuD8c0DHWr1PYs8T5Igvn7xNJ5-vIn2OoQFkQGS8wE1LW9cfSpzXt0Vm6Mw7G-Gjj6AJcT9nQUB4XIIRdv4yNHKsw_mOhllc18WjuM18AVx4l2GurkPtlgz93z/x0WLyXmTpAwvUsa1zzcDMgmna60wb-MBs5fJY5LdA54',
    //       filename: 'Screen Shot 2021-10-05 at 10.39.15 am (1).png',
    //       size: 116195,
    //       type: 'image/png',
    //       thumbnails: { small: [Object], large: [Object], full: [Object] }
    //     }
    // ]

    // let testconcat = arr1.concat(arr2);

    let convertedData: ConvertedRecord[] = [];

    airtableData.forEach((el: any) => {
        const convertedRecord: ConvertedRecord = {};
        
        // if (typeof el['Lead Reference'] == 'string') convertedRecord.solarVICQuoteReference = el['Lead Reference'];
        // if (+el['Requested Quotes'] > 0) convertedRecord.requestedQuotes = el['Requested Quotes'].toString();
        // if (convertRegion(el['Region'])) convertedRecord.region = convertRegion(el['Region']);
        // if (convertDateSubmitted(el['Date Submitted'])) convertedRecord.dateSubmitted = convertDateSubmitted(el['Date Submitted']);
        // if (convertTimeframe(el['Timeframe'])) convertedRecord.timeframe = convertTimeframe(el['Timeframe']);
        // if (typeof convertHomeVisit(el['Home Visit']) == 'boolean') convertedRecord.siteVisitRequired = convertHomeVisit(el['Home Visit']);
        // if (convertSystemPriceType(el['System Price Type'])) convertedRecord.systemPriceType = convertSystemPriceType(el['System Price Type']);
        // if (typeof el['First Name'] == 'string') convertedRecord.firstName = el['First Name'];
        // if (typeof el['Last name'] == 'string') convertedRecord.lastName = el['Last name'];
        // if (emailRegex.test(el['Email'])) convertedRecord.email = el['Email'];
        // if (convertContactNumber(el['Contact Number'])) convertedRecord.phoneNumber = convertContactNumber(el['Contact Number']);
        // if (convertAddressFields(el['Address'], el['Suburb'], el['Postcode 1'], el['State'])) convertedRecord.streetAddress = convertAddressFields(el['Address'], el['Suburb'], el['Postcode 1'], el['State']);
        // if (convertRoofType(el['Roof Type'])) convertedRecord.roofType = convertRoofType(el['Roof Type']);
        // if (convertRoofSlope(el['Roof Slope'])) convertedRecord.roofSlope = convertRoofSlope(el['Roof Slope']);
        // if (convertStories(el['Storeys'])) convertedRecord.stories = convertStories(el['Storeys']);
        // if (convertSystemSize(el['System Size'], el['System Size 2'], el['System Size 3'])) convertedRecord.systemSize = convertSystemSize(el['System Size'], el['System Size 2'], el['System Size 3']);
        // if (convertFeatures(el['Features 2'])) convertedRecord.customerNotes = convertFeatures(el['Features 2']);
        // if (el['Proposal']) {
        //     if (convertedRecord.attachments) {
        //         convertedRecord.attachments = [...convertedRecord.attachments, ...el['Proposal']];
        //     } else {
        //         convertedRecord.attachments = el['Proposal'];
        //     }
        // }
        // if (convertStatus(el['Status'], el['Status 1'], el['Status (Solar Choice)'])) convertedRecord.dealStageID = convertStatus(el['Status'], el['Status 1'], el['Status (Solar Choice)']);
        // if (convertQuotingNotes(el['Quoting Notes'])) {
        //     if (convertedRecord.salesNotesObject) {
        //         convertedRecord.salesNotesObject += convertQuotingNotes(el['Quoting Notes']);
        //     } else {
        //         convertedRecord.salesNotesObject = convertQuotingNotes(el['Quoting Notes']);
        //     }
        // }
        // if (el['Proposal 2']) {
        //     if (convertedRecord.attachments) {
        //         convertedRecord.attachments = [...convertedRecord.attachments, ...el['Proposal 2']];
        //     } else {
        //         convertedRecord.attachments = el['Proposal 2'];
        //     }
        // }
        // if (el['Fronius Warranty Certificates 2']) {
        //     if (convertedRecord.attachments) {
        //         convertedRecord.attachments = [...convertedRecord.attachments, ...el['Fronius Warranty Certificates 2']];
        //     } else {
        //         convertedRecord.attachments = el['Fronius Warranty Certificates 2'];
        //     }
        // }
        // if (el['Fronius Warrant Certificate 2']) {
        //     if (convertedRecord.attachments) {
        //         convertedRecord.attachments = [...convertedRecord.attachments, ...el['Fronius Warrant Certificate 2']];
        //     } else {
        //         convertedRecord.attachments = el['Fronius Warrant Certificate 2'];
        //     }
        // }
        // if (el['Fronius Warranty Certificates']) {
        //     if (convertedRecord.attachments) {
        //         convertedRecord.attachments = [...convertedRecord.attachments, ...el['Fronius Warranty Certificates']];
        //     } else {
        //         convertedRecord.attachments = el['Fronius Warranty Certificates'];
        //     }
        // }
        // if (el['Fronius Warranty Certificate']) {
        //     if (convertedRecord.attachments) {
        //         convertedRecord.attachments = [...convertedRecord.attachments, ...el['Fronius Warranty Certificate']];
        //     } else {
        //         convertedRecord.attachments = el['Fronius Warranty Certificate'];
        //     }
        // }
        // if (el['Fronius Warrant Certificate']) {
        //     if (convertedRecord.attachments) {
        //         convertedRecord.attachments = [...convertedRecord.attachments, ...el['Fronius Warrant Certificate']];
        //     } else {
        //         convertedRecord.attachments = el['Fronius Warrant Certificate'];
        //     }
        // }
        // if (convertCommission(el['Commission on Inverter Size (kW)'])) convertedRecord.commissionAmount = convertCommission(el['Commission on Inverter Size (kW)']);
        // if (convertCommissionPaidDate(el['Commission Paid '])) convertedRecord.commissionPaidDate = convertCommissionPaidDate(el['Commission Paid ']);
        // if (el['CES, EWR and Post Installation Form']) {
        //     if (convertedRecord.attachments) {
        //         convertedRecord.attachments = [...convertedRecord.attachments, ...el['CES, EWR and Post Installation Form']];
        //     } else {
        //         convertedRecord.attachments = el['CES, EWR and Post Installation Form'];
        //     }
        // }
        // if (el['CES, EWR and Post Installation Form 2']) {
        //     if (convertedRecord.attachments) {
        //         convertedRecord.attachments = [...convertedRecord.attachments, ...el['CES, EWR and Post Installation Form 2']];
        //     } else {
        //         convertedRecord.attachments = el['CES, EWR and Post Installation Form 2'];
        //     }
        // }
        // if (el['Photos and documents 2']) {
        //     if (convertedRecord.attachments) {
        //         convertedRecord.attachments = [...convertedRecord.attachments, ...el['Photos and documents 2']];
        //     } else {
        //         convertedRecord.attachments = el['Photos and documents 2'];
        //     }
        // }
        // if (el['Approved SPA  2']) {
        //     if (convertedRecord.attachments) {
        //         convertedRecord.attachments = [...convertedRecord.attachments, ...el['Approved SPA  2']];
        //     } else {
        //         convertedRecord.attachments = el['Approved SPA  2'];
        //     }
        // }
        // if (el['Receipts 2']) {
        //     if (convertedRecord.attachments) {
        //         convertedRecord.attachments = [...convertedRecord.attachments, ...el['Receipts 2']];
        //     } else {
        //         convertedRecord.attachments = el['Receipts 2'];
        //     }
        // }
        // if (el['Equipment Ordered 2']) {
        //     if (convertedRecord.attachments) {
        //         convertedRecord.attachments = [...convertedRecord.attachments, ...el['Equipment Ordered 2']];
        //     } else {
        //         convertedRecord.attachments = el['Equipment Ordered 2'];
        //     }
        // }
        // if (el['Equipment Ordered']) {
        //     if (convertedRecord.attachments) {
        //         convertedRecord.attachments = [...convertedRecord.attachments, ...el['Equipment Ordered']];
        //     } else {
        //         convertedRecord.attachments = el['Equipment Ordered'];
        //     }
        // }
        // if (el['Attachments 2']) {
        //     if (convertedRecord.attachments) {
        //         convertedRecord.attachments = [...convertedRecord.attachments, ...el['Attachments 2']];
        //     } else {
        //         convertedRecord.attachments = el['Attachments 2'];
        //     }
        // }
        // if (convertSoldBy(el['Sold by'] || el['Sold by 2'] || null)) convertedRecord.salesPerson = convertSoldBy(el['Sold by'] || el['Sold by 2'] || null);
        // if (convertSource(el['Source'] || el['Source (Energy Matters)'] || el['Source 2'] || null)) convertedRecord.leadSource = convertSource(el['Source'] || el['Source (Energy Matters)'] || el['Source 2'] || null);
        // if (convertDatesold(el['Date Sold'] || el['Date Sold 2'] || null)) convertedRecord.soldDate = convertDatesold(el['Date Sold'] || el['Date Sold 2'] || null);
        // if (convertAddedDate(el['Added Date (for organic leads)'] || el['Added Date 2'] || null)) convertedRecord.createDate = convertAddedDate(el['Added Date (for organic leads)'] || el['Added Date 2'] || null);
        // if (el['Quote']) {
        //     if (convertedRecord.attachments) {
        //         convertedRecord.attachments = [...convertedRecord.attachments, ...el['Quote']];
        //     } else {
        //         convertedRecord.attachments = el['Quote'];
        //     }
        // }

        convertedData.push(convertedRecord);
    })

    console.log(convertedData);
}

const convertRegion = (airtableRegion: string): string | undefined => {
    if (airtableRegion == 'Winki Solar Geelong' || airtableRegion == 'Geelong') {
        return 'Geelong';
    } else if (airtableRegion == 'Melbourne') {
        return 'Melbourne';
    }

    return undefined;
}

const convertDateSubmitted = (airtableDateSubmitted: string): string | undefined => {
    if (dateRegex.test(airtableDateSubmitted)) {
        return airtableDateSubmitted;
    }
    return undefined;
}

const convertTimeframe = (airtableTimeframe: string): string | undefined => {
    if (airtableTimeframe == 'Immediately') {
        return 'Immediately';
    } else if (airtableTimeframe == 'In the next 4 weeks') {
        return 'In the next month';
    } else if (airtableTimeframe == 'In the next 3 months') {
        return 'In the next 3 months';
    }
    return undefined;
}

const convertHomeVisit = (airtableHomeVisit: string): boolean | undefined => {
    if (airtableHomeVisit == 'Yes' || airtableHomeVisit == 'yes') {
        return true;
    } else {
        return false;
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

// TODO - Status column is too often out of date and will result in clutter if bad leads
// are placed in active deal stages. Need sales team AND NASHIE to update any leads they \
// want to keep working on, and then put all other deals in 'closed lost'
const convertStatus = (airtableStatus: string, airtableStatus1: string, airtableStatusSC: string): number | undefined => {
    let inputStatus = airtableStatus1 || airtableStatus || airtableStatusSC || null;
    
    switch (inputStatus){
        case 'HS Sales - Lead':
            return 148145969;
        case 'HS Sales - Appointment scheduled':
            return 147850248;
        case 'HS Sales - Appointment completed':
            return 153833746;
        case 'HS Sales - Proposal Sent':
            return 148145970;
        case 'HS Sales - Sold':
        case 'Sold':
        case 'sold':
            return 152485748;
        case 'HS Sales - Closed lost':
            return 147850254;
        case 'HS Ops - Awaiting Solar VIC approval':
            return 147875762;
        case 'HS Ops - Ready':
            return 152420622;
        case 'HS Ops - Install in progress':
            return 147875766;
        case 'HS Ops - Installed':
            return 147875767;
        case 'HS Ops - Connected + rebates claimed':
            return 152485748;
        case 'HS Ops - Install aborted':
            return 147875768;
    }
    
    return 147850254;
}

// TODO - make sure the note created in Hubspot also has new lines, not just a literal \n.
const convertQuotingNotes = (airtableQuotingNotes: string): string | undefined => {
    if (airtableQuotingNotes) {
        return airtableQuotingNotes + '\n';
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

const convertCommissionPaidDate = (airtableCommPaidDate: string): string | undefined => {
    const adjustedDate = airtableCommPaidDate + 'T00:00:00.000Z'
    if (dateRegex.test(adjustedDate)) {
        return adjustedDate;
    }
    return undefined;
}

const convertSoldBy = (airtableSoldBy: string): string | undefined => {
    // const inputSoldBy = airtableSoldBy2 || airtableSoldBy || null;
    if (airtableSoldBy == 'Andrew') return 'Andrew Upward';
    else if (airtableSoldBy == 'Dex') return 'Dexter Magpantay';
    else if (airtableSoldBy == 'ken') return 'Ken Pedlow';
    else if (airtableSoldBy == 'Steve') return 'Steve Cox';
    else if (airtableSoldBy == 'Heath') return 'Heath Nash';
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

const convertDatesold = (airtableDateSold: string): string | undefined => {
    const adjustedDate = airtableDateSold + 'T00:00:00.000Z'
    if (dateRegex.test(adjustedDate)) {
        return adjustedDate;
    }
    return undefined;
}

const convertAddedDate = (airtableAddedDate: string): string | undefined => {
    const adjustedDate = airtableAddedDate + 'T00:00:00.000Z'
    if (dateRegex.test(adjustedDate)) {
        return adjustedDate;
    }
    return undefined;
}

export {
    convertAirtableToHubspot,
}