var MailEditor=function(){var a=frames[0].document,b=function(b,c){var d=a.createElement("script");d.type="text/javascript",d.src=b,c&&(d.onloadDone=!1,d.onload=function(){d.onloadDone=!0,c()},d.onReadystatechange=function(){"loaded"!==d.readyState||d.onloadDone||(d.onloadDone=!0,c())}),"undefined"!=typeof d&&a.getElementsByTagName("head")[0].appendChild(d)},c=function(){b("http://cdn.ckeditor.com/4.5.6/standard/ckeditor.js",function(){d()})},d=function(){var b;b=a.createElement("textarea"),b.setAttribute("id","editor1");var c=a.getElementById("description_d").parentNode.appendChild(b);$(document).ready(function(){CKEDITOR=frames[0].CKEDITOR,CKEDITOR.replace(c);var b=frames[0].Xrm,d=b.Page.getAttribute("description").getValue();d&&(a.getElementById("editor1").value=d),CKEDITOR.instances.editor1.on("blur",function(){var a=CKEDITOR.instances.editor1.getData();b.Page.getAttribute("description").setValue(a)})})};return{show:c}}();MailEditor.show();