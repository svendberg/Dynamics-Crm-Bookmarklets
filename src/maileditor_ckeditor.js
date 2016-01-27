var MailEditor = (function() {
   var crmFrame = frames[0].document;
   var addScript=function(filename,callback){
            var e=crmFrame.createElement('script');
            e.type = 'text/javascript';
            e.src = filename;
            if(callback){
                e.onloadDone=false;//for Opera
                e.onload=function(){e.onloadDone=true;callback();};
                e.onReadystatechange=function(){
                    if(e.readyState==='loaded'&& !e.onloadDone){
                        e.onloadDone=true;callback();
                    }
                };
            }
        if(typeof(e)!=='undefined'){
            crmFrame.getElementsByTagName('head')[0].appendChild(e);
        }
    };


	var start = function() {
		addScript('http://cdn.ckeditor.com/4.5.6/standard/ckeditor.js', function(){init();});
	};
	var init = function() {
		var newDiv;
		newDiv = crmFrame.createElement('textarea');
		newDiv.setAttribute('id', 'editor1');
		// var textarea = crmFrame.getElementById('areaForm').appendChild(newDiv);
		var textarea = crmFrame.getElementById('description_d').parentNode.appendChild(newDiv);
        var Xrm;
 
        $(document).ready(function () {
			CKEDITOR = frames[0].CKEDITOR;
			CKEDITOR.replace(textarea);
            var Xrm = frames[0].Xrm;
            var oldValue = Xrm.Page.getAttribute("description").getValue();
            if(oldValue)
            {
				crmFrame.getElementById('editor1').value = oldValue;
			}
 
            CKEDITOR.instances.editor1.on('blur', function () {
                var value = CKEDITOR.instances.editor1.getData();
				Xrm.Page.getAttribute("description").setValue(value);
           });
        });
	};

	return {
		show: start, 
	};
})();
MailEditor.show();

