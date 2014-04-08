ubb-editor是类ubb代码格式的可视化编辑器，目的是将用户编辑出来的内容不再保存成html的格式，而是类ubb的格式。
适用于编辑样式比较简单的文章和评论。 
![Demo](https://github.com/ibone/ubb-editor/blob/master/readme/editor.png?raw=true)

######默认可编辑的样式
    粗体，字号，字体颜色，加链接
    （可通过添加插件来增加更多功能）

######优点：
    1.输出样式严格控制
    2.保存内容更少
    4.安全性高
    4.单元测试
    
######缺点：
    1.在输出的时候，需要对内容解码（前端和后端都行）
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
