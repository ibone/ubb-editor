$.ubb_editor.set_config('btn_link',
    {
        show_panel : function(editor){
            if (editor.find('.ubb_link_panel') === 0) {
                var link_panel_html = 
                    '<div class="ubb_link_panel">'+
                        '<div class="con">'+
                            '<p class="title">将网址粘贴到下面框中：</p>'+
                            '<div class="sg-form">'+
                                '<a class="confirm_btn" href="javascript:;" data-onclick="exec" data-name="btn_link">确定</a>'+
                                '<label class="input_text sg-input">'+
                                '<input value="" placeholder="http://" autocomplete="off">'+
                                '</label>'+
                                '<div class="text-tip"></div>'+
                            '</div>'+
                            '<div class="tipbox-up">'+
                                '<em>◆</em>'+
                                '<span>◆</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
                editor.add_panel(link_dialog_html);
            } else {
                editor.toggle_panel('.ubb_link_panel');
            }
        },
        html :  '<div class="font-btns font-link">'+
                    '<a href="javascript:;" data-onclick="show_panel" data-name="btn_link" title="链接" unselectable="on">链接</a>'+
                '</div>',
        exec : function (editor) {
            var url = editor.find('.ubb_link_panel input').val();
            if(url === 'http://' || url === '') {
                if(alert_fail){
                    alert_fail("请输入一个链接");
                }else{
                    alert("请输入一个链接");
                }
                return false;
            }
            if(url.indexOf('http://')===-1&&url.indexOf('https://')===-1){
                if(alert_fail){
                    alert_fail("请以http://开头");
                }else{
                    alert("请以http://开头");
                }
                return false;
            }
            if(!url.match(/http\:\/\/([a-z]{1,15}\.)?cncn\.(com|net)/)){
                if(alert_fail){
                    alert_fail('不能输入外网链接');
                }else{
                    alert('不能输入外网链接');
                }
                return false;
            }
            editor.exec_command('createlink', url);
            /* 如果需要给链接添加target title
            var tmp = 'javascript:;';
            var dom_a = self('A','href',tmp);
            if(this.ln) {
                dom_a.attr({
                    href : this.inputs['href'].value,
                    title : this.inputs['title'].value,
                    target : this.inputs['target'].options[this.inputs['target'].selectedIndex].value
                });
            }
            */
            editor.hide_panel();
        }
    }
);
