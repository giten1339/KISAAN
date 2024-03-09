export default function bubbleSort(array) {
   let len = array.length;
   for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
         if (new Date(array[j].date) > new Date(array[j + 1].date)) {
            let temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
         }
      }
   }
   return array;
}
