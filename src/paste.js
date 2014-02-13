var paste = function(event,editor_dom,callback){
    function getSel(w){ 
        return w.getSelection ? w.getSelection() : w.document.selection; 
    } 
    function setRange(sel,r){ 
        sel.removeAllRanges(); 
        sel.addRange(r); 
    } 
    function filterPasteData(originalText){
        var newText=originalText; 
        newText = newText.replace(/&nbsp;/ig, ' ');
        newText = newText.replace(/\n\s*\n/g, '\n');
        newText = newText.replace(/<br[^>]*>/ig, '\n');
        newText = newText.replace(/<\/p><p[^>]*>/ig, '\n');
        newText = newText.replace(/<[^>]+>/g, '');
        newText = newText.replace(/ {2}/g, ' &nbsp;');
        if (/\n/.test(newText)) {
            newText = newText.replace(/^/, '<p>').replace(/$/, '<br /></p>').replace(/\n/g, '<br /></p><p>');
        }
        return newText; 
    } 
    function block(e){ 
        e.preventDefault(); 
    } 
    var w,or,divTemp,originText; 
    var newData; 
    function pasteClipboardData(e){
        var objEditor = editor_dom; 
        var edDoc=objEditor.contentWindow.document; 
        if($.browser.msie){
            var orRange=objEditor.contentWindow.document.selection.createRange(); 
            var ifmTemp=document.getElementById("ifmTemp"); 
            if(!ifmTemp){
                ifmTemp=document.createElement("IFRAME"); 
                ifmTemp.id="ifmTemp"; 
                ifmTemp.style.width="1px"; 
                ifmTemp.style.height="1px"; 
                ifmTemp.style.position="absolute"; 
                ifmTemp.style.border="none"; 
                ifmTemp.style.left="-10000px"; 
                ifmTemp.src="iframeblankpage.html"; 
                document.body.appendChild(ifmTemp); 
                ifmTemp.contentWindow.document.designMode = "On"; 
                ifmTemp.contentWindow.document.open(); 
                ifmTemp.contentWindow.document.write("<body></body>"); 
                ifmTemp.contentWindow.document.close(); 
            }else{
                ifmTemp.contentWindow.document.body.innerHTML=""; 
            }
            originText=objEditor.contentWindow.document.body.innerText; 
            ifmTemp.contentWindow.focus(); 
            ifmTemp.contentWindow.document.execCommand("Paste",false,null); 
            objEditor.contentWindow.focus(); 
            newData=ifmTemp.contentWindow.document.body.innerHTML; 
            //filter the pasted data 
            newData=filterPasteData(newData); 
            ifmTemp.contentWindow.document.body.innerHTML=newData; 
            //paste the data into the editor 
            orRange.pasteHTML(newData); 
            //即时将编辑器中的内容输入到textarea中
            callback();
            //block default paste 
            if(e){
                e.returnValue = false; 
                if(e.preventDefault) 
                e.preventDefault(); 
            } 
            return false; 
        }else{
            enableKeyDown=false; 
            //create the temporary html editor 
            var divTemp=edDoc.createElement("DIV"); 
            divTemp.id='htmleditor_tempdiv'; 
            divTemp.innerHTML='\uFEFF'; 
            divTemp.style.left="-10000px"; //hide the div 
            divTemp.style.height="1px"; 
            divTemp.style.width="1px"; 
            divTemp.style.position="absolute"; 
            divTemp.style.overflow="hidden"; 
            edDoc.body.appendChild(divTemp); 
            //disable keyup,keypress, mousedown and keydown 
            objEditor.contentWindow.document.addEventListener("mousedown",block,false); 
            objEditor.contentWindow.document.addEventListener("keydown",block,false); 
            enableKeyDown=false; 
            //get current selection; 
            w=objEditor.contentWindow; 
            or=getSel(w).getRangeAt(0); 
            //move the cursor to into the div 
            var docBody=divTemp.firstChild; 
            rng = edDoc.createRange(); 
            rng.setStart(docBody, 0); 
            rng.setEnd(docBody, 1); 
            setRange(getSel(w),rng); 
            originText=objEditor.contentWindow.document.body.textContent; 
            if(originText==='\uFEFF'){
                originText=""; 
            } 
            window.setTimeout(function(){
                //get and filter the data after onpaste is done 
                if(divTemp.innerHTML==='\uFEFF'){
                    newData=""; 
                    edDoc.body.removeChild(divTemp); 
                    return;
                } 
                newData=divTemp.innerHTML; 
                // Restore the old selection 
                if (or){
                    setRange(getSel(w),or); 
                } 
                newData=filterPasteData(newData); 
                divTemp.innerHTML=newData; 
                //paste the new data to the editor 
                objEditor.contentWindow.document.execCommand('inserthtml', false, newData ); 
                edDoc.body.removeChild(divTemp); 
                //即时将编辑器中的内容输入到textarea中
                callback();
            },0); 
            //enable keydown,keyup,keypress, mousedown; 
            enableKeyDown=true; 
            objEditor.contentWindow.document.removeEventListener("mousedown",block,false); 
            objEditor.contentWindow.document.removeEventListener("keydown",block,false); 
            return true; 
        }
    }
    pasteClipboardData(event);
}