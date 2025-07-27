// Popup script for RightClick Pro extension
(function() {
    'use strict';
    
    // DOM elements
    const themeToggle = document.getElementById('themeToggle');
    const siteToggleInput = document.getElementById('siteToggleInput');
    const globalToggleInput = document.getElementById('globalToggleInput');
    const refreshBtn = document.getElementById('refreshBtn');
    const statusText = document.getElementById('statusText');
    const siteName = document.getElementById('siteName');
    const siteUrl = document.getElementById('siteUrl');
    const currentDomain = document.getElementById('currentDomain');
    const siteStatus = document.getElementById('siteStatus');
    
    let currentTab = null;
    let currentHostname = '';
    let isDarkMode = false;
    
    // Initialize popup
    init();
    
    async function init() {
        try {
            // Load theme preference
            await loadTheme();
            
            // Get current tab info
            await getCurrentTab();
            
            // Load site status
            await loadSiteStatus();
            
            // Setup event listeners
            setupEventListeners();
            
        } catch (error) {
            console.error('Error initializing popup:', error);
            showError('Failed to initialize extension');
        }
    }
    
    async function getCurrentTab() {
        try {
            const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tabs.length > 0) {
                currentTab = tabs[0];
                const url = new URL(currentTab.url);
                currentHostname = url.hostname;
                
                // Update UI with current site info
                updateSiteInfo();
            }
        } catch (error) {
            console.error('Error getting current tab:', error);
            currentHostname = 'unknown';
        }
    }
    
    function updateSiteInfo() {
        if (siteName) siteName.textContent = currentHostname;
        if (siteUrl) siteUrl.textContent = currentTab ? currentTab.url : 'Unknown URL';
        if (currentDomain) currentDomain.textContent = currentHostname;
    }
    
    async function loadSiteStatus() {
        try {
            // Get site-specific status
            const siteResponse = await chrome.runtime.sendMessage({
                action: 'getSiteStatus',
                hostname: currentHostname
            });
            
            // Get global status
            const globalResponse = await chrome.runtime.sendMessage({
                action: 'getGlobalStatus'
            });
            
            // Update toggles
            if (siteToggleInput) {
                siteToggleInput.checked = siteResponse.enabled;
            }
            
            if (globalToggleInput) {
                globalToggleInput.checked = globalResponse.enabled;
            }
            
            // Update status display
            updateStatusDisplay(siteResponse.enabled);
            
        } catch (error) {
            console.error('Error loading site status:', error);
            showError('Failed to load site status');
        }
    }
    
    function updateStatusDisplay(enabled) {
        const statusDot = siteStatus?.querySelector('.status-dot');
        
        if (enabled) {
            if (statusText) statusText.textContent = 'Enabled';
            if (statusDot) {
                statusDot.classList.add('active');
                statusDot.classList.remove('inactive');
            }
        } else {
            if (statusText) statusText.textContent = 'Disabled';
            if (statusDot) {
                statusDot.classList.add('inactive');
                statusDot.classList.remove('active');
            }
        }
    }
    
    function setupEventListeners() {
        // Theme toggle
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
        
        // Site toggle
        if (siteToggleInput) {
            siteToggleInput.addEventListener('change', handleSiteToggle);
        }
        
        // Global toggle
        if (globalToggleInput) {
            globalToggleInput.addEventListener('change', handleGlobalToggle);
        }
        
        // Refresh button
        if (refreshBtn) {
            refreshBtn.addEventListener('click', handleRefresh);
        }
    }
    
    async function handleSiteToggle() {
        try {
            const enabled = siteToggleInput.checked;
            
            // Update backend
            await chrome.runtime.sendMessage({
                action: 'setSiteStatus',
                hostname: currentHostname,
                enabled: enabled
            });
            
            // Notify content script
            if (currentTab) {
                try {
                    await chrome.tabs.sendMessage(currentTab.id, {
                        action: 'toggleSite',
                        enabled: enabled
                    });
                } catch (error) {
                    console.log('Content script not ready, will apply on next page load');
                }
            }
            
            // Update status display
            updateStatusDisplay(enabled);
            
            showNotification(enabled ? 'Enabled for this site' : 'Disabled for this site');
            
        } catch (error) {
            console.error('Error toggling site:', error);
            showError('Failed to update site setting');
            // Revert toggle
            siteToggleInput.checked = !siteToggleInput.checked;
        }
    }
    
    async function handleGlobalToggle() {
        try {
            const enabled = globalToggleInput.checked;
            
            await chrome.runtime.sendMessage({
                action: 'setGlobalStatus',
                enabled: enabled
            });
            
            showNotification(enabled ? 'Global default enabled' : 'Global default disabled');
            
        } catch (error) {
            console.error('Error toggling global setting:', error);
            showError('Failed to update global setting');
            // Revert toggle
            globalToggleInput.checked = !globalToggleInput.checked;
        }
    }
    
    async function handleRefresh() {
        try {
            if (currentTab) {
                await chrome.tabs.reload(currentTab.id);
                showNotification('Page refreshed');
                window.close();
            }
        } catch (error) {
            console.error('Error refreshing page:', error);
            showError('Failed to refresh page');
        }
    }
    
    async function loadTheme() {
        try {
            const result = await chrome.storage.sync.get(['darkMode']);
            isDarkMode = result.darkMode || false;
            applyTheme();
        } catch (error) {
            console.error('Error loading theme:', error);
        }
    }
    
    async function toggleTheme() {
        try {
            isDarkMode = !isDarkMode;
            await chrome.storage.sync.set({ darkMode: isDarkMode });
            applyTheme();
            showNotification(isDarkMode ? 'Dark mode enabled' : 'Light mode enabled');
        } catch (error) {
            console.error('Error toggling theme:', error);
            showError('Failed to change theme');
        }
    }
    
    function applyTheme() {
        const body = document.body;
        const sunIcon = themeToggle?.querySelector('.sun-icon');
        const moonIcon = themeToggle?.querySelector('.moon-icon');
        
        if (isDarkMode) {
            body.classList.add('dark-mode');
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'block';
        } else {
            body.classList.remove('dark-mode');
            if (sunIcon) sunIcon.style.display = 'block';
            if (moonIcon) moonIcon.style.display = 'none';
        }
    }
    
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }
    
    function showError(message) {
        // Create error notification element
        const notification = document.createElement('div');
        notification.className = 'notification error';
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
})();

