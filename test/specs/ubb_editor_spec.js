describe("body", function() {
    beforeEach(function(){
        $('body').append('<textarea></textarea>');
    })
    afterEach(function(){
        $('textarea').remove();
        $('.ubb_editor_wrap').remove();
    })
    it("写入textarea", function() {
        expect($('textarea').length).toBe(1);
    });
    it("生成ubb编辑器", function() {
        $('textarea').ubb_editor();
        expect($('.ubb_editor_wrap').length).toBe(1);
    });
});
describe("标签a编码", function() {
    beforeEach(function(){
        $('body').append('<textarea></textarea>');
    })
    afterEach(function(){
        $('textarea').remove();
        $('.ubb_editor_wrap').remove();
    })
    it("标签a编码", function() {
        $('textarea').ubb_editor(function(editor){
            editor.iframe_document.body.innerHTML = '<A href="http:\\google.com">google.com</a>';
            expect(html_to_ubb(editor)).toBe('[aend]href="http:\\google.com"[end]google.com[/a]');
        });
    });
});
describe("标签font编码", function() {
    beforeEach(function(){
        $('body').append('<textarea></textarea>');
    })
    afterEach(function(){
        $('textarea').remove();
        $('.ubb_editor_wrap').remove();
    })
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
    it("属性顺序，先size后color", function() {
        $('textarea').ubb_editor(
            {
                weight:['btn_size', 'btn_color', 'btn_bold', 'btn_link']
            },
            function(editor){
                editor.iframe_document.body.innerHTML = '<font ubb-size="3" ubb-color="000000">test</font>';
                expect(html_to_ubb(editor)).toBe('[font3000000]test[/font]');
            }
        );
    });
    it("属性顺序，先color后size", function() {
        $('textarea').ubb_editor(
            {
                weight:['btn_color', 'btn_size', 'btn_bold', 'btn_link']
            },
            function(editor){
                editor.iframe_document.body.innerHTML = '<font ubb-size="3" ubb-color="000000">test</font>';
                expect(html_to_ubb(editor)).toBe('[font0000003]test[/font]');
            }
        );
    });
});
describe("其他标签编码", function() {
    beforeEach(function(){
        $('body').append('<textarea></textarea>');
    })
    afterEach(function(){
        $('textarea').remove();
        $('.ubb_editor_wrap').remove();
    })
    it("p标签", function() {
        $('textarea').ubb_editor(function(editor){
            editor.iframe_document.body.innerHTML = '<p>test</p>';
            expect(html_to_ubb(editor)).toBe('[p]test[/p]');
        });
    });
    it("div标签", function() {
        $('textarea').ubb_editor(function(editor){
            editor.iframe_document.body.innerHTML = '<div>test</div>';
            expect(html_to_ubb(editor)).toBe('[p]test[/p]');
        });
    });
    it("strong标签", function() {
        $('textarea').ubb_editor(function(editor){
            editor.iframe_document.body.innerHTML = '<strong>test</strong>';
            expect(html_to_ubb(editor)).toBe('[b]test[/b]');
        });
    });
    it("b标签", function() {
        $('textarea').ubb_editor(function(editor){
            editor.iframe_document.body.innerHTML = '<B>test</B>';
            expect(html_to_ubb(editor)).toBe('[b]test[/b]');
        });
    });
});
describe("文本选中反馈", function() {
    it("todo", function() {

    });
});
describe("按钮生成", function() {
    it("todo", function() {

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



