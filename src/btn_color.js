$.ubb_editor.set_config('btn_color',
    {
        show_panel : function (editor) {
            if (editor.find('.ubb_color_panel').length === 0) {
                var html = '<div class="ubb_color_panel">';
                var length = editor.color.length;
                for (var i = 0; i < length; i++) {
                    html += '<a data-onclick="exec" data-name="btn_color" data-color="#' + editor.color[i].val + '" style="background-color:#' + editor.color[i].val + ';" href="javascript:;" title="' + editor.color[i].alt + '" unselectable="on">#' + editor.color[i].val + '</a>';
                }
                html += '</div>';
                editor.add_panel(html);
            } else {
                editor.toggle_panel('.ubb_color_panel');
            }
        },
        onselected : function (editor, selection_text_container, $parents) {
            var cur_color = null;
            var reg_hex = /#[0-9a-f]{6}/i;
            var reg_rgb = /rgb\(\s?(\d{1,3})\,\s?(\d{1,3})\,\s?(\d{1,3})\)/i;
            var color = selection_text_container.style.color;
            var rgbArr;
            var Rgb2Hex = function(rgb){
                if(!rgb && rgb.length !== 3){
                    return rgb;
                }
                var Hex = "#";
                var int16 = '';
                for(var i=0; i<3; i++){
                    int16 = Number(rgb[i]).toString(16);
                    Hex += (int16.length === 1?'0':'')+int16;
                }
                return Hex;
            };
            if(reg_hex.test(color)){
                cur_color = color;
            }
            if(reg_rgb.test(color)){
                rgbArr = color.match(reg_rgb);
                if (rgbArr) {
                    cur_color = Rgb2Hex([rgbArr[1], rgbArr[2], rgbArr[3]]);
                }
            }
            var parent;
            if (!cur_color && $parents) {
                var length = $parents.length;
                for (var i = 0; i < length; i++) {
                    parent = $parents[i];
                    color = parent.style.color;
                    if(reg_hex.test(color)){
                        cur_color = color;
                    }
                    if(reg_rgb.test(color)){
                        rgbArr = color.match(reg_rgb);
                        if (rgbArr) {
                            cur_color = Rgb2Hex([rgbArr[1], rgbArr[2], rgbArr[3]]);
                        }
                    }
                    if (cur_color) {
                        break;
                    }
                }
            }
            if (!cur_color) {
                cur_color = '#333333';
            }
            console.log(cur_color);
            editor.find('.font-color i').css('background-color',cur_color);
        },
        html :  '<div class="font-btns font-color">'+
                    '<a href="javascript:;" data-onclick="show_panel" data-name="btn_color" title="前景色" unselectable="on">'+
                        '<span unselectable="on"><i unselectable="on"></i></span>'+
                    '</a>'+
                '</div>',
        exec : function (editor, target_button) {
            var color = $(target_button).data('color');
            editor.exec_command("forecolor", color);
            editor.find('.font-color i').css('background-color',color);
        }
    }
);
