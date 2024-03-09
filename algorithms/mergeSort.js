export default function mergeSort(array) {
   if (array.length < 2) {
      return array;
   }

   const middle = Math.floor(array.length / 2);
   const left = array.slice(0, middle);
   const right = array.slice(middle);

   return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
   const sortedArray = [];

   while (left.length && right.length) {
      if (new Date(left[0].date) < new Date(right[0].date)) {
         sortedArray.push(left.shift());
      } else {
         sortedArray.push(right.shift());
      }
   }

   return sortedArray.concat(left.slice()).concat(right.slice());
}
