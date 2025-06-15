document.getElementById("searchBtn").addEventListener("click", function() {
  const word = document.getElementById("searchInput").value;
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then(data => {
      const entry = data[0];
      const meanings = entry.meanings.map(m => `
        <h3>${m.partOfSpeech}</h3>
        <ul>
          ${m.definitions.map(d => `<li>${d.definition}</li>`).join('')}
        </ul>
      `).join('');

      const audio = entry.phonetics.find(p => p.audio) || {};
      document.getElementById("result").innerHTML = `
        <h2>${entry.word}</h2>
        <p>${entry.phonetic || ''} <button onclick="new Audio('${audio.audio}').play()">🔊</button></p>
        ${meanings}
      `;
    })
    .catch(() => {
      document.getElementById("result").innerHTML = "<p>Word not found.</p>";
    });
});

document.getElementById("themeToggle").addEventListener("click", function() {
  document.body.classList.toggle("dark");
});

document.getElementById("fontSelect").addEventListener("change", function(e) {
  document.body.style.fontFamily = e.target.value;
});
