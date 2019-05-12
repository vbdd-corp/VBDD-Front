import {Time} from './time';
import {AppointmentType} from './appointment-type';
import {CreneauStatus} from './creneauStatus';

export interface Creneau {
  id?: number,
  start?: Time,
  end?: Time,
  appointmentTypeId?: number, // -1 for all
  appointmentType?: AppointmentType, // -1 for all
  statusId?: number,
  status?: CreneauStatus,
  briId?: number,
}
