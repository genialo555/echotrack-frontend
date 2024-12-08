// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#249b5b',      // Vert vif (#249b5b)
          dark: '#1e7a47',         // Variante plus foncée (#1e7a47)
        },
        tealBlue: {
          DEFAULT: '#249b97',      // Bleu-vert / Teal (#249b97)
        },
        deepBlue: {
          DEFAULT: '#24649b',      // Bleu profond (#24649b)
        },
        intenseBlue: {
          DEFAULT: '#24289b',      // Bleu intense (#24289b)
        },
        vibrantViolet: {
          DEFAULT: '#5b249b',      // Violet vibrant (#5b249b)
        },
        deepMagenta: {
          DEFAULT: '#97249b',      // Magenta profond (#97249b)
        },
      },
      container: {
        center: true,
        padding: '1rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};

