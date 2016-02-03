# greasemonkey-scripts

## fix-weblogic.js
Some changes to make the Weblogic console easier to navigate.

* Adds a Favorites block to the left-hand navigation
  * This can be customized by editing the links variable in the createFavorites function
  * title is the link text, label is the value of _pageLabel in the URL, and extra is anything else you want appended to the URL (like sorting)
* Sorts the Diagnostic Log Files by the server name column
* Adds a link to go directly to the log file by clicking on the server name
