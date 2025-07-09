document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('preferencesForm');
  const resultsDiv = document.getElementById('results');
  const resultsList = document.getElementById('resultsList');
  const backBtn = document.getElementById('backBtn');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const data = {
      commute: parseInt(form.commute.value, 10),
      crime: form.crime.value,
      green: form.green.value,
      cost: form.cost.value,
      internet: form.internet.value
    };
    const res = await fetch('/api/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const matches = await res.json();
    showResults(matches);
  });

  backBtn.addEventListener('click', function () {
    resultsDiv.classList.add('d-none');
    form.classList.remove('d-none');
  });

  function showResults(matches) {
    resultsList.innerHTML = '';
    if (!matches.length) {
      resultsList.innerHTML = '<div class="alert alert-warning">No matches found. Try adjusting your preferences.</div>';
    } else {
      matches.forEach((n, i) => {
        resultsList.innerHTML += `
          <div class="card p-3">
            <h5 class="mb-1">${i+1}. ${n.name}</h5>
            <ul class="mb-0">
              <li><strong>Commute Time:</strong> ${n.commute} min</li>
              <li><strong>Crime Rate:</strong> ${n.crime}</li>
              <li><strong>Green Spaces:</strong> ${n.green}</li>
              <li><strong>Cost of Living:</strong> ${n.cost}</li>
              <li><strong>Internet Access:</strong> ${n.internet}</li>
            </ul>
          </div>
        `;
      });
    }
    form.classList.add('d-none');
    resultsDiv.classList.remove('d-none');
  }
}); 