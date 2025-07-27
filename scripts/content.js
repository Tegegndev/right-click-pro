// Content script to enable right-click and copying functionality
(function() {
    'use strict';
    
    let isEnabled = false;
    let hostname = window.location.hostname;
    
    // Initialize extension state
    initializeExtension();
    
    async function initializeExtension() {
        try {
            // Get site-specific status from background script
            const response = await chrome.runtime.sendMessage({
                action: 'getSiteStatus',
                hostname: hostname
            });
            
            isEnabled = response.enabled;
            
            if (isEnabled) {
                enableRightClickAndCopy();
            }
        } catch (error) {
            console.error('RightClick Pro: Error initializing extension:', error);
        }
    }
    
    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'toggleSite') {
            isEnabled = request.enabled;
            if (isEnabled) {
                enableRightClickAndCopy();
            } else {
                disableRightClickAndCopy();
            }
            sendResponse({success: true});
        } else if (request.action === 'getSiteInfo') {
            sendResponse({
                hostname: hostname,
                enabled: isEnabled
            });
        }
    });
    
    function enableRightClickAndCopy() {
        // Remove existing event listeners that might block right-click
        removeBlockingListeners();
        
        // Override common right-click blocking methods
        overrideBlockingMethods();
        
        // Enable text selection
        enableTextSelection();
        
        // Inject additional scripts if needed
        injectHelperScript();
        
        console.log('RightClick Pro: Enabled for', hostname);
    }
    
    function disableRightClickAndCopy() {
        // This function would restore original behavior if needed
        isEnabled = false;
        console.log('RightClick Pro: Disabled for', hostname);
    }
    
    function removeBlockingListeners() {
        // Remove contextmenu event listeners
        document.addEventListener('contextmenu', function(e) {
            if (isEnabled) {
                e.stopImmediatePropagation();
            }
        }, true);
        
        // Remove selectstart blocking
        document.addEventListener('selectstart', function(e) {
            if (isEnabled) {
                e.stopImmediatePropagation();
            }
        }, true);
        
        // Remove dragstart blocking
        document.addEventListener('dragstart', function(e) {
            if (isEnabled) {
                e.stopImmediatePropagation();
            }
        }, true);
        
        // Remove copy blocking
        document.addEventListener('copy', function(e) {
            if (isEnabled) {
                e.stopImmediatePropagation();
            }
        }, true);
    }
    
    function overrideBlockingMethods() {
        if (!isEnabled) return;
        
        // Override common blocking functions
        const originalAddEventListener = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function(type, listener, options) {
            if (isEnabled && (type === 'contextmenu' || type === 'selectstart' || type === 'dragstart' || type === 'copy')) {
                // Don't add blocking listeners when extension is enabled
                return;
            }
            return originalAddEventListener.call(this, type, listener, options);
        };
        
        // Override document properties that might block selection
        try {
            Object.defineProperty(document, 'onselectstart', {
                get: function() { return null; },
                set: function() { return null; },
                configurable: true
            });
            
            Object.defineProperty(document, 'oncontextmenu', {
                get: function() { return null; },
                set: function() { return null; },
                configurable: true
            });
            
            Object.defineProperty(document, 'ondragstart', {
                get: function() { return null; },
                set: function() { return null; },
                configurable: true
            });
        } catch (e) {
            console.log('RightClick Pro: Could not override document properties');
        }
    }
    
    function enableTextSelection() {
        if (!isEnabled) return;
        
        // Remove CSS that prevents text selection
        const style = document.createElement('style');
        style.id = 'rightclick-pro-style';
        style.textContent = `
            * {
                -webkit-user-select: text !important;
                -moz-user-select: text !important;
                -ms-user-select: text !important;
                user-select: text !important;
                -webkit-touch-callout: default !important;
                -webkit-tap-highlight-color: rgba(0,0,0,0) !important;
            }
            
            *:not(input):not(textarea) {
                -webkit-user-select: text !important;
                -moz-user-select: text !important;
                -ms-user-select: text !important;
                user-select: text !important;
            }
        `;
        document.head.appendChild(style);
        
        // Remove unselectable attributes
        const unselectableElements = document.querySelectorAll('[unselectable="on"]');
        unselectableElements.forEach(el => el.removeAttribute('unselectable'));
        
        // Remove onselectstart attributes
        const selectStartElements = document.querySelectorAll('[onselectstart]');
        selectStartElements.forEach(el => el.removeAttribute('onselectstart'));
    }
    
    function injectHelperScript() {
        if (!isEnabled) return;
        
        // Inject a script into the page context to override more blocking methods
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('scripts/injected.js');
        script.onload = function() {
            this.remove();
        };
        (document.head || document.documentElement).appendChild(script);
    }
    
    // Run the main function when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeExtension);
    } else {
        initializeExtension();
    }
})();

