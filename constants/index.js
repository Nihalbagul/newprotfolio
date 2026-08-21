

const navLinks = [
  {
    name: "About",
    link: "#about",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Services",
    link: "#services",
  },
  {
    name: "Work",
    link: "#projects",
  },
  {
    name: "Testimonials",
    link: "#testimonials",
  },
];

// Items are intentionally doubled to create a seamless CSS infinite-scroll loop
const words = [
  { text: "Web Apps", imgPath: "/images/code.svg" },
  { text: "3D Experiences", imgPath: "/images/designs.svg" },
  { text: "AR/VR Solutions", imgPath: "/images/concepts.svg" },
  { text: "APIs & Backends", imgPath: "/images/code.svg" },
  { text: "Mobile Apps", imgPath: "/images/designs.svg" },
  { text: "Web Apps", imgPath: "/images/code.svg" },
  { text: "3D Experiences", imgPath: "/images/designs.svg" },
  { text: "AR/VR Solutions", imgPath: "/images/concepts.svg" },
  { text: "APIs & Backends", imgPath: "/images/code.svg" },
  { text: "Mobile Apps", imgPath: "/images/designs.svg" },
];

const counterItems = [
  { value: 2, suffix: "+", label: "Years of Experience" },
  { value: 7, suffix: "+", label: "Companies Worked With" },
  { value: 11, suffix: "+", label: "Projects Delivered" },
  { value: 100, suffix: "+", label: "Technologies Mastered" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
];

const abilities = [
   {
    imgPath: "/images/seo.png",
    title: "Full Stack Expertise",
    desc: "Specializing in React, Node.js, PHP, and Laravel to build scalable web applications with modern architecture and best practices.",
  },
  {
    imgPath: "/images/chat.png",
    title: "3D & AR/VR Development",
    desc: "Creating immersive experiences with Three.js, Unity, and Unreal Engine. From interactive 3D visualizations to complete AR/VR solutions.",
  },
  {
    imgPath: "/images/time.png",
    title: "End-to-End Solutions",
    desc: "From concept to deployment, I deliver complete solutions including backend APIs, frontend interfaces, and seamless integrations.",
  },
];

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  {
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    review: "At Truelogic India, Nihal has consistently delivered high-quality backend and 3D visualization solutions, playing a key role in enhancing user engagement and product efficiency.",
    imgPath: "/images/logon1.png",
    logoPath: "/images/logob1.png",
    title: "Software Engineer",
    date: "Feb 2025 - Dec 2025",
    responsibilities: [
      "Developed robust backend solutions using PHP, Laravel, and CodeIgniter for scalable web applications.",
      "Created dynamic 3D visualizations using Three.js and integrated them with backend data.",
      "Designed and optimized RESTful APIs for seamless frontend-backend communication.",
      "Managed database structures (MySQL, PostgreSQL, MongoDB) to ensure performance and integrity.",
      "Led the development of a 3D data visualization dashboard and a PHP-based application.",
    ],
  },
  {
    review: "Nihal made impressive strides at Vizzle by building immersive AR/VR experiences and optimizing 3D performance across platforms.",
    imgPath: "/images/logon2.png",
    logoPath: "/images/logob2.png",
    title: "AR/VR Developer",
    date: "Jan 2025 - Feb 2025",
    responsibilities: [
      "Developed immersive AR/VR experiences using Unity and Unreal Engine.",
      "Implemented ARKit (iOS) and ARCore (Android) for cross-platform augmented reality.",
      "Created 3D environments for AR/VR e-commerce applications.",
      "Optimized 3D assets for high-performance real-time rendering.",
    ],
  },
  {
    review: "At MidLead, Nihal demonstrated strong full-stack capabilities, contributing to both frontend and backend systems with scalable architecture.",
    imgPath: "/images/logon3.png",
    logoPath: "/images/logob3.png",
    title: "Software Engineer",
    date: "Nov 2024 - Jan 2025",
    responsibilities: [
      "Built full-stack web applications using MERN stack and Next.js with TypeScript.",
      "Developed RESTful APIs and GraphQL endpoints for frontend-backend communication.",
      "Led development of college and travel websites, improving operations and engagement.",
      "Implemented SSR and SSG for high-performance and SEO-friendly sites.",
    ],
  },
  {
    review: "Nihal significantly contributed to SparrowHost's growth with secure, high-performance web and mobile solutions.",
    imgPath: "/images/logon4.png",
    logoPath: "/images/logob4.png",
    title: "Full Stack Web & App Developer",
    date: "Oct 2024 - Dec 2024",
    responsibilities: [
      "Developed scalable web apps using PHP and Laravel.",
      "Built an e-commerce app using Flutter for cross-platform deployment.",
      "Developed a SaaS platform for security services with integrated payment gateways.",
      "Ensured secure authentication and seamless backend-frontend integration.",
    ],
  },
  {
    review: "Nihal’s internship at Purpose Buddy reflected his UI/UX design sensibilities and frontend development excellence.",
    imgPath: "/images/exp5.png",
    logoPath: "/images/logo5.png",
    title: "Full Stack Laravel Developer Intern",
    date: "Sep 2024 - Oct 2024",
    responsibilities: [
      "Designed responsive user interfaces using React and Tailwind CSS.",
      "Collaborated with backend teams to integrate Laravel APIs.",
      "Optimized UI components for responsiveness across devices.",
      "Worked on automation features similar to Zapier and Zoho integration.",
    ],
  },
  {
    review: "At Infinity.com | Uma School, Nihal played a pivotal backend role, streamlining processes and building reliable API services.",
    imgPath: "/images/exp6.png",
    logoPath: "/images/logo6.png",
    title: "Backend Developer",
    date: "Aug 2024 - Sep 2024",
    responsibilities: [
      "Developed and optimized backend APIs for school systems.",
      "Improved database performance and data management workflows.",
      "Collaborated with frontend teams for feature integration.",
      "Contributed to public-facing and internal web app modules.",
    ],
  },
];


