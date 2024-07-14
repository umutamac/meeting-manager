import { FieldSet, Records } from "airtable";

export module COMMON {
    export function deepCopy(original: object | undefined) {
        return JSON.parse(JSON.stringify(original));
    }

    export function getDaysBetweenTimestamps(ts1: number, ts2: number): number {
        // Convert timestamps to Date objects
        const date1 = new Date(ts1);
        const date2 = new Date(ts2);

        // Get the difference in milliseconds
        const diffInMs = Math.abs(date2.getTime() - date1.getTime());

        // Convert milliseconds to days
        const msInDay = 24 * 60 * 60 * 1000;
        const diffInDays = Math.floor(diffInMs / msInDay);

        return diffInDays;
    }

    export function getMS(amount: number, unit: "hour" | "day" | "week" |"month") {
        const hourInMS = 60 * 60 * 1000;
        switch (unit) {
            case "hour": return hourInMS * amount;
            case "day": return hourInMS * 24 * amount;
            case "week": return hourInMS * 24 * 7 * amount;
            case "month": return hourInMS * 30 * 24 * 7 * amount
        }
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