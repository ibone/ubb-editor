$.ubb_editor.set_config('btn_size',
    {
        show_panel : function (editor) {
            if (editor.find('.ubb_size_panel').length === 0) {
                var html = '<div class="ubb_size_panel">';
                for (var i = 0; i < editor.size.length; i++) {
                    html += '<a data-onclick="exec" data-name="btn_size" data-size="'+editor.size[i].val+'" style="font-size:'+ editor.size[i].px +'" href="javascript:;" title="'+editor.size[i].alt+'" unselectable="on">'+editor.size[i].alt+'</a>';
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
            var change_font = function() {
                var fonts = editor.iframe_document.getElementsByTagName("font"),
                    size_map = editor.size_map;
                var $font,px,size;
                for (var i = 0, len = fonts.length; i < len; ++i) {
                    $font = $(fonts[i]);
                    size = $font.attr('size');
                    px = size_map[size];
                    if (px) {
                        $(fonts[i]).removeAttr('size').css('font-size',px).attr('ubb-size',size);
                    }
                }
            };
            var $button = $(target_button);
            editor.exec_command('fontsize', $button.data("size"));
            editor.find('.font-size a').text($button.attr("title"));
            change_font();
        },
        get_ubb_attr : function($element){
            return $element.attr('ubb-size')||'';
        }
    }
);
