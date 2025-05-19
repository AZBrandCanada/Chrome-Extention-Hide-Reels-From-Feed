document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('toggleButton');

  const update = enabled => {
    button.textContent = enabled ? 'Disable' : 'Enable';
  };

  chrome.storage.sync.get('enabled', ({ enabled }) => update(enabled));

  button.addEventListener('click', () => {
    chrome.storage.sync.get('enabled', ({ enabled }) => {
      const next = !enabled;
      chrome.storage.sync.set({ enabled: next }, () => {
        update(next);
        // Reload the current tab to apply changes immediately
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
          if (tabs[0] && tabs[0].id) chrome.tabs.reload(tabs[0].id);
        });
      });
    });
  });
});