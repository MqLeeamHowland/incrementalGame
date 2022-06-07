

// /** Grammar Rules
//        *    Exp -> Exp + Exp
//        *    Exp -> Command
//        *    Exp -> Ifelse 
//        *    ifelse -> boolExp + ifTrueCommand + ifFalseCommand
//        *    Command -> User + Action 
//        *    expr -> value 
//        *    value -> user.something
//        *    value -> prod.something
//        */


// example 1 if             : if (value < value) then command / else) x

// example 2 command        : user action x

// example 3 x 


//            value         : user. value / storage.value

//              user :          userid / every1

// 


// if (yourmumcool < yourmumnot) (user 69 killing) (user 420 dying)


// also add processing of 


export function processUserInput(instruction) { 
// write code in here to prcoess command 

// do x if (y)


    if (typeof instruction === 'string' || instruction instanceof String){
     instruction = toArray(instruction);
    }




    console.log(instruction)


    switch (instruction[0]) {

      // for (w1:w2 in worker) ((if w1.fight < w2.fight) () ())

      // for (w1 in worker) ((if w.fight > w.blah) (w1.fight) (blah))

      // for (w1 in worker) ((if w.fight > konstant) (w1.fight) (blah))

      // 

      //   case "for":
      //       return {
      //         type:"for",
      //         object:processForObject(instruction[1]),
      //         instruction:processUserInput(instruction[2])
      //       }

        case "all":
            return {
                type:"all",
                instruction:processUserInput(instruction[1])
            }

        case "repeat":
            return {
                type:"repeat",
                instruction:processUserInput(instruction[1])
            }
        

        case "user": {

            console.log(instruction[1])
            
            // user for everyone is 0
            let user = instruction[1]

            
            return {
                type:"command",
                user:user,
                command:processCommand(instruction[2])
            }
        }

        case "if": {

            
            //console.log(instruction[1])
            
            // if (value1 < value2) (then) (else)
            
            let value1,operand,value2 = processValue(instruction[1]);

            let thenCommand = processUserInput(instruction[2]);

            let elseCommand = processUserInput(instruction[3]);




            return {
                type:"iff",
                value1:instruction[1][0],
                operand:instruction[1][1],
                value2:instruction[1][2],
                thenCommand:thenCommand,
                elseCommand,elseCommand

            }
        }

        case "buy":
            return{
                type:"buy",
                item:instruction[1]
            }
    };

   
    //     case "unassign": 

    //     switch (command[1]) { 
    //         case "all": // unassign all workers
    //         {
    //         this.foodProd = 0;
    //         this.woodProd = 0; 
    //         this.trapProd = 0;

    //         this.umfoodProd = 0;
    //         this.umwoodProd = 0;
    //         this.umtrapProd = 0;

    //         foodWorkers, woodWorkers, trapWorkers = [];
    //         }
    //         default : 
    //         console.log("wrong command buddy"); 
    //     }

    //     case "assign": {
    //         if (command[1] == "id") {

    //         // search for id in here

    //         // add parsing for conditional in here 
            
    //         } else if (!isNan(command[1])) {  // true if command is a num ( percentage )
            

    //         // this is a percentage of workers

    //         // add parsing for if
    //         }
    //     }

    //     case "dismiss" : {
    //     // dismiss workers in here if y 
    //     }

    
    // }





    // //    percentages
    // // unassign all
    // unassign prod
    // assign x        : resource 
    // 





};


function processCommand(command){
    return command;
}

function processForObject(command){


}

function processValue(value) {

    // user.something 

    // user.producing

    // storage.something

    return {
        value1:value[0],
        operand:value[1],
        value2:value[2]
    };

}



function toArray(str) {
    var i = 0;
    function main() {
      var arr = [];
      var startIndex = i;
      function addWord() {
        if (i-1 > startIndex) {
          arr.push(str.slice(startIndex, i-1));
        }
      }
      while (i < str.length) {
        switch(str[i++]) {
          case " ":
            addWord();
            startIndex = i;
            continue;
          case "(":
            arr.push(main());
            startIndex = i;
            continue;
          case ")":
            addWord();
            return arr;
        }
      }
      addWord();
      return arr;
    }
    return main();
  }
  