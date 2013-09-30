var EntityFinder = (function() {
	var grid;

	var init = function()
	{
		queryBox.show();
		grid = parent.frames["contentIFrame"].document.getElementById("crmGrid").control;
	}

	var queryBox = (function() {
		var newDiv;
		var show = function() {
			newDiv = document.createElement('div');
			newDiv.innerHTML =  'Account numbers: ( comma seperated )<br /><textarea rows="5" cols="30" id="searchString"></textarea><br /><button id="advancedFilterBtn">Search</button>' +
								'&nbsp;<button id="closeBtn">Close</button>';
			newDiv.style.cssText = 'position:fixed;top:50%;left:50%;width:300px;height:200px;border:thin solid black;padding:30px;background-color:white;';
			document.firstElementChild.appendChild(newDiv);
			document.getElementById("closeBtn").onclick = function() {
				hide();
			}
			document.getElementById("advancedFilterBtn").onclick = function() {
				setFetchXml(grid, getFetchXml(document.getElementById("searchString").value));
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
	var setFetchXml = function(grid, fetchXml) {
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

	return {
		init: init
	}
})();