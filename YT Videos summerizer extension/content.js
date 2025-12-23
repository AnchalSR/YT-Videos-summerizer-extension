(async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Ensure all content loads

    let transcript = '';
    const transcriptSegments = document.querySelectorAll('ytd-transcript-segment-renderer');

    if (transcriptSegments.length > 0) {
      transcript = Array.from(transcriptSegments)
        .map(segment => segment.innerText)
        .join(' ');
    } else {
      const captions = document.querySelectorAll('.caption-line');
      if (captions.length > 0) {
        transcript = Array.from(captions)
          .map(caption => caption.innerText)
          .join(' ');
      }
    }

    if (!transcript) {
      alert('Transcript not found. Please ensure captions are enabled.');
      return;
    }

    const response = await fetch('http://localhost:5000/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: transcript })
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Check if the summary is present in the server response
    if (data && data.summary) {
      chrome.runtime.sendMessage({ summary: data.summary });
    } else {
      console.error('Summary not found in the response');
      alert('Failed to get a valid summary.');
    }
  } catch (error) {
    console.error('Error:', error.message || error);
    alert('Failed to fetch transcript from the server.');
  }
})();
