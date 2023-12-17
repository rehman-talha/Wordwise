{
  "name": "Wordwise",
  "version": "1.0",
  "manifest_version": 2,
  "description": "Elevate your online reading experience with Wordwise.",
  "icons": {
    "48": "icons/icon.png",
    "128": "icons/icon.png"
  },
  "default_locale": "en",
  "permissions": ["storage", "activeTab", "tabs"], // Added "tabs" permission
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content/content.js"],
      "css": ["content/content.css"],
      "run_at": "document_idle"
    }
  ],
  "options_ui": {
    "page": "options/options.html",
    "browser_style": true
  },
  "background": {
    "scripts": ["background/background.js"],
    "persistent": false
  },
  "browser_action": {
    "default_icon": {
      "48": "icons/icon.png",
      "128": "icons/icon.png"
    },
    "default_title": "Wordwise Toolbar",
    "default_popup": "popup/popup.html"
  }
}
