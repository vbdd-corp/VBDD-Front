import { Time } from './time'

export interface Plage {
  id?: number,
  start: Time,
  end: Time,
  appointmentTypeId: number, // -1 for all
  briId: number,
}