const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

const testimonials = [
  {
    name: "Ravi Mehta",
    mentions: "Technical Lead",
    company: "Truelogic India",
    review:
      "Nihal consistently delivered high-quality backend and 3D visualization solutions, playing a key role in enhancing user engagement and product efficiency. His expertise in PHP, Laravel, and Three.js was instrumental in our project success.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Priya Sharma",
    mentions: "Product Manager",
    company: "Vizzle",
    review:
      "Nihal made impressive strides by building immersive AR/VR experiences and optimizing 3D performance across platforms. His work with Unity and Unreal Engine significantly improved our product offerings.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Aakash Patel",
    mentions: "Engineering Manager",
    company: "MidLead",
    review:
      "Nihal demonstrated strong full-stack capabilities, contributing to both frontend and backend systems with scalable architecture. His work on MERN stack and Next.js projects was exceptional.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Vikram Desai",
    mentions: "Co-Founder & CTO",
    company: "SparrowHost",
    review:
      "Nihal significantly contributed to our growth with secure, high-performance web and mobile solutions. His development of our SaaS platform with integrated payment gateways was outstanding.",
    imgPath: "/images/client4.png",
  },
  {
    name: "Sneha Joshi",
    mentions: "Lead Developer",
    company: "Purpose Buddy",
    review:
      "Nihal's UI/UX sensibilities and frontend development excellence were evident throughout his time with us. He tackled automation features with great attention to detail and delivered clean, maintainable code.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Anand Trivedi",
    mentions: "Director of Engineering",
    company: "Infinity.com | Uma School",
    review:
      "Nihal played a pivotal backend role, streamlining processes and building reliable API services. His contributions to our school management system improved operations significantly.",
    imgPath: "/images/client6.png",
  },
];

const linkedinProfile = "https://www.linkedin.com/in/nihal-bagul/";
const emailAddress = "nihalbagul08120506@gmail.com";
const phoneNumber = "+91 6355203029";
const whatsappLink = "https://wa.me/916355203029";
const youtubeProfile = "https://www.youtube.com/@nihalbagul-dev";
const xProfile = "https://x.com/bagul_nihal";

