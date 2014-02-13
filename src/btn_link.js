$.ubb_editor.set_config('btn_link'
    {
        show : function(self){
            if (!self.BaobeiWrapDom || self.BaobeiWrapDom.length == 0) {
                var link_dialog_html = ''+
                    '<div class="baobeiWrap">'+
                        '<div class="con">'+
                            '<p class="title">将网址粘贴到下面框中：</p>'+
                            '<div class="sg-form">'+
                                '<a class="confirm_btn" href="javascript:;" btntype="btnLinkAction">确定</a>'+
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
                $('#' + self.config.toolbarId).append(link_dialog_html);
                if (self.curVisiableDom) {
                    self.curVisiableDom.hide();
                }
                self.BaobeiWrapDom = $('#' + self.config.toolbarId + ' .baobeiWrap');
                self.curVisiableDom = self.BaobeiWrapDom;
            } else {
                if (self.curVisiableDom == self.BaobeiWrapDom) {
                    self.BaobeiWrapDom.hide();
                    self.curVisiableDom = null;
                } else {
                    if (self.curVisiableDom)
                        self.curVisiableDom.hide();
                    self.BaobeiWrapDom.show();
                    self.curVisiableDom = self.BaobeiWrapDom;
                }
            }
        },
        html :  '<div class="font-btns font-link">'+
                    '<a href="javascript:;" btntype="btnLink" title="链接" unselectable="on">链接</a>'+
                '</div>',
        exec : function (self, $srcElement) {
            var url = $srcElement.siblings('label').find('input').val();
            if(url == "http://" || url == "") {
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
                    alert_fail("不能输入外网链接");
                }else{
                    alert("不能输入外网链接");
                }
                return false;
            }
            self.execCommand("createlink", url);
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
            self.curVisiableDom.hide();
            self.curVisiableDom = null;
        }
    }
);
