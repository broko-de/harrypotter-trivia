
// componente header
const headerTemplate = new Vue({
    el: "#headerTemplate",
    data: {
      vista: 'componente'
    },
    components: {
      'componente': {
        template: `<div id="headerTemplate">
                      <div id="headerDesktop"></div>
                      <div id="contenedorLogoHeader">
                          <div id="flexLogoHeader">
                              <img src='img/desktop/signoPregunta.png' class="signoPreguntaLogoHeader">
                              <img src='img/desktop/HARRY logo.png' id="logoHeader">
                              <img src='img/desktop/signoPregunta.png' class="signoPreguntaLogoHeader">
                          </div>
                      </div>
                  </div>`
      }
    }
  });



  
let datosCarta = new Vue({
    el: "#datosCarta",
    data() {
        return {
            urlTodos: "http://hp-api.herokuapp.com/api/characters",
            
            nombreOk: "",
            nombreMal1: "",
            nombreMal2: "",
            casaOk: "",
            casaMal1: "",
            casaMal2: "",
            actoreOK:"",
            actoreMal1:"",
            actoreMal2: "",
            nombres: [],
            casas: [],
            actores:  [],
            scrImg:"http://hp-api.herokuapp.com/images/harry.jpg", 
            selectedName: "",
            selectedHouse: "",
            selectedActore: "",
            puntaje: 0,
            nombreIngresado: "",
            nombreInv: "",
            mensaje: "TU NOMBRE MÁGICO ES: ",
            show: true,
            show2: false,
            show3: false,
            show4: false,
            objPuntajes:{
                TROMEDLOV: 1950,
                ENOIAMREH: 1720,
                RETTOPYRRAH: 1600,
            },
            
            
    }    
    },
    methods: {
        async traerCarta() {
        const response = await fetch(this.urlTodos)
        const data = await response.json()
        const {name, actor, image, house,yearOfBirth} = data
        
        
        
        function numeroPosibleAzar () {
            return Math.floor(Math.random() * 25);
            }
        
        numOk= numeroPosibleAzar() // Harry es el cero
        
        numMal1= numeroPosibleAzar()
        if (numMal1==numOk){
            return this.numMal1++;
        }

        numMal2= numeroPosibleAzar()
        
        if (numMal2==numOk || numMal2==numMal1) {
            return this.numMal2++;
        }

        
        
                
        function chequearNumMal1(x){
            if (x==numOk){
                x++;
            }
            while (data[x].house === "") {
                x++;}
            
            this.numMal1=x;
            return this.numMal1; 
               
        }
        
        function chequearNumMal2(x){
            if (x==numMal1){
                x++;
            }
            while (data[x].house === "") {
                x++;}
            this.numMal2=x;
            return this.numMal2;   
        }
        
        chequearNumMal1(numMal1)
        chequearNumMal2(numMal2)
        
        
        
        // asignar imagen
        this.srcImg=data[numOk].image
        // asignar nombres
        nombreOk=data[numOk].name
        this.nombres=[]
        this.nombreOk=nombreOk 
        nombreMal1=data[numMal1].name
        this.nombreMal1=nombreMal1
        nombreMal2=data[numMal2].name
        this.nombreMal2=nombreMal2
        this.nombres.push(nombreOk, nombreMal1, nombreMal2)
        this.nombres.sort()
        
        
    

        // asignar casas
        casaOk=data[numOk].house
        this.casas=[]
        this.casaOk=casaOk
        casaMal1=data[numMal1].house
        this.casaMal1=casaMal1
        casaMal2=data[numMal2].house
        this.casaMal2=casaMal2 
        this.casas.push(casaOk, casaMal1, casaMal2)
        this.casas.sort()
       
        
        
        // asignar actores
        actoreOk=data[numOk].actor
        this.actores=[]
        this.actoreOk=actoreOk
        actoreMal1=data[numMal1].actor
        this.actoreMal1=actoreMal1
        actoreMal2=data[numMal2].actor
        this.actoreMal2=actoreMal2
        this.actores.push(actoreOk,actoreMal1,actoreMal2)
        this.actores.sort()
        
        
        },
        
        puntuar() {
            console.log(this.selectedName, this.selectedHouse,this.selectedActore)
            console.log(this.nombreOk, this.casaOk, this.actoreOk )
            let contador = 0
            
            if (this.selectedName==this.nombreOk){
                contador += 20
            }
            console.log(contador)
            if (this.selectedHouse==this.casaOk){
                contador += 30
            }   
            console.log(contador)    
            if (this.selectedActore==this.actoreOk){
                contador += 50
            } 
            console.log(contador) 
            this.puntaje += contador  
            console.log("puntaje: " + this.puntaje) 

            
   
            // localStorage.setItem("puntos", this.puntaje);
            // const puntajeAcumulado = localStorage.getItem("puntos");
            // console.log("aca " + puntajeAcumulado)
            
                       
        },

           
        mostrarNombreInv: function() {
            this.nombreInv = this.nombreIngresado.split("").reverse().join("").toUpperCase()
            let nomJue =this.nombreInv
            this.show = false
            this.show2 = true
            this.show3 = true
            
            if (this.puntaje > 1950) {
                this.show4 = true
            }                 
          },
        
        nuevaCarta: function() {
            this.traerCarta()
            this.show3=false
        }

    },

})





datosCarta.traerCarta()


