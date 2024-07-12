export module AirTables {

    export module Agent {
        export type Model = {
            record_id: string
            agent_name: string
            agent_surname: string
            appointments: string[]
            color: string
            number: number
        }
    }

    export module Appointment {
        export type Model = {
            record_id: string
            appointment_id: string
            appointment_date: string
            appointment_address: string

            contact_id: string
            contact_name: string[]
            contact_surname: string[]
            contact_phone: number[]
            is_cancelled: boolean

        }
        // export type Contact = {
        //     name: string,
        //     email: string,
        //     phone: string,
        // }
    }
}