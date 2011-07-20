function init() {
  var clearButton = document.getElementById("clear");
  clearButton.onclick = function() {
    localStorage.clear();
    updateStats();
  }
  updateStats();
}

function sortEntries() {
  var entries = []
  for(var host in localStorage) {
    entries.push(JSON.parse(localStorage[host]));
  }
  return entries.sort(function(a, b) {
    if(b.times > a.times) {
      return 1;
    } else {
      return -1;
    }
  });
}

function updateStats() {
  var statsTable = document.getElementById("stats");
  
  while(statsTable.childNodes.length > 0) {
    statsTable.removeChild(statsTable.firstChild);
  }
  
  // Add new rows
  var sortedEntries = sortEntries();
  for(var index in sortedEntries) {
    entry = sortedEntries[index];
    var row = document.createElement("tr");
    var siteCell = document.createElement("td");
    siteCell.appendChild(document.createTextNode(entry.host));
    var hoursCell = document.createElement("td");
    hoursCell.appendChild(document.createTextNode((entry.hours || 0).toFixed(2)));
    var timesCell = document.createElement("td");
    timesCell.appendChild(document.createTextNode(entry.times));
    row.appendChild(siteCell);
    row.appendChild(hoursCell);
    row.appendChild(timesCell);
    statsTable.appendChild(row);
  }
}