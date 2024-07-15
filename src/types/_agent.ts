export module Agent {
    export type Model = {
        record_id: string
        name: string
        surname: string
        number: number
        color: string
        appointments: string[]
    }
    export type Summary = {
        id: string
        name: string
        surname: string
    }
}