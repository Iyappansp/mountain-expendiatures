document.addEventListener('DOMContentLoaded', function() {
  // Create Modal HTML
  const modalHTML = `
    <div id="logoutModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 2000; align-items: center; justify-content: center;">
      <div style="background: var(--bg-primary); padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; max-width: 400px; width: 90%;">
        <h3 style="margin-bottom: 1rem; color: var(--text-primary);">Log Out</h3>
        <p style="margin-bottom: 1.5rem; color: var(--text-secondary);">Are you sure you want to log out?</p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button id="cancelLogout" class="btn btn-secondary" style="color: var(--text-primary); border-color: var(--border-color);">No, Cancel</button>
          <button id="confirmLogout" class="btn btn-primary">Yes, Log Out</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Get Elements
  const logoutBtn = document.getElementById('logoutBtn');
  const modal = document.getElementById('logoutModal');
  const cancelBtn = document.getElementById('cancelLogout');
  const confirmBtn = document.getElementById('confirmLogout');

  // Event Listeners
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      modal.style.display = 'flex';
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', function() {
      // Perform logout action - for now just redirect to home
      window.location.href = '../pages/index.html';
    });
  }

  // Close on outside click
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
