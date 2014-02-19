$.ubb_editor.set_config('btn_bold',
    {
        exec : function (editor) {
            var $button = editor.find('font-bold a');
            if ($button.hasClass('on')) {
                $button.removeClass('on');
            } else {
                $button.addClass('on');
            }
            editor.exec_command('bold', '');
        },
        onselected : function (editor, selection_text_container, $parents) {
            var tag_name = selection_text_container.nodeName.toLowerCase();
            var tag_name_map = {
                'b' : true,
                'strong' : true
            };
            var reg_css = /bold/i;
            var outerHTML = selection_text_container.outerHTML.match(/<[^>]+>/)[0];
            var has_bold = false;
            
            if (tag_name_map[tag_name] || reg_css.test(outerHTML)) {
                has_bold = true;
            }
            var parent;
            if (!has_bold && $parents.length) {
                for (var i = 0; i < $parents.length; i++) {
                    parent = $parents[i];
                    tag_name = parent.nodeName.toLowerCase();
                    outerHTML = parent.outerHTML.match(/<[^>]+>/)[0];
                    if (tag_name_map[tag_name] || reg_css.test(outerHTML)) {
                        has_bold = true;
                        break;
                    }
                }
            }
            
            var $button = editor.find('.font-bold a');
            var has_enabled = $button.hasClass('on');
            if (has_bold && !has_enabled) {
                $button.addClass('on');
            }
            if (!has_bold && has_enabled) {
                $button.removeClass('on');
            }
        },
        html :  '<div class="font-btns font-bold">'+
                    '<a href="javascript:;" data-onclick="exec" data-name="btn_bold" title="粗体" unselectable="on">粗体</a>'+
                '</div>'
    }
);
