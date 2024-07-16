import { Appointment } from "@/types";
import { COMMON } from "./common";

export module APPOINTMENT {
    export function getStatus(appointment: Appointment.Model): Appointment.Status {
        if (appointment.isCancelled) return { kind: "Cancelled", color: "red" };
        const now = Date.now();
        const date = COMMON.Dates.dateStringToTS(appointment.date);
        const kind = now > date ? "Completed" : "Upcoming";
        return kind == "Completed" ? { kind, color: "green" } : { kind, color: "orange", remainingDays: COMMON.Dates.getDaysBetweenTimestamps(now, date) };
    }
}