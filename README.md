# Path-Of-Exile-Finer-Search-Options
Poe Finer Search Options is a userScript enhancing the official Path of exile [trade](https://www.pathofexile.com/trade) website by adding the ability to include/exclude any item mod directly from the search result list,  so that you dont have to go back to your filter option back and forth.  
It extends what the "Filter by item stats" button does but allows finer control over what it offers.

*Showcase*  
![](https://github.com/maxbourdarie/Path-Of-Exile-Finer-Search-Options/blob/master/images/Poe-finer-search-video-showcase.gif)

## Prerequisites
### 1. You need userScript manager extension to use this script. 

For firefox:
install [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)

For chrome, Microsoft Edge, Safari, Opera, Firefox:
install [Tampermonkey](https://www.tampermonkey.net)

### 2. then you can [Install PoEFSO](https://github.com/maxbourdarie/Path-Of-Exile-Finer-Search-Options/raw/master/poe-finer-search-options.user.js) itself.

### 3. The script was developped for Compact mode on PoE Offical Trade
(if you are using a different mode and things do not work as intended feel free to open a bug report)
![](https://i.imgur.com/6Ro8Jts.png)

---


### Before
*original "filter by item stats button"*  
<img width="650px" src="https://i.imgur.com/qDm5lnz.png">

*result of clicking "filter by item stats" button in the search filters*  
<img width="650px" src="https://github.com/maxbourdarie/Path-Of-Exile-Finer-Search-Options/blob/master/images/filter-by-item-stats-result.png">


### After

### 1.0.x
#### By hovering over any item mod, you got access to two new buttons "+" and "-"
![](https://github.com/maxbourdarie/Path-Of-Exile-Finer-Search-Options/blob/master/images/finer-search-buttons.png)

#### clicking "+" adds the mod to [AND] filter group. If none exists, it will create one.
#### clicking "-" adds the mod to [NOT] filter group. If none exists, it will create one.
#### your search refreshes itself when you add/remove a filter

*you can also easily see what mods are already present in your [AND] filter groups (highlighted in green)*
![](https://github.com/maxbourdarie/Path-Of-Exile-Finer-Search-Options/blob/master/images/finer-search-filtered-stat.png)

### 1.1.x
#### Add the most common modifiers directly from anywhere in the page thanks to new global buttons
![](https://github.com/maxbourdarie/Path-Of-Exile-Finer-Search-Options/blob/master/images/filter-global.png)
* mods available :
  * (pseudo) Life + (pseudo) \[fire/cold/lightning\] resitances (one button, 4 mods added)
  * (pseudo) all resists
  * (pseudo) Life
  * (pseudo) \[Fire, Cold, Lightning\] resistance (individually)
  * Movement speed
 
#### adjust minimum requirement by clicking the +/- buttons
* "+" increases the minimum requirement by 10
  * if no filter exists for that stat, it creates it instead
* "-" decreases the minimum requirement by 10
  * if the filter requirement is already 0, it removes it instead
  
#### when you click a button, your search refreshes

---

### what's next
- [x] 1-click poorman's max chaos value (5c default) , "more"/"less" buttons for easy adjustment
