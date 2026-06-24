/**
 * @author alf
 * @copyright 2022
 * @ver 2.0
 */


 class stringPlus {
  
  constructor() {
  }
  
  retira_acentos(str){
    var semAcento = str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    return semAcento;
  }
  
}
