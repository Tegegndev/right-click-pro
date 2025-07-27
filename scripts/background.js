// Background service worker for RightClick Pro extension
chrome.runtime.onInstalled.addListener(() => {
    console.log("RightClick Pro extension installed");
    
    // Set default settings
    chrome.storage.sync.set({
        globalEnabled: true,
        siteSettings: {}
    });
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSiteStatus") {
        getSiteStatus(request.hostname).then(status => {
            sendResponse(status);
        });
        return true; // Keep message channel open for async response
    } else if (request.action === "setSiteStatus") {
        setSiteStatus(request.hostname, request.enabled).then(() => {
            sendResponse({success: true});
        });
        return true;
    } else if (request.action === "getGlobalStatus") {
        getGlobalStatus().then(status => {
            sendResponse(status);
        });
        return true;
    } else if (request.action === "setGlobalStatus") {
        setGlobalStatus(request.enabled).then(() => {
            sendResponse({success: true});
        });
        return true;
    }
});

// Get site-specific status
async function getSiteStatus(hostname) {
    try {
        const result = await chrome.storage.sync.get(["globalEnabled", "siteSettings"]);
        const globalEnabled = result.globalEnabled !== false;
        const siteSettings = result.siteSettings || {};
        
        // If site has specific setting, use it; otherwise use global setting
        const siteEnabled = siteSettings[hostname] !== undefined ? siteSettings[hostname] : globalEnabled;
        
        return {
            enabled: siteEnabled,
            globalEnabled: globalEnabled,
            hasSpecificSetting: siteSettings[hostname] !== undefined
        };
    } catch (error) {
        console.error("Error getting site status:", error);
        return { enabled: true, globalEnabled: true, hasSpecificSetting: false };
    }
}

// Set site-specific status
async function setSiteStatus(hostname, enabled) {
    try {
        const result = await chrome.storage.sync.get(["siteSettings"]);
        const siteSettings = result.siteSettings || {};
        
        siteSettings[hostname] = enabled;
        
        await chrome.storage.sync.set({ siteSettings: siteSettings });
        
        // Update badge for current tab
        updateBadge();
        
    } catch (error) {
        console.error("Error setting site status:", error);
    }
}

// Get global status
async function getGlobalStatus() {
    try {
        const result = await chrome.storage.sync.get(["globalEnabled"]);
        return { enabled: result.globalEnabled !== false };
    } catch (error) {
        console.error("Error getting global status:", error);
        return { enabled: true };
    }
}

// Set global status
async function setGlobalStatus(enabled) {
    try {
        await chrome.storage.sync.set({ globalEnabled: enabled });
        updateBadge();
    } catch (error) {
        console.error("Error setting global status:", error);
    }
}

// Update extension badge
async function updateBadge() {
    try {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tabs.length === 0 || !tabs[0].id) return; // Ensure tab and tab.id exist
        
        const tab = tabs[0];
        
        // Only process valid http(s) URLs
        if (!tab.url || (!tab.url.startsWith("http:") && !tab.url.startsWith("https:"))) {
            chrome.action.setBadgeText({ text: "", tabId: tab.id }); // Clear badge for non-web pages
            return;
        }
        
        const url = new URL(tab.url);
        const hostname = url.hostname;
        
        const status = await getSiteStatus(hostname);
        
        if (status.enabled) {
            chrome.action.setBadgeText({ text: "✓", tabId: tab.id });
            chrome.action.setBadgeBackgroundColor({ color: "#4CAF50", tabId: tab.id });
        } else {
            chrome.action.setBadgeText({ text: "✗", tabId: tab.id });
            chrome.action.setBadgeBackgroundColor({ color: "#f44336", tabId: tab.id });
        }
    } catch (error) {
        console.error("Error updating badge:", error);
    }
}

// Handle tab updates to refresh badge
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        updateBadge();
    }
});

// Handle tab activation to refresh badge
chrome.tabs.onActivated.addListener(() => {
    updateBadge();
});

// Initialize badge on startup
updateBadge();


