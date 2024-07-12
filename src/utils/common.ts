import { FieldSet, Records } from "airtable";

export module COMMON {
    export function deepCopy(original: object | undefined) {
        return JSON.parse(JSON.stringify(original));
    }

    export function formatDate(ts: number): string {
        // Create a Date object
        const date = new Date(ts);

        const dateOptions = {
            day: '2-digit' as const,
            month: '2-digit' as const,
            year: 'numeric' as const
        };

        const timeOptions = {
            hour: '2-digit' as const,
            minute: '2-digit' as const,
            hour12: false // Use 24-hour time format
        };

        // Format the date and time
        const formattedDate = new Intl.DateTimeFormat('en-GB', dateOptions).format(date); // en-GB locale for DD/MM/YYYY
        const formattedTime = new Intl.DateTimeFormat('en-GB', timeOptions).format(date); // en-GB locale for 24-hour time

        // Combine date and time
        const formattedDateTime = `${formattedDate} ${formattedTime}`;

        //console.log('Formatted DateTime:', formattedDateTime); // "01/07/2021 00:00"
        return formattedDateTime;
    }

    export function getDaysBetweenTimestamps(ts1: number, ts2: number): number {
        // Convert timestamps to Date objects
        const date1 = new Date(ts1);
        const date2 = new Date(ts2);

        // Get the difference in milliseconds
        const diffInMs = Math.abs(date2.getTime() - date1.getTime());

        // Convert milliseconds to days
        const msInDay = 24 * 60 * 60 * 1000;
        const diffInDays = diffInMs / msInDay;

        return diffInDays;
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