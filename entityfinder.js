var EntityFinder = (function() {
	var grid;

	var init = function()
	{
		queryBox.show();
	}

	var queryBox = (function() {
		var newDiv;
		var show = function() {
			newDiv = document.createElement('div');
			newDiv.style.cssText = styles.box;
			newDiv.innerHTML = markup.box;
			
			document.firstElementChild.appendChild(newDiv);
			document.getElementById("closeBtn").onclick = function() {
				hide();
			}
			document.getElementById("advancedFilterBtn").onclick = function() {
				setFetchXml(getFetchXml(document.getElementById("searchString").value));
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
	var setFetchXml = function(fetchXml) {
		grid = parent.frames["contentIFrame"].document.getElementById("crmGrid").control;
		grid.SetParameter("fetchXml", fetchXml);
		grid.refresh();
	}

	// comma seperated list of account numbers
	var getFetchXml = function(accountNumbers)
	{
		var conditions = "";
		var numbers = accountNumbers.split(',');
		for(var i = 0; i < numbers.length; i++)
		{
			conditions += "<condition attribute='accountnumber' operator='eq' value='" + numbers[i] + "' />";
		}

		    var fetchXml = 	"<fetch mapping='logical'>" + 
	    		   		"<entity name='account'>" +
      						"<attribute name='accountid'/>" +  
      						"<attribute name='name'/>" +
      						"<attribute name='accountnumber'/>" +
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
						'top:50%;' + 
						'left:50%;' + 
						'width:300px;' + 
						'height:200px;' + 
						'box-shadow:0 5px 15px rgba(0, 0, 0, 0.5);' +
						'border:1px solid rgba(0, 0, 0, 0.2);' + 
						'border-radius:6px;' + 
						'padding:30px;';

		this.button =	'padding:6px 12px;' + 
						'border:1px solid transparent;' +
						'border-radius:4px;' + 
						'border-color:#adadad;' + 
						'background-color:#ffffff;' +
						'cursor:pointer;' + 
						'font-size:14px;' + 
						'color:#333333';

		this.button_b = 'background-color:#428bca!important;' +
						'color:#ffffff!important;' +  
						 this.button;
	};

	var markup = new function() {
		this.box = 		'Account numbers: ( comma seperated )<br /><textarea rows="5" cols="30" id="searchString"></textarea><br /><button id="advancedFilterBtn" style="' + styles.button_b + '">Search</button>' +
						'&nbsp;<button id="closeBtn" style="' + styles.button + '">Close</button>';;
	};

	return {
		init: init, 
		styles: styles
	}
})();

