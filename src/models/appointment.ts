import {Time} from './time';
import {AppointmentType} from './appointment-type';
import {AppointmentStatus} from './appointment-status';
import {Creneau} from './creneau';

export interface Appointment {
  id?: number,
  start?: Time,
  end?: Time,
  appointmentTypeId?: number, // -1 for all
  appointmentType?: AppointmentType,
  appointmentStatusId?: number,
  appointmentStatus?: AppointmentStatus,
  creneauId?: number,
  creneau?: Creneau,
  studentId?: number,
  student?: number,
  briId?: number,
}
