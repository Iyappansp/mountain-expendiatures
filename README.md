# Mountain Expedition Template

A complete, professional static website template for mountain guide and expedition services. Built with HTML, CSS, JavaScript, Tailwind CSS, and Bootstrap.

## 🏔️ Features

### Public Website
- **Responsive Design**: Mobile-first, fully responsive across all devices
- **Modern UI**: Cool mountain palette (blues, grays, white) with clean aesthetics
- **Dark Mode**: Built-in light/dark theme toggle with localStorage persistence
- **RTL Support**: Separate stylesheet for right-to-left language support
- **SEO Optimized**: Semantic HTML5, proper meta tags, heading hierarchy
- **Form Validation**: Client-side JavaScript validation for all forms
- **Smooth Animations**: Scroll animations and interactive hover effects

### Client Dashboard (UI Only)
- **Overview Dashboard**: Stats, charts, and upcoming bookings
- **Bookings Management**: View and filter expedition bookings
- **Trip Dossier**: Detailed itinerary and expedition information
- **Gear Checklist**: Interactive checklist with progress tracking
- **Profile Management**: User profile with achievements
- **Settings**: Account preferences and security options
- **Chart.js Integration**: Beautiful data visualization

## 📁 Project Structure

```
mountain-expedition-template/
├── assets/
│   ├── css/
│   │   ├── style.css          # Main styles (cool mountain palette)
│   │   ├── dark-mode.css      # Dark mode specific styles
│   │   └── rtl.css            # RTL language support
│   ├── js/
│   │   ├── main.js            # Core JavaScript functionality
│   │   └── dashboard.js       # Dashboard-specific features
│   └── images/                # Placeholder for images
├── pages/
│   ├── index.html             # Home page
│   ├── about.html             # About us & team
│   ├── services.html          # Services & pricing
│   ├── expeditions.html       # Available expeditions
│   ├── gear-list.html         # Equipment checklist
│   ├── blog.html              # Blog/stories
│   ├── contact.html           # Contact form
│   ├── coming-soon.html       # Coming soon page
│   └── 404.html               # Error page
├── dashboard/
│   ├── index.html             # Dashboard overview
│   ├── bookings.html          # Booking management
│   ├── trips.html             # Trip details
│   ├── gear.html              # Gear checklist
│   ├── profile.html           # User profile
│   └── settings.html          # Account settings
└── README.md                  # This file
```

## 🎨 Design System

### Color Palette
- **Primary Dark**: `#1e3a8a` (Deep Navy)
- **Primary**: `#2563eb` (Ocean Blue)
- **Secondary**: `#475569` (Slate Gray)
- **Accent**: `#0ea5e9` (Ice Blue)
- **Background**: `#f8fafc` (Light Gray)
- **Text**: `#0f172a` (Charcoal)

### Typography
- **Headings**: Montserrat (Bold, 700-800)
- **Body**: Inter (Regular, 400-700)
- **Font Sizes**: Responsive (mobile-first approach)

### Components
- Cards with hover effects
- Expedition cards with badges
- Stats cards with icons
- Form elements with validation
- Navigation with active states
- Responsive tables
- Progress bars
- Status badges

## 🚀 Getting Started

### Quick Start
1. Clone or download this template
2. Open `pages/index.html` in your browser
3. Navigate through the pages
4. Access dashboard at `dashboard/index.html`

### Customization

#### Change Colors
Edit CSS variables in `assets/css/style.css`:
```css
:root {
  --primary: #2563eb;
  --accent: #0ea5e9;
  /* ... more variables */
}
```

#### Add Your Images
Replace Unsplash URLs with your own:
- Expedition photos: 800x600px recommended
- Profile images: 300x300px square
- Hero images: 1600x900px landscape

#### Update Content
- Edit HTML files directly in `pages/` and `dashboard/`
- Update expedition details in `expeditions.html`
- Modify service packages in `services.html`
- Customize gear lists in `gear-list.html`

#### Form Integration
Contact form is ready for:
- **Formspree**: Add your endpoint to form action
- **Netlify Forms**: Add `data-netlify="true"` attribute
- **Custom Backend**: Modify form submission in `main.js`

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: > 768px

## ✨ Features in Detail

### Navigation
- Sticky header
- Mobile hamburger menu
- Active page highlighting
- Smooth scroll to sections

### Forms
- Real-time validation
- Error messages
- Success notifications
- Required field indicators

### Dashboard
- Chart.js for data visualization
- LocalStorage for checklist state
- Filter bookings by status
- Progress tracking for gear

### Dark Mode
- Toggle button in navigation
- Persistent via localStorage
- Respects system preferences
- Smooth transitions

### Accessibility
- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Alt text for images
- Color contrast compliance

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Flexbox, Grid
- **JavaScript (ES6+)**: Vanilla JS, no frameworks
- **Tailwind CSS**: Utility-first CSS (CDN)
- **Bootstrap 5**: Component library (CDN)
- **Chart.js**: Data visualization (CDN)
- **Google Fonts**: Inter & Montserrat

## 📊 Dashboard Features

### Static Data
Dashboard uses dummy JSON data for demonstration:
- Booking statistics
- Expedition history
- Activity charts
- Gear checklist state (localStorage)

### Charts
Three Chart.js visualizations:
1. **Line Chart**: Booking activity over time
2. **Doughnut Chart**: Expedition types distribution
3. **Bar Chart**: Weekly activity hours

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Customization Tips

1. **Branding**: Update logo emoji (⛰️) and company name throughout
2. **Content**: Replace all placeholder text with your information
3. **Images**: Use consistent aspect ratios for professional look
4. **Colors**: Maintain contrast ratios for accessibility
5. **Forms**: Add proper backend integration before production

## 🔧 Development Notes

### File Organization
- Keep CSS modular and organized by component
- Use consistent naming conventions
- Comment complex JavaScript functions
- Maintain semantic HTML structure

### Performance
- Optimize images before deployment
- Consider hosting fonts locally
- Minify CSS/JS for production
- Use CDN for libraries

### SEO Best Practices
- Update meta descriptions for each page
- Use proper heading hierarchy (one H1 per page)
- Add structured data markup if needed
- Create sitemap.xml for search engines

## 📦 Deployment

### Static Hosting
Perfect for:
- **Netlify**: Drag & drop deployment
- **Vercel**: Zero-config deployment
- **GitHub Pages**: Free static hosting
- **AWS S3**: Scalable cloud hosting

### Pre-deployment Checklist
- [ ] Replace all placeholder content
- [ ] Update contact information
- [ ] Add your images
- [ ] Test all forms
- [ ] Check responsive design
- [ ] Verify all links
- [ ] Test dark mode
- [ ] Run accessibility audit
- [ ] Optimize images
- [ ] Add analytics tracking

## 🎯 Use Cases

This template is perfect for:
- Mountain guide services
- Expedition companies
- Outdoor adventure businesses
- Trekking agencies
- Climbing schools
- Adventure travel operators

## 📄 License

This template is provided as-is for personal or commercial use. Attribution appreciated but not required.

## 🤝 Support

For questions or customization help:
- Review the code comments
- Check browser console for errors
- Ensure all CDN links are working
- Test with a local web server for best results

## 🔄 Version

**Version 1.0.0** - December 2024

Built with ❤️ for mountain enthusiasts

---

**Note**: This is a static frontend template. No backend or database included. Dashboard functionality is UI-only with dummy data for demonstration purposes.
