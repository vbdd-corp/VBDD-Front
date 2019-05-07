import { Time } from './time'
import {AppointmentType} from './appointment-type';

export interface Plage {
  id?: number,
  start: Time,
  end: Time,
  appointmentTypeId?: number, // -1 for all
  appointmentType?: AppointmentType,
  briId: number,
}
