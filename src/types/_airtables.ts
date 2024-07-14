export module AirTables {

    export module Agent {
        export type Model = {
            agent_name: string
            agent_surname: string
            appointments: string[]
            color: string
            number: number
        }
    }

    export module Appointment {
        export type Model = {
            appointment_id: string
            appointment_date: any
            appointment_address: string

            contact_id: string[]
            contact_name: string[]
            contact_surname: string[]
            contact_email: string[]
            contact_phone: number[]

            is_cancelled: boolean
        }
    }

    export module Contact {
        export type Model = {
            contact_id: string
            contact_name: string
            contact_surname: string
            contact_email: string
            contact_phone: number
            appointments: string[]
        }
    }
}