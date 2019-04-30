export interface File {
  id?: number,
  name?: string,
  studentId?: number,
  moduleIds?: Array<number>,
  fileTypeId?: number,
  fileType?: any,
  isValidated?: boolean,
}
