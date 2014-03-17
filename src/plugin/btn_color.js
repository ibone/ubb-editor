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
    $.ubb_editor.config('color',color);
    $.ubb_editor.config('default_color','#000000');
    $.ubb_editor.plugin('color',function(editor,name){
        var color_map = {};
        var color = editor.get_config('color');
        var length = color.length;
        for (var i = 0; i < length; i++) {
            color_map[color[i].val] = true;
        }
        editor.add_button(
            {
                name : name,
                show_panel : function (editor) {
                    var color = editor.get_config('color');
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
                onselected : function (editor) {
                    var cur_color = null;
                    var color = $(editor.selection_text_container).css('color');
                    color = $.rgb_to_hex(color);
                    if(color && color_map[color]){
                        cur_color = color;
                    }else{
                        cur_color = '#000000';
                    }
                    editor.find('.font-color i').css('background-color',cur_color);
                },
                html :  '<div class="font-btns font-color">'+
                            '<a href="javascript:;" data-onclick="show_panel" data-name="color" title="前景色" unselectable="on">'+
                                '<span unselectable="on"><i unselectable="on"></i></span>'+
                            '</a>'+
                        '</div>',
                exec : function (editor, target_button) {
                    var self = this;
                    var reg_rgb = /rgb/i;
                    var reg_hex = /#[a-f0-9]{3,6}/i;
                    
                    var change_font = function() {
                        var fonts = $(editor.iframe_document).find("font,span");
                        var $font,color,attr_color;
                        for (var i = 0, len = fonts.length; i < len; i++) {
                            $font = fonts.eq(i);
                            color = $font.css('color');
                            if(reg_rgb.test(color)){
                                color = $.rgb_to_hex(color);
                            }
                            if(color === '#000000'){
                                continue;
                            }
                            attr_color = $font.attr('style');
                            if(!reg_rgb.test(attr_color) && !reg_hex.test(attr_color)){
                                continue;
                            }
                            if(!attr_color){
                                attr_color = $font.attr('color');
                                if(!reg_rgb.test(attr_color) && !reg_hex.test(attr_color)){
                                    continue;
                                }
                            }
                            if(!color_map[color]){
                                continue;
                            }
                            $font.attr(self.allow_attr,color);
                        }
                    };
                    var color = $(target_button).data('color');
                    editor.exec_command("forecolor", color);
                    change_font();
                    editor.find('.font-color i').css('background-color',color);
                },
                encode_ubb : function(attr_value){
                    if(attr_value){
                        return '[font' + attr_value.replace('#','') + ']';
                    }else{
                        return '';
                    }
                },
                decode_ubb : function(editor){
                    var ubb_map = {};
                    var color = editor.get_config('color');
                    for (var i = 0; i < color.length; i++) {
                        ubb_map['[font' + color[i].val.replace('#','') + ']'] = '<font ' + this.allow_attr + '="'+ color[i].val +'" style="color:' + color[i].val + '">';
                    }
                    ubb_map['[/font]'] = '</font>';
                    return ubb_map;
                },
                allow_tag_name : {
                    'font'  : true,
                    'span' : true
                },
                //ubb的属性是用来统一和控制样式格式输出
                //比如style="color:rgb(11,11,11)"或者color="rgb(11,11,11)"
                allow_attr : 'ubb-color'
            }
        );
    });
})();