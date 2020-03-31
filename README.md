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

#### By hovering over any item mod, you got access to two new buttons "+" and "-"
![](https://github.com/maxbourdarie/Path-Of-Exile-Finer-Search-Options/blob/master/images/finer-search-buttons.png)

#### clicking "+" adds the mod to [AND] filter group. If none exists, it will create one.
#### clicking "-" adds the mod to [NOT] filter group. If none exists, it will create one.
#### your search refreshes itself when you add/remove a filter

*easily see what mods are already present in your [AND] filter groups (highlighted in green)*
![](https://github.com/maxbourdarie/Path-Of-Exile-Finer-Search-Options/blob/master/images/finer-search-filtered-stat.png)

---

### what's next
- [ ] a 1-click button somewhere in the page that adds "common" filters to the main [AND] group (most probably pseudo total life, tri res)
- [ ] 1-clicks for the common mods separately (+movement speed cause thats necessary on almost any boots)
- [ ] "more life !" button that increases the min life requirement by 10/ creates a life requirement if none exists
- [ ] 1-click poorman's max chaos value (5c default) , "more"/"less" buttons for easy adjustment
- [ ] "auto fill my resists filters" feature : 
  - [ ] "i currently have" \[input\] (fire/cold/lightning) res and \[input\] gear slots left to cap them
  - [ ] => adds the corresponding minimum values to the resist requirements, evenly split between the amount of gear pieces wanted
