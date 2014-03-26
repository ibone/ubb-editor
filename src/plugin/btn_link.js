$.ubb_editor.plugin('btn_link',function(editor){
    var old_range = null;
    editor.add_button(
        {
            name : 'link',
            show_panel : function(editor){
                if(editor.msie){
                    old_range = editor.get_range();
                }
                if (editor.find('.ubb_link_panel').length === 0) {
                    var link_panel_html = 
                        '<div class="ubb_link_panel">'+
                            '<div class="title">将链接粘贴到下面框中：</div>'+
                            '<form>'+
                                '<a class="confirm_btn" href="javascript:;" data-onclick="exec" data-name="link">确定</a>'+
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
                        '<a href="javascript:;" data-onclick="show_panel" data-name="link" title="链接" unselectable="on">链接</a>'+
                    '</div>',
            exec : function (editor) {
                if(editor.msie){
                    editor.focus();
                    editor.restore_range(old_range);
                }
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
            encode_ubb : function(attr_value){
                if(attr_value){
                    return {
                        node_name : 'a',
                        node_attr : 'end]href="' + attr_value + '"[end'
                    };
                }else{
                    return {};
                }
            },
            decode_ubb : function(){
                return {
                    '[aend]'  : '<a ',
                    '[/a]'    : '</a>',
                    '[end]'    : '>'
                };
            },
            allow_tag : {
                'a'  : true
            },
            //有一些属性也可以不使用ubb前缀，比如href，它的属性输出形式 [tagend]href="xxx.com"[end]text[/tag]
            //凡是不能通过配置来控制其属性值的属性，其属性名和值都必须被'end]'和'[end'包裹,直接输出在ubb标签中，比如a标签
            ubb_attr : 'href'
        }
    );
});
