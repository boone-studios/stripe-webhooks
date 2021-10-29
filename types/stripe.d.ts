export declare interface CustomerAddress {
    city?: string,
    country?: string,
    line1?: string,
    line2?: string,
    postal_code?: string,
    state?: string,
}

export declare interface CustomerInvoiceSettings {
    custom_fields?: string,
    default_payment_method?: string,
    footer?: string,
}

export declare interface CustomerShipping {
    address?: CustomerAddress,
    name?: string,
    phone?: string,
}

export declare interface InvoiceAutomaticTax {
    enabled?: boolean,
    status?: string,
}

export declare interface InvoicePaymentSettings {
    payment_method_options?: any,
    payment_method_types?: any,
}

export declare interface InvoiceStatusTransitions {
    finalized_at?: Date,
    marked_uncollectible_at?: Date,
    paid_at?: Date,
    voiced_at?: Date,
}

export declare interface CustomerEvent {
    id: string,
    object: string,
    address?: CustomerAddress,
    balance?: number,
    created: Date,
    currency?: string,
    default_source?: string,
    delinquent?: boolean,
    description?: string,
    discount?: any,
    email?: string,
    invoice_prefix?: string,
    invoice_settings?: CustomerInvoiceSettings,
    livemode: boolean,
    metadata?: any,
    name?: string,
    phone?: string,
    preferred_locales?: string[],
    shipping?: CustomerShipping,
    sources?: any,
    subscriptions?: any,
    tax_exempt?: string,
    tax_ids?: any,
    tax_info?: any,
    tax_info_verification?: any,
    tax_info_verification_status?: string,
    tax_info_verification_time?: Date,
}

export declare interface InvoiceEvent {
    id: string,
    object: string,
    account_country?: string,
    account_name?: string,
    account_tax_ids?: string,
    amount_due?: number,
    amount_paid?: number,
    amount_remaining?: number,
    application_fee_amount?: number,
    attempt_count?: number,
    attempted?: boolean,
    auto_advance?: boolean,
    automatic_tax?: InvoiceAutomaticTax,
    billing_reason?: string,
    created: Date,
    currency?: string,
    custom_fields?: any,
    customer_address?: CustomerAddress,
    customer_email?: string,
    customer_name?: string,
    customer_phone?: string,
    customer_shipping?: string,
    customer_tax_exempt?: string,
    customer_tax_ids?: string[],
    default_payment_method?: string,
    default_source?: string,
    default_tax_rates?: string[],
    description?: string,
    discount?: number,
    discounts?: number[],
    due_date?: Date,
    ending_balance?: number,
    footer?: string,
    hosted_invoice_url?: string,
    invoice_pdf?: null,
    last_finalization_error?: string,
    lines?: {
        object?: string,
        data?: object[], //TODO
        has_more?: boolean,
        url?: string,
    },
    livemode: boolean,
    metadata?: object,
    next_payment_attempt?: Date,
    number?: number,
    on_behalf_of?: string,
    paid?: boolean,
    payment_intent?: any //TODO
    payment_settings?: InvoicePaymentSettings,
    period_end?: Date,
    period_start?: Date,
    post_payment_credit_notes_amount?: number,
    pre_payment_credit_notes_amount?: number,
    quote?: string,
    receipt_number?: number,
    starting_balance?: number,
    statement_descriptor?: string,
    status?: string,
    status_transactions?: InvoiceStatusTransitions,
    subscription?: string,
    subtotal?: number,
    tax?: number,
    total?: number,
    total_description_amount?: string[]
    total_tax_amounts?: string[]
    transfer_data?: string,
    webhooks_delivered_at?: Date,
}

export declare interface PayoutEvent {
    id: string,
    object: string,
    amount?: number,
    arrival_date?: Date,
    balance_transaction?: string,
    created: Date,
    currency?: string,
    description?: string,
    destination?: string,
    failure_balance_transaction?: string,
    failure_code?: string,
    failure_message?: string,
    livemode: boolean,
    metadata?: any,
    method?: string,
    original_payout?: string,
    reversed_by?: string,
    source_balance?: string,
    source_type?: string,
    statement_descriptor?: string,
    status?: string,
    type?: string,
}

export declare interface StripePayload {
    id: string,
    object: string,
    api_version?: string,
    data?: { object?: StripeWebhookEvent },
    livemode?: boolean,
    pending_webhooks?: number,
    request?: string,
    type?: string,
}

export declare type StripeWebhookEvent =
    | CustomerEvent
    | InvoiceEvent
    | PayoutEvent
