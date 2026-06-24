/**
 * @author alf
 * @copyright 2022
 * @ver 2.0
 * 
 * Object to control data time in pt
 */


 class dateTime {


      constructor() {
  }

  // Função auxiliar para formatar números com 2 dígitos
  pad2(num) {
    return num.toString().padStart(2, '0');
  }

	get getDataH(){
		let dataH;
		let d = new Date();
		let m= this.pad2(d.getMonth()*1 +1);
		dataH= this.pad2(d.getDate()) + "/" + m + "/" + d.getFullYear() ;
		return dataH;
	}

    getDataHoraEscolhida(dataEsc){
		let dataH;
		//let d = new Date();
		let m= this.pad2(dataEsc.getMonth()*1 +1)
		dataH=this.pad2(dataEsc.getDate()) + "/" + m + "/" + this.pad2(dataEsc.getFullYear()) ;
        dataH=dataH + " " + this.pad2(dataEsc.getHours()) + "h:" + this.pad2(dataEsc.getMinutes()) + "m" ;
		return dataH;
	}
	
    getData(dt){
	  let data;
	  let d = new Date(dt);
	  let me= 1 +d.getMonth()*1
	  data=this.pad2(d.getDate()) + "/" + this.pad2(me) + "/" + this.pad2(d.getFullYear()) ;
	  return data;
	}
	
	getDiaSemana(dt){
	  let dias = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    return dias[dt.getDay()];
	}

}
