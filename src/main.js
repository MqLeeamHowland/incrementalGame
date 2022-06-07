import { createApp } from 'vue/dist/vue.esm-bundler';
import {processUserInput} from './processCommand.js'
import {worker} from './worker.js'

createApp({


    data() {
        return {
  
          
          // this affects your workers' and your production
          playerNumber: 1,
  
  
          food: 100,
          wood: 100,
          traps:0,
          trapChance: 0.5, // 50% chance of trap success 
          unmetWorkers: 0,
  
  
          // change these to a map to make searching faster
          metWorkers: [],
          totalWorkers: 0,
          // unassigned workers affecting food prod
          tickRate: 1000, // ms affects game speed
  
  
          // find a more efficient way to do this
  
          // vals for production
          // sums of all 
          foodProd: 0,
          woodProd: 0, 
          trapProd: 0,
  
          // um = unmet 
          umfoodProd: 0,
          umwoodProd: 0,
          umtrapProd: 0,
  
          fight: 0,
          block: 0, 
  
          foodMax: Number.MAX_VALUE,
          woodMax: Number.MAX_VALUE, 
          workersMax: 10,   

          repeatInstructions:[],
  
          myInput: " ",

          cookies: 0, // increase total production by 25%


          // add some variables that affect allocations of resources
        }
      },
      
      
      
      created() {
          this.interval = setInterval(() => this.tickGame(), this.tickRate)
      },
  
      // could add worker argument to calculate 
      methods: {
        gatherFood() {
          this.food++;
          // change this to do more things when you upgrade the player 
        },
  
  
        gatherWood() {
          this.wood++;
        },
  
  
        buildTrap() {
          if (this.wood >= 10 && this.food >= 5){
            this.traps++;
            this.wood -= 10;
            this.food -= 5;
          }
        },
  
        meetworker() {

            if (this.unmetWorkers == 0) {
                return;
            }
  
  
          this.metWorkers.push(new worker());

          this.unmetWorkers--;
  
          // ammend the unmet workers val
  
          // this approach seems super spaghetti but idk 
          if (this.umfoodProd > 0) this.umfoodProd--;
          if (this.umwoodProd > 0) this.umWoodProd--;
          if (this.umtrapProd > 0) this.umtrapProd--;


  
  
  
  
          // creates worker and adds to array
        },
  
        tickGame() {
  
          // check traps
          if (this.totalWorkers < this.workersMax && this.traps > 0 && Math.random() > this.trapChance) {
            this.traps--;
            this.unmetWorkers++;
            this.totalWorkers++;
            this.umfoodProd++;
          }
  
          // if no rules are in effect then workers are auto food 
          let randnum = Math.random() * 100;
          this.food += Math.ceil (( (this.foodProd + (this.umfoodProd * randnum)) * (this.playerNumber/100) )) * Math.pow(1.25,this.cookies);
          this.food = (this.food < this.foodMax) ? this.food : this.foodMax;
          this.wood += Math.ceil (( (this.woodProd + (this.umwoodProd * randnum)) * (this.playerNumber/100) ))  *Math.pow(1.25,this.cookies);
          this.wood = (this.wood < this.woodMax) ? this.wood : this.woodMax;
          this.trap += (Math.ceil( (this.trapProd + (this.umtrapProd * randnum)) * (this.playerNumber/100) ))  * Math.pow(1.25,this.cookies);
          this.trap = (this.trap < this.trapMax) ? this.trap : this.trapMax;

        
          this.repeatInstructions.forEach(i => {
              console.log(i);
              this.execApp(i);            
          });
  
  
        },
        execApp(app) {

            

            if (app.type == "repeat"){

                this.repeatInstructions.push(app.instruction);

            }

            if (app.type == "command"){

                if (app.user == "God") {
                    this.allWorkers(app.command)
                }
                else {
                console.log("id === " + app.user)


                var user = this.getUser(app.user)
                


                this.assignWorker(user,app.command);
                }
                
            }

            else if (app.type == "buy") {
                processPurchase();
            }

            else if (app.type == "iff"){

                let value1 = this.extractVal(app.value1);
                let value2 = this.extractVal(app.value2);

                let tf = false

                console.log(app.operand);
                console.log()

                switch (app.operand) {
                    case "<":
                        if (value1 < value2) tf = true;

                    case "<=":
                        if (value1 <= value2) tf = true;

                    case "==":
                        if (value1 == value2) tf = true;

                    case "!=":
                        if (value1 != value2) tf = true;

                    case ">=":
                        if (value1 >= value2) tf = true;

                    case ">":
                        if (value1 > value2) tf = true;
                }

                if (tf == true) this.execApp(app.thenCommand);
                else this.execApp(app.elseCommand);

            }

            return;
        
        },

        extractVal(str){
            // either 'id..'.chop

            // or 
            // storage.food 

            str = str.split(".");

            if (str[0] == "storage"){

                switch (str[1]){

                    case "food":
                        return this.food;

                    case "wood":
                        return this.wood;

                    case "trap":
                        return this.trap;

                    default:
                        return;
                }
            }

            let user = this.getUser(str[0])

            switch (str[1]){

                case "farm":
                    return user.farm;

                case "chop":
                    return user.chop;

                case "build":
                    return user.build;

                default:
                    return;
            }

            

            

        },

        processPurchase(item){

            if (item != "cookie") { // add other items to buy
                return false;
            }

            // if (hasMoney(item))
            // then buy item 
            // and scale prices Math.pow(1.25,this.cookies))

            if (! (this.food >= 100 * Math.pow(1.25,this.cookies)) ) { // buy the item and add process
                this.food-=100;
                this.cookies++;

                return true;
            } 
        },


        getUser(id) {
            var user = this.metWorkers.filter(worker => {
                return worker.id == id
            })
            return user[0];
        },
                

        assignWorker(worker, command) {

            console.log(worker);

            


            if (!(command == "farm" || command == "chop")) return;

            console.log(command);


            switch (worker.currTask){   
                case "farm":
                    this.foodProd-=worker.farm
                case "chop":
                    this.woodProd-=worker.chop
            }
            worker.currTask = command;
            switch (worker.currTask){   
                case "farm":
                    this.foodProd+=worker.farm
                case "chop":
                    this.woodProd+=worker.chop
            }    


        },
        allWorkers(command){
            
            // move all workers to a certain function
        },
  
        readInput() {
            let str = processUserInput(this.myInput)
            this.execApp(str)
        }
        


        
  
  
        /** Grammar Rules
         *    Exp -> Exp + Exp
         *    Exp -> Command
         *    Exp -> Ifelse 
         *    ifelse -> boolExp + ifTrueCommand + ifFalseCommand
         *    Command -> User + Action 
         * 
         */
  
        
  
  
        // moveArray(array1, array2) { 
        //   array1.forEach(function(elem, index) {
        //             array1.splice(index, 1);
        //             array2.push(elem);
        //   });
        // }
  
        
  
    }
      
}).mount('#app');