# RightClick Pro - Updated Installation & Usage Guide

## 🚀 Overview

**RightClick Pro** is a privacy-first Chrome extension that enables right-click context menus and content copying on websites that have disabled these features. The updated version focuses on per-site control, includes dark mode support, and complies with Chrome privacy policies.

## ✨ Key Features

- **🖱️ Enable Right-Click**: Bypass right-click blocking on any website
- **📋 Enable Copy/Paste**: Override text selection and copy restrictions
- **🌐 Per-Site Control**: Enable/disable functionality for specific websites
- **🌙 Dark Mode**: Toggle between light and dark themes
- **🔒 Privacy-First**: No analytics, no data collection, all settings stored locally
- **⚡ Global Default**: Set default behavior for new sites
- **🎨 Modern UI**: Clean, responsive interface with smooth animations

## 📦 Installation Instructions

### Method 1: Load Unpacked Extension (Recommended)

1. **Download the Extension**
   - Download the `rightclick-pro-extension-v2.zip` file
   - Extract it to a folder on your computer

2. **Open Chrome Extensions Page**
   - Open Google Chrome
   - Navigate to `chrome://extensions/`
   - Or go to Menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the Extension**
   - Click "Load unpacked" button
   - Select the extracted `chrome-extension-right-click` folder
   - The extension should now appear in your extensions list

5. **Verify Installation**
   - Look for the RightClick Pro icon in your Chrome toolbar
   - The badge should show ✓ or ✗ indicating the current site status

## 🎯 How to Use

### Basic Usage

1. **Open Extension Popup**
   - Click the RightClick Pro icon in your Chrome toolbar
   - The popup shows the current site status and controls

2. **Enable for Current Site**
   - Use the "Enable for This Site" toggle to control the current website
   - The toggle shows whether right-click and copy are enabled for the current site

3. **Set Global Default**
   - Use the "Global Default" toggle to set the default behavior for new sites
   - This affects how the extension behaves on sites you haven't specifically configured

4. **Toggle Dark Mode**
   - Click the sun/moon icon in the header to switch between light and dark themes
   - Your preference is saved and will persist across sessions

### Advanced Features

#### Per-Site Control
- **Individual Site Settings**: Each website can be enabled or disabled independently
- **Site Status Indicator**: The badge shows ✓ (enabled) or ✗ (disabled) for the current site
- **Automatic Application**: Settings are applied automatically when you visit a site

#### Dark Mode
- **System Integration**: Respects your system's dark mode preference
- **Manual Toggle**: Override system settings with the theme toggle button
- **Smooth Transitions**: All UI elements transition smoothly between themes

#### Developer Information
- **Contact Details**: Easy access to developer contact information
- **Email**: tegegnw1997@gmail.com
- **GitHub**: github.com/tegegndev
- **Telegram**: @yegna_tv

## 🧪 Testing the Extension

A test page is included to verify the extension works correctly:

1. **Open Test Page**
   - Navigate to the included `test-page.html` file
   - Or visit any website with copy protection

2. **Test Scenarios**
   - Try right-clicking on protected text sections
   - Attempt to select and copy protected content
   - Toggle the extension on/off to see the difference
   - Test dark mode functionality

3. **Expected Results**
   - When enabled: All text should be selectable and right-click should work
   - When disabled: Original site restrictions should be respected
   - Badge should update to reflect current status

## 🔧 Troubleshooting

### Extension Not Working
- **Check Site Toggle**: Ensure the "Enable for This Site" toggle is ON
- **Refresh Page**: Some sites may require a page refresh after enabling
- **Check Permissions**: Ensure the extension has permission to access the website

### Dark Mode Issues
- **Theme Not Applying**: Try toggling the theme button in the popup header
- **Inconsistent Styling**: Clear browser cache and reload the extension

### Per-Site Settings
- **Settings Not Saving**: Check if Chrome has permission to store extension data
- **Global vs Site Settings**: Site-specific settings override global defaults

## 🛡️ Privacy & Security

### Privacy Compliance
- **No Analytics**: Completely removed all analytics and tracking features
- **No Data Collection**: Extension doesn't collect or send any user data
- **Local Storage Only**: All settings are stored locally in your browser
- **Chrome Policy Compliant**: Follows all Chrome Web Store privacy policies

### Data Handling
- **Site Settings**: Stored locally using Chrome's sync storage
- **Theme Preferences**: Saved locally and synced across your Chrome instances
- **No External Servers**: Extension operates entirely offline

### Permissions
- **Minimal Permissions**: Only requests necessary permissions for functionality
- **Active Tab**: Access to current tab for right-click enabling
- **Storage**: Local storage for settings and preferences

## 📋 Supported Features

### ✅ What Works
- CSS-based text selection blocking (`user-select: none`)
- JavaScript event blocking (`oncontextmenu`, `onselectstart`, etc.)
- Image right-click protection
- Dynamic content protection
- Most common copy protection methods
- Per-site enable/disable control
- Dark mode theming

### ⚠️ Limitations
- Some advanced DRM-protected content may still be restricted
- Certain enterprise security solutions may override the extension
- Video/audio content protection is not affected

## 🔄 Updates & Changes

### Version 2.0 Changes
- **Removed Analytics**: Completely removed all tracking and analytics features
- **Added Per-Site Control**: Individual enable/disable for each website
- **Dark Mode Support**: Full dark theme with smooth transitions
- **Developer Info**: Added contact information in the popup
- **Privacy Compliance**: Ensured full compliance with Chrome policies
- **Improved UI**: Cleaner, more modern interface design

### Automatic Updates
- The extension will automatically update when new versions are available
- Check the Chrome Extensions page for update status

## 📞 Support & Contact

### Developer Contact
- **Email**: tegegnw1997@gmail.com
- **GitHub**: https://github.com/tegegndev
- **Telegram**: https://t.me/yegna_tv

### Getting Help
1. **Check this guide** for common solutions
2. **Test on the included test page** to verify basic functionality
3. **Check browser console** for any error messages
4. **Contact developer** using the information above

## 🎨 Interface Guide

### Popup Interface Elements

- **Header**: Extension branding with theme toggle button
- **Current Site**: Shows current website status and information
- **Site Toggle**: Enable/disable for the current website
- **Global Toggle**: Set default behavior for new sites
- **Quick Actions**: Refresh page button
- **Developer Info**: Contact information and links
- **Footer**: Version and edition information

### Visual Indicators

- **✓ Badge**: Extension is enabled for current site
- **✗ Badge**: Extension is disabled for current site
- **Green Status Dot**: Feature is active
- **Red Status Dot**: Feature is inactive
- **Theme Icons**: Sun (light mode) / Moon (dark mode)

## 🚀 Advanced Usage

### Power User Tips
- Use keyboard shortcuts (Ctrl+C) for faster copying after enabling
- Monitor the badge for quick status overview
- Use per-site settings for fine-grained control
- Toggle dark mode based on time of day or preference

### Technical Notes
- Uses Manifest V3 for better security and performance
- Content scripts run at document_start for maximum effectiveness
- Background service worker handles settings and badge updates
- CSS variables enable smooth theme transitions

---

**Enjoy using RightClick Pro! 🎉**

*Version 2.0.0 - Privacy-First Edition*

**Developer**: Tegegn Wondwosen  
**Contact**: tegegnw1997@gmail.com | GitHub: tegegndev | Telegram: @yegna_tv


