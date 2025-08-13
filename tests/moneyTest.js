import {formatCurrency} from '../scripts/utils/money.js';
//test case 1 basic case
console.log('test suite: formatCurrency');
console.log('covert cents to dollars');
if(formatCurrency(2095) === '20.95'){
  console.log('passed');
} else {
  console.log('failed');
}
/*edge cases*/
//test case 2
console.log('test with zero');
if(formatCurrency(0) === '0.00'){
  console.log('passed');
} else {
  console.log('failed');
}
//test case 3
console.log('round to nearest cents');
if(formatCurrency(2000.5) === '20.01'){
  console.log('passed');
} else {
  console.log('failed');
}

if(formatCurrency(2000.4) === '20.00'){
  console.log('passed');
} else {
  console.log('failed');
}


 