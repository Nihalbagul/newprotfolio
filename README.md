# 🚀 Nihal Bagul - Portfolio Website

A modern, interactive portfolio website showcasing my work as a Full Stack Developer and 3D Visualization Expert. Built with cutting-edge web technologies to create an immersive user experience.

![Portfolio Preview](public/images/readme.png)

## ✨ Features

- **🎨 Modern UI/UX Design** - Sleek, responsive design with smooth animations
- **🎭 3D Interactive Elements** - Three.js powered 3D models and visualizations
- **📱 Fully Responsive** - Optimized for all devices and screen sizes
- **⚡ Performance Optimized** - Fast loading times and smooth interactions
- **🎯 Smooth Scrolling** - Enhanced navigation with custom scroll behavior
- **💬 Contact Form** - Integrated EmailJS for seamless communication
- **🎪 Custom Animations** - GSAP and Framer Motion for fluid animations
- **🖱️ Custom Cursor** - Unique cursor effects for desktop users
- **📊 Scroll Progress** - Visual scroll progress indicator
- **🍔 Mobile Menu** - Beautiful animated mobile navigation
- **🌓 Dark/Light Mode** - Theme toggle with system preference detection
- **🔍 Project Filtering** - Search and filter projects by category
- **📈 Analytics Integration** - Google Analytics support for tracking
- **📊 Performance Monitoring** - Built-in performance metrics
- **🔔 Toast Notifications** - Beautiful notification system for user feedback

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **GSAP** - Professional-grade animation library

### 3D & Graphics
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **@react-three/postprocessing** - Post-processing effects

### Additional Libraries
- **EmailJS** - Email service integration
- **React CountUp** - Animated number counting
- **Material-UI** - Component library

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/nihalportfolio.git
cd nihalportfolio
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory:
```env
# EmailJS Configuration (for contact form)
VITE_APP_EMAILJS_SERVICE_ID=your_service_id
VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key

# Google Analytics (optional)
VITE_GA_ID=your_google_analytics_id
```

4. Start the development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

6. Preview production build
```bash
npm run preview
```

## 📁 Project Structure

```
nihalportfolio/
├── public/
│   ├── images/          # Image assets
│   └── models/          # 3D model files (.glb)
├── src/
│   ├── components/      # Reusable components
│   │   ├── HeroModels/ # 3D hero section models
│   │   └── Models/     # Other 3D models
│   ├── sections/        # Page sections
│   ├── hooks/          # Custom React hooks
│   ├── hoc/            # Higher-order components
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main app component
│   └── index.css       # Global styles
├── constants/          # Constants and data
└── package.json
```

## 🎨 Key Components

### Sections
- **Hero** - Eye-catching landing section with 3D models
- **Showcase** - Featured project highlights
- **Projects** - Full project portfolio with search and filtering
- **Experience** - Professional experience timeline
- **Tech Stack** - Technology expertise showcase
- **Testimonials** - Client testimonials
- **Contact** - Contact form with 3D visualization

### Custom Components
- **CustomCursor** - Interactive cursor effects
- **ScrollProgress** - Scroll progress indicator
- **Toast** - Notification system
- **Loader** - Animated loading screen
- **NavBar** - Responsive navigation with mobile menu
- **ThemeToggle** - Dark/light mode switcher
- **ProjectsSection** - Project showcase with filtering

### Custom Hooks
- **useTheme** - Theme management with localStorage persistence
- **useSmoothScroll** - Enhanced smooth scrolling behavior
- **useScrollProgress** - Track scroll progress

## 🎯 Customization

### Updating Personal Information

Edit `constants/index.js` to update:
- Navigation links
- Experience cards
- Testimonials
- Social media links
- Technology stack

### Adding Projects

Edit `src/sections/ProjectsSection.jsx` to add your projects:
- Add project objects to the `projects` array
- Include: title, description, image, tags, category, links
- Categories: 'web', 'mobile', 'ar-vr'

### Styling

- Global styles: `src/index.css`
- Component-specific styles use Tailwind CSS classes
- Custom CSS variables defined in `:root`

### 3D Models

Replace 3D models in `public/models/` with your own:
- Supported formats: `.glb`, `.gltf`
- Optimize models for web performance

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- Large Desktop: > 1280px

## ⚡ Performance Optimizations

- Lazy loading for images and 3D models
- Code splitting with React
- Optimized 3D model files
- Efficient animation libraries
- Minimal bundle size

## 🐛 Known Issues

- Custom cursor disabled on mobile devices (by design)
- Some 3D models may take time to load on slower connections

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Nihal Bagul**
- Portfolio: [nihalbagul.dev](https://nihalbagul.dev)
- LinkedIn: [@nihalbagul](https://www.linkedin.com/in/nihalbagul/)
- GitHub: [@nihalbagul](https://github.com/nihalbagul)

## 🙏 Acknowledgments

- Three.js community for amazing 3D graphics tools
- GSAP for powerful animation capabilities
- All the open-source contributors whose libraries made this possible

---

⭐ If you like this project, give it a star on GitHub!
