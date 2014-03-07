(function(){
    $.rgb_to_hex = function(rgb){
        if(!/rgb\([ 0-9,]+\)/.test(rgb)){
            return rgb;
        }
        var rgb_arr = rgb.match(/\d{1,3}/g),
            Hex = '',
            int16;
        for(var i=0; i<3; i++){
            int16 = Number(rgb_arr[i]).toString(16);
            Hex += (int16.length === 1?'0':'')+int16;
        }
        return '#' + Hex;
    }
})();