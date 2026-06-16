/* ============================================================
   Photography Dashboard — main.js
   ============================================================ */

// ----- Bar Chart -----
(function buildBarChart() {
  const months   = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const weddings  = [4, 6, 5, 8, 9, 7];
  const portraits = [7, 5, 8, 6, 9, 8];
  const commercial= [3, 4, 3, 5, 4, 6];

  const maxVal = Math.max(
    ...months.map((_, i) => weddings[i] + portraits[i] + commercial[i])
  );
  const chartH = 130; // px for 100%

  const container = document.getElementById('barChart');
  if (!container) return;

  months.forEach((month, i) => {
    const total = weddings[i] + portraits[i] + commercial[i];

    const col = document.createElement('div');
    col.className = 'bar-col';

    // total label on top
    const valEl = document.createElement('div');
    valEl.className = 'bar-val';
    valEl.textContent = total;
    col.appendChild(valEl);

    // stacked bars
    const stack = document.createElement('div');
    stack.className = 'bar-stack';

    const segments = [
      { value: weddings[i],   color: '#378ADD' },
      { value: portraits[i],  color: '#639922' },
      { value: commercial[i], color: '#BA7517' },
    ];

    segments.forEach(({ value, color }) => {
      const seg = document.createElement('div');
      seg.className = 'bar-seg';
      const h = Math.max(Math.round((value / maxVal) * chartH), 4);
      seg.style.height  = h + 'px';
      seg.style.background = color;
      stack.appendChild(seg);
    });

    col.appendChild(stack);

    // month label
    const lbl = document.createElement('div');
    lbl.className = 'bar-label';
    lbl.textContent = month;
    col.appendChild(lbl);

    container.appendChild(col);
  });
})();

// ----- Active nav highlight (for sub-pages) -----
(function highlightNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-item').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') && path.includes(link.getAttribute('href').replace('../', ''))) {
      link.classList.add('active');
    }
  });
})();
