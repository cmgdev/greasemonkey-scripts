// ==UserScript==
// @name        Weblogic Log Links
// @namespace   cgg
// @version     1
// @grant       GM_log
// @match       https://*/console/console.portal*
// @require     https://code.jquery.com/jquery-1.11.3.min.js
// ==/UserScript==

consoleRoot = document.location.pathname + '?_nfpb=true';

addLinksToLogText();
createFavorites();

function addLinksToLogText(){
  if(document.location.search.contains('DiagnosticsLogTablePage')){
    evenRows = $('#DiagnosticsLogTablePortlet').find('tr.rowEven');
    oddRows = $('#DiagnosticsLogTablePortlet').find('tr.rowOdd'); 

    $(oddRows).each(function(){
     _addLogLink(this);
    });

   $(evenRows).each(function(){
    _addLogLink(this);
   });
  }
}

function _addLogLink(row){
  logFilePrefix = '&_pageLabel=DiagnosticsViewServerLogTablePage&DiagnosticsViewServerLogTablePortlethandle=com.bea.console.handles.LogDispatchHandle(\"';
  logFileSuffix = '%3BServerLog\")';
  
  td = $(row).children().last();
  serverName = $(td).html();
  logUrl = consoleRoot + logFilePrefix + serverName + logFileSuffix;
  //console.log(logUrl);
  td.html('<a href=' + logUrl + '>' + serverName + '</a>');
}

function createFavorites(){
  links = [ {
      title : 'Log Files',
      label : 'DiagnosticsLogTablePage',
      extra : '&DiagnosticsLogTablePortletsortby=resource'
    }, {
      title : 'Servers',
      label : 'CoreServerServerTablePage'
    }, {
      title : 'Deployments',
      label : 'AppDeploymentsControlPage'
    }, {
      title : 'Data Sources',
      label : 'GlobalJDBCDataSourceTablePage'
    }, {
      title : 'JMS Servers',
      label : 'JmsServerJMSServerTablePage'
    } ];
  
  favorites = '<div class="wlsc-frame"><div class="top"></div><div class="middle"><div class="c2"><div class="wlsc-titlebar"><div class="float-container">' +
                '<div class="wlsc-titlebar-title-panel"><h2>Favorites</h2></div></div></div><div class="wlsc-window-content"><ul style="padding:0px;margin:0px;">';
  $(links).each(function(){
    href = '&_pageLabel=' + this['label'];
    if(this['extra']){
      href = href + this['extra'];
    }
    favorites = favorites + '<li style="padding: 2px 0px;margin-left: 18px;list-style-type: disc;">'+
                '<a href="' + consoleRoot + href + '">' + this['title'] + '</a></li>';
  });
  favorites = favorites + '</ul></div></div></div><div class="bottom"><div><div></div></div></div></div>';
  
  
  sideNav = $('div#console-nav-col');
  $(sideNav).prepend(favorites);
}
