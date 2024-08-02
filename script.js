document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const voiceSelect = document.getElementById('voice-select');
    const speakButton = document.getElementById('speak-button');
    let voices = [];

    function populateVoiceList() {
        voices = speechSynthesis.getVoices();
        voiceSelect.innerHTML = '';
        voices.forEach((voice, i) => {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        });
    }

    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    speakButton.addEventListener('click', () => {
        const utterance = new SpeechSynthesisUtterance(textInput.value);
        const selectedVoiceIndex = voiceSelect.value;
        if (selectedVoiceIndex) {
            utterance.voice = voices[selectedVoiceIndex];
        }
        speechSynthesis.speak(utterance);
    });
});