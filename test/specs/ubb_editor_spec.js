describe("编辑器初始化条件", function() {
    beforeEach(function(){
        $('body').append('<textarea></textarea>');
    });
    afterEach(function(){
        $('textarea').remove();
        $('.ubb_editor_wrap').remove();
    });
    it("存在ubb_editor这个jquery插件", function() {
        expect(!$.ubb_editor).toBe(false);
    });
    it("写入textarea", function() {
        expect($('textarea').length).toBe(1);
    });
    it("生成ubb编辑器", function() {
        $('textarea').ubb_editor(function(){
            expect($('.ubb_editor_wrap').length).toBe(1);
        });
    });
});
describe("标签a编码", function() {
    beforeEach(function(){
        $('body').append('<textarea></textarea>');
    });
    afterEach(function(){
        $('textarea').remove();
        $('.ubb_editor_wrap').remove();
    });
    it("包含href属性", function() {
        $('textarea').ubb_editor(function(editor){
            editor.iframe_document.body.innerHTML = '<A href="http://google.com/">google.com</a>';
            expect(html_to_ubb(editor)).toBe('[aend]href="http://google.com/"[end]google.com[/a]');
            //ie中会补全链接尾部，添加一个'/'
        });
    });
    it("不包含href属性", function() {
        $('textarea').ubb_editor(function(editor){
            editor.iframe_document.body.innerHTML = '<a><img src="google.com"></a>';
            jasmine.log('log:' + html_to_ubb(editor));
            expect(html_to_ubb(editor)).toBe('');
        });
    });
});
describe("标签font编码", function() {
    beforeEach(function(){
        $('body').append('<textarea></textarea>');
    });
    afterEach(function(){
        $('textarea').remove();
        $('.ubb_editor_wrap').remove();
    });
    //根据特有属性来赋值ubb
    it("标签font编码的color", function() {
        $('textarea').ubb_editor(function(editor){
            editor.iframe_document.body.innerHTML = '<font ubb-color="000000">test</font>';
            expect(html_to_ubb(editor)).toBe('[font000000]test[/font]');
        });
    });
    it("标签font编码的size", function() {
        $('textarea').ubb_editor(function(editor){
            editor.iframe_document.body.innerHTML = '<font ubb-size="3">test</font>';
            expect(html_to_ubb(editor)).toBe('[font3]test[/font]');
        });
    });
});
describe("其他标签编码", function() {
    beforeEach(function(){
        $('body').append('<textarea></textarea>');
    });
    afterEach(function(){
        $('textarea').remove();
        $('.ubb_editor_wrap').remove();
    });
    it("p标签 ==> [p]", function() {
        $('textarea').ubb_editor(function(editor){
            editor.iframe_document.body.innerHTML = '<p>test</p>';
            expect(html_to_ubb(editor)).toBe('[p]test[/p]');
        });
    });
    it("div标签 ==> [p]", function() {
        $('textarea').ubb_editor(function(editor){
            editor.iframe_document.body.innerHTML = '<div>test</div>';
            expect(html_to_ubb(editor)).toBe('[p]test[/p]');
        });
    });
    it("strong标签 ==> [b]", function() {
        $('textarea').ubb_editor(function(editor){
            editor.iframe_document.body.innerHTML = '<strong>test</strong>';
            expect(html_to_ubb(editor)).toBe('[b]test[/b]');
        });
    });
    it("b标签 ==> [b]", function() {
        $('textarea').ubb_editor(function(editor){
            editor.iframe_document.body.innerHTML = '<B>test</B>';
            expect(html_to_ubb(editor)).toBe('[b]test[/b]');
        });
    });
    // it("空格 ==> [s]", function() {
        // $('textarea').ubb_editor(function(editor){
            // editor.iframe_document.body.innerHTML = '&nbsp;1';
            // expect(html_to_ubb(editor)).toBe('[s]1');
            // editor.iframe_document.body.innerHTML = '&nbsp;&nbsp;;2';
            // expect(html_to_ubb(editor)).toBe('[s][s];2');
        // });
    // });
    //ie中会把连续的空格转换成1个空格
    //ie中不带分号的&nbsp会吞掉后续的字符
    it("<br> ==> [br]", function() {
        $('textarea').ubb_editor(function(editor){
            editor.iframe_document.body.innerHTML = '<br>';
            expect(html_to_ubb(editor)).toBe('[br]');
            editor.iframe_document.body.innerHTML = '<br/>';
            expect(html_to_ubb(editor)).toBe('[br]');
        });
    });
    it("非配对标签不能被匹配", function() {
        $('textarea').ubb_editor(function(editor){
            editor.iframe_document.body.innerHTML = '<img src="google.com"></a>';
            jasmine.log('log:' + html_to_ubb(editor));
            expect(html_to_ubb(editor)).toBe('');
            editor.iframe_document.body.innerHTML = '<a><img src="google.com"></a>';
            jasmine.log('log:' + html_to_ubb(editor));
            expect(html_to_ubb(editor)).toBe('');
        });
    });
});
describe("文本选中反馈", function() {
    beforeEach(function(){
        $('body').append('<textarea></textarea>');
    });
    afterEach(function(){
        $('textarea').remove();
        $('.ubb_editor_wrap').remove();
    });
    it("选中颜色反馈", function() {
        $('textarea').ubb_editor(function(editor){
            editor.iframe_document.body.innerHTML = '<font style="color:#77cc33">test</font><font style="color:#77CC32">test</font>';
            editor.move_cursor(2);
            $(editor.iframe_document).trigger('mouseup');
            jasmine.log(editor.iframe_document.body.innerHTML);
            expect($.rgb_to_hex(editor.find('.font-color i').css('background-color'))).toBe('#77cc33');
            //选中颜色如果不是配置的颜色，则反馈默认色
            editor.move_cursor(6);
            $(editor.iframe_document).trigger('mouseup');
            expect($.rgb_to_hex(editor.find('.font-color i').css('background-color'))).toBe('#000000');
        });
    });
    it("选中字号反馈", function() {
        $('textarea').ubb_editor(function(editor){
            editor.iframe_document.body.innerHTML = '<font style="font-size:16px;">test</font><font style="font-size:20px;">test</font>';
            editor.move_cursor(2);
            $(editor.iframe_document).trigger('mouseup');
            jasmine.log($(editor.selection_text_container).css('font-size'));
            expect(editor.find('.font-size a').text()).toBe('大号字体');
            //选中字号如果不是配置的字号，则反馈默认字号
            editor.move_cursor(6);
            $(editor.iframe_document).trigger('mouseup');
            expect(editor.find('.font-size a').text()).toBe('小号字体');
        });
    });
    it("选中粗体反馈", function() {
        $('textarea').ubb_editor(function(editor){
            editor.iframe_document.body.innerHTML = '<b>test</b><strong>test</strong><font style="font-weight:bold;">test</font><font style="font-weight:700;">test</font><font>test</font>';
            editor.move_cursor(2);
            $(editor.iframe_document).trigger('mouseup');
            expect(editor.find('.font-bold a').hasClass('on')).toBe(true);
            editor.move_cursor(6);
            $(editor.iframe_document).trigger('mouseup');
            expect(editor.find('.font-bold a').hasClass('on')).toBe(true);
            editor.move_cursor(10);
            $(editor.iframe_document).trigger('mouseup');
            expect(editor.find('.font-bold a').hasClass('on')).toBe(true);
            editor.move_cursor(14);
            $(editor.iframe_document).trigger('mouseup');
            expect(editor.find('.font-bold a').hasClass('on')).toBe(true);
            editor.move_cursor(18);
            $(editor.iframe_document).trigger('mouseup');
            expect(editor.find('.font-bold a').hasClass('on')).toBe(false);
        });
    });
});
describe("特有属性生成", function() {
    beforeEach(function(){
        $('body').append('<textarea></textarea>');
    });
    afterEach(function(){
        $('textarea').remove();
        $('.ubb_editor_wrap').remove();
    });
    it("颜色属性生成", function() {
        
    });
    it("颜色属性生成不能含有非配置色", function() {
        
    });
    describe("样式极端测试", function() {
        it("父级color不赋值给子节点", function() {
            $('textarea').ubb_editor(function(editor){
                editor.iframe_document.body.innerHTML = '<font style="color:#bb0000">te<font size="3">st</font></font>';
                editor.buttons.btn_color.exec(editor,editor.find('.ubb_color_panel a')[0]);
                editor.buttons.btn_size.exec(editor,editor.find('.ubb_size_panel a')[0]);
                jasmine.log(editor.iframe_document.body.innerHTML);
                var html = editor.iframe_document.body.innerHTML;
                expect(html_to_ubb(editor)).toBe('[fontbb0000]te[font3]st[/font][/font]');
            });
        });
    });
});
describe("按钮生成", function() {
    beforeEach(function(){
        $('body').append('<textarea></textarea>');
    });
    afterEach(function(){
        $('textarea').remove();
        $('.ubb_editor_wrap').remove();
    });
    it("生成两个按钮", function() {
        $('textarea').ubb_editor({
            toolbar : ['btn_bold', 'btn_color']
        },function(editor){
            editor.iframe_document.body.innerHTML = '<p>test</p>';
            expect(editor.find('.font-btns').length).toBe(2);
        });
    });
    it("只有btn_bold按钮", function() {
        $('textarea').ubb_editor({
            toolbar : ['btn_bold']
        },function(editor){
            editor.iframe_document.body.innerHTML = '<p>test</p>';
            expect(editor.find('.font-bold').length).toBe(1);
            expect(editor.find('.font-btns').length).toBe(1);
        });
    });
});
describe("按钮点击功能正常", function() {
    beforeEach(function(){
        $('body').append('<textarea></textarea>');
    });
    afterEach(function(){
        $('textarea').remove();
        $('.ubb_editor_wrap').remove();
    });
    it("加粗按钮正常", function() {

    });
    it("颜色按钮正常", function() {

    });
    it("字号按钮正常", function() {

    });
    it("链接按钮正常", function() {
        //在ie7下会失去焦点，然后功能不正常
    });
});
describe("文本解码", function() {
    it("todo", function() {

    });
});
describe("粘贴文本格式清除", function() {
    it("todo", function() {

    });
});



