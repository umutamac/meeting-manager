import { Appointment } from "../types"

export module APPOINTMENT {
    export function build(): Appointment.Model {
        const oneWeekFromNowAt9AM = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).setHours(9, 0, 0, 0);
        return {
            status: "Upcoming",
            contact: bContact(),
            address: "",
            date: oneWeekFromNowAt9AM,
            agents: [],
        }
    }
    export function filter(app: Appointment.Model, search: string, dates: { from: number, to: number }) {
        const lowerCaseSearchString = search.toLowerCase();
        let searchMatch = false
        let dateMatch = false;
        //let agentMatch = false;

        const contactInfoJoined = Object.values(app.contact).join(" ");
        if (contactInfoJoined.toLowerCase().includes(lowerCaseSearchString)) searchMatch = true;
        

        if (dates.from < app.date || dates.to > app.date) dateMatch = true;

        return searchMatch || dateMatch;
    }
    export function bContact(): Appointment.Contact {
        return {
            name: "",
            email: "",
            phone: ""
        }
    }
}