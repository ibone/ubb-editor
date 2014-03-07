$.ubb_editor.add_button('btn_link',
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
        encode_ubb : function(attr_value){
            if(attr_value){
                return '[aend]href="' + attr_value + '"[end]';
            }else{
                return '';
            }
        },
        decode_ubb : function(editor){
            return {
                '[aend]'  : '<a ',
                '[a end]' : '<a ',
                '[/a]'    : '</a>'
            };
        },
        allow_tag_name : {
            'a'  : true
        },
        //有一些属性也可以不使用ubb前缀，比如href，它的属性输出形式就一种 href="xxx.com"
        //凡是不能通过配置来控制其属性值的属性，其标签都必须包含'end]',属性名和值直接输出在ubb标签中，比如a标签
        //大的规则从来都是被小的规则逼出来的
        allow_attr : 'href'
    }
);
