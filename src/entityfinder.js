/*exported EntityFinder */
var EntityFinder = (function() {
	'use strict';
	var newDiv;

	var init = function(grid) {
		newDiv = document.createElement('div');
		newDiv.innerHTML = markup.box;

		document.body.appendChild(newDiv);
		document.getElementById('closeBtn').onclick = function() {
			hide();
		};
		document.getElementById('advancedFilterBtn').onclick = function() {
			var field = document.getElementById('field').value;
			var entity = grid.get_entityTypeName();
			setFetchXml(getFetchXml(entity, field, document.getElementById('searchString').value), grid);
			hide();
		};
	};

	var hide = function() {
		newDiv.parentNode.removeChild(newDiv);
	};

	var setFetchXml = function(fetchXml, grid) {
		grid.SetParameter('fetchXml', fetchXml);
		grid.refresh();
	};

	var getFetchXml = function(entity, field, values)
	{
		var conditions = '';
		var valueArray;
		if(values.indexOf(',') != -1)
		{
			valueArray = values.split(',');
		} else {
			valueArray = values.split('\n');
		}
		for (var i = 0; i < valueArray.length; i++) {
			conditions += '<condition attribute="' + field + '" operator="eq" value="' + valueArray[i] + '" />';
		}

		var fetchXml = '<fetch mapping="logical">' + 
		'<entity name="' + entity + '">' +
		'<filter type="and">' +  
		'<filter type="or">' +
		conditions +
		'</filter>' +
		'</filter>' + 
		'</entity>' + 
		'</fetch>';
		return fetchXml;
	};

	var styles = function() {
		var obj = {};
		obj.box = 'position:absolute;' + 
		'top:30%;' + 
		'left:30%;' + 
		'box-shadow:0 5px 15px rgba(0, 0, 0, 0.5);' +
		'border:1px solid rgba(0, 0, 0, 0.2);' + 
		'border-radius:6px;' + 
		'padding:30px;' + 
		'font-family:Helvetica Neue, Helvetica, Arial, sans-serif;' + 
		'color:#333333;' + 
		'font-size:14px;' + 
		'background-color:#ffffff;';

		obj.input = 'padding: 6px 12px;' +
		'border: 1px solid #cccccc;' +
		'border-radius: 4px;' + 
		'width:100%;' +
		'box-sizing:border-box;';

		obj.button =	'padding:6px 12px;' + 
		'border:1px solid transparent;' +
		'border-radius:4px;' + 
		'border-color:#adadad;' + 
		'background-color:#ffffff;' +
		'cursor:pointer;' + 
		'font-size:14px;' + 
		'color:#333333;' + 
		'background-image:none;' + 
		'height:100%;';

		obj.button_b = 'background-color:#428bca!important;' +
		'color:#ffffff!important;' +  
		obj.button;
		return obj;
	}();

	var markup = function() {
		var obj = {};
		obj.box = '<div id="innerBox" style="' + styles.box + '"><strong>Searchfield:</strong><br /><input type="text" id="field" style="' + styles.input + '"></select><br />' + 
		'<br /><strong>Values:</strong><br /><textarea rows="10" cols="50" id="searchString" style="' + styles.input + 
		'"></textarea><br /><button id="advancedFilterBtn" style="' + 
		styles.button_b + '">Search</button>' +
		'&nbsp;<button id="closeBtn" style="' + styles.button + '">Close</button></div>';
		return obj;
	}();

	return {
		show: init, 
	};
})();


grid = parent.frames.contentIFrame.document.getElementById("crmGrid").control;
EntityFinder.show(grid);
