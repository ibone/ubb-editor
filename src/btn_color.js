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
        onselected : function (editor) {
            var cur_color = null;
            var color = $(editor.selection_text_container).css('color');
            if(color){
                cur_color = color;
            }else{
                cur_color = '#333333';
            }
            editor.find('.font-color i').css('background-color',cur_color);
        },
        html :  '<div class="font-btns font-color">'+
                    '<a href="javascript:;" data-onclick="show_panel" data-name="btn_color" title="前景色" unselectable="on">'+
                        '<span unselectable="on"><i unselectable="on"></i></span>'+
                    '</a>'+
                '</div>',
        exec : function (editor, target_button) {
            var reg_rgb = /rgb\(\s?(\d{1,3})\,\s?(\d{1,3})\,\s?(\d{1,3})\)/i;
            var Rgb2Hex = function(rgb){
                if(!rgb && rgb.length !== 3){
                    return rgb;
                }
                var Hex = '';
                var int16 = '';
                for(var i=0; i<3; i++){
                    int16 = Number(rgb[i]).toString(16);
                    Hex += (int16.length === 1?'0':'')+int16;
                }
                return Hex;
            };
            var change_font = function() {
                var fonts = editor.iframe_document.getElementsByTagName("font");
                var $font,color;
                for (var i = 0, len = fonts.length; i < len; ++i) {
                    $font = $(fonts[i]);
                    color = $font.css('color');
                    if(color && reg_rgb.test(color)){
                        rgbArr = color.match(reg_rgb);
                        if (rgbArr) {
                            color = Rgb2Hex([rgbArr[1], rgbArr[2], rgbArr[3]]);
                        }
                    }
                    if (color) {
                        $(fonts[i]).removeAttr('color').css('color','#' + color).attr('ubb-color',color);
                    }
                }
            };
            var color = $(target_button).data('color');
            editor.exec_command("forecolor", color);
            change_font();
            editor.find('.font-color i').css('background-color',color);
        },
        get_ubb_attr : function($element){
            return $element.attr('ubb-color')||'';
        }
    }
);
