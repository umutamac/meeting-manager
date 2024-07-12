import { Agent } from "./_agent"

export module Appointment {
    export type Model = {
        firstName: string,
        surName: string,
        email: string,
        phone: string,
        address: string,
        date: number,
        agents: Agent.Model[]
    }
}