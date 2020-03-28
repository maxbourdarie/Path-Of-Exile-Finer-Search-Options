# Path-Of-Exile-Finer-Search-Options
Poe Finer Search Options is a userScript enhancing the official Path of exile [trade](https://www.pathofexile.com/trade) website by adding ability to include/excluse any item mod directly from a search result list. That you dont have to go to filter option back and forth.  
It extends what the "Filter by item stats" button does but allows finer control over what it offers.


## Prerequisites
## Installation
1. You need userScript manager extension to use this script. 

For firefox:
install [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)

for chrome, Microsoft Edge, Safari, Opera, Firefox:
install [Tampermonkey](https://www.tampermonkey.net)

2. then you can [Install PoEFSO](https://github.com/maxbourdarie/Path-Of-Exile-Finer-Search-Options/raw/master/poe-finer-search-options.user.js) itself.

3. Use Compact mode on PoE Offical Trade  
![](https://i.imgur.com/6Ro8Jts.png)



*original "filter by item stats button"*
![](https://github.com/maxbourdarie/Path-Of-Exile-Finer-Search-Options/blob/master/images/filter-by-item-stats.png)
*result of clicking "filter by item stats" button in the search filters*
![](https://github.com/maxbourdarie/Path-Of-Exile-Finer-Search-Options/blob/master/images/filter-by-item-stats-result.png)

## After installing, by hovering on an item, you can : 

* easily see what mods are already present in your "and" filter groups (highlighted in green)
![](https://github.com/maxbourdarie/Path-Of-Exile-Finer-Search-Options/blob/master/images/finer-search-filtered-stat.png)
* access two new buttons "+" and "-" by hovering over any mod in the list
  * clicking "+" adds the mod to the first (non default) "and" filter group in your search. If none exists, it creates it
  * clicking "-" adds the mod to the first "not" filter group in your search. If none exists, it creates it
![](https://github.com/maxbourdarie/Path-Of-Exile-Finer-Search-Options/blob/master/images/finer-search-buttons.png)
* automatically refresh your search when you add/remove a filter by clicking a button

## video showcase 
![](https://github.com/maxbourdarie/Path-Of-Exile-Finer-Search-Options/blob/master/images/Poe-finer-search-video-showcase.gif)

### what's next
- [ ] a 1-click button somewhere in the page that adds "common" filters to the main "and" group (most probably pseudo total life, tri res)
- [ ] 1-clicks for the common mods separately (+movement speed cause thats necessary on almost any boots)
- [ ] "more life !" button that increases the min life requirement by 10/ creates a life requirement if none exists
- [ ] 1-click poorman's max chaos value (5c default) , "more"/"less" buttons for easy adjustment
- [ ] "auto fill my resists filters" feature : 
  - [ ] "i currently have" \[input\] (fire/cold/lightning) res and \[input\] gear slots left to cap them
  - [ ] => adds the corresponding minimum values to the resist requirements, evenly split between the amount of gear pieces wanted
