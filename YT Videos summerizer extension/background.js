chrome.runtime.onInstalled.addListener(() => {
    console.log('YouTube Video Summarizer Extension Installed');
  });
  
  chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
  });
  
  