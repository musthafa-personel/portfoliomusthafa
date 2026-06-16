// Musthafa's Portfolio Seed Data
window.PORTFOLIO_DEFAULT_DATA = {
  about: {
    name: "Musthafa",
    title: "Senior Graphic Designer & Brand Architect",
    bio: "Crafting digital legacies through bold typography, dark luxury aesthetics, and immersive visual storytelling. With over 6 years of collaborating with global brands, I translate complex concepts into unforgettable brand experiences.",
    availability: "Available for new projects",
    socials: {
      behance: "https://behance.net/musthafa",
      dribbble: "https://dribbble.net/musthafa",
      instagram: "https://instagram.com/musthafa.design",
      linkedin: "https://linkedin.com/in/musthafa",
      whatsapp: "https://wa.me/919876543210?text=Hi%20Musthafa,%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project!"
    }
  },
  projects: [
    {
      id: "aura-branding",
      title: "Aura Luxury Cosmetics",
      category: "Branding",
      year: "2025",
      client: "Aura Paris",
      style: "Minimalist / Luxury",
      tags: ["Brand Strategy", "Packaging", "Visual Identity"],
      description: "A complete visual identity overhaul for an organic high-end cosmetics brand featuring custom glass bottles and a gold-foil print system.",
      heroImage: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200",
      beforeImage: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?q=80&w=800", // sketch
      afterImage: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800", // polished bottle
      story: {
        concept: "The concept centers on 'Aura' - the invisible field of light surrounding a person. We wanted to manifest this through light reflection, glassmorphism textures, and a gold accent structure.",
        challenge: "Cosmetics packaging is highly competitive. The challenge was to stand out on retail shelves dominated by flat colors while maintaining a clean, organic, eco-friendly feel.",
        solution: "We combined frosted, semi-transparent glassware (reflecting light) with minimalist gold serif lettering. The packaging uses 100% recycled paper embossed with gold hot foil."
      },
      process: [
        { step: "Research", desc: "Competitor study and organic material research." },
        { step: "Concept", desc: "Developing the reflection and light-refraction theme." },
        { step: "Design", desc: "Drafting the custom elegant logotype." },
        { step: "Refinement", desc: "Material sampling and foil print testing." },
        { step: "Delivery", desc: "Publishing absolute-resolution packaging vector print files." }
      ],
      colors: ["#050505", "#d4af37", "#f5f5f7", "#8b7e66"],
      typography: [
        { font: "Cinzel Decorative", style: "Header / Display" },
        { font: "Plus Jakarta Sans", style: "Body / Technicals" }
      ],
      mockups: [
        "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=800",
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800"
      ],
      testimonial: {
        text: "Musthafa transformed our product line. The bottles feel like pieces of art. Our sales increased by 40% within three months of the relaunch.",
        author: "Hélène Dubois",
        role: "Creative Director, Aura Paris",
        rating: 5
      }
    },
    {
      id: "neo-tokyo-poster",
      title: "Cyberpunk Neo-Tokyo",
      category: "Poster Design",
      year: "2026",
      client: "Neo-Arts Exhibition",
      style: "Cyberpunk / Futuristic",
      tags: ["Vector Illustration", "Color Grading", "Typography"],
      description: "Promotional poster design for an international digital art showcase, inspired by high-density neon cityscape layouts.",
      heroImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200",
      beforeImage: "https://images.unsplash.com/photo-1618005198143-d3667c29fb1e?q=80&w=800", // abstract base
      afterImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800", // neon graphic
      story: {
        concept: "Interpreting urban chaos through structured grids, using stark contrast between deep charcoal blocks and neon pink/amber glowing paths.",
        challenge: "To print high-contrast neon inks without losing legibility of small details and background vector lines.",
        solution: "We designed custom glowing layers using overlay filters, separating layers carefully for screen printing processes."
      },
      process: [
        { step: "Research", desc: "Analyzing 80s futuristic posters and Japanese kanji composition." },
        { step: "Sketching", desc: "Drawing perspective lines of the city skyline." },
        { step: "Creation", desc: "Designing typography in Illustrator and coloring in Photoshop." },
        { step: "Refinement", desc: "Adding custom neon glowing paths." },
        { step: "Delivery", desc: "Supplying vectorized print layouts." }
      ],
      colors: ["#0a0010", "#ff007f", "#00f0ff", "#ffaa00"],
      typography: [
        { font: "Syne", style: "Bold Titles" },
        { font: "Monospace", style: "Technical labels" }
      ],
      mockups: [
        "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800"
      ],
      testimonial: {
        text: "The poster became a collector's item. Attendees were taking them home from the venue walls! Incredibly striking design.",
        author: "Kaito Sato",
        role: "Event Curator",
        rating: 5
      }
    },
    {
      id: "zenith-logo",
      title: "Zenith Real Estate",
      category: "Logo Design",
      year: "2025",
      client: "Zenith Holdings",
      style: "Corporate Luxury",
      tags: ["Monogram", "Vector Logo", "Golden Ratio"],
      description: "A geometric, golden ratio monogram for an elite real estate management group operating in London and Dubai.",
      heroImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200",
      beforeImage: "https://images.unsplash.com/photo-1618005198143-d3667c29fb1e?q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800",
      story: {
        concept: "The letter 'Z' morphing seamlessly into an upward-pointing arrow representing growth and architecture, aligned precisely along a golden spiral.",
        challenge: "To create an abstract monogram that looks simple but projects authority and historical security.",
        solution: "We crafted a geometric logo using intersecting 60-degree lines, creating dynamic dimensional gold shadows."
      },
      process: [
        { step: "Research", desc: "Reviewing traditional family crests and modern minimalist emblems." },
        { step: "Golden Ratio", desc: "Constructing grids using Fibonacci circles." },
        { step: "Vector Drawing", desc: "Perfecting corner radii and parallel gaps." },
        { step: "Color Matching", desc: "Selecting a metallic gold gradient that performs in digital and print." },
        { step: "Delivery", desc: "Providing a complete responsive logo system (horizontal, vertical, brand icon)." }
      ],
      colors: ["#000000", "#d4af37", "#222222", "#ffffff"],
      typography: [
        { font: "Cinzel", style: "Primary Serif" },
        { font: "Inter", style: "Support Text" }
      ],
      mockups: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800"
      ],
      testimonial: {
        text: "Musthafa delivered a mark that represents who we are perfectly. It's clean, majestic, and commands respect.",
        author: "Marcus Sterling",
        role: "CEO, Zenith Holdings",
        rating: 5
      }
    },
    {
      id: "nebula-motion",
      title: "Nebula Brand Loop",
      category: "Motion Graphics",
      year: "2026",
      client: "Nebula Tech",
      style: "Liquid Metallic",
      tags: ["3D Morphing", "Intro Reel", "UI Animations"],
      description: "An award-winning 3D loop featuring morphing fluid chrome shapes that reveal the Nebula brand identity.",
      heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200",
      beforeImage: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800",
      story: {
        concept: "The flow of cloud formations in space, realized as mercury-like metallic liquids shifting under cosmic light.",
        challenge: "To keep the loop completely seamless while preserving high fidelity light reflection calculations.",
        solution: "We rendered the dynamics using procedural nodes, mapping shadows and glows directly onto a custom dark luxury palette."
      },
      process: [
        { step: "Storyboard", desc: "Sketching key morph frames." },
        { step: "Modeling", desc: "Creating the fluid physics model." },
        { step: "Lighting", desc: "Applying gold and chrome HDRI maps." },
        { step: "Rendering", desc: "Exporting lossless frames with alpha masks." },
        { step: "Delivery", desc: "Compressing into web-optimized H.264 loop animations." }
      ],
      colors: ["#020205", "#c5a880", "#111115", "#e2d1b9"],
      typography: [
        { font: "Syne", style: "Display Font" },
        { font: "Inter", style: "Technical Specifications" }
      ],
      mockups: [
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800"
      ],
      testimonial: {
        text: "This loop captures our customers instantly at exhibitions. The smooth metallic motion is incredibly hypnotic.",
        author: "Sarah Jenkins",
        role: "Marketing Director, Nebula",
        rating: 5
      }
    }
  ],
  journey: [
    { year: "2020", title: "Freelance Creative Designer", type: "Learning", desc: "Started working with small agencies, perfecting layout design, typography, and learning UI fundamentals." },
    { year: "2022", title: "Senior Visual Designer at Pixelcraft", type: "Major Projects", desc: "Led branding initiatives for national tech startups and managed a team of three junior visual designers." },
    { year: "2023", title: "Best Poster Design Nominee (Awwwards)", type: "Achievements", desc: "Nominated for the Neo-Tokyo exhibition series under the creative arts category." },
    { year: "2024", title: "Going Independent / Creative Agency Founder", type: "Milestones", desc: "Founded my personal luxury-focused freelance brand, collaborating directly with international high-end boutiques." },
    { year: "2025", title: "Brand of the Year Gold Award", type: "Achievements", desc: "Awarded by DesignCraft for the Aura Cosmetics visual rebranding strategy." }
  ],
  services: [
    { id: "logo-design", title: "Logo Design", desc: "Crafting memorable monograms, minimalist icons, and typographic symbols that form the core signature of your brand.", icon: "logo" },
    { id: "brand-identity", title: "Brand Identity", desc: "Complete visual guideline systems including stationery, color palette orchestration, and detailed brand books.", icon: "identity" },
    { id: "poster-design", title: "Poster Design", desc: "High-impact editorial and promotional art prints with cinematic details and striking layouts.", icon: "poster" },
    { id: "social-creatives", title: "Social Media Creatives", desc: "Stunning templates and digital campaigns that command attention in overcrowded social feeds.", icon: "social" },
    { id: "motion-graphics", title: "Motion Graphics", desc: "Hypnotic 3D brand logo intros, social media loops, and smooth kinetic text animations.", icon: "motion" },
    { id: "video-editing", title: "Video Editing", desc: "Dynamic video cutting, custom color grading, sound synching, and premium transitions.", icon: "video" },
    { id: "packaging-design", title: "Packaging Design", desc: "Bespoke print-ready structures, gold foil accents, and high-end texture simulations.", icon: "packaging" },
    { id: "marketing-materials", title: "Marketing Materials", desc: "Premium brochures, catalogs, business cards, and exhibition assets with consistent aesthetic styling.", icon: "marketing" }
  ],
  quotes: [
    "Design is intelligence made visible.",
    "A luxury brand is not bought; it is experienced.",
    "Details are not the details; they make the design.",
    "Simplicity is the ultimate sophistication.",
    "The client is not always right, but the design must always be true."
  ],
  awards: [
    { title: "Brand of the Year (Gold)", organization: "DesignCraft", year: "2025", project: "Aura Cosmetics" },
    { title: "Best Poster Nominee", organization: "Awwwards Studio", year: "2023", project: "Neo-Tokyo Poster" },
    { title: "Certificate of Creative Excellence", organization: "Behance Curator Selection", year: "2024", project: "Zenith Identity" }
  ],
  skills: [
    { name: "Adobe Illustrator", level: 95 },
    { name: "Adobe Photoshop", level: 92 },
    { name: "After Effects / Premiere Pro", level: 85 },
    { name: "Cinema 4D / Blender", level: 78 },
    { name: "Figma (UI/UX)", level: 88 }
  ],
  stats: {
    projects: 142,
    clients: 89,
    brands: 45,
    experience: 6,
    designs: 1200
  }
};
