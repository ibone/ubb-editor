    //可控制便可转换，所有能操作的样式才能变成ubb格式，其他一律清除
    function html_to_ubb(editor) {
        var html = editor.iframe_document.body.innerHTML;
        var weight = editor.weight;
        var tag_map = editor.tag_map;
        //var reg_spanColse = /<span(?!.*?<span).*?<\/span>/gi;
        //.*?后面的?号是避免正则贪婪
        var reg_lt_tag = /<(span|font|b|strong|p|div|a)/i;
        var reg_pair_tag = /<(span|font|b|strong|p|div|a)[^<]+?<\/(span|font|b|strong|p|div|a)>/gi;
        var reg_br = /<br[^>]*>/gi;
        var reg_enter = /\r|\n/g;
        var reg_nbsp = /\&nbsp\;?/gi;
        var reg_tagSplit = /<[^>]+>/g;
        var encode = function(pair_tag){
            var $element = $(pair_tag);
            var text = $element.html();
            var node_name = $element[0].nodeName.toLowerCase();
            node_name = tag_map[node_name]||node_name;
            var attr = '';
            for(var i=0;i<weight.length;i++){
                attr += editor[weight[i]].get_ubb_attr($element);
            }
            return '[' + node_name + attr + ']' + text + '[/' + node_name + ']';
        };
        while (reg_lt_tag.test(html)) {
            html = html.replace(reg_pair_tag, encode);
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
