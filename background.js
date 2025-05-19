chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ enabled: false });
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === 'refresh' && sender.tab && sender.tab.id) {
    chrome.tabs.reload(sender.tab.id);
  }
});
