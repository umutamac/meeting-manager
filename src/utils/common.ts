import { FieldSet, Records } from "airtable";

export module COMMON {
    export function deepCopy(original: object) {
        return JSON.parse(JSON.stringify(original));
    }
    // export function recordsToArray(records: Records<FieldSet>[]): FieldSet[] {
    //     return records.map(record => ({
    //         id: record,
    //         fields: {
    //             ...record.fields, // Spread operator to copy fields
    //         },
    //     }));
    // }


}