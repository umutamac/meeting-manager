export module Appointment {
    export type Model = {
        record_id: string
        id: string
        address: string
        date: string
        contact: string[]
        agent: string[]
        isCancelled: boolean
    }

    export type Status = { kind: "Completed", color: string } | { kind: "Upcoming", color: string, remainingDays: number } | { kind: "Cancelled", color: string }
}