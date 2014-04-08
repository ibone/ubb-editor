$.ubb_editor.plugin('btn_link',function(editor){
    var old_range = null;
    var plugin_config = editor.get_plugin_config('btn_link');
    editor.add_button(
        {
            name : 'link',
            require : plugin_config.require,
            show_panel : function(){
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
            exec : function () {
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
            encode_ubb : function(attrs){
                var encode_ubb_result = {};
                $.each(attrs,function(i,attr){
                    if(attr.name === 'href'){
                        encode_ubb_result.ubb_text = '[a][href]'+attr.value+'[/href][end]';
                        encode_ubb_result.node_name = 'a';
                        return false;
                    }
                })
                return encode_ubb_result;
            },
            display : function($dom){
                var self;
                if(!this.require){
                    $dom.find('a').each(function(){
                        self = $(this);
                        self.after(self.text()).remove();
                    });
                }
            },
            decode_ubb : function(){
                return {
                    '[a]'     : '<a ',
                    '[/a]'    : '</a>',
                    '[href]'  : ' href="',
                    '[/href]' : '"'
                };
            },
            allow_tag : {
                'a'  : true
            }
        }
    );
});
