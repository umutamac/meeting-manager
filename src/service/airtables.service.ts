import Airtable from 'airtable';
import { Agent, Contact, Appointment } from "../types";
import { APPOINTMENT } from '@/utils';

const apiKey = process.env.VUE_APP_AIR_TABLES_API_TOKEN;
const baseID = process.env.VUE_APP_AIR_TABLES_BASE_ID;

const base = new Airtable({ apiKey }).base(baseID);

export module AppointmentService {
  const tableName = 'tbl9reEf5STrkSA85';// 'Appointments'

  // export const fetchBatch = async (pageNumber: number) => {
  //   try {
  //     const pageSize = 10;
  //     const offset = pageSize * (pageNumber - 1);
  //     const records = await base(tableName).select({ pageSize, offset }).firstPage();

  //     console.log("Appointment records fethced:", records.length);
  //     const appointments: Appointment.Model[] = records.map(r => {
  //       const fields = r.fields;

  //       return {
  //         record_id: r.id,
  //         id: fields.appointment_id as string,
  //         address: fields.appointment_address as string,
  //         date: fields.appointment_date as string,
  //         isCancelled: fields.is_cancelled as boolean,
  //         contact: fields.contact_id as string[],
  //         agent: fields.agent_id as string[],
  //       }
  //     });
  //     //const appointments: any[] = [];
  //     return appointments;
  //   } catch (error) {
  //     console.error('Error fetching records from Airtable:', error);
  //     throw error;
  //   }
  // };
  export const fetchAll = async () => {
    try {
      const records = await base(tableName).select().all();
      console.log("Appointment records fethced:", records.length);
      const appointments = records.map(r => APPOINTMENT.recordsToModel(r));
      return appointments.sort((a1, a2) => new Date(a2.date).getTime() - new Date(a1.date).getTime());
    } catch (error) {
      console.error('Error fetching records from Airtable:', error);
      throw error;
    }
  };

  export const create = async (appointment: Appointment.Model) => {
    try {
      const list = [{
        fields: {
          appointment_date: appointment.date,
          appointment_address: appointment.address,
          contact_id: appointment.contact,
          agent_id: appointment.agent
        }
      }];
      const records = await base(tableName).create(list);
      return records.map(r => APPOINTMENT.recordsToModel(r));
    } catch (error) {
      console.error('Error creating record in Airtable:', error);
      throw error;
    }
  };

  export const update = async (id: string, appointment: Appointment.Model) => {
    try {
      const updates = [{
        id,
        fields: {
          appointment_date: appointment.date,
          appointment_address: appointment.address,
          contact_id: appointment.contact,
          agent_id: appointment.agent
        }
      }];
      const records = await base(tableName).update(updates);
      return records.map(r => APPOINTMENT.recordsToModel(r));
    } catch (error) {
      console.error('Error updating record in Airtable:', error);
      throw error;
    }
  };

}

export module AgentService {
  const tableName = 'tblejF2oJbI8ze105'; //'Agents'

  export const fetchAll = async () => {
    try {
      const records = await base(tableName).select().all();
      console.log("Agent records fethced:", records.length);
      const agents: Agent.Model[] = records.map(r => {
        const fields = r.fields;
        return {
          record_id: r.id,
          number: fields.number as number,
          name: fields.agent_name as string,
          surname: fields.agent_surname as string,
          appointments: fields.appointments as string[],
          color: fields.color as string
        }
      });
      return agents;
    } catch (error) {
      console.error('Error fetching records from Airtable:', error);
      throw error;
    }
  };
}

export module ContactService {
  const tableName = 'tbl0TuknKqXHysejd'; //'Contacts'

  // export const fetchId = async (id: string) => {
  //   try {
  //     const records = await base(tableName).find(id);
  //     console.log(`ContactService fetch ${id}`, records);
  //     // const contacts: Contact.Model[] = records.map(r => {
  //     //   const fields = r.fields;
  //     //   return {
  //     //     record_id: r.id,
  //     //     ...r.fields
  //     //   }
  //     // });
  //     return records;
  //   } catch (error) {
  //     console.error('Error fetching records from Airtable:', error);
  //     throw error;
  //   }
  // };

  export const fetchAll = async () => {
    try {
      const records = await base(tableName).select().all();
      console.log("Contact records fethced:", records.length);
      const contacts: Contact.Model[] = records.map(r => {
        const fields = r.fields;
        return {
          record_id: r.id as string,
          id: fields.contact_id as string,
          name: fields.contact_name as string,
          surname: fields.contact_surname as string,
          email: fields.contact_email as string,
          phone: fields.contact_phone as number,
          appointments: fields.appointments as string[]
        }
      });
      return contacts;
    } catch (error) {
      console.error('Error fetching records from Airtable:', error);
      throw error;
    }
  };
}