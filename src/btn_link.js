$.ubb_editor.set_config('btn_link',
    {
        show_panel : function(editor){
            if (editor.find('.ubb_link_panel').length === 0) {
                var link_panel_html = 
                    '<div class="ubb_link_panel">'+
                        '<div class="title">将网址粘贴到下面框中：</div>'+
                        '<form>'+
                            '<a class="confirm_btn" href="javascript:;" data-onclick="exec" data-name="btn_link">确定</a>'+
                            '<label>'+
                            '<input value="" placeholder="http://" autocomplete="off">'+
                            '</label>'+
                        '</form>'+
                    '</div>';
                editor.add_panel(link_panel_html);
            } else {
                editor.toggle_panel('.ubb_link_panel');
            }
        },
        html :  '<div class="font-btns font-link">'+
                    '<a href="javascript:;" data-onclick="show_panel" data-name="btn_link" title="链接" unselectable="on">链接</a>'+
                '</div>',
        exec : function (editor) {
            var input = editor.find('.ubb_link_panel input');
            var url = input.val();
            var reg = /^(http|https):\/\//;
            if(url === '') {
                alert("请输入一个链接");
                return;
            }
            if(!reg.test(url)){
                url = 'http://' + url;
            }
            editor.exec_command('createlink', url);
            input.val('');
            /* 如果需要给链接添加target title
            */
        },
        get_ubb_attr : function($element){
            return ($element.attr('href')&&(' end]href="' + $element.attr('href') + '"[end'))||'';
        }
    }
);
