function loadConfig(){
	config.months = $('#monthsSlide').val();
	config.diggers = $('#diggerSlide').val();
	config.diggerFindChance = $('#diggerFindChanceSlide').val();
	config.rollGemValues = $('#rollGemValuesInput').is(':checked');
}

function getGemsForNMonths(n){
	var gems = [];
	for (var i = 0; i < n; i++) {
		gems = gems.concat(getGemsForOneMonth());
	};

	return gems;
}

function getGemsForOneMonth(){
	var gems = [];
	for (var i = 0; i < config.daysInMonth; i++) {
		gems = gems.concat(getGemsForOneDay());
	};

	return gems;
}

function getGemsForOneDay(){
	var gems = []
	for(var i=0; i<config.diggers;i++)
	{
		if(Math.random() < config.diggerFindChance)
			gems.push(newGem());
	}
	return gems;
}

function getEventsForNMonths(n){
	var events = []
	for(var i=0; i< (n * config.daysInMonth);i++) {
		if(Math.random() < config.dailyEventChance)
			events.push(eventNames[Math.floor(Math.random()*eventNames.length)]);
	}
	return events;
}

function updateInputSlide(fieldId) {
	var value = $("#"+fieldId+"Text").val();
	$("#"+fieldId+"Slide").val(value);
	loadConfig();
	return value;
}

function updateInputText(fieldId) {
	var value = $("#"+fieldId+"Slide").val();
	$("#"+fieldId+"Text").val(value);
	loadConfig();
	return value;
}

function rollAndDisplayForOneDay(){
	var gems = getGemsForOneDay();
	makeTableWithGems(gems);
}

function rollAndDisplayForNMonths(n){
	var gems = getGemsForNMonths(n);
	var events = getEventsForNMonths(n);
	makeTableWithGems(gems);
	addEventsToResults(events);
}

function addEventsToResults(events){
	for(var i=0; i<events.length; i++){
		$('#eventList').append("<li>" + events[i] + "</li>")
	}
}

function makeTableWithGems(gems){
	for(var i=0; i<gems.length; i++){
		var row = "<tr><td>" + (i+1) + 
			"</td><td>" + gems[i].name + 
			"</td><td>" + gems[i].value + 
			"</td></tr>";
		$('#resultTable').append(row);
	}
}

function clearTable(){
	 $("#resultTable").find("tr:gt(0)").remove();
	 $("#eventList").find("li").remove();
}

var config = {
	daysInMonth: 30,
	months: 1,
	diggers: 100,
	diggerFindChance: 0.03,
	dailyEventChance: 0.01,
	rollGemValues: false
};

var eventNames = ["dwarf attack", "extra rich vein (roll extra day per digger)", "giant attack", "cave in", "cave monsters attack", "discovered natural cave", "found burried magic item",
				"delivery cart is attacked"]
