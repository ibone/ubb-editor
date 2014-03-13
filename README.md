ubb-editor是类ubb代码格式的可视化编辑器，目的是将用户编辑出来的内容不再保存成html的格式，而是类ubb的格式。
适用于编辑样式比较简单的文章和评论。 http://ibone.github.io/ubb-editor .
[demo]( http://ibone.github.io/ubb-editor )

######默认可编辑的样式
    粗体，字号，字体颜色，加链接
    （可通过添加插件来增加更多功能）

######优点：
    1.输出样式严格控制，编辑菜单上未出现的样式，是不会输出的
    2.比较其他保存原代码的编辑器，保存的内容更少
    3.真正的轻量（因为功能少）
    4.有单元测试（这个能当优点么）
    
######缺点：
    1.在输出的时候，需要对内容解码（前端和后端都行）
    2.文本编辑功能有限（功能太多的话，感觉ubb这样的模式就不适合了）
    3.目前就我一个人在维护=。=
    
######兼容性： 
    IE 6-9
    Chrome
    firefox

######保存的规则如下：
        [font4][/font]
        <font style="font-size:18px;"></font>
        
        [font666666][/font]
        <font style="color:#666666;"></font>
    
        [b][/b]
        <strong></strong>
    
        [p][/p]
        <p></p>
    
        [aend]href="example.com"[end][/a]
        <a href="example.com"></a>
    
        [br]
        <br/>
        ......
        一个标签最多配一个属性
        多个属性需要多个标签来表达
        属性如果是自定义的，这需要当内容来处理，比如a标签
        
######使用：
    <textarea id="editor"></textarea>
    <script>
        $('#editor').ubb_editor();
    </script>

######安装：
    需要安装grunt来生成完整的ubb_editor.js
    安装教程:http://www.gruntjs.org
    生成目录dist/ubb_editor.js
