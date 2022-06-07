
// // /** Grammar Rules
// //        *    Exp -> Exp + Exp
// //        *    Exp -> Command
// //        *    Exp -> Ifelse 
// //        *    ifelse -> boolExp + ifTrueCommand + ifFalseCommand
// //        *    Command -> User + Action 
// //        *    expr -> value 
// //        *    value -> user.something
// //        *    value -> prod.something
// //        */


// // /*
// //       if (prod.food == blah) then (tom farm) else (bill garden)

// //       if (store.food == 10 ) then (jerry farm)s
// // */



// // list of parsers in here 

// import  {str,sequenceOf,choice,char,recursiveParser,coroutine,letters} from 'arcsecond';



//     export const action = choice ([
//         str("farm"),
//         str("chop"),
//         str("fight")
//     ]);


//     export const expr = recursiveParser (() => choice ([
//         //ifelse,
//         command
//         //booleanExp,
//         //innerExp,
//     ]))



//     //const user = str();
  
//     // const ifelse = coroutine(function* () {
//     //     yield str("if");
//     //     yield char(' ');
//     //     const boolexp = expr;
//     //     yield char(' ');
//     //     const thenexp = expr;
//     //     yield char(' ');

//     //     const elseexp = expr;

//     //     return {
//     //         type: 'ifelse',
//     //         boolexp:boolexp,
//     //         thenexp:thenexp,
//     //         elseexp:elseexp
//     //     }
//     // });

//     const command = coroutine(function* () {

//         const user = yield letters;
//         yield char (' ');
//         const action = yield action; 

//         return{
//             type:'command', 
//             user:user,
//             command:action
//         }
//     });
    
//     // const booleanExp = coroutine(function *() {
//     //     const expr1 = yield expr;
//     //     const operatorval = yield operator;
//     //     const expr2 = yield expr;
    
//     //     return {
//     //         type:booleanExp,
//     //         typetype: operator,
//     //         exp1: expr1,
//     //         exp2: expr2
//     //     }
            
//     // });
    

//     const operator = choice ([
//         char('<'),
//         str("<="),
//         char('>'),
//         str('>='),
//         str("=="),
//         str("!=")
//     ])



//     // const innerExp = recursiveParser (() => choice ([
//     //     ifelse,
//     //     command,
//     //     booleanExp,
//     //     expr
//     // ]))



    


//     // const fullParser = coroutine(function* () {

//     //     yield expr;

//     //     // Parse the weather string and the space character
//     //     yield weatherString;
//     //     yield char (' ');
    
//     //     // Store the time string for later
//     //     const time = yield timeString;
    
//     //     // Parse and ignore the separator
//     //     yield str (': ');
    
//     //     // Store the weather string
//     //     const weather = yield weatherType;
    
//     //     // Return the data in a structured way
//     //     return {
//     //     time: time,
//     //     weather: weather
//     //     }
//     // });
  
//     export const fullParser = choice ([
//         expr
//     ])

//   // big parse funct