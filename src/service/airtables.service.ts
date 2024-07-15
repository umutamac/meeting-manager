import Airtable from 'airtable';
import { AirTables, Agent, Contact, Appointment } from "../types";
import { CONTACT } from '@/utils';

const apiKey = process.env.VUE_APP_AIR_TABLES_API_TOKEN;
const baseID = process.env.VUE_APP_AIR_TABLES_BASE_ID;

const base = new Airtable({ apiKey }).base(baseID);

export module AppointmentService {
  const tableName = 'tbl9reEf5STrkSA85';// 'Appointments'
  const pageSize = 10;

  export const fetch = async (offset: number) => {
    try {
      const records = await base(tableName).select({ pageSize, offset }).firstPage();
      //const records = await base(tableName).select().all();

      console.log("Appointment records fethced:", records.length);
      const appointments: Appointment.Model[] = records.map(r => {
        const fields = r.fields;

        const contact: {
          id: string
          name: string
          surname: string
          email: string
          phone: number
        }[] = [];
        // CONTACT.createContactsArray(
        //   fields.contact_id as string[],
        //   fields.contact_name as string[],
        //   fields.contact_surname as string[],
        //   fields.contact_email as string[],
        //   fields.contact_phone as string[]
        // ),
        const agent: {
          id: string
          name: string
          surname: string
        }[] = [];
        return {
          record_id: r.id,
          id: fields.appointment_id as string,
          address: fields.appointment_address as string,
          date: fields.appointment_date as string,
          isCanceled: fields.is_cancelled as boolean,
          contact,
          agent
        }
      });
      //const appointments: any[] = [];
      return appointments;
    } catch (error) {
      console.error('Error fetching records from Airtable:', error);
      throw error;
    }
  };
  /*
  export const createRecord = async (fields: any) => {
    try {
      const record = await base(tableName).create(fields);
      return record;
    } catch (error) {
      console.error('Error creating record in Airtable:', error);
      throw error;
    }
  };
  
  export const updateRecord = async (id: string, fields: any) => {
    try {
      const record = await base(tableName).update(id, fields);
      return record;
    } catch (error) {
      console.error('Error updating record in Airtable:', error);
      throw error;
    }
  };
  
  export const deleteRecord = async (id: string) => {
    try {
      await base(tableName).destroy(id);
    } catch (error) {
      console.error('Error deleting record from Airtable:', error);
      throw error;
    }
  };
  */
}

export module AgentService {
  const tableName = 'tblejF2oJbI8ze105'; //'Agents'

  export const fetch = async () => {
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

  export const fetchId = async (id: string) => {
    try {
      const records = await base(tableName).find(id);
      console.log(`ContactService fetch ${id}`, records);
      // const contacts: Contact.Model[] = records.map(r => {
      //   const fields = r.fields;
      //   return {
      //     record_id: r.id,
      //     ...r.fields
      //   }
      // });
      return records;
    } catch (error) {
      console.error('Error fetching records from Airtable:', error);
      throw error;
    }
  };

  export const fetchAll = async () => {
    try {
      const records = await base(tableName).select().all();
      console.log("Contact records fethced:", records.length);
      const contacts: Contact.Model[] = records.map(r => {
        const fields = r.fields;
        return {
          record_id: r.id as string,
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