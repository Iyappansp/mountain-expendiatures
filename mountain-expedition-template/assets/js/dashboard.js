// Dashboard JavaScript - Chart.js and Dashboard Interactions

document.addEventListener('DOMContentLoaded', function() {
  initDashboardSidebar();
  initCharts();
  initGearChecklist();
  initBookingFilters();
  setActiveDashboardLink();
});

// Dashboard Sidebar Toggle
function initDashboardSidebar() {
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.dashboard-sidebar');
  
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
    });
  }
}

// Initialize Charts using Chart.js
function initCharts() {
  // Bookings Overview Chart
  const bookingsCtx = document.getElementById('bookingsChart');
  if (bookingsCtx) {
    new Chart(bookingsCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Bookings',
          data: [12, 19, 15, 25, 22, 30],
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
  
  // Expedition Types Chart
  const expeditionCtx = document.getElementById('expeditionChart');
  if (expeditionCtx) {
    new Chart(expeditionCtx, {
      type: 'doughnut',
      data: {
        labels: ['Trekking', 'Mountain Climbing', 'Ice Climbing', 'Ski Tours'],
        datasets: [{
          data: [35, 30, 20, 15],
          backgroundColor: [
            '#2563eb',
            '#0ea5e9',
            '#64748b',
            '#38bdf8'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
  
  // Activity Chart
  const activityCtx = document.getElementById('activityChart');
  if (activityCtx) {
    new Chart(activityCtx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Activity Hours',
          data: [8, 6, 7, 9, 8, 12, 10],
          backgroundColor: '#0ea5e9',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
}

// Gear Checklist Functionality
function initGearChecklist() {
  const checkboxes = document.querySelectorAll('.gear-checkbox');
  
  checkboxes.forEach(checkbox => {
    // Load saved state
    const savedState = localStorage.getItem(`gear_${checkbox.id}`);
    if (savedState === 'true') {
      checkbox.checked = true;
      updateGearItem(checkbox);
    }
    
    checkbox.addEventListener('change', function() {
      localStorage.setItem(`gear_${this.id}`, this.checked);
      updateGearItem(this);
      updateProgress();
    });
  });
  
  updateProgress();
}

function updateGearItem(checkbox) {
  const item = checkbox.closest('.gear-item');
  if (item) {
    item.classList.toggle('completed', checkbox.checked);
  }
}

function updateProgress() {
  const progressBar = document.querySelector('.gear-progress-bar');
  const progressText = document.querySelector('.gear-progress-text');
  const checkboxes = document.querySelectorAll('.gear-checkbox');
  
  if (checkboxes.length > 0 && progressBar) {
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percentage = Math.round((checked / checkboxes.length) * 100);
    
    progressBar.style.width = percentage + '%';
    if (progressText) {
      progressText.textContent = `${percentage}% Complete`;
    }
  }
}

// Booking Filters
function initBookingFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const bookingRows = document.querySelectorAll('.booking-row');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.dataset.filter;
      
      bookingRows.forEach(row => {
        if (filter === 'all' || row.dataset.status === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}

// Set Active Dashboard Link
function setActiveDashboardLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.dashboard-nav a');
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (currentPath === linkPath) {
      link.classList.add('active');
    }
  });
}

// Booking Status Badge Colors
function getStatusBadgeClass(status) {
  const statusMap = {
    'confirmed': 'badge-success',
    'pending': 'badge-warning',
    'completed': 'badge-info',
    'cancelled': 'badge-danger'
  };
  return statusMap[status.toLowerCase()] || 'badge-secondary';
}

// Export function for external use
window.updateBookingStatus = function(bookingId, newStatus) {
  const row = document.querySelector(`[data-booking-id="${bookingId}"]`);
  if (row) {
    const badge = row.querySelector('.status-badge');
    if (badge) {
      badge.className = `badge ${getStatusBadgeClass(newStatus)}`;
      badge.textContent = newStatus;
    }
    row.dataset.status = newStatus.toLowerCase();
  }
};

// Trip Details Modal (if needed)
function showTripDetails(tripId) {
  console.log('Showing details for trip:', tripId);
  // This would show a modal with trip details
  // Implementation depends on specific requirements
}

// Profile Image Upload Preview
const profileImageInput = document.getElementById('profile-image');
if (profileImageInput) {
  profileImageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const preview = document.querySelector('.profile-image-preview');
        if (preview) {
          preview.src = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  });
}

// Settings Save
const settingsForm = document.getElementById('settings-form');
if (settingsForm) {
  settingsForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(this);
    const settings = Object.fromEntries(formData);
    
    // Save to localStorage (in production, this would go to backend)
    localStorage.setItem('userSettings', JSON.stringify(settings));
    
    // Show success message
    showNotification('Settings saved successfully!', 'success');
  });
}

// Load user settings
function loadUserSettings() {
  const savedSettings = localStorage.getItem('userSettings');
  if (savedSettings) {
    const settings = JSON.parse(savedSettings);
    Object.keys(settings).forEach(key => {
      const input = document.querySelector(`[name="${key}"]`);
      if (input) {
        if (input.type === 'checkbox') {
          input.checked = settings[key] === 'on';
        } else {
          input.value = settings[key];
        }
      }
    });
  }
}

// Initialize settings on load
if (document.getElementById('settings-form')) {
  loadUserSettings();
}

// Dummy data for demonstration
const dummyBookings = [
  {
    id: 'B001',
    expedition: 'Mount Everest Base Camp',
    date: '2025-05-15',
    duration: '14 days',
    status: 'confirmed',
    price: '$2,500'
  },
  {
    id: 'B002',
    expedition: 'K2 Advanced Climbing',
    date: '2025-07-01',
    duration: '21 days',
    status: 'pending',
    price: '$8,500'
  },
  {
    id: 'B003',
    expedition: 'Annapurna Circuit Trek',
    date: '2025-03-20',
    duration: '12 days',
    status: 'completed',
    price: '$1,800'
  }
];

// Function to populate bookings table (if needed)
function populateBookingsTable() {
  const tbody = document.querySelector('#bookings-table tbody');
  if (tbody && dummyBookings) {
    tbody.innerHTML = dummyBookings.map(booking => `
      <tr class="booking-row" data-booking-id="${booking.id}" data-status="${booking.status}">
        <td>${booking.id}</td>
        <td>${booking.expedition}</td>
        <td>${booking.date}</td>
        <td>${booking.duration}</td>
        <td><span class="badge ${getStatusBadgeClass(booking.status)}">${booking.status}</span></td>
        <td>${booking.price}</td>
        <td><button class="btn-sm btn-outline" onclick="showTripDetails('${booking.id}')">View</button></td>
      </tr>
    `).join('');
  }
}

// Initialize on specific pages
if (window.location.pathname.includes('bookings.html')) {
  // populateBookingsTable(); // Uncomment if using dynamic population
}
