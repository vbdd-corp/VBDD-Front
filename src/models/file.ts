import {Module} from './module';

export interface File {
  id?: number,
  name?: string,
  studentId?: number,
  moduleIds?: Array<number>,
  modules?: Array<Module>,
  fileTypeId?: number,
  fileType?: any,
  isValidated?: boolean,
}
