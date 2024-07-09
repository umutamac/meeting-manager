import Airtable from 'airtable';
import { Appointment, Agent } from "../types"
const apiKey = process.env.VUE_APP_AIR_TABLES_API_TOKEN;
const baseID = process.env.VUE_APP_AIR_TABLES_BASE_ID;

const base = new Airtable({ apiKey }).base(baseID);

export module AppointmentService {
  const tableName = 'tbl9reEf5STrkSA85';// 'Appointments'
  const pageSize = 10;

  export const fetch = async (offset: number) => {
    try {
      const records = await base(tableName).select({ pageSize, offset }).firstPage();
      console.log("AppointmentService fetch", records);
      const appointments: Appointment.Model[] = records.map(r => {
        return {
          record_id: r.id,
          appointment_id: r.fields.appointment_id || "",
          appointment_date: r.fields.appointment_date || 0,
          appointment_address: r.fields.appointment_address ||"",
          contact_id: r.fields.contact_id || "",
          contact_name: r.fields.contact_name || [""],
          contact_surname: r.fields.contact_surname ||[""],
          contact_phone: r.fields.contact_phone || [],
          is_cancelled: !!r.fields.is_cancelled
        }
      });
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
      console.log("AgentService fetch", records);
      const agents = records.map(r => {
        return {
          record_id: r.id,
          ...r.fields
        }
      });
      return agents;
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

export module ContactService {
  const tableName = 'tbl0TuknKqXHysejd'; //'Contacts'

  export const fetchId = async (id: string) => {
    try {
      const records = await base(tableName).find(id);
      console.log(`ContactService fetch ${id}`, records);
      // const agents = records.map(r => {
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
      console.log("AgentService fetch", records);
      const agents = records.map(r => {
        return {
          record_id: r.id,
          ...r.fields
        }
      });
      return agents;
    } catch (error) {
      console.error('Error fetching records from Airtable:', error);
      throw error;
    }
  };
}