const socialImgs = [
  {
    name: "LinkedIn",
    imgPath: "/images/linkedin.png",
    link: linkedinProfile,
  },
  {
    name: "GitHub",
    imgPath: "/images/github.png",
    link: "https://github.com/nihalbagul",
  },
  {
    name: "Email",
    imgPath: "/images/email.png",
    link: `mailto:${emailAddress}`,
  },
  {
    name: "WhatsApp",
    imgPath: "/images/whatsapp.png",
    link: whatsappLink,
  },
  {
    name: "LeetCode",
    imgPath: "/images/leetcode.png",
    link: "https://leetcode.com/nihalbagul/",
  },
  {
    name: "YouTube",
    imgPath: "/images/youtube.png",
    link: youtubeProfile,
  },
  {
    name: "Twitter/X",
    imgPath: "/images/x.png",
    link: xProfile,
  },
];


// Helper function to get technology icon from CDN or local files
const getTechIcon = (techName, localIcon) => {
  // If local icon exists, use it
  if (localIcon) return localIcon;
  
  // Map technology names to Simple Icons CDN
  // Simple Icons CDN: https://cdn.simpleicons.org/{icon-name}/{color}
  const iconMap = {
    // Frontend
    "Next.js": "https://cdn.simpleicons.org/nextdotjs/000000",
    "Zustand": "https://cdn.simpleicons.org/zustand/723C70",
    "Framer Motion": "https://cdn.simpleicons.org/framer/0055FF",
    "GSAP": "https://cdn.simpleicons.org/greensock/88CE02",
    "WebGL": "https://cdn.simpleicons.org/webgl/990000",
    "Material UI": "https://cdn.simpleicons.org/mui/007FFF",
    "ShadCN/UI": "https://cdn.simpleicons.org/shadcnui/000000",
    
    // Backend
    "Express.js": "https://cdn.simpleicons.org/express/000000",
    "Nest.js": "https://cdn.simpleicons.org/nestjs/E0234E",
    "Python": "https://cdn.simpleicons.org/python/3776AB",
    "Flask": "https://cdn.simpleicons.org/flask/000000",
    "FastAPI": "https://cdn.simpleicons.org/fastapi/009688",
    "PHP": "https://cdn.simpleicons.org/php/777BB4",
    "Laravel": "https://cdn.simpleicons.org/laravel/FF2D20",
    "Rails": "https://cdn.simpleicons.org/rubyonrails/CC0000",
    "GraphQL": "https://cdn.simpleicons.org/graphql/E10098",
    "REST APIs": "https://cdn.simpleicons.org/restapi/000000",
    "Socket.io": "https://cdn.simpleicons.org/socketdotio/010101",
    
    // Databases
    "PostgreSQL": "https://cdn.simpleicons.org/postgresql/4169E1",
    "MySQL": "https://cdn.simpleicons.org/mysql/4479A1",
    "Firebase": "https://cdn.simpleicons.org/firebase/FFCA28",
    "Redis": "https://cdn.simpleicons.org/redis/DC382D",
    "Prisma": "https://cdn.simpleicons.org/prisma/2D3748",
    "Supabase": "https://cdn.simpleicons.org/supabase/3ECF8E",
    
    // Cloud & DevOps
    "Kubernetes": "https://cdn.simpleicons.org/kubernetes/326CE5",
    "AWS": "https://cdn.simpleicons.org/amazonaws/232F3E",
    "Google Cloud": "https://cdn.simpleicons.org/googlecloud/4285F4",
    "Vercel": "https://cdn.simpleicons.org/vercel/000000",
    "GitHub Actions": "https://cdn.simpleicons.org/githubactions/2088FF",
    "Nginx": "https://cdn.simpleicons.org/nginx/009639",
    
    // AI/ML
    "OpenAI": "https://cdn.simpleicons.org/openai/412991",
    "TensorFlow": "https://cdn.simpleicons.org/tensorflow/FF6F00",
    "LangChain": "https://cdn.simpleicons.org/langchain/000000",
    "HuggingFace": "https://cdn.simpleicons.org/huggingface/FFD21E",
    "Pinecone": "https://cdn.simpleicons.org/pinecone/430098",
    
    // Mobile
    "Flutter": "https://cdn.simpleicons.org/flutter/02569B",
    
    // Tools
    "Postman": "https://cdn.simpleicons.org/postman/FF6C37",
    "Vite": "https://cdn.simpleicons.org/vite/646CFF",
  };
  
  // Return CDN icon or null (will use generated icon as fallback)
  return iconMap[techName] || null;
};

