ubb-editor是类ubb代码格式的可视化编辑器，目的是将用户编辑出来的内容不再保存成html的格式，而是ubb的格式。
适用于编辑样式比较简单的文章和评论。
######保存的规则如下：
        [font4666666][/font]
        <font style="font-size:18px;color:#666666;"></font>
    
        [b][/b]
        <strong></strong>
    
        [p][/p]
        <p></p>
    
        [a end]href="example.com"[end][/a]
        <a href="example.com"></a>
    
        [br]
        <br/>
        ......
######表情的转换如下：
        [哈哈]          : <img src="haha.jpg"/>
        ......
        （可参考微博默认表情系统）
######安装：
        需要安装grunt来生成完整的ubb_editor.js
        安装教程:http://www.gruntjs.org
        目录dist/ubb_editor.js

