var EntityFinder = (function() {
	var grid;

	var init = function()
	{
		queryBox.show();
	}

	var queryBox = (function() {
		var newDiv;
		var grid;
		var show = function() {

			grid = parent.frames["contentIFrame"].document.getElementById("crmGrid").control;
			newDiv = document.createElement('div');
			newDiv.innerHTML = markup.box;
			
			document.firstElementChild.appendChild(newDiv);
			document.getElementById("closeBtn").onclick = function() {
				hide();
			}
			document.getElementById("advancedFilterBtn").onclick = function() {
				var field = document.getElementById("field").value;
				var entity = grid.get_entityTypeName();
				setFetchXml(getFetchXml(entity, field, document.getElementById("searchString").value), grid);
				hide();
			}
		}

		var hide = function() {
			newDiv.parentNode.removeChild(newDiv);
		}

		return {
			show: show
		}
	})();

	// Set new fetchxml to grid and refresh
	var setFetchXml = function(fetchXml, grid) {
		grid.SetParameter("fetchXml", fetchXml);
		grid.refresh();
	}

	// comma seperated list of account numbers
	var getFetchXml = function(entity, field, values)
	{
		var conditions = '';
		var valueArray;
		console.log(values.indexOf(','));
		if(values.indexOf(',') != -1)
		{
			valueArray = values.split(',');
		} else {
			valueArray = values.split('\n')
		}
		for(var i = 0; i < valueArray.length; i++)
		{
			conditions += "<condition attribute='" + field + "' operator='eq' value='" + valueArray[i] + "' />";
		}

		    var fetchXml = 	"<fetch mapping='logical'>" + 
	    		   		"<entity name='" + entity + "'>" +
      						"<filter type='and'>" +  
      							"<filter type='or'>" +
            						conditions +
            					"</filter>" +
          					"</filter>" + 
						"</entity>" + 
					"</fetch>";
		return fetchXml;
	}

	var styles = new function() {
		this.box =		'position:absolute;' + 
						'top:30%;' + 
						'left:30%;' + 
						'box-shadow:0 5px 15px rgba(0, 0, 0, 0.5);' +
						'border:1px solid rgba(0, 0, 0, 0.2);' + 
						'border-radius:6px;' + 
						'padding:30px;' + 
						'font-family:"Helvetica Neue", Helvetica, Arial, sans-serif"' + 
						'background-color:#ffffff;';

		this.input = 	'padding: 6px 12px;' +
						'border: 1px solid #cccccc;' +
						'border-radius: 4px;' + 
						'width:100%;';

		this.button =	'padding:6px 12px;' + 
						'border:1px solid transparent;' +
						'border-radius:4px;' + 
						'border-color:#adadad;' + 
						'background-color:#ffffff;' +
						'cursor:pointer;' + 
						'font-size:14px;' + 
						'color:#333333;' + 
						'background-image:none;' + 
						'height:100%;';

		this.button_b = 'background-color:#428bca!important;' +
						'color:#ffffff!important;' +  
						 this.button;
	};

	var markup = new function() {
		this.box = 		'<div id="innerBox" style="' + styles.box + '">Field:<br /><input type="text" id="field" style="' + styles.input + '"></select><br /><br />Values: <br /><textarea rows="10" cols="50" id="searchString" style="' + styles.input + 
						'"></textarea><br /><button id="advancedFilterBtn" style="' + 
						styles.button_b + '">Search</button>' +
						'&nbsp;<button id="closeBtn" style="' + styles.button + '">Close</button></div>';;
	};

	return {
		init: init, 
	}
})();

