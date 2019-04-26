export class ModuleComponent {


  // TODO : ICI DEMANDER A CAMILLE DE REGLER LE BACK POUR RENVOYER DES OBJETS ET PAS DES IDS
  public static getModuleId(modulesIds, moduleType): number {
    for (const module of modulesIds) {
      if (module.moduleType === moduleType) {
        return module.id;
      }
    }
  }

}
