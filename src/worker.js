export class worker {

    // mmmmmh


  constructor() {

      this.id = "id" + Math.random().toString(16).slice(2);
      

      this.fight = randn_bm(0, 100, 1);
      this.block = randn_bm(0, 100, 1);
      this.health = randn_bm(0, 100, 1);
      this.farm = randn_bm(0, 100, 1);
      this.chop = randn_bm(0, 100, 1);
      this.build = randn_bm(0, 100, 1);

      this.currTask = '';

  }


    // box-muller transform 
    // https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
    // from: https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
    
    // skew = 1 (centre) , > 1 left , < 1 right



};


function randn_bm (min, max, skew) {
  let u = 0, v = 0;
  while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random()
  let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
  
  num = num / 10.0 + 0.5 // Translate to 0 -> 1
  if (num > 1 || num < 0) {
    num = randn_bm(min, max, skew) // resample between 0 and 1 if out of range
  }
  else{
    num = Math.pow(num, skew) // Skew
    num *= max - min // Stretch to fill range
    num += min // offset to min
  }
  return num
};


