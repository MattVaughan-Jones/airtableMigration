export type ConvertedDealRecord = {
    properties: {
        airtable_record_id: string,
        dealname?: string,
        deal_reference_number?: string,
        requested_quotes?: string,
        region?: string,
        date_submitted?: string,
        timeframe?: string,
        site_visit_required?: string,
        system_price_type?: string,
        site_address?: string,
        roof_type?: string,
        roof_pitch?: string,
        storeys?: string, // started as a typo in airtable. now we're stuck with it
        system_size_requested?: string,
        customer_notes?: string,
        dealstage?: string,
        pipeline?: string,
        commission_amount?: string,
        commission_paid_date?: string,
        sales_person?: string,
        lead_source?: string,
        sold_date?: string,
        createdate?: string,
        inspection_date?: string,
        hs_priority?: string,
        amount?: string,
        uploaded_ces_to_formbay?: string,
        is_installed?: string,
        closedate?: string
    },
    associations: never[]
};

export type ConvertedContactRecord = {
    properties: {
        airtable_record_id: string,
        firstname?: string,
        lastname?: string,
        email?: string,
        phone?: string,
    },
    associations: never[]
};

export type ConvertedNoteRecord = {
    properties: {
        note?: string,
        attachments?: {
            id: string,
            url: string,
            filename: string,
            size: number,
            type: string
        }[],
    }
};

export type ConvertedRecord = {
    deal: ConvertedDealRecord,
    contact: ConvertedContactRecord,
    dealNotes: ConvertedNoteRecord
};
