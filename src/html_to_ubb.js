    //可控制便可转换，所有能操作的样式才能变成ubb格式，其他一律清除
    function html_to_ubb(editor) {
        var html = editor.iframe_document.body.innerHTML;
        //var reg_spanColse = /<span(?!.*?<span).*?<\/span>/gi;
        //.*?后面的?号是避免正则贪婪
        var reg_lt_tag = /<[a-z]{1,6}/;
        var reg_pair_tag_test = /<[a-z]{1,6}[^<]+?<\/[a-z]{1,6}>/i;
        var reg_pair_tag = /<[a-z]{1,6}[^<]+?<\/[a-z]{1,6}>/gi;
        var reg_br = /<br[^>]*>/gi;
        var reg_enter = /\r|\n/g;
        var reg_nbsp = /\&nbsp\;?/gi;
        var reg_tagSplit = /<[^>]+>/g;
        var allow_tag_name = {};
        var default_allow_tag_name = {
            'p' : true,
            'div' : true
        }
        var toolbar = editor.toolbar;
        var buttons = editor.buttons;
        var buttons_length = toolbar.length;
        var button_name = '';
        $.extend(allow_tag_name,default_allow_tag_name);
        for(var i = 0; i < buttons_length; i++){
            $.extend(allow_tag_name,buttons[toolbar[i]].allow_tag_name);
        }
        var pair_tag_filter = function(pair_tag){
            var $element = $(pair_tag);
            var text = $element.text();
            var node_name = $element[0].nodeName.toLowerCase();
            if(!allow_tag_name[node_name]){
                return pair_tag;
            }
            if(default_allow_tag_name[node_name]){
                return '[p]' + text + '[/p]';
            }
            var attr = '';
            for(i = 0; i < buttons_length; i++){
                button_name = toolbar[i];
                if(buttons[button_name].allow_tag_name[node_name]){
                    text = buttons[button_name].encode_ubb($element,text);
                }
            }
            return text;
        }
        while(reg_pair_tag_test.test(html)){
            html = html.replace(reg_pair_tag, pair_tag_filter);
        }
        //清除换行符
        html = html.replace(reg_enter, '');
        html = html.replace(reg_br, '[br]');
        //为什么不将空格直接转成' ';因为左侧或者右侧带' '的'[]'会有不同程序判断，为某些功能的预留字符串
        html = html.replace(reg_nbsp, '[s]');
        html = html.replace(/\x20/g, '[s]');
        //过滤最后的标签，强制删除标签
        if (html.indexOf("<") !== -1) {
            html = html.replace(reg_tagSplit, '');
        }
        return html;
    }
