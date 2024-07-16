export module VALIDATOR {
    const exists = function (val: any): boolean {
        return val !== undefined && val !== null && val !== "";
    };

    export function required(val: any): boolean | string {
        return exists(val) || "Required field";
    }
}