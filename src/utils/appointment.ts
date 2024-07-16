import { Appointment } from "@/types";
import { COMMON } from "./common";
import { FieldSet, Record } from "airtable";

export module APPOINTMENT {
    export function getStatus(appointment: Appointment.Model): Appointment.Status {
        if (appointment.isCancelled) return { kind: "Cancelled", color: "red" };
        const now = Date.now();
        const date = COMMON.Dates.dateStringToTS(appointment.date);
        const kind = now > date ? "Completed" : "Upcoming";
        return kind == "Completed" ? { kind, color: "green" } : { kind, color: "orange", remainingDays: COMMON.Dates.getDaysBetweenTimestamps(now, date) };
    }

    export function recordsToModel(record: Record<FieldSet>): Appointment.Model {
        const fields = record.fields;
        const appt = {
            record_id: record.id,
            id: fields.appointment_id as string,
            address: fields.appointment_address as string || "",
            date: fields.appointment_date as string,
            isCancelled: fields.is_cancelled as boolean,
            contact: fields.contact_id as string[] || [],
            agent: fields.agent_id as string[] || [],
        }
        return appt;
    }
}