ubb-editor是在逛工作的时候，根据诸多需求定制出来的，目的是轻量、存储数据更少、可控、安全、扩展性好、详细请看优点介绍，如果你发现了该编辑器的更多优点请来信告知^_^ ubbeditor@gmail.com
![Demo](http://lrig.qiniudn.com/editor.png)

######默认可编辑的样式
    粗体，字号，字体颜色，加链接
    （可通过添加插件来增加更多功能）

######优点：
    1.输出样式严格控制
      比如：只希望评论中出现3种字体颜色，不希望出现第4种，那么其他基于html保存的编辑器就不行了，用户可编辑样式是不受控制的，比如在源码里面编辑
    2.保存内容更少
      比如：填写内容的时候，复制粘贴的使用频率是很高的，粘贴会造成多余html标签的生成，而ubb编辑器会根据需要将有用的html转化成ubb
    3.安全性高
      采用白名单标签模式，任何不可预估的会产生漏洞的标签都不会出现，包括未来的会出现的标签
      属性控制，非编辑器提供的属性都不可出现在终端，比如“onclick,onmouseover”之类...
      这里有完整的xss漏洞名单[cheatsheet](https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet)
######缺点：
    1.在输出的时候，需要对内容解码（前端和后端都可以解码）
    2.文本编辑功能有限（功能太多的话，感觉ubb这样的模式就不适合了）
    
######兼容性： 
    IE 6-9
    Chrome
    firefox

######保存的规则如下：
        [font][size]4[/size][end]text[/font]
        <font style="font-size:18px;">text</font>
        
        [font][color]#666666[/color][end]text[/font]
        <font style="color:#666666;">text</font>
    
        [b]text[/b]
        <strong>text</strong>
    
        [p]text[/p]
        <p>text</p>
    
        [a][href]http://example.com[/href][end]text[/a]
        <a href="example.com">text</a>
    
        [br]
        <br/>
        ......
        
######使用：
    <textarea id="editor"></textarea>
    <script>
        $('#editor').ubb_editor();
    </script>

######安装：
    需要安装grunt来生成完整的ubb_editor.js
    安装教程:http://www.gruntjs.org
    生成目录dist/ubb_editor.js
