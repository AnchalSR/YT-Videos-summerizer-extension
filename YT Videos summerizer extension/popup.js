document.getElementById('summarizeBtn').addEventListener('click', async () => {
    const summarizeBtn = document.getElementById('summarizeBtn');
    summarizeBtn.innerText = 'Summarizing...';
    summarizeBtn.disabled = true;
  
    try {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
    } catch (error) {
      console.error('Error executing script:', error);
      alert('Failed to summarize video.');
    } finally {
      summarizeBtn.innerText = 'Summarize Video';
      summarizeBtn.disabled = false;
    }
  });  