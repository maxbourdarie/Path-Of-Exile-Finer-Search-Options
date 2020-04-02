// ==UserScript==
// @name         Poe trade finer-search-options
// @namespace    http://tampermonkey.net/
// @version      1.1.2
// @description  enables finer search options in Path of exile official trade site, allowing filtering in/out mods directly from the current search result list
// @author       Maxime B
// @match        https://www.pathofexile.com/trade
// @match        https://www.pathofexile.com/trade/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @license      MIT
// @grant        none
// ==/UserScript==

(function($) {
    'use strict';

    //---------HTML---------//
    const scriptStyle=$(`
        <style>
            #finer-search-global{ color: white;    height: 210px;    width: 175px;    background: #2f2f2f;    position: fixed;    right: 10px;    top: 50px;    z-index: 1000 }
            #finer-search-global-title{ font-weight: bold;    margin: 40px; }
            #addFilter{ background: rgba(2,  93, 34, 0.75); }
            #rmvFilter{ background: rgba(93, 2,  2,  0.75); }
            #btns-finer{ left: auto; }
            .finer-global-btn{ background: #636363;    outline: solid 1px rgb(80, 80, 80);    margin: 10px 2px;    padding: 0 5px; }
            .finer-global-btn-pm { float: right;    padding: 0 2px; }
            .finer-global-btn-pm.minus { background: red;    padding: 0 5px; }
            .finer-global-btn-pm.plus { background: green;    margin-left:5px; }
            .finer-filterable:hover { background: rgba(255, 255, 255, 0.2); }
            .finer-filtered{ position: relative; }
            .finer-filtered-overlay { z-index: -1;    position: absolute;    width: 100%;    height: 100%;    background: rgba(0, 136, 0, .25);    top: 0; }
            .btn-finer-search { padding: 0 10px;    color: white;    outline: solid 1px grey;}
            .hand{ cursor: pointer; }
        </style>
    `);
    const globalFiner = $(`
        <div id="finer-search-global">
            <span id="finer-search-global-title">add to filters</span>
            <div class="finer-global-btn" data-type="life,cold,fire,ligt">
                all res & life
                <span title="increase min value by 10" class="finer-global-btn-pm plus hand">+</span>
                <span title="decrease min value by 10" class="finer-global-btn-pm minus hand">-</span>
            </div>
            <div class="finer-global-btn" data-type="allR">
                all resistances
                <span title="increase min value by 10" class="finer-global-btn-pm plus hand">+</span>
                <span title="decrease min value by 10" class="finer-global-btn-pm minus hand">-</span>
            </div>
            <div class="finer-global-btn" data-type="life">
                life
                <span title="increase min value by 10" class="finer-global-btn-pm plus hand">+</span>
                <span title="decrease min value by 10" class="finer-global-btn-pm minus hand">-</span>
            </div>
            <div class="finer-global-btn" data-type="cold">
                cold res
                <span title="increase min value by 10" class="finer-global-btn-pm plus hand">+</span>
                <span title="decrease min value by 10" class="finer-global-btn-pm minus hand">-</span>
            </div>
            <div class="finer-global-btn" data-type="fire">
                fire res
                <span title="increase min value by 10" class="finer-global-btn-pm plus hand">+</span>
                <span title="decrease min value by 10" class="finer-global-btn-pm minus hand">-</span>
            </div>
            <div class="finer-global-btn" data-type="ligt">
                lightning res
                <span title="increase min value by 10" class="finer-global-btn-pm plus hand">+</span>
                <span title="decrease min value by 10" class="finer-global-btn-pm minus hand">-</span>
            </div>
            <div class="finer-global-btn" data-type="move">
                movement speed
                <span title="increase min value by 10" class="finer-global-btn-pm plus hand">+</span>
                <span title="decrease min value by 10" class="finer-global-btn-pm minus hand">-</span>
            </div>
        </div>
    `);
    const filteredDiv = () => $(`<div class="finer-filtered-overlay"></div>`);
    const buttonsSpan = $(`
        <span class="lc l" id="btns-finer">
            <span class="d btn-finer-search hand" id="addFilter" title="add this mod to your search filters">+</span>
            <span class="d btn-finer-search hand" id="rmvFilter" title="remove this mod from your search results">-</span>
        </span>
    `);


//---------UTILS METHODS---------//
    const modMap={life:"total_life",cold:"total_cold_resistance",fire:"total_fire_resistance",ligt:"total_lightning_resistance",move:"increased_movement_speed",allR:"total_elemental_resistance"};

    const createFilter = _type => _type && ({ id: _type, value: {}, disabled: !1 });

    const finder = (e,v) => e.$vnode.tag.includes(v);

    const findVueItem = tags => tags.reduce((a,v)=> a.$children.find(e => finder(e,v)), window.app);

    const ItemResultPanelVueItem = () => findVueItem(["item-results-panel"]);

    const findVueResultItem = _itemId => findVueItem(["item-results-panel", "resultset"]).$children.find(e => e.itemId === _itemId);

    const ItemSearchGroupsVueItems = _type => findVueItem(["item-search-panel", "item-filter-panel"]).$children.filter(e => finder(e,"stat-filter-group") && (_type ? e.group.type === _type : true));

//---------ACTUAL CODE DOING STUFF AND ALL---------//
    $("body").append(scriptStyle);//append css to body
    $("#trade").append(globalFiner);//append global buttons to #trade

    //document listeners
    $(document)
        //-----------step 1 : hover a result row (i.e. an item) => check if any mod is already in search and dispatch action classes accordingly
        .on('mouseenter','.resultset > .row', function(e){ checkFilters(e, this) })
        //-----------step 2 : hover a mod => append or remove finer filter buttons
        //    on enter, if has class "finer-filterable", add the buttons ("idiot proofing" to an extend, so can not add multiple times the same mod especially not both [AND] && [NOT] at the same time)
        .on('mouseenter','.itemBoxContent > .content > div', function(e){ addButtons(e, this) })
        //    on leave, remove the buttons
        .on('mouseleave','.itemBoxContent > .content > div', function(e){ rmvButtons(e, this) })
        //-----------step 3 : on button click, do the magic thing the script exists for
        .on('click','#addFilter', function(e){ addOrRemoveFilter(e, true , this) })
        .on('click','#rmvFilter', function(e){ addOrRemoveFilter(e, false, this) })
        //-----------step 4 : on button click in the global div, add the corresponding mods to the search
        .on('click','#finer-search-global > .finer-global-btn > span', function(e){
            addPseudoMods([...$(e.target).parent().data("type").split(',')], $(e.target).hasClass("plus"))
        })

    const checkFilters = (e, ctx) => {
        const _row = $(ctx);
        if(_row.hasClass("finer-processed")) return;

        const rowid = _row.data("id");
        const mods = $(_row.find(".content")[0]).children('[class*="Mod"]');
        const ISGs = ItemSearchGroupsVueItems();

        [...mods].forEach(mod => {
            const _mod = $(mod);
            const modHash = ($(_mod.children(".lc.s")[0]).data("field")||'').slice(5);
            if(!modHash) return;
            _mod.data("hash", modHash);
            _mod.data("rowid", rowid);

            if(ISGs.some(isg => isg.filters.some(e => e.id === modHash))){
                _mod.addClass("finer-filtered");
                _mod.append(filteredDiv());
            }
            else{
                _mod.addClass("finer-filterable");
            }
        })

        $(_row).addClass("finer-processed");
    }



    const addPseudoMods = (hashes,more) => {
        const ISG = ItemSearchGroupsVueItems("and").find(e => e.index === 0);
        let reload = false;
        hashes.forEach(hash => {
            const reHashed = `pseudo.pseudo_${modMap[hash]}`;
            const currentMod = ISG.filters.find(e => e.id === reHashed);
            if(currentMod){
                const modIndex = ISG.filters.indexOf(currentMod);
                const currentModValue = ISG.state.filters[modIndex].value || {};
                const currentMin = currentModValue.min || 0;

                if(currentMin || more) ISG.updateFilter(modIndex,{ min: currentMin + (more ? 10 : -10) });
                else ISG.removeFilter(modIndex);
                reload=true;
            }
            else if(more){
                ISG.selectFilter(createFilter(reHashed));
                reload=true;
            }
        });
        if(reload){
            window.app.save(!0);
            $(".btn.search-btn").click();
        }
    }

    const addButtons = (e,ctx) =>$(ctx).hasClass("finer-filterable") && $(ctx).append(buttonsSpan);

    const rmvButtons = (e,ctx) => $(ctx).remove($("#btns-finer"));

    const addOrRemoveFilter = (e, _and, ctx) => {
        const filterType = _and ? "and" : "not";
        const _mod = $($(ctx).parents("div")[0]);
        const VueElem = findVueResultItem(_mod.data("rowid")) || {};

        const _statHash = _mod.data("hash");
        const newFilter = createFilter(_statHash);

        const ISG = ItemSearchGroupsVueItems(filterType).find(e => e.index !== 0);

        if(ISG) ISG.selectFilter(newFilter);
        else VueElem.$store.commit("pushStatGroup", { type: filterType, filters: [newFilter]});

        window.app.$refs.toastr.Add({ msg: VueElem.translate(`the stat ${_statHash} has been ${_and ? `added to`:`removed from`} your stat filters.`), progressbar: !1, timeout: 3e3 })
        window.app.save(!0);
        ItemResultPanelVueItem().search();
    }
})(window.jQuery);
