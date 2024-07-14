export module Contact {
    export type Model = {
        record_id: string
        name: string,
        surname: string
        email: string
        phone: number
        appointments: string[]
    }
}