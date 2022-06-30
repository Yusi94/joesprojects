const tabContents = document.querySelectorAll('[data-tab-content]');
const tabList = document.querySelector('[role="tablist"]');
const tabs = document.querySelectorAll('[role="tab"]');

let currentTabContent = tabContents[0];
let previousTabContent = '';
let firstTab = tabs[0];

currentTabContent.classList.add('current-tab-content');
firstTab.setAttribute('aria-selected', 'true');

let tabFocus = 0;

tabList.addEventListener('keydown', (e) => {
    const keydownLeft = 37;
    const keydownRight = 39;
    
    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);
        
        if (e.keyCode === keydownRight) {
            tabFocus++;
            if(tabFocus >= tabs.length) {
                tabFocus = 0;
            }
        }
        else if (e.keyCode === keydownLeft) {
            tabFocus--;
            if(tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }
        
        tabs[tabFocus].setAttribute('tabindex', 0);
        tabs[tabFocus].focus();
    }
});

tabList.addEventListener('click', e => {
    if(e.target.matches('[role="tab"]'))
    {
        showActiveTab(e.target);

        previousTabContent = currentTabContent;

        switch(e.target.id) {
            case 'outlining':
                currentIndex = 0;
                break;
            case 'selection':
                currentIndex = 1;
                break;
            case 'crafting': 
                currentIndex = 2;
                break;
            case 'finishing':
                currentIndex = 3;
                break;
        }

        currentTabContent = tabContents[currentIndex];
        currentTabContent.classList.add('current-tab-content');

        if(previousTabContent !== currentTabContent) {
            previousTabContent.classList.remove('current-tab-content');
        }
    }
});

const showActiveTab = (tab) => {
    const parent = tab.parentNode;

    // Remove all currently selected tabs
    parent
        .querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", "false");

    // Set this tab as selected
    tab.setAttribute("aria-selected", "true");
}