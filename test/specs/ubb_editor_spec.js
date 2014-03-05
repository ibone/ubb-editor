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
    it("标签a编码", function() {
        $('textarea').ubb_editor(function(editor){
            editor.iframe_document.body.innerHTML = '<A href="http://google.com/">google.com</a>';
            expect(html_to_ubb(editor)).toBe('[aend]href="http://google.com/"[end]google.com[/a]');
            //ie中会补全链接尾部，添加一个'/'
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
    it("空格 ==> [s]", function() {
        $('textarea').ubb_editor(function(editor){
            editor.iframe_document.body.innerHTML = '&nbsp;1';
            expect(html_to_ubb(editor)).toBe('[s]1');
            editor.iframe_document.body.innerHTML = '&nbsp;&nbsp;;2';
            expect(html_to_ubb(editor)).toBe('[s][s];2');
            //ie中会把连续的空格转换成1个空格
            //ie中不带分号的&nbsp会吞掉后续的字符
        });
    });
    it("<br> ==> [br]", function() {
        $('textarea').ubb_editor(function(editor){
            editor.iframe_document.body.innerHTML = '<br>';
            expect(html_to_ubb(editor)).toBe('[br]');
            editor.iframe_document.body.innerHTML = '<br/>';
            expect(html_to_ubb(editor)).toBe('[br]');
        });
    });
});
describe("文本选中反馈", function() {
    beforeEach(function(){
        $('body').append('<textarea></textarea>');
    });
    afterEach(function(){
        //$('textarea').remove();
        //$('.ubb_editor_wrap').remove();
    });
    it("选中颜色反馈", function() {
        $('textarea').ubb_editor(function(editor){
            editor.iframe_document.body.innerHTML = '<font id="test" ubb-color="000000" style="color:#000000">testtestt</font>';
            editor.move_cursor(2);
            $(editor.iframe_document).click();
            expect(editor.find('.font-color i').css('background-color')).toBe('#000000');
        });
    });
    it("todo", function() {
    
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

    });
    describe("按钮极端测试", function() {
        it("父级color不赋值给子节点", function() {
            $('textarea').ubb_editor(function(editor){
                editor.iframe_document.body.innerHTML = '<font style="color:#dd0000">te<font size="3">st</font></font>';
                editor.buttons.btn_color.exec(editor,editor.find('.ubb_color_panel a')[0]);
                editor.buttons.btn_size.exec(editor,editor.find('.ubb_size_panel a')[0]);
                jasmine.log(editor.iframe_document.body.innerHTML);
                expect(html_to_ubb(editor)).toBe('[fontdd0000]te[font3]st[/font][/font]');
            });
        });
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



