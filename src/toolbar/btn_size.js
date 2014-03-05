(function(){
    var size = [
        {
            val : 1,
            alt : '小号字体',
            px  : '12px'
        }, {
            val : 2,
            alt : '标准字体',
            px  : '14px'
        }, {
            val : 3,
            alt : '大号字体',
            px  : '16px'
        }, {
            val : 4,
            alt : '特大字体',
            px  : '18px'
        }
    ];
    $.ubb_editor.set_config('size',size);
    $.ubb_editor.add_button('btn_size',
        {
            show_panel : function (editor) {
                var size = editor.get_config('size');
                if (editor.find('.ubb_size_panel').length === 0) {
                    var html = '<div class="ubb_size_panel">';
                    for (var i = 0; i < size.length; i++) {
                        html += '<a data-onclick="exec" data-name="btn_size" data-size="'+size[i].val+'" style="font-size:'+ size[i].px +'" href="javascript:;" title="'+size[i].alt+'" unselectable="on">'+editor.size[i].alt+'</a>';
                    }
                    html += '</div>';
                    editor.add_panel(html);
                } else {
                    editor.toggle_panel('.ubb_size_panel');
                }
            },
            onselected : function (editor) {
                var cur_size = $(editor.selection_text_container).css('font-size');
                if (!cur_size) {
                    editor.find('.font-size a').text("小号字体");
                } else {
                    $(editor.size).each(function(){
                        if(this.px === cur_size){
                            editor.find('.font-size a').text(this.alt);
                        }
                    });
                }
            },
            html :  '<div class="font-btns font-size">'+
                        '<a href="javascript:;" data-onclick="show_panel" data-name="btn_size" title="字号" unselectable="on">标准字体</a>'+
                    '</div>',
            exec : function (editor, target_button) {
                var size_map = {};
                for (var i = 0; i < size.length; i++) {
                    size_map[size[i].val+''] = size[i].px;
                }
                var change_font = function() {
                    var fonts = $(editor.iframe_document).find("font,span"),
                        $font,px,size;
                    for (var i = 0, len = fonts.length; i < len; i++) {
                        $font = fonts.eq(i);
                        size = $font.attr('size');
                        px = size_map[size];
                        if (px) {
                            $font.removeAttr('size').css('font-size',px).attr('ubb-size',size);
                        }
                    }
                };
                var $button = $(target_button);
                editor.exec_command('fontsize', $button.data("size"));
                editor.find('.font-size a').text($button.attr("title"));
                change_font();
            },
            encode_ubb : function($element,text){
                var attr = $element.attr('ubb-size');
                if(attr){
                    return '[font' + attr + ']' + text + '[/font]';
                }else{
                    return text;
                }
            },
            decode_ubb : function(editor){
                var size = editor.get_config('size');
                var ubb_map = {};
                for (var i = 0; i < size.length; i++) {
                    ubb_map['[font' + size[i].val + ']'] = '<font ubb-size="'+ size[i].val +'" style="font-size:' + size[i].px + '">';
                }
                ubb_map['[/font]'] = '</font>';
                return ubb_map;
            },
            allow_tag_name : {
                'font'  : true,
                'span' : true
            }
        }
    );
})();