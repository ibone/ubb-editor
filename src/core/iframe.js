    
    function create_iframe($parent,id,html,css){
        if(!html){
            html = '';
        }
        if(!css){
            css = '';
        }
        var $iframe = $parent.find('#'+id);
        if(!$iframe.length){
            var hidden_css = 'left:-10000px;position:absolute;' + css;
            $parent.append('<iframe frameborder="0" spellcheck="false" id="'+id+'" style="' + hidden_css + '"></iframe>');
            //在ie中不能直接使用创建的iframe，必须另外查找到该iframe，否则contentWindow对象将无法使用
            $iframe = $parent.find('#'+id);
            init_iframe($iframe[0]);
        }
        var iframe = $iframe[0];
        var iframe_document = iframe.contentDocument || iframe.contentWindow.document;
        iframe_document.body.innerHTML = html;
        return iframe;
    }
    
    //初始化iframe内容，涉及编辑器和预览的样式统一
    function init_iframe(iframe){
        var iframe_document = iframe.contentDocument || iframe.contentWindow.document;
        iframe_document.designMode = "on";
        iframe_document.open();
        if (is_ie678) {
            iframe_document.write(
                '<html>'+
                    '<head>'+
                        '<style type="text/css">'+
                            'html,body{height:100%;width:100%;margin:0;padding:0;border:0;overflow:auto;background:#fff;cursor:text;word-wrap:break-word;}'+
                            'html{height:1px;overflow:visible;}'+
                            'p{padding:0;margin:0;}'+
                            'body{font:12px/1.5 tahoma,arial,\\5b8b\\4f53;text-align:left;color:#000000;}'+
                            'em{font-style:italic;}'+
                            'img{border:0;max-width:100%;cursor:default;}'+
                            'a{color:#16B}'+
                            'a:hover{color:#16B}'+
                        '</style>'+
                    '</head>'+
                    '<body></body>'+
                '</html>'
            );
        } else {
            iframe_document.write(
                '<html>'+
                    '<head>'+
                        '<style type="text/css">'+
                            'html,body{height:100%;width:100%;margin:0;padding:0;border:0;overflow:auto;background:#fff;cursor:text;word-wrap:break-word;}'+
                            'p{padding:0;margin:0;}'+
                            'html{height:1px;overflow:visible;}'+
                            'body{overflow:hidden;font:12px/1.5 tahoma,arial,\\5b8b\\4f53;text-align:left;color:#000000;}'+
                            'em{font-style:italic;}'+
                            'img{border:0;max-width:100%;}'+
                            'a{color:#16B}'+
                            'a:hover{color:#16B}'+
                        '</style>'+
                    '</head>'+
                    '<body></body>'+
                '</html>'
            );
        }
        iframe_document.close();
    }