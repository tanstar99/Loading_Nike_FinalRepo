import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        nike: {
          red: '#FF3B3F',
          black: '#111111',
          gray: '#f5f5f5',
          vibrant: {
            red: '#FF1744',
            orange: '#FF6D00',
            green: '#00E676',
            blue: '#2196F3',
            purple: '#7C4DFF',
            pink: '#FF4081',
            yellow: '#FFD600',
            teal: '#1DE9B6'
          }
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          'primary-foreground': "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          'accent-foreground': "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))"
        }
      },
      backgroundImage: {
        'vibrant-gradient-1': 'linear-gradient(135deg, #FF1744 0%, #FF6D00 100%)',
        'vibrant-gradient-2': 'linear-gradient(135deg, #2196F3 0%, #7C4DFF 100%)',
        'vibrant-gradient-3': 'linear-gradient(135deg, #00E676 0%, #1DE9B6 100%)',
      },
      transitionProperty: {
        'colors-transform': 'color, background-color, border-color, transform',
      },
      keyframes: {
        'color-pulse': {
          '0%, 100%': { 
            backgroundColor: 'hsl(var(--primary))',
            transform: 'scale(1)'
          },
          '50%': { 
            backgroundColor: 'hsl(var(--primary-foreground))', 
            transform: 'scale(1.05)'
          }
        },
        'gradient-shift': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' }
        }
      },
      animation: {
        'color-pulse': 'color-pulse 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 10s ease infinite',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