const technologies = [
  // Frontend Technologies
  { name: "HTML 5", icon: "/images/tech/html.png", category: "frontend", proficiency: "expert" },
  { name: "CSS 3", icon: "/images/tech/css.png", category: "frontend", proficiency: "expert" },
  { name: "JavaScript", icon: "/images/tech/javascript.png", category: "frontend", proficiency: "expert" },
  { name: "TypeScript", icon: "/images/tech/typescript.png", category: "frontend", proficiency: "expert" },
  { name: "React JS", icon: "/images/tech/reactjs.png", category: "frontend", proficiency: "expert" },
  { name: "Next.js", icon: "/images/tech/nextjs.svg", category: "frontend", proficiency: "expert" },
  { name: "Redux Toolkit", icon: "/images/tech/redux.png", category: "frontend", proficiency: "expert" },
  { name: "Zustand", icon: getTechIcon("Zustand"), category: "frontend", proficiency: "advanced" },
  { name: "Tailwind CSS", icon: "/images/tech/tailwind.png", category: "frontend", proficiency: "expert" },
  { name: "Framer Motion", icon: "/images/tech/framer.svg", category: "frontend", proficiency: "expert" },
  { name: "GSAP", icon: "/images/tech/gsap.svg", category: "frontend", proficiency: "expert" },
  { name: "Three.js", icon: "/images/tech/threejs.svg", category: "frontend", proficiency: "expert" },
  { name: "WebGL", icon: "/images/tech/webgl.svg", category: "frontend", proficiency: "advanced" },
  { name: "Material UI", icon: "/images/tech/mui.svg", category: "frontend", proficiency: "advanced" },
  { name: "ShadCN/UI", icon: "/images/tech/shadcn.svg", category: "frontend", proficiency: "advanced" },
  
  // Backend Technologies
  { name: "Node.js", icon: "/images/tech/nodejs.png", category: "backend", proficiency: "expert" },
  { name: "Express.js", icon: "/images/tech/express.svg", category: "backend", proficiency: "expert" },
  { name: "Nest.js", icon: "/images/tech/nestjs.svg", category: "backend", proficiency: "advanced" },
  { name: "Python", icon: "/images/tech/python.svg", category: "backend", proficiency: "expert" },
  { name: "Flask", icon: "/images/tech/flask.svg", category: "backend", proficiency: "expert" },
  { name: "FastAPI", icon: "/images/tech/fastapi.svg", category: "backend", proficiency: "expert" },
  { name: "PHP", icon: "/images/tech/php.svg", category: "backend", proficiency: "expert" },
  { name: "Laravel", icon: "/images/tech/laravel.svg", category: "backend", proficiency: "expert" },
  { name: "Rails", icon: "/images/tech/rails.svg", category: "backend", proficiency: "advanced" },
  { name: "GraphQL", icon: "/images/tech/graphql.svg", category: "backend", proficiency: "advanced" },
  { name: "REST APIs", icon: getTechIcon("REST APIs"), category: "backend", proficiency: "expert" },
  { name: "Socket.io", icon: "/images/tech/socketio.svg", category: "backend", proficiency: "advanced" },
  
  // Databases
  { name: "MongoDB", icon: "/images/tech/mongodb.png", category: "database", proficiency: "expert" },
  { name: "PostgreSQL", icon: "/images/tech/postgresql.svg", category: "database", proficiency: "expert" },
  { name: "MySQL", icon: "/images/tech/mysql.svg", category: "database", proficiency: "expert" },
  { name: "Firebase", icon: "/images/tech/firebase.svg", category: "database", proficiency: "expert" },
  { name: "Redis", icon: "/images/tech/redis.svg", category: "database", proficiency: "advanced" },
  { name: "Prisma", icon: "/images/tech/prisma.svg", category: "database", proficiency: "advanced" },
  { name: "Supabase", icon: "/images/tech/supabase.svg", category: "database", proficiency: "advanced" },
  
  // Cloud & DevOps
  { name: "Docker", icon: "/images/tech/docker.png", category: "devops", proficiency: "expert" },
  { name: "Kubernetes", icon: "/images/tech/kubernetes.svg", category: "devops", proficiency: "advanced" },
  { name: "AWS", icon: getTechIcon("AWS"), category: "cloud", proficiency: "expert" },
  { name: "Google Cloud", icon: "/images/tech/googlecloud.svg", category: "cloud", proficiency: "expert" },
  { name: "Vercel", icon: "/images/tech/vercel.svg", category: "cloud", proficiency: "expert" },
  { name: "Git", icon: "/images/tech/git.png", category: "devops", proficiency: "expert" },
  { name: "GitHub Actions", icon: "/images/tech/githubactions.svg", category: "devops", proficiency: "advanced" },
  { name: "Nginx", icon: "/images/tech/nginx.svg", category: "devops", proficiency: "advanced" },
  
  // AI/ML & LLM
  { name: "OpenAI", icon: getTechIcon("OpenAI"), category: "ai", proficiency: "expert" },
  { name: "TensorFlow", icon: "/images/tech/tensorflow.svg", category: "ai", proficiency: "advanced" },
  { name: "LangChain", icon: "/images/tech/langchain.svg", category: "ai", proficiency: "expert" },
  { name: "HuggingFace", icon: "/images/tech/huggingface.svg", category: "ai", proficiency: "advanced" },
  { name: "Pinecone", icon: getTechIcon("Pinecone"), category: "ai", proficiency: "advanced" },
  
  // Mobile
  { name: "Flutter", icon: "/images/tech/flutter.svg", category: "mobile", proficiency: "expert" },
  
  // Tools
  { name: "Figma", icon: "/images/tech/figma.png", category: "tools", proficiency: "expert" },
  { name: "Postman", icon: "/images/tech/postman.svg", category: "tools", proficiency: "expert" },
  { name: "Vite", icon: "/images/tech/vite.svg", category: "tools", proficiency: "expert" },
];

