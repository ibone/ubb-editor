(function(){
    var color = [
        {
            val : '#333333',
            alt : '灰色-80%'
        }, {
            val : '#666666',
            alt : '灰色-60%'
        }, {
            val : '#999999',
            alt : '灰色-40%'
        }, {
            val : '#cccccc',
            alt : '灰色-20%'
        }, {
            val : '#bb0000',
            alt : '深红'
        }, {
            val : '#dd0000',
            alt : '红色'
        }, {
            val : '#ee4488',
            alt : '粉红'
        }, {
            val : '#ff66dd',
            alt : '淡紫'
        }, {
            val : '#333399',
            alt : '深蓝'
        }, {
            val : '#0066cc',
            alt : '蓝色'
        }, {
            val : '#0099cc',
            alt : '天蓝'
        }, {
            val : '#66cccc',
            alt : '淡蓝'
        }, {
            val : '#336600',
            alt : '深绿'
        }, {
            val : '#999900',
            alt : '深黄'
        }, {
            val : '#cccc33',
            alt : '淡黄'
        }, {
            val : '#77cc33',
            alt : '淡绿'
        }, {
            val : '#663300',
            alt : '咖啡'
        }, {
            val : '#cc6633',
            alt : '褐色'
        }, {
            val : '#ff9900',
            alt : '橙黄'
        }, {
            val : '#ffcc33',
            alt : '黄色'
        }
    ];
    var config = {
        'color' : color,
        'default_color' : '#000000'
    }
    var rgb_to_hex = function(rgb){
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
    $.ubb_editor.plugin('btn_color', config, function(editor){
        var plugin_config = editor.get_plugin_config('btn_color');
        var color_map = {};
        var color = plugin_config.color;
        var length = color.length;
        for (var i = 0; i < length; i++) {
            color_map[color[i].val] = true;
        }
        editor.add_button(
            {
                name : 'color',
                require : plugin_config.require,
                show_panel : function () {
                    var length = color.length;
                    if (editor.find('.ubb_color_panel').length === 0) {
                        var html = '<div class="ubb_color_panel">';
                        for (var i = 0; i < length; i++) {
                            html += '<a data-onclick="exec" data-name="color" data-color="' + color[i].val + '" style="background-color:' + color[i].val + ';" href="javascript:;" title="' + color[i].alt + '" unselectable="on">' + color[i].val + '</a>';
                        }
                        html += '</div>';
                        editor.add_panel(html);
                    } else {
                        editor.toggle_panel('.ubb_color_panel');
                    }
                },
                onselected : function (selection_container) {
                    var cur_color = null;
                    var style_color = $(selection_container).css('color');
                    style_color = rgb_to_hex(style_color);
                    if(style_color && color_map[style_color]){
                        cur_color = style_color;
                    }else{
                        cur_color = plugin_config.default_color;
                    }
                    editor.find('.font-color i').css('background-color',cur_color).data('color',cur_color);
                },
                html :  '<div class="font-btns font-color">'+
                            '<a href="javascript:;" data-onclick="show_panel" data-name="color" title="前景色" unselectable="on">'+
                                '<span unselectable="on"><i unselectable="on"></i></span>'+
                            '</a>'+
                        '</div>',
                set_ubb_attr : function(){
                    var reg_rgb = /rgb/i;
                    var reg_hex = /#[a-f0-9]{3,6}/i;
                    var fonts = $(editor.document).find("font,span");
                    var $font,style_color,attr_color;
                    for (var i = 0, len = fonts.length; i < len; i++) {
                        $font = fonts.eq(i);
                        style_color = $font.css('color');
                        if(reg_rgb.test(style_color)){
                            style_color = rgb_to_hex(style_color);
                        }
                        //默认颜色不加颜色属性
                        if(style_color === plugin_config.default_color){
                            continue;
                        }
                        attr_color = $font.attr('style');
                        if(!reg_rgb.test(attr_color) && !reg_hex.test(attr_color)){
                            attr_color = $font.attr('color');
                            if(!reg_rgb.test(attr_color) && !reg_hex.test(attr_color)){
                                continue;
                            }
                        }
                        if(!color_map[style_color]){
                            continue;
                        }
                        //ubb的属性是用来统一和控制样式格式输出
                        //比如style="color:rgb(11,11,11)"或者color="rgb(11,11,11)"这样不一致的写法
                        //在encode和decode的时候，只通过ubb属性来输入和输出代码
                        $font.attr('ubb-color',style_color);
                    }
                },
                exec : function (target_button) {
                    editor.exec_command("forecolor", $(target_button).data('color'));
                    this.set_ubb_attr();
                },
                display : function($dom){
                    var attr_name = 'ubb-color';
                    var self,attr_val;
                    if(this.require){
                        $dom.find('font').each(function(){
                            self = $(this);
                            attr_val = self.attr('ubb-color');
                            if(color_map[attr_val]){
                                self.css('color',attr_val);
                            }
                        });
                    }
                },
                encode_ubb : function(attrs,encode_ubb_result){
                    if(!encode_ubb_result){
                        encode_ubb_result = {};
                    }
                    $.each(attrs,function(i,attr){
                        if(attr.name === 'ubb-color'){
                            if(encode_ubb_result.ubb_text){
                                encode_ubb_result.ubb_text = encode_ubb_result.ubb_text.replace('[end]','[color]'+attr.val+'[/color][end]');
                            }else{
                                encode_ubb_result.ubb_text = '[font][color]'+attr.value+'[/color][end]';
                                encode_ubb_result.node_name = 'font';
                            }
                            return false;
                        }
                    });
                    return encode_ubb_result;
                },
                decode_ubb : function(){
                    return {
                        '[/font]'  : '</font>',
                        '[font]'   : '<font',
                        '[color]'  : ' ubb-color="',
                        '[/color]' : '"'
                    };
                },
                allow_tag : {
                    'font' : true,
                    'span' : true
                }
            }
        );
    });
})();