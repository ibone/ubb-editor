    function html_to_ubb(editor) {
        var html = editor.iframe_document.body.innerHTML;
        var reg_spanColse = /<span(?!.*?<span).*?<\/span>/gi;
        var reg_fontColse = /<font(?!.*?<font).*?<\/font>/gi;
        var reg_bColse = /<b(?!.*?<b).*?<\/b>/gi;
        var reg_strongColse = /<strong(?!.*?<strong).*?<\/strong>/gi;
        var reg_div = /<div[^>]*>/gi;
        var reg_divEnd = /<\/div>/gi;
        var reg_p = /<p[^>]*>/gi;
        var reg_pEnd = /<\/p>/gi;
        var reg_a = /<a[^>]*>/gi;
        var reg_aEnd = /<\/a>/gi;
        var reg_br = /<br[^>]*>/gi;
        var reg_img = /<img[^>]+alt\=\"?(\[.{1,4}\])[^>]+\>/gi;
        var reg_enter = /\r|\n/g;
        var reg_nbsp = /\&nbsp\;?/gi;
        var reg_tagSplit = /<[^>]+>/g;
        var SPACE = " ";
        
        //将匹配出来的闭合标签转换成"[b]xxx[/b]"之类的
        var encode = function (t, b) {
            var tagArr = t.match(reg_tagSplit);
            var tagHead = tagArr[0];
            var tagFoot = tagArr[tagArr.length - 1];
            var tagBody = t.replace(tagHead, "").replace(tagFoot, "");
            var color = null;
            var size = null;
            var bold = b || null;
            if (!bold && tagHead.indexOf("bold") !== -1) {
                bold = true;
            }
            if (tagHead.indexOf("size") !== -1) {
                size = tagHead.match(/size[\s\=\"]+(\d{1})/i);
                if (size) {
                    size = size[1];
                }
            }
            if (tagHead.indexOf("color") !== -1) {
                color = tagHead.match(/\#([0-9a-f]{6})/i);
                if (!color) {
                    color = tagHead.match(/rgb\(\s?(\d{1,3})\,\s?(\d{1,3})\,\s?(\d{1,3})\)/i);
                    if (color) {
                        color = Rgb2Hex([color[1], color[2], color[3]]);
                    }
                } else {
                    color = color[1];
                }
            }
            var i = 0;
            //验证是否属于网站规定的颜色
            if (!editor.color_map) {
                var color_map = editor.color_map = {};
                for (; i < editor.color.length; i++) {
                    color_map[editor.color[i].val] = true;
                }
            }
            if (color) {
                color = editor.color_map[color] ? color : null;
            }
            //验证是否属于网站规定的字体大小
            if (!editor.size_map) {
                var size_map = editor.size_map = {};
                for (i = 0; i < editor.size.length; i++) {
                    size_map[editor.size[i].val] = true;
                }
            }
            if (size) {
                size = editor.size_map[size] ? size : '1';
            }
            if (bold) {
                if (size || color) {
                    tagHead = SPACE + "[b]" + SPACE + "[font" + (size || "") + (color || "") + "]";
                        tagFoot = SPACE + "[/b]" + SPACE + "[/font]";
                } else {
                    tagHead = SPACE + "[b]";
                    tagFoot = SPACE + "[/b]";
                }
            } else {
                if (size || color) {
                    tagHead = SPACE + "[font" + (size || "") + (color || "") + "]";
                        tagFoot = SPACE + "[/font]";
                } else {
                    tagHead = "";
                    tagFoot = "";
                }
            }
            return tagHead + tagBody + tagFoot;
        };
        //优先匹配速度快的正则
        //清除换行符
        html = html.replace(reg_enter, SPACE + '[span][/span]');
        //nbsp
        html = html.replace(reg_nbsp, ' ');
        //br
        if (html.indexOf("<br") !== -1 || html.indexOf("<BR") !== -1) {
            html = html.replace(reg_br, SPACE + '[br]');
        }
        //div
        if (html.indexOf("<div") !== -1 || html.indexOf("<DIV") !== -1) {
            html = html.replace(reg_div, SPACE + '[p]');
            html = html.replace(reg_divEnd, SPACE + '[/p]');
        }
        //p
        if (html.indexOf("<p") !== -1 || html.indexOf("<P") !== -1) {
            html = html.replace(reg_p, SPACE + '[p]');
            html = html.replace(reg_pEnd, SPACE + '[/p]');
        }
        //a_end
        if (html.indexOf("</a") !== -1 || html.indexOf("</A") !== -1) {
            html = html.replace(reg_aEnd, SPACE + '[/a]');
        }
        var codefun = function(t){
            return encode(t, true);
        };
        //b
        while (html.indexOf("<b") !== -1 || html.indexOf("<B") !== -1) {
            html = html.replace(reg_bColse, codefun);
        }
        //strong
        while (html.indexOf("<strong") !== -1 || html.indexOf("<STRONG") !== -1) {
            html = html.replace(reg_strongColse, codefun);
        }
        //span
        while (html.indexOf("<span") !== -1 || html.indexOf("<SPAN") !== -1) {
            html = html.replace(reg_spanColse, codefun);
        }
        //font
        while (html.indexOf("<font") !== -1 || html.indexOf("<FONT") !== -1) {
            html = html.replace(reg_fontColse, codefun);
        }
        var code_a_fun = function(t){
            var str = '';
            if(type === "paste"){
                return str;
            }
            str = '[a end]'+t.match(/href\=\"[^\"]+\"/)[0]+'[end]';
            return str;
        };
        //a
        while (html.indexOf("<a") !== -1 || html.indexOf("<A") !== -1) {
            html = html.replace(reg_a, code_a_fun);
        }
        //过滤最后的标签，强制删除标签
        if (html.indexOf("<") !== -1) {
            html = html.replace(reg_tagSplit, '');
        }
        return html;
    }
