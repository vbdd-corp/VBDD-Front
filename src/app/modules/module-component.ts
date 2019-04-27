export class ModuleComponent {


  public static getModuleId(modulesIds, moduleType): number {
    for (const module of modulesIds) {
      if (module.typeModule.id === moduleType) {
        return module.id;
      }
    }
  }

}
