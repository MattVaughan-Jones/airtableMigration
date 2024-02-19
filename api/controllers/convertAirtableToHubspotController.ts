const convertAirtableToHubspot = (airtableData: any) => {
    let convertedData: any[] = [];

    airtableData.forEach((el: any) => {
        let convertedRecord = {
            // TODO - check that all required fields are filled
            ...(typeof el['Lead Reference'] === 'string') && {leadReference: el['Lead Reference']},
            ...(+el['Requested Quotes']) && {requestedQuotes: +el['Requested Quotes']},
            ...(el['Region'] === 'Winki Solar Geelong') && {region: 'Geelong'},
            ...(el['Region'] === 'Melbourne') && {region: 'Melbourne'},
            ...(el['Date Submitted']) && {dateSubmitted: el['Date Submitted']},
            ...(convertTimeframe(el['Timeframe'])) && {timeframe: convertTimeframe(el['Timeframe'])},
        };

        convertedData.push(convertedRecord);
    })

    console.log(convertedData);
}

const convertTimeframe = (airtableTimeframe: string): string | void => {
    if (typeof airtableTimeframe !== 'string') {
        return;
    } else if (airtableTimeframe == 'Immediately') {
        return 'Immediately'
    } else if (airtableTimeframe == 'In the next 4 weeks') {
        return 'In the next month'
    } else if (airtableTimeframe == 'In the next 3 months') {
        return 'In the next 3 months'
    }
}

export {
    convertAirtableToHubspot,
}