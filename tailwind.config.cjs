/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}"
  ],
  safelist: [
    'bg-background',
    'bg-foreground',
    'bg-card',
    'bg-card-foreground',
    'bg-popover',
    'bg-popover-foreground',
    'bg-primary',
    'bg-primary-foreground',
    'bg-secondary',
    'bg-secondary-foreground',
    'bg-muted',
    'bg-muted-foreground',
    'bg-accent',
    'bg-accent-foreground',
    'bg-destructive',
    'bg-destructive-foreground',
    'text-background',
    'text-foreground',
    'text-card',
    'text-card-foreground',
    'text-popover',
    'text-popover-foreground',
    'text-primary',
    'text-primary-foreground',
    'text-secondary',
    'text-secondary-foreground',
    'text-muted',
    'text-muted-foreground',
    'text-accent',
    'text-accent-foreground',
    'text-destructive',
    'text-destructive-foreground',
    'border-border',
    'border-input',
    'ring-ring',
    'ring-offset-background',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-rtl")
  ],
};