// Technology categories for filtering
const techCategories = [
  { id: "all", name: "All Technologies", icon: "🔧" },
  { id: "frontend", name: "Frontend", icon: "🎨" },
  { id: "backend", name: "Backend", icon: "⚙️" },
  { id: "database", name: "Database", icon: "💾" },
  { id: "cloud", name: "Cloud", icon: "☁️" },
  { id: "devops", name: "DevOps", icon: "🚀" },
  { id: "ai", name: "AI/ML", icon: "🤖" },
  { id: "mobile", name: "Mobile", icon: "📱" },
  { id: "tools", name: "Tools", icon: "🛠️" },
];

// About Me Section Data
const aboutMe = {
  title: "About Me",
  subtitle: "Full Stack Developer & 3D Visualization Expert",
  description: "I'm a software engineer who builds high-performance web applications and immersive 3D experiences that don't just work — they stand out.\n\nWith 2+ years of hands-on experience across modern frontend frameworks, scalable backend systems, and real-time 3D technologies, I bridge the gap between engineering and visual storytelling.\n\nFrom architecting robust APIs to crafting interactive AR/VR and Three.js experiences, I focus on clean code, performance, and user-centric design. I enjoy turning complex ideas into elegant, production-ready solutions.",
  highlights: [
    "🎯 Full Stack Development with React, Node.js, and Python",
    "🎨 Creating immersive 3D experiences with Three.js and WebGL",
    "🚀 Building scalable APIs and backend systems",
    "💡 Passionate about clean code and best practices",
    "🌐 Delivering end-to-end solutions from concept to deployment"
  ],
  image: "/images/NihalBagulPP.jpg", // Your profile photo
};

