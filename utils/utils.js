module.exports = {
   convertToArray: function(time) {
       var time_value_array = [];
       var counter = 0;
       while (counter < 60){
         time_value_array.push(counter);
         counter = counter + time;
       }
       return time_value_array;
   }
};
