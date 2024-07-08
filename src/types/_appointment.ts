import { Agent } from "./_agent"

export module Appointment {
    export type Contact = {
        name: string,
        email: string,
        phone: string,
    }
    export type Model = {
        status: "Upcoming" | "Completed" | "Cancelled"
        contact: Contact
        address: string
        date: number
        agents: Agent.Model[]

    }
}