// Services Section Data
const services = [
  {
    id: 1,
    title: "Web Development",
    description: "Custom web applications built with modern frameworks like React, Next.js, and Vue.js. Responsive, fast, and SEO-optimized.",
    icon: "🌐",
    features: ["Frontend Development", "Backend APIs", "Full Stack Solutions", "Performance Optimization"],
    gradient: "from-blue-500/20 via-cyan-500/20 to-blue-600/20",
    hoverGradient: "from-blue-500/30 via-cyan-500/30 to-blue-600/30",
    glowColor: "rgba(59, 130, 246, 0.5)"
  },
  {
    id: 2,
    title: "3D & AR/VR",
    description: "Immersive 3D experiences and AR/VR applications using Three.js, Unity, and WebGL. Interactive visualizations that engage users.",
    icon: "🎮",
    features: ["3D Visualizations", "AR Applications", "VR Experiences", "Interactive Models"],
    gradient: "from-purple-500/20 via-pink-500/20 to-purple-600/20",
    hoverGradient: "from-purple-500/30 via-pink-500/30 to-purple-600/30",
    glowColor: "rgba(168, 85, 247, 0.5)"
  },
  {
    id: 3,
    title: "Backend Development",
    description: "Robust backend systems with Node.js, Python, and PHP. RESTful APIs, GraphQL, real-time applications, and database design.",
    icon: "⚙️",
    features: ["API Development", "Database Design", "Server Architecture", "Cloud Deployment"],
    gradient: "from-indigo-500/20 via-purple-500/20 to-indigo-600/20",
    hoverGradient: "from-indigo-500/30 via-purple-500/30 to-indigo-600/30",
    glowColor: "rgba(99, 102, 241, 0.5)"
  },
  {
    id: 4,
    title: "App Development",
    description: "Native and cross-platform mobile applications for iOS and Android. Built with React Native, Flutter, and native technologies for optimal performance.",
    icon: "📱",
    features: ["iOS Development", "Android Development", "Cross-Platform Apps", "App Store Optimization"],
    gradient: "from-green-500/20 via-emerald-500/20 to-green-600/20",
    hoverGradient: "from-green-500/30 via-emerald-500/30 to-green-600/30",
    glowColor: "rgba(34, 197, 94, 0.5)"
  },
  {
    id: 5,
    title: "Consulting",
    description: "Technical consulting for architecture decisions, code reviews, performance optimization, and technology stack selection.",
    icon: "💼",
    features: ["Architecture Planning", "Code Reviews", "Performance Audit", "Tech Stack Selection"],
    gradient: "from-amber-500/20 via-orange-500/20 to-amber-600/20",
    hoverGradient: "from-amber-500/30 via-orange-500/30 to-amber-600/30",
    glowColor: "rgba(245, 158, 11, 0.5)"
  },
  {
    id: 6,
    title: "UI/UX Design",
    description: "Beautiful and intuitive user interfaces designed with modern design principles. User-centered design that enhances user experience and drives engagement.",
    icon: "🎨",
    features: ["User Interface Design", "User Experience Design", "Prototyping", "Design Systems"],
    gradient: "from-rose-500/20 via-pink-500/20 to-rose-600/20",
    hoverGradient: "from-rose-500/30 via-pink-500/30 to-rose-600/30",
    glowColor: "rgba(244, 63, 94, 0.5)"
  }
];

// Certifications Data
const certifications = [
  {
    id: 1,
    title: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    date: "2024",
    link: "https://aws.amazon.com/certification/",
    icon: "☁️"
  },
  {
    id: 2,
    title: "Meta React Developer Certificate",
    issuer: "Meta (Coursera)",
    date: "2023",
    link: "https://www.coursera.org/professional-certificates/meta-react-native",
    icon: "⚛️"
  },
  {
    id: 3,
    title: "Full Stack Web Development",
    issuer: "FreeCodeCamp",
    date: "2023",
    link: "https://www.freecodecamp.org/certification/nihalbagul/full-stack",
    icon: "🎓"
  },
  {
    id: 4,
    title: "Three.js Journey Certificate",
    issuer: "Three.js Journey",
    date: "2024",
    link: "https://threejs-journey.com/",
    icon: "🎨"
  }
];

// Education Data
const education = [
  {
    id: 1,
    degree: "Bachelor of Engineering in Computer Science",
    institution: "Gujarat Technological University",
    location: "Gujarat, India",
    period: "2019 - 2023",
    description: "Specialized in Software Engineering and Web Development. Relevant coursework: Data Structures, Algorithms, Database Management Systems, Computer Graphics, and Operating Systems.",
    achievements: ["Active member of the college coding club", "Participated in state-level hackathons"]
  },
  {
    id: 2,
    degree: "Higher Secondary (11th & 12th) – Science",
    institution: "Gujarat Secondary & Higher Secondary Education Board",
    location: "Somnath, Gujarat, India",
    period: "2017 - 2019",
    description: "Focus on Mathematics, Physics, and Computer Science. Developed strong analytical and problem-solving foundations.",
    achievements: ["Top scorer in Computer Science", "Active in science and technology competitions"]
  }
];

