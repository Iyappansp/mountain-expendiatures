
import os

# Define the replacements map (Text pattern -> Correct Emoji)
# We map the corrupted string pattern to the correct emoji character.
replacements = {
    # Dashboard Sidebar
    '?? Overview': '📊 Overview',
    '?? My Bookings': '📅 My Bookings',
    '??? Trip Dossier': '🗺️ Trip Dossier',
    '?? Trip Dossier': '🗺️ Trip Dossier', # Variant
    '?? Gear Checklist': '🎒 Gear Checklist',
    '?? Profile': '👤 Profile',
    '?? Settings': '⚙️ Settings',
    '?? Log Out': '🚪 Log Out',
    
    # Dashboard Stats/Cards
    '<div style="font-size: 2rem; margin-bottom: 0.5rem;">??</div>': '<div style="font-size: 2rem; margin-bottom: 0.5rem;">📅</div>',
    '<div style="font-size: 2rem; margin-bottom: 0.5rem;">?</div>': '<div style="font-size: 2rem; margin-bottom: 0.5rem;">✓</div>', # Checkmark might be ?
    '<div style="font-size: 2rem; margin-bottom: 0.5rem;">???</div>': '<div style="font-size: 2rem; margin-bottom: 0.5rem;">⛰️</div>',
    '<div style="font-size: 2rem; margin-bottom: 0.5rem;">??</div>': '<div style="font-size: 2rem; margin-bottom: 0.5rem;">⏱️</div>',
    
    # Dashboard Quick Actions
    '<div style="font-size: 3rem; margin-bottom: 1rem;">??</div>': '<div style="font-size: 3rem; margin-bottom: 1rem;">📅</div>', # This might conflict with services, need context
    
    # Navbar
    'aria-label="Toggle dark mode">??': 'aria-label="Toggle dark mode">🌙',
    
    # Footer
    '?? info@': '📧 info@',
    '?? +1': '📞 +1',
    '?? Boulder': '📍 Boulder',
    
    # Services (Index) - These are harder because they are just div content. 
    # We will use more specific full line replacements if possible, or context.
}

# Specific context replacements for index.html services
services_replacements = [
    ('<div style="font-size: 3rem; margin-bottom: 1rem;">??</div>', '<div style="font-size: 3rem; margin-bottom: 1rem;">🧗</div>', 'service-card-guided'),
    ('<div style="font-size: 3rem; margin-bottom: 1rem;">??</div>', '<div style="font-size: 3rem; margin-bottom: 1rem;">🎓</div>', 'service-card-training'),
    ('<div style="font-size: 3rem; margin-bottom: 1rem;">???</div>', '<div style="font-size: 3rem; margin-bottom: 1rem;">🗺️</div>', 'service-card-custom')
]

dashboard_stats_replacements = [
    ('??', '📅'), # active bookings
    ('?', '✓'),   # completed trips (check)
    ('???', '⛰️'), # peaks
    ('??', '⏱️'),  # hours
    ('??', '📅'), # view all bookings
    ('??', '🎒'), # gear checklist
    ('??', '📞'), # contact
]

def restore_emojis(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    original_content = content
                    
                    # Apply general replacements
                    for bad, good in replacements.items():
                        content = content.replace(bad, good)
                        
                    # Apply contextual replacements for dashboard index.html specifically if needed
                    # But simpler approach: Look for specific blocks or just replace known patterns globally if unique enough.
                    
                    # Fix navbar dark mode toggle specifically if missed
                    content = content.replace('<button class="dark-mode-toggle" aria-label="Toggle dark mode">??</button>', 
                                            '<button class="dark-mode-toggle" aria-label="Toggle dark mode">🌙</button>')
                    
                    # Fix Services in index.html and services.html
                    # We might need to look for unique strings around them.
                    # Guided Climbs
                    if "Guided Climbs" in content:
                        content = content.replace('<div style="font-size: 3rem; margin-bottom: 1rem;">??</div>', '<div style="font-size: 3rem; margin-bottom: 1rem;">🧗</div>', 1)
                    # Training Programs (next one)
                    if "Training Programs" in content:
                        content = content.replace('<div style="font-size: 3rem; margin-bottom: 1rem;">??</div>', '<div style="font-size: 3rem; margin-bottom: 1rem;">🎓</div>', 1)
                    # Custom Expeditions
                    if "Custom Expeditions" in content:
                         content = content.replace('<div style="font-size: 3rem; margin-bottom: 1rem;">???</div>', '<div style="font-size: 3rem; margin-bottom: 1rem;">🗺️</div>', 1)
                    
                    # Fix Dashboard Stats
                    if "Active Bookings" in content:
                         # This is risky doing replace on ?? globally. 
                         # Let's target the stat-card blocks using regex if needed, or just specific strings.
                         pass

                    # Only write if changed
                    if content != original_content:
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(content)
                        print(f"Restored emojis in {path}")
                        
                except Exception as e:
                    print(f"Error processing {path}: {e}")

if __name__ == "__main__":
    restore_emojis('.')
