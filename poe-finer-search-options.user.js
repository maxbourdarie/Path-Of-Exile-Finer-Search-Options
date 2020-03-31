// ==UserScript==
// @name         Poe trade finer-search-options
// @namespace    http://tampermonkey.net/
// @version      1.0.5
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
    const scriptStyle=$(`
        <style>
            .finer-filtered{
                position: relative;
            }
            .finer-filterable:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            .finer-filtered-overlay {
                z-index: -1;
                position: absolute;
                width: 100%;
                height: 100%;
                background: rgba(0, 136, 0, .25);
                top: 0;
            }
            .btn-finer-search {
                padding: 0 10px;
                color: white;
                outline: solid 1px grey;
                cursor: pointer;
            }
            #addFilter{
                background: rgba(2, 93, 34, 0.75);
            }
            #rmvFilter{
                background: rgba(93, 2, 2, 0.75);
            }
            #btns-finer{
                left:auto;
            }
        </style>
    `);
    const filteredDiv = () => $(`<div class="finer-filtered-overlay"></div>`);
    const buttonsSpan = $(`
        <span class="lc l" id="btns-finer">
            <span class="d btn-finer-search" id="addFilter" title="add this mod to your search filters">+</span>
            <span class="d btn-finer-search" id="rmvFilter" title="remove this mod from your search results">-</span>
        </span>
    `);
    $("body").append(scriptStyle);
    const createFilter = _type => _type && ({ id: _type, value: {}, disabled: !1 });

    const findVueItem = tags => {
        const finder = e => e.$vnode.tag.includes(_finder);
        let res = window.app,
            _finder;
        while( tags.length && (_finder = tags.shift()) ) res = res.$children.find(finder);
        return res;
    }

    const ItemResultPanelVueItem = () => findVueItem(["item-results-panel"]);

    const findVueResultItem = _itemId =>
        findVueItem(["item-results-panel", "resultset"]).$children.find(e => e.itemId === _itemId);

    const ItemSearchGroupsVueItems = _type =>
        findVueItem(["item-search-panel", "item-filter-panel"]).$children.filter(e => e.$vnode.tag.includes("stat-filter-group")).filter(e => _type ? e.group.type === _type : true);

    $(document)
        //-----------step 1 : hover the row => check if any mod is already in search and dispatch action classes accordingly
        .on('mouseenter','.resultset > .row', function(e){ checkFilters(e, this) })
        //-----------step 2 : hover a mod => append or remove finer filter buttons
        //    on enter, if has class "finer-filterable", add the buttons ("idiot proofing" so can not add multiple times the same mod especially not "and"+"not")
        .on('mouseenter','.itemBoxContent > .content > div', function(e){ addButtons(e, this) })
        //    on leave, remove the buttons
        .on('mouseleave','.itemBoxContent > .content > div', function(e){ rmvButtons(e, this) })
        //-----------step 3 : on button click, apply finer filters
        .on('click','#addFilter', function(e){ addOrRemoveFilter(e, true , this) })
        .on('click','#rmvFilter', function(e){ addOrRemoveFilter(e, false, this) });

    const checkFilters = (e, ctx) => {
        const _row = $(ctx);
        if(_row.hasClass("finer-processed")) return;

        const rowid = _row.data("id");
        const mods = $(_row.find(".content")[0]).children('[class*="Mod"]');
        const ISGs = ItemSearchGroupsVueItems();

        [...mods].forEach(mod => {
            const _mod = $(mod);
            const modHash = $(_mod.children(".lc.s")[0]).data("field").slice(5);
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

        VueElem.$root.$refs.toastr.Add({ msg: VueElem.translate(`the stat ${_statHash} has been ${_and ? `added to`:`removed from`} your stat filters.`), progressbar: !1, timeout: 3e3 })
        VueElem.$root.save(!0);
        ItemResultPanelVueItem().search();
    }
})(window.jQuery);