// Blog Posts Data (or link to external blog)
const blogPosts = [
  {
    id: 1,
    title: "Building Interactive 3D Experiences with Three.js",
    excerpt: "Learn how to create stunning 3D web experiences using Three.js and React Three Fiber. A practical walkthrough from scene setup to advanced materials.",
    date: "2024-01-15",
    readTime: "5 min read",
    link: "https://github.com/nihalbagul",
    category: "3D Development"
  },
  {
    id: 2,
    title: "Optimizing React Performance: A Complete Guide",
    excerpt: "Best practices and techniques for optimizing React applications — from memoization and lazy loading to bundle analysis and virtualization.",
    date: "2024-02-20",
    readTime: "8 min read",
    link: "https://github.com/nihalbagul",
    category: "React"
  },
  {
    id: 3,
    title: "Building Scalable Backend APIs with Node.js",
    excerpt: "Architecture patterns and best practices for building production-ready APIs with Express, authentication, rate-limiting, and proper error handling.",
    date: "2024-03-10",
    readTime: "6 min read",
    link: "https://github.com/nihalbagul",
    category: "Backend"
  }
];

// Resume/CV Download
const resumeLink = "/resume/Nihal Bagul Resume.pdf";

// Case Studies Data - Detailed project breakdowns
const caseStudies = [
  {
    id: 1,
    title: "3D T-Shirt Customizer",
    client: "E-Commerce Platform",
    year: "2024",
    challenge: "Create an immersive 3D customization experience that allows users to visualize T-shirt designs in real-time before purchase, reducing return rates and increasing customer engagement.",
    solution: "Developed a WebGL-based 3D visualization platform using Three.js and React Three Fiber. Implemented real-time texture mapping, color customization, and seamless integration with e-commerce backend.",
    technologies: ["React", "Three.js", "WebGL", "Node.js", "MongoDB", "Stripe API"],
    results: [
      "40% reduction in return rates",
      "65% increase in conversion rate",
      "98% performance score on Lighthouse",
      "10K+ active users in first month"
    ],
    image: "/images/project1.png",
    link: "https://github.com/nihalbagul",
    github: "https://github.com/nihalbagul",
    featured: true
  },
  {
    id: 2,
    title: "AI Image Generator Platform",
    client: "SaaS Startup",
    year: "2024",
    challenge: "Build a scalable AI image generation platform that can handle high traffic, manage user credits, and provide real-time generation status updates.",
    solution: "Architected a microservices-based system with queue management, Redis caching, and WebSocket connections for real-time updates. Implemented credit system with Stripe integration and comprehensive admin dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Redis", "WebSockets", "OpenAI API", "Stripe"],
    results: [
      "25K+ registered users",
      "99.9% uptime",
      "Sub-second API response times",
      "95% user satisfaction rate"
    ],
    image: "/images/project2.png",
    link: "https://github.com/nihalbagul",
    github: "https://github.com/nihalbagul",
    featured: true
  },
  {
    id: 3,
    title: "Pokemon Card Dashboard",
    client: "Personal Project",
    year: "2023",
    challenge: "Create an interactive dashboard for Pokemon card enthusiasts to track collections, prices, and discover new cards with real-time data.",
    solution: "Built a React-based dashboard with PokeAPI integration, advanced filtering, price tracking, and collection management. Implemented local storage for offline access and real-time price updates.",
    technologies: ["React", "TypeScript", "PokeAPI", "Chart.js", "LocalStorage"],
    results: [
      "5K+ daily active users",
      "Real-time price tracking",
      "Advanced search and filters",
      "Mobile-responsive design"
    ],
    image: "/images/project3.png",
    link: "https://github.com/nihalbagul",
    github: "https://github.com/nihalbagul",
    featured: false
  }
];

// GitHub username for contribution graph
const githubUsername = "nihalbagul";

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
  technologies,
  techCategories,
  aboutMe,
  services,
  certifications,
  education,
  blogPosts,
  resumeLink,
  caseStudies,
  githubUsername,
  linkedinProfile,
  emailAddress,
  phoneNumber,
  youtubeProfile,
  xProfile,
};
