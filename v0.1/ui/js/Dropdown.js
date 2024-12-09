function Dropdown(location, url, delay){

	var that = this;
	var dropdownLocation = location;
	var dropdownID = "ddid-" + Math.floor((Math.random() * 1000000) + 1000000);
	var uniqueIdentifier = dropdownID + "-";
	var dataURL = url;
	var prebuiltData;
	var dataArray = [];
	var JSONDataArray = [];
	var tag;
	var all = false;
	var defaultTitle;

	var dropdownWrapper;

	var dropdownTitleText, displayText;
	var dropdownHightlight = "#61e8e1";
	var dropdownLowlight = "#D2D7DF";
	var mode = "multiple";
	var bgColor = "white";
	var fontColor = "#262626";
	var borderColor = "#f2f2f2";
	var borderRadius = '0px';

	var loadOptions = [];
	var options = [];
	var loadOptionsIDs = [];
	var optionsIDs = [];

	var selectedOptions = [];
	var selectedText = [];
	var filterOptions = [];
	var limit = 10;
	var start = 0;
	var page = 1;
	var pages,lastPage;
	var itemsWrapper;
	var dropdownInput;
	var dropdownSelectedItemWrapper;

	var updatable = false;
	var open = false;

	function init(){
		insertCSS();
		if(prebuiltData){
			handleData(prebuiltData);
		}else if(dataArray.length){
			handleDataArray(dataArray);
		}else if(JSONDataArray.length){
			handleJSON(JSONDataArray)
		}else{
			genericOptions();
		}
		createDropdown();
		
		// if(!eventListerner){
		// 	document.addEventListener("click", function(e){ detectClick(e) });
		// 	eventListerner = true;
		// }
		
	}

	this.delayedInit = function(){
		init();
	}

	this.setTag = function(specialTag){
		tag = specialTag;
	}

	this.enableAll = function(){
		all = true;
	}

	this.setPrebuiltData = function(passedData){
		prebuiltData = passedData;
	}

	this.setDataArray = function(passedDataArray){
		// console.log(dataArray.length)
		if(passedDataArray.length) dataArray = passedDataArray;
		
	}

	this.setJSONData = function (passedDataArray){
		if(passedDataArray.length) JSONDataArray = passedDataArray;
	}

	this.setColors = function(high, low){
		dropdownHightlight = high;
		dropdownLowlight = low;
		insertCSS();
	}

	this.setBackgroundColor = function(color){
		bgColor = color;
		insertCSS();
	}

	this.setTextColor = function(color){
		fontColor = color;
		insertCSS();
	}

	this.setBorderColor = function(color){
		borderColor = color;
		insertCSS();
	}

	this.setBorderRadius = function(radius){
		borderRadius = radius;
		insertCSS();
	}

	this.setLimit = function(perPage){
		limit = perPage;
	}

	this.setTitle = function(newTitle){
		if(updatable){
			var titleWrapper = document.getElementsByClassName(uniqueIdentifier + "dropdownTitle")[0]
			titleWrapper.innerText = newTitle.replace(/_/g, ' ');
			titleWrapper.title = titleWrapper.innerText;
		}else{
			setTimeout(function(){ that.setTitle(newTitle); }, 100);
		}
	}

	this.setDefaultTitle = function(title){
		defaultTitle = title;
	}

	this.setSelected = function(id, text){
		selectedOptions.push(uniqueIdentifier + id);
		selectedText.push(text);
		updateSelectedText();

		var items = dropdownWrapper.getElementsByClassName(uniqueIdentifier + "itemWrapper");
		for(var i = 0; i < items.length; i++){
			if((uniqueIdentifier + id) == items[i].id){
				items[i].setAttribute("selected", "1");
				items[i].getElementsByClassName(uniqueIdentifier + "checkBox")[0].classList.toggle(uniqueIdentifier + "hidden");
				// console.log("one")
			}else{
				
			}
		}

	}

	this.setMultipleSelected = function(ids, text){
		selectedOptions = [];
		for(var i = 0; i < ids.length; i++){
			selectedOptions.push(uniqueIdentifier + ids[i]);
		}

		selectedText = text;
		updateSelectedText();
		var items = dropdownWrapper.getElementsByClassName(uniqueIdentifier + "itemWrapper");
		for(var i = 0; i < items.length; i++){
			for(var j = 0; j < ids.length; j++){
				if((uniqueIdentifier + ids[j]) == items[i].id){
					items[i].setAttribute("selected", "1");
					items[i].getElementsByClassName(uniqueIdentifier + "checkBox")[0].classList.toggle(uniqueIdentifier + "hidden");
				}
			}
			
		}
	}

	this.returnHeaderWrapper = function(){
		return document.getElementsByClassName(uniqueIdentifier + "dropdownHeaderWrapper")[0];
	}

	this.updateData = function(newURL){
		//they can change the datasource here
	}

	this.setMode = function(newMode){
		mode = newMode;
	}

	this.getData = function(){
		// return selectedOptions;
		var exportArray = [];
		for(var i = 0; i < selectedOptions.length; i++){
			exportArray.push(selectedOptions[i].split(uniqueIdentifier)[1])
		}
		return exportArray;
	}

	this.getSingleData = function(){
		if(!selectedOptions.length) return null
		return selectedOptions[0].split(uniqueIdentifier)[1]
	}

	this.getTextValue = function(id){
		//return the text value of id
		var index = loadOptionsIDs.indexOf(uniqueIdentifier + id);
		if (index > -1) {
		  return loadOptions[index];
		}else {
			return "";
		}
	}

	this.closeAllDropdowns = function(){
		var dropdownDynamicWrapper = dropdownWrapper.getElementsByClassName(uniqueIdentifier + "dropdownDynamicWrapper")[0];
		var dropdownArrow = dropdownWrapper.getElementsByClassName(uniqueIdentifier + "dropdownArrow")[0];
		dropdownDynamicWrapper.classList.add(uniqueIdentifier + "closed");
		dropdownDynamicWrapper.classList.remove(uniqueIdentifier + "bottomBorder");
		dropdownArrow.classList.add(uniqueIdentifier + "down");
		that.resetDropdown();
	}

	this.autoRun;
	this.autoRunFunction = function() {
		if (this.autoRun) {
			this.autoRun();
			// console.log("autorun is running");
		}else{
			// console.log("autorun is not running")
		}
	}

	this.removeItem;
	this.removeItemFunction = function() {
		if (this.removeItem) {
			this.removeItem();
			// console.log("removeItem is running");
		}else{
			// console.log("removeItem is not running")
		}
	}

	this.action;
	this.returnFunction = function(param) {
		if (this.action) {
			this.action(param);
			// console.log("action is running");
		}else{
			// console.log("action is not running");
		}
	}

	this.toggleDropdown = function(){
		// var dropdownDynamicWrapper = dropdownWrapper.getElementsByClassName(uniqueIdentifier + "dropdownDynamicWrapper")[0];
		// var dropdownArrow = dropdownWrapper.getElementsByClassName(uniqueIdentifier + "dropdownArrow")[0];
		// dropdownDynamicWrapper.classList.toggle(uniqueIdentifier + "closed");
		// dropdownDynamicWrapper.classList.toggle(uniqueIdentifier + "bottomBorder");
		// dropdownArrow.classList.toggle(uniqueIdentifier + "down");
		// that.resetDropdown();
		// open = !open;
		// if(open){
			
		// }else{
		// 	document.removeEventListener("click", function(e){ detectClick(e) });
		// }
		if(open){
			that.closeDropdown();
			that.autoRunFunction();
		}else {
			that.openDropdown();
		}
	}

	this.openDropdown = function(){
		that.resetDropdown();

		var dropdownDynamicWrapper = dropdownWrapper.getElementsByClassName(uniqueIdentifier + "dropdownDynamicWrapper")[0];
		var dropdownArrow = dropdownWrapper.getElementsByClassName(uniqueIdentifier + "dropdownArrow")[0];

		dropdownDynamicWrapper.classList.remove(uniqueIdentifier + "closed");
		dropdownDynamicWrapper.classList.add(uniqueIdentifier + "bottomBorder");
		dropdownArrow.classList.remove(uniqueIdentifier + "down");

		setTimeout(function(){ document.addEventListener("click", detectClick); }, 100);
		// setTimeout(document.addEventListener("click", detectClick);1000)
		
		open = true;
		// document.addEventListener("click", detectClick);
	}

	this.closeDropdown = function(){
		this.adjustDropdownWrapperHeight();
		that.resetDropdown();
		var dropdownDynamicWrapper = dropdownWrapper.getElementsByClassName(uniqueIdentifier + "dropdownDynamicWrapper")[0];
		var dropdownArrow = dropdownWrapper.getElementsByClassName(uniqueIdentifier + "dropdownArrow")[0];

		dropdownDynamicWrapper.classList.add(uniqueIdentifier + "closed");
		dropdownDynamicWrapper.classList.remove(uniqueIdentifier + "bottomBorder");
		dropdownArrow.classList.add(uniqueIdentifier + "down");

		// document.removeEventListener("click", detectClick);
		setTimeout(function(){ document.removeEventListener("click", detectClick); }, 100);
		open = false;
	}

	this.resetDropdown = function(){
		dropdownInput.value = "";
		liveFilter();
		page = 1;
		start = 0;
		navigatePages(start, page);
	}

	this.fullResetDropdown = function(){
		dropdownInput.value = "";
		liveFilter();
		page = 1;
		start = 0;
		navigatePages(start, page);
		selectedOptions = [];
		selectedText = [];
		updateSelectedText();
	}

	this.getTitleText = function(){
		return displayText;
	}
	
	this.adjustDropdownWrapperHeight = function(){
		this.dropdownWrapper = document.getElementById(location);
		this.dropdownSelectedItemWrapper = document.getElementsByClassName(uniqueIdentifier + "dropdownSelectedItemWrapper")[0];
		var dropdownSelectedItemWrapperCurrentHeight = dropdownSelectedItemWrapper.offsetHeight;
		var newHeight = 30 + dropdownSelectedItemWrapperCurrentHeight + "px";
		this.dropdownWrapper.style.minHeight = newHeight
	}

	// function adjustDropdownWrapperHeight(){
	// 	this.dropdownWrapper = document.getElementById(location);
	// 	this.dropdownSelectedItemWrapper = document.getElementsByClassName(uniqueIdentifier + "dropdownSelectedItemWrapper")[0];
	// 	var dropdownSelectedItemWrapperCurrentHeight = dropdownSelectedItemWrapper.offsetHeight;
	// 	var newHeight = 30 + dropdownSelectedItemWrapperCurrentHeight + "px";
	// 	this.dropdownWrapper.style.minHeight = newHeight
	// }

	function detectClick(e){
		var classes = e.target.className.split(" ");
		for(var i = 0; i < classes.length; i++){
			if(classes[i].indexOf(uniqueIdentifier) !== -1){
				return;
			}else{
				that.autoRunFunction();
				that.closeDropdown();
			}
		}
	}

	function genericOptions(){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
		        dropdownTitleText =  document.getElementsByClassName(uniqueIdentifier + "dropdownTitle")[0];
		        dropdownTitleText.innerHTML = xhttp.responseXML.childNodes[0].nodeName.replace(/_/g, ' ');
		        dropdownTitleText.title = dropdownTitleText.innerHTML;
		        displayText = dropdownTitleText.innerHTML;
		        var xml = xhttp.responseXML.childNodes[0];
				xml = xml.childNodes;
				handleData(xml);
		    }
		};
		xhttp.open("GET", dataURL, true);
		xhttp.send();
	}

	function handleData(xml){
		if(all){
			loadOptions.push("All");
			loadOptionsIDs.push(uniqueIdentifier + "All");
		}
		for (i = 0; i < xml.length ;i++) {
			if(tag){
				if(xml[i].nodeName != tag) continue;
			}
			loadOptions.push(xml[i].childNodes[0].nodeValue);
		  	if(xml[i].getAttribute("id")){
		  		loadOptionsIDs.push(uniqueIdentifier + xml[i].getAttribute("id"));
		  	}else{
		  		loadOptionsIDs.push(uniqueIdentifier + xml[i].childNodes[0].nodeValue);
		  	}
		}
		options = loadOptions;
		optionsIDs = loadOptionsIDs;
		updatable = true;
	}

	function handleDataArray(data){
		if(all){
			loadOptions.push("All");
			loadOptionsIDs.push(uniqueIdentifier + "All");
		}
		for(var i = 0; i < data.length; i++){
			loadOptions.push(data[i].value);
			loadOptionsIDs.push(uniqueIdentifier + data[i].id);
		}
		options = loadOptions;
		optionsIDs = loadOptionsIDs;
		updatable = true;
	}

	function handleJSON(JSONData){
		if(all){
			loadOptions.push("All");
			loadOptionsIDs.push(uniqueIdentifier + "All");
		}
		for(var i = 0; i < JSONData.length; i++){
			loadOptions.push(JSONData[i].displayText);
			loadOptionsIDs.push(uniqueIdentifier + JSONData[i].id);
		}
		options = loadOptions;
		optionsIDs = loadOptionsIDs;
		updatable = true;
	}

	function createDropdown(){

		var dropdownContainer = document.getElementById(dropdownLocation);

		dropdownWrapper = createDiv("dropdownWrapper noBottomBorder noselect", dropdownID);
		var dropdownHeaderWrapper = createDiv("dropdownHeaderWrapper bottomBorder");
		dropdownHeaderWrapper.addEventListener("click", function(){ that.toggleDropdown(); });
		var dropdownTitle = createDiv("dropdownTitle");
		dropdownTitle.innerHTML = dropdownTitleText;
		dropdownTitle.title = dropdownTitleText;
		displayText = dropdownTitleText;
		var dropdownArrow = createDiv("dropdownArrow down");
		dropdownArrow.innerHTML = "&#10148;";
		var clear = createDiv("clear");

		var dropdownDynamicWrapper = createDiv("dropdownDynamicWrapper closed");
		var dropdownSearchWrapper = createDiv("dropdownSearchWrapper bottomBorder");
		dropdownInput = document.createElement("input");
		dropdownInput.className = uniqueIdentifier + "searchInput";
		dropdownInput.placeholder = "Search...";
		dropdownInput.addEventListener("keyup", function(){ liveFilter();});
		dropdownSearchWrapper.appendChild(dropdownInput);
		dropdownDynamicWrapper.appendChild(dropdownSearchWrapper);
		
		itemsWrapper = createDiv("itemsWrapper");
		if(options.length > limit){
			addDropdownNav();
		}else{
			page = 1;
			start = 0;
		}
      
	    addInDropdownItems();

	    dropdownDynamicWrapper.appendChild(itemsWrapper);
	    dropdownDynamicWrapper.appendChild(clear);

		dropdownHeaderWrapper.appendChild(dropdownTitle);
		dropdownHeaderWrapper.appendChild(dropdownArrow);
		dropdownWrapper.appendChild(dropdownHeaderWrapper);
		dropdownWrapper.appendChild(clear);

		dropdownWrapper.appendChild(dropdownDynamicWrapper)

		dropdownWrapper.appendChild(clear);
		
		dropdownSelectedItemWrapper = createDiv("dropdownSelectedItemWrapper bottomBorder");
		dropdownWrapper.appendChild(dropdownSelectedItemWrapper);
		
		

		dropdownContainer.appendChild(dropdownWrapper);

	}

	function addDropdownNav(){

		pages = Math.floor(options.length / limit);
		if(options.length % limit != 0) pages += 1;
		
		var dropdownPaginationWrapper = createDiv("dropdownPaginationWrapper bottomBorder");

      	var first = createDiv("navArrow first");
      	first.innerHTML = "&#x2770;&#x2770;";
      	if(page < 3){
      		first.style.opacity = "0";
      	}else{
      		first.title = "First";
      		first.addEventListener("click", function(){ navigatePages(0,1); });
      	} 
      	dropdownPaginationWrapper.appendChild(first);

      	var previous = createDiv("navArrow previous");
      	previous.innerHTML = "&#x2770;";
      	if(page < 2){
      		previous.style.opacity = "0";
      	}else{
      		previous.title = "Previous";
      		previous.addEventListener("click", function(){ navigatePages((start - limit),(page - 1)); });
      	}
      	dropdownPaginationWrapper.appendChild(previous);

      	var navPages = createDiv("navPages");
      	navPages.innerHTML = page + " / " + pages;
      	dropdownPaginationWrapper.appendChild(navPages);

      	var next = createDiv("navArrow next");
      	next.innerHTML = "&#x2771;";
      	if(pages == page){
      		next.style.opacity = "0";
      	}else{
      		next.title = "Next";
      		next.addEventListener("click", function(){ navigatePages((start + limit),(page + 1)); });
      	}
      	dropdownPaginationWrapper.appendChild(next);

      	var last = createDiv("navArrow last");
      	last.innerHTML = "&#x2771;&#x2771;";
      	if(page >= (pages - 1)){
      		last.style.opacity = "0";
      	}else{
      		last.title = "Last";
      		last.addEventListener("click", function(){ navigatePages(((pages - 1) * limit),(pages)); });
      	} 
      	dropdownPaginationWrapper.appendChild(last);

      	itemsWrapper.appendChild(dropdownPaginationWrapper);
	}

	function addInDropdownItems(){

		range = setDropNavGlobals();

        for(var i = start; i < range; i++){
        	var itemWrapper = createDiv("itemWrapper bottomBorder");
        	if(i == range - 1) itemWrapper.classList.remove(uniqueIdentifier + "bottomBorder");
        	var checkBox = createDiv("checkBox");
        	itemWrapper.id = optionsIDs[i];
        	if(selectedOptions.indexOf(optionsIDs[i]) == -1){
        		itemWrapper.setAttribute("selected", "0");
        		checkBox.classList.add(uniqueIdentifier + "hidden");
        	}else{
        		itemWrapper.setAttribute("selected", "1");
        	}
        	if(mode == "multiple"){
        		itemWrapper.addEventListener("click", function(){ selectOption(this); });
        	}else{
        		itemWrapper.addEventListener("click", function(){ singleSelect(this); });
        	}
			

        	
        	checkBox.innerHTML = "&#10003";
        	var itemText = createDiv("itemText");
        	itemText.innerHTML = options[i];
        	itemText.title = options[i];

        	itemWrapper.appendChild(checkBox);
        	itemWrapper.appendChild(itemText);
        	itemsWrapper.appendChild(itemWrapper);
        }
	}

	function removeDropdownItems(){
		while(itemsWrapper.hasChildNodes()){
			itemsWrapper.removeChild(itemsWrapper.lastChild);
		}
	}

	function navigatePages(newStart, newPage){
		removeDropdownItems();
		start = newStart;
		page = newPage;
		if(options.length > limit) addDropdownNav();
		addInDropdownItems();
	}

	function selectOption(origin){
		origin.getElementsByClassName(uniqueIdentifier + "checkBox")[0].classList.toggle(uniqueIdentifier + "hidden");
		var textValue = origin.getElementsByClassName(uniqueIdentifier + "itemText")[0].innerText;
		if(origin.getAttribute("selected") == "1"){
			origin.setAttribute("selected", "0");
			var index = selectedOptions.indexOf(origin.id);
			if (index > -1) {
			  selectedOptions.splice(index, 1);
			  selectedText.splice(index, 1);
			}
			if(all){
				if(selectedOptions.length < 1){
					selectedOptions.push(uniqueIdentifier + "All");
					selectedText.push("All");
				}
			}
		}else{
			if(all){
				if(origin.id == (uniqueIdentifier + "All")){
					selectedOptions = [];
					selectedText = [];
					origin.setAttribute("selected", "1");
					selectedOptions.push(origin.id);
					selectedText.push(textValue);
					that.toggleDropdown();
				}else{
					removeAllIfSelected();
					origin.setAttribute("selected", "1");
					selectedOptions.push(origin.id);
					selectedText.push(textValue);
				}
			}else{
				origin.setAttribute("selected", "1");
				selectedOptions.push(origin.id);
				selectedText.push(textValue);
			}
		}
		updateSelectedText();
		// that.returnFunction(origin);
		// that.autoRunFunction();
	}

	function removeAllIfSelected(){
		
		var index = selectedOptions.indexOf(uniqueIdentifier + "All");
		if(index > -1) selectedOptions.splice(index, 1);
		index = selectedText.indexOf("All");
		if(index > -1) selectedText.splice(index, 1);
		var allItemWrapper = document.getElementById(uniqueIdentifier + "All");
		if(allItemWrapper){
			if(allItemWrapper.getAttribute("selected") == "1"){
				allItemWrapper.setAttribute("selected", "0");
				allItemWrapper.getElementsByClassName(uniqueIdentifier + "checkBox")[0].classList.toggle(uniqueIdentifier + "hidden");
			}
		}
		
	}

	function singleSelect(origin){
		origin.getElementsByClassName(uniqueIdentifier + "checkBox")[0].classList.toggle(uniqueIdentifier + "hidden");
		var textValue = origin.getElementsByClassName(uniqueIdentifier + "itemText")[0].innerText;
		selectedOptions = [];
		selectedText = [];
		if(origin.getAttribute("selected") == "1"){
			origin.setAttribute("selected", "0");
		}else{
			origin.setAttribute("selected", "1");
			// console.log("mr brightside: " + origin.id)
			selectedOptions.push(origin.id);
			selectedText.push(textValue);
		}
		updateSelectedText();
		that.toggleDropdown();
		that.returnFunction(origin);
	}

	function updateSelectedText(){
		if(mode == 'single'){
			if(selectedOptions.length == 0){
				that.setTitle(defaultTitle)
			}else{
				that.setTitle(selectedText[0])
			}
		}else{
			if(selectedOptions.length == 0){
				dropdownSelectedItemWrapper.style.display = "none";
			}else{
				dropdownSelectedItemWrapper.style.display = "block";
				dropdownSelectedItemWrapper.innerHTML = "";
				var selected = createDiv("selectedItem");
				selected.innerText = "Selected: ";
				dropdownSelectedItemWrapper.appendChild(selected)

				for(var i = 0; i < selectedText.length; i++){
					selected = createDiv("selectedItem");
					selected.innerText = selectedText[i];
					selected.id = uniqueIdentifier + "selected:" + selectedOptions[i];
					selected.addEventListener("click", function(){ removeSelectedItem(this); });
					if(i != selectedText.length - 1) selected.innerText += ",";
					var x = createDiv("x");
					x.innerHTML = "X";
					selected.appendChild(x);

					dropdownSelectedItemWrapper.appendChild(selected);
				}
			}
		}		
	}

	function removeSelectedItem(origin){
		var itemID = origin.id.split(":")[1];
		var item = document.getElementById(itemID);

		if(mode == "multiple"){
			if(item){
				selectOption(item);
			}else{
				var index = selectedOptions.indexOf(itemID);
				if (index > -1) {
				  selectedOptions.splice(index, 1);
				  selectedText.splice(index, 1);
				}
				that.removeItemFunction();
				updateSelectedText();
			}	
		}else{
			var index = selectedOptions.indexOf(itemID);
			if (index > -1) {
			  selectedOptions.splice(index, 1);
			  selectedText.splice(index, 1);
			}
			that.removeItemFunction();
			updateSelectedText();	
		}

	}

	function setDropNavGlobals(){
		lastPage = false;
		var range;
		if(start + limit > options.length){
			range = options.length - start;
			range += start;
			lastPage = true;
		}else{
			range = start + limit;
		}
		return range;
	}

	function liveFilter(){
		options = [];
		optionsIDs = [];
		for(var i = 0; i < loadOptions.length; i++){
			if(loadOptions[i].substr(0, dropdownInput.value.length).toLowerCase() == dropdownInput.value.toLowerCase()){
				options.push(loadOptions[i]);
				optionsIDs.push(loadOptionsIDs[i]);
			}
		}
		for(var i = 0; i < loadOptions.length; i++){
			if(loadOptions[i].toLowerCase().indexOf(dropdownInput.value.toLowerCase()) != -1 && dropdownInput.value != ''){
				if(!optionsIDs.includes(loadOptionsIDs[i])){
					options.push(loadOptions[i]);
					optionsIDs.push(loadOptionsIDs[i]);
				}
			}
		}
		start = 0;
		page = 1;
		pages = Math.floor(options.length / limit) + 1;
		navigatePages(start, page)
	}

	function createDiv(eleClass, eleID){
		ele = document.createElement("div");
		var classes = eleClass.split(" ");
		var classString = "";
		for(var i = 0; i < classes.length; i++){
			classString += uniqueIdentifier + classes[i] + " ";
		}



		ele.className = classString;
		if(eleID) ele.id = uniqueIdentifier + eleID;
		return ele;
	}

	function insertCSS(){
		var head = document.head || document.getElementsByTagName('head')[0];
	    var style = document.createElement('style');
	    style.id = uniqueIdentifier + "CSS";
		style.type = 'text/css';

		if(document.getElementById(uniqueIdentifier + "CSS")) head.removeChild(document.getElementById(uniqueIdentifier + "CSS"));

		var css = "." + uniqueIdentifier + "noselect {"+
				  "-webkit-touch-callout: none;"+
				    "-webkit-user-select: none;"+
				     "-khtml-user-select: none;"+
				       "-moz-user-select: none;"+
				        "-ms-user-select: none;"+
				            "user-select: none;"+
				"}"+
				"." + uniqueIdentifier + "clear{"+
					"clear: both;"+
				"}"+
				"." + uniqueIdentifier + "dropdownWrapper{"+
					"font-family: " + 'Helvetica Neue' + ", Helvetica, Arial, sans-serif;"+
					"color:" + fontColor +";"+
					"background-color:" + bgColor +";"+
					"width:100%;"+
					"min-width:200px;"+
					"min-height: 30px;"+
					"position: absolute;"+
					"top:0;"+
					"left:0;"+
				"}"+
				"." + uniqueIdentifier + "fullBorder{"+
					"border-style: solid;"+
					"border-width: 1px;"+
					"border-color:" + borderColor +";"+
					"border-radius:" + borderRadius +";"+
				"}"+
				"." + uniqueIdentifier + "noBottomBorder{"+
					"border-style: solid;"+
					"border-width: 1px 1px 0 1px;"+
					"border-color:" + borderColor +";"+
					"border-radius:" + borderRadius +";"+
				"}"+
				"." + uniqueIdentifier + "topBorder{"+
					"border-style: solid;"+
					"border-width: 1px 0 0 0;"+
					"border-color:" + borderColor +";"+
					"border-radius:" + borderRadius +";"+
				"}"+
				"." + uniqueIdentifier + "bottomBorder{"+
					"border-style: solid;"+
					"border-width: 0 0 1px 0;"+
					"border-color:" + borderColor +";"+
				"}"+
				"." + uniqueIdentifier + "dropdownHeaderWrapper{"+
					"width: 100%;"+
					"height: 30px;"+
					"cursor: pointer;"+
					"border-radius:" + borderRadius +";"+
				"}"+
				"." + uniqueIdentifier + "dropdownTitle{"+
					"width: calc(100% - 30px);"+
					"font-size: 18px;"+
					"line-height: 30px;"+
					"text-align: center;"+
					"text-transform: capitalize;"+
					"float: left;"+
					"overflow: hidden;"+
					"white-space: nowrap;"+
					"text-overflow: ellipsis;"+
				"}"+
				"." + uniqueIdentifier + "dropdownArrow{"+
					"width: 30px;"+
					"height: 30px;"+
					"font-size: 18px;"+
					"line-height: 30px;"+
					"text-align: center;"+
					"float: left;"+
				"}"+
				"." + uniqueIdentifier + "dropdownArrow{"+
					"width: 30px;"+
					"height: 30px;"+
					"line-height: 30px;"+
					"text-align: center;"+
					"font-size: 24px;"+
					"color:" + dropdownHightlight +";"+
					"transform: rotate(-90deg);"+
				    "-webkit-transform: rotate(-90deg);"+
					"-webkit-transition: all .3s;"+
				    "transition: all .3s;"+
				"}"+
				"." + uniqueIdentifier + "dropdownArrow:hover{"+
					"color:" + dropdownLowlight +";"+
				"}"+
				"." + uniqueIdentifier + "down{"+
					"transform: rotate(90deg);"+
				    "-webkit-transform: rotate(90deg);"+
				"}"+
				"." + uniqueIdentifier + "up{"+
					"transform: rotate(-90deg);"+
				    "-webkit-transform: rotate(-90deg);"+
				"}"+
				"." + uniqueIdentifier + "dropdownSelectedItemWrapper{"+
					"box-sizing: border-box;"+
					"width: 100%;"+
					"padding: 5px 10px;"+
					"font-style: italic;"+
					"color: #b7b7b7;"+
					"font-size: 12px;"+
					"display: none;"+
				"}"+
				"." + uniqueIdentifier + "dropdownDynamicWrapper{"+
					"width: 100%;"+
					"-webkit-transition: all .1s;"+
				    "transition: all .1s;"+
				"}"+
				"." + uniqueIdentifier + "closed{"+
					"overflow: hidden;"+
					"height: 0px;"+
				"}"+
				"." + uniqueIdentifier + "dropdownSearchWrapper{"+
					"width: 100%;"+
					"height: 30px;"+
				"}"+
				"." + uniqueIdentifier + "dropdownPaginationWrapper{"+
					"width: 100%;"+
					"height: 30px;"+
				"}"+
				"." + uniqueIdentifier + "searchInput{"+
					"box-sizing: border-box;"+
					"display: block;"+
					"width: 100%;"+
					"height: 100%;"+
					"padding: 0 10px;"+
					"border-width: 0px;"+
					"background-color:" + bgColor +";"+
					"font-weight: bold;"+
				"}"+
				"." + uniqueIdentifier + "navArrow{"+
					"width: 30px;"+
					"height: 30px;"+
					"line-height: 30px;"+
					"text-align: center;"+
					"font-size: 24px;"+
					"color:" + dropdownHightlight +";"+
					"float: left;"+
					"-webkit-transition: all .1s;"+
				    "transition: all .1s;"+
				    "cursor: pointer;"+
				"}"+
				"." + uniqueIdentifier + "navArrow:hover{"+
					"color:" + dropdownLowlight +";"+
				"}"+
				"." + uniqueIdentifier + "navPages{"+
					"width: calc(100% - 120px);"+
					"height: 30px;"+
					"float: left;"+
					"font-size: 12px;"+
					"font-weight: normal;"+
					"text-align: center;"+
					"line-height: 30px;"+
				"}"+
				"." + uniqueIdentifier + "itemWrapper{"+
					"width: 100%;"+
					"height: 30px;"+
					"cursor: pointer;"+
					"-webkit-transition: all .1s;"+
				    "transition: all .1s;"+
				"}"+
				"." + uniqueIdentifier + "itemWrapper:hover{"+
					"background-color: #f2f2f2;"+
				"}"+
				"." + uniqueIdentifier + "itemText{"+
					"width: calc(100% - 30px);"+
					"height: 30px;"+
					"box-sizing: border-box;"+
					"padding: 0 10px;"+
					"line-height: 30px;"+
					"font-size: 14px;"+
					"font-weight: normal;"+
					"overflow: hidden;"+
					"white-space: nowrap;"+
					"text-overflow: ellipsis;"+
				"}"+
				"." + uniqueIdentifier + "checkBox{"+
					"width: 30px;"+
					"height: 30px;"+
					"line-height: 30px;"+
					"text-align: center;"+
					"float: right;"+
					"font-size: 24px;"+
					"color:" + dropdownHightlight +";"+
					"-webkit-transition: all .3s;"+
				    "transition: all .3s;"+
				"}"+
				"." + uniqueIdentifier + "hidden{"+
					"opacity: 0;"+
				"}"+
				"." + uniqueIdentifier + "selectedItem{"+
					"position: relative;"+
					"padding-right: 3px;"+
					"display: inline-block;"+
					"cursor: pointer;"+
				"}"+
				"." + uniqueIdentifier + "x{"+
					"position: absolute;"+
					"top:-2px;"+
					"right:0;"+
					"font-size: 10px;"+
					"color:red;"+
					"font-weight: bold;"+
					"display: none;"+
				"}"+
				"." + uniqueIdentifier + "selectedItem:hover ." + uniqueIdentifier + "x {"+
					"display: block;"+
				"}";
		;
		if (style.styleSheet){
		  style.styleSheet.cssText = css;
		} else {
		  style.appendChild(document.createTextNode(css));
		}
		head.appendChild(style);
	}

	if(!delay) init();

}
