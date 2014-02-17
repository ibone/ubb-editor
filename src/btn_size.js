$.ubb_editor.set_config('btn_size',
    {
        show_panel : function (editor) {
            if (editor.find('.ubb_size_panel').legnth === 0) {
                var html = '<div class="ubb_size_panel">';
                for (var i = 0; i < length; i++) {
                    html += '<a data-onclick="exec" data-name="btn_size" size="'+editor.size[i].val+'" href="javascript:;" title="'+editor.size[i].alt+'" unselectable="on">'+editor.size[i].alt+'</a>';
                }
                html += '</div>';
                editor.add_panel(html);
            } else {
                editor.toggle_panel('.ubb_size_panel');
            }
        },
        onselected : function (editor, selection_text_container, $parents) {
            var tag_name = selection_text_container.nodeName.toLowerCase();
            var cur_size = null;
            var reg_css = /size/i;
            cur_size = $(curElm).attr("size") || null;
            if (!cur_size && $parents) {
                var length = $parents.length;
                for (var i = 0; i < length; i++) {
                    cur_size = $parents.eq(i).attr("size") || null;
                    if (cur_size) {
                        break;
                    }
                }
            }
            if (cur_size == null) {
                editor.find('.font-size a').text("标准字体");
            } else {
                $(editor.size).each(function(){
                    if(this.val+'' === cur_size){
                        editor.find('.font-size a').text(this.alt);
                    }
                });
            }
        },
        html :  '<div class="font-btns font-size">'+
                    '<a href="javascript:;" data-onclick="show_panel" data-name="btn_size" title="字号" unselectable="on">标准字体</a>'+
                '</div>',
        exec : function (editor, target_button) {
            var $button = $(target_button);
            editor.exec_command("fontsize", $button.attr("size"));
            editor.find('.font-size a').text($button.attr("title"));
            editor.hide_panel();
        }
    }
);
