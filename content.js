chrome.storage.sync.get('enabled', ({ enabled }) => {
  if (!enabled) return;

  const hideShelves = () => {
    document.querySelectorAll('ytd-rich-shelf-renderer, ytd-rich-section-renderer').forEach(section => {
      if (section.querySelector(
            'ytm-shorts-lockup-view-model, ' +
            'ytm-shorts-lockup-view-model-v2, ' +
            'a.reel-item-endpoint'
          )) {
        section.remove();
      }
    });
  };

  const init = () => {
    hideShelves();
    new MutationObserver(hideShelves)
      .observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
});
