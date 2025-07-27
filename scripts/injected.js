// Injected script that runs in the page context to override blocking methods
(function() {
    'use strict';
    
    // Override window methods that might block right-click
    if (window.addEventListener) {
        const originalWindowAddEventListener = window.addEventListener;
        window.addEventListener = function(type, listener, options) {
            if (type === 'contextmenu' || type === 'selectstart' || type === 'dragstart') {
                // Don't add blocking listeners
                return;
            }
            return originalWindowAddEventListener.call(this, type, listener, options);
        };
    }
    
    // Override document methods
    if (document.addEventListener) {
        const originalDocumentAddEventListener = document.addEventListener;
        document.addEventListener = function(type, listener, options) {
            if (type === 'contextmenu' || type === 'selectstart' || type === 'dragstart') {
                // Don't add blocking listeners
                return;
            }
            return originalDocumentAddEventListener.call(this, type, listener, options);
        };
    }
    
    // Override common blocking functions
    window.oncontextmenu = null;
    window.onselectstart = null;
    window.ondragstart = null;
    
    document.oncontextmenu = null;
    document.onselectstart = null;
    document.ondragstart = null;
    
    // Override body events
    if (document.body) {
        document.body.oncontextmenu = null;
        document.body.onselectstart = null;
        document.body.ondragstart = null;
    }
    
    // Override common JavaScript functions used to block right-click
    const originalAlert = window.alert;
    window.alert = function(message) {
        // Check if this is a right-click blocking alert
        if (typeof message === 'string' && 
            (message.toLowerCase().includes('right click') || 
             message.toLowerCase().includes('disabled') ||
             message.toLowerCase().includes('not allowed'))) {
            return; // Don't show blocking alerts
        }
        return originalAlert.call(this, message);
    };
    
    // Override return false functions
    const originalReturnFalse = function() { return false; };
    
    // Remove common blocking attributes from all elements
    function removeBlockingAttributes() {
        const elements = document.querySelectorAll('*');
        elements.forEach(function(element) {
            element.oncontextmenu = null;
            element.onselectstart = null;
            element.ondragstart = null;
            element.removeAttribute('oncontextmenu');
            element.removeAttribute('onselectstart');
            element.removeAttribute('ondragstart');
            element.removeAttribute('unselectable');
        });
    }
    
    // Run immediately and on DOM changes
    removeBlockingAttributes();
    
    // Use MutationObserver to handle dynamically added elements
    if (window.MutationObserver) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                            node.oncontextmenu = null;
                            node.onselectstart = null;
                            node.ondragstart = null;
                            node.removeAttribute && node.removeAttribute('oncontextmenu');
                            node.removeAttribute && node.removeAttribute('onselectstart');
                            node.removeAttribute && node.removeAttribute('ondragstart');
                            node.removeAttribute && node.removeAttribute('unselectable');
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body || document.documentElement, {
            childList: true,
            subtree: true
        });
    }
    
    console.log('RightClick Pro: Injected script loaded successfully');
})();

