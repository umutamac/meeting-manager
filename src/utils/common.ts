import { FieldSet, Records } from "airtable";

export module COMMON {
    export function deepCopy(original: object | undefined) {
        return JSON.parse(JSON.stringify(original));
    }

    export module Dates {
        export function getISOStringFromTimestamp(timestamp: number): string {
            const date = new Date(timestamp);
            return date.toISOString();
        }
        export function getDaysBetweenTimestamps(ts1: number, ts2: number): number {
            const diffInMs = Math.abs(ts1 - ts2);
            const msInDay = 24 * 60 * 60 * 1000;
            const diffInDays = Math.floor(diffInMs / msInDay);
            return diffInDays;
        }

        export function getMS(amount: number, unit: "hour" | "day" | "week" | "month" |"year") {
            const hourInMS = 60 * 60 * 1000;
            switch (unit) {
                case "hour": return hourInMS * amount;
                case "day": return hourInMS * 24 * amount;
                case "week": return hourInMS * 24 * 7 * amount;
                case "month": return hourInMS * 24 * 30 * amount;
                case "year": return hourInMS * 24 * 365 * amount;
            }
        }

        export function dateStringToTS(str: string) {
            const date = new Date(str);
            return date.getTime();
        }

        export function formatDateTime(str: string) {
            const date = new Date(str);
            
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
          
            return `${day}/${month}/${year} ${hours}:${minutes}`;
          }
        export function isoDateToLocal(str: string) {
            return new Date(str).toLocaleDateString();
        }
    }

}