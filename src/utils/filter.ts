export module FILTER {
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

    export function truncateString(str: string, limit: number, useEllipsis = true) {
        if (str.length <= limit) return str;
        return str.substring(0, limit) + (useEllipsis ? '...' : '');
    }
}