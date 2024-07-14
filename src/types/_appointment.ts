export module Appointment {
    export type Model = {
        record_id: string
        id: string
        address: string
        date: string
        contact: {
            id: string
            name: string
            surname: string
            email: string
            phone: number
        }[]
        agent: {
            id: string
            name: string
            surname: string
        }[]
        isCanceled: boolean
    }
}