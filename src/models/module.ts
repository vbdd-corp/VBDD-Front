import { ModuleType } from './moduleType';

export interface Module {
  id?: number,
  typeModuleId?: number,
  typeModule?: ModuleType,
  infos?: any,
}
