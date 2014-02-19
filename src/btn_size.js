$.ubb_editor.set_config('btn_size',
    {
        show_panel : function (editor) {
            if (editor.find('.ubb_size_panel').length === 0) {
                var html = '<div class="ubb_size_panel">';
                for (var i = 0; i < editor.size.length; i++) {
                    html += '<a data-onclick="exec" data-name="btn_size" data-size="'+editor.size[i].val+'" style="font-size:'+ editor.size_map[editor.size[i].val+''] +'" href="javascript:;" title="'+editor.size[i].alt+'" unselectable="on">'+editor.size[i].alt+'</a>';
                }
                html += '</div>';
                editor.add_panel(html);
            } else {
                editor.toggle_panel('.ubb_size_panel');
            }
        },
        onselected : function (editor, selection_text_container, $parents) {
            var cur_size = null;
            cur_size = selection_text_container.style.fontSize || null;
            if (!cur_size && $parents.length) {
                for (var i = 0; i < $parents.length; i++) {
                    cur_size = $parents[0].style.fontSize || null;
                    if (cur_size) {
                        break;
                    }
                }
            }
            if (cur_size == null) {
                editor.find('.font-size a').text("标准字体");
            } else {
                $(editor.size_map).each(function(){
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
            var change_font = function() {
                var elements = editor.iframe_document.getElementsByTagName("font");
                for (var i = 0, len = elements.length; i < len; ++i) {
                    var px = editor.size_map[elements[i].size];
                    if (px) {
                        elements[i].removeAttribute("size");
                        elements[i].style.fontSize = px;
                    }
                }
            };
            var $button = $(target_button);
            editor.exec_command('fontsize', $button.data("size"));
            change_font();
            editor.find('.font-size a').text($button.attr("title"));
            editor.hide_panel();
        }
    }
);
