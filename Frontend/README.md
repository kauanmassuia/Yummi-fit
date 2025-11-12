# YummiFit Landing Page

Premium tennis-focused SaaS landing page built with React, Vite, TailwindCSS, and react-bits.

## Tech Stack

- **React 18** + **Vite** - Fast development and build
- **TailwindCSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **react-bits** - Premium UI components
- **TypeScript** - Type safety

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   └── ui/          # Base UI components (Button, Card, etc.)
├── sections/        # Landing page sections
├── hooks/           # Custom hooks (useTheme, usePrefersReducedMotion)
├── data/            # Content data (copy.ts)
├── styles/          # Design tokens (tokens.css)
└── App.tsx          # Main app component
```

## Design Tokens

Brand colors and design tokens are defined in `src/styles/tokens.css`:

- **Brand Color**: `#c9e165` (primary green)
- **Court Green**: `#173a2a` (deep green)
- **Ink**: `#0f1115` (dark background)
- **Off-white**: `#f8faf5` (light background)

### Editing Tokens

1. Open `src/styles/tokens.css`
2. Modify CSS variables (e.g., `--brand-500`)
3. Colors automatically update across the site

## Theme System

The site supports light/dark themes with a toggle in the top-right corner.

- Theme preference is saved to localStorage
- Respects system preference by default
- Brand colors maintain contrast in both themes

## Sections

1. **Hero** - Main CTA with Aurora background
2. **Purpose** - Brand mission and values
3. **How It Works** - 4-step process with WhatsApp preview
4. **Results** - Benefits and KPIs
5. **Exclusivity** - Players Club section
6. **Plans** - Pricing cards
7. **Social Proof** - Testimonials
8. **FAQ** - Accordion with common questions
9. **Footer** - Final CTA and links

## Customization

### Content

Edit `src/data/copy.ts` to update all text content:

```typescript
export const copy = {
  hero: {
    h1: "Your headline here",
    // ...
  },
  // ...
};
```

### Colors

Update brand colors in `src/styles/tokens.css`:

```css
:root {
  --brand-500: #c9e165; /* Change this */
  /* ... */
}
```

### Sections

Each section is in `src/sections/` and can be modified independently.

## Performance

- Images use `loading="lazy"` and `decoding="async"`
- Animations respect `prefers-reduced-motion`
- CSS GPU transforms for smooth animations
- Code splitting ready for route-based lazy loading

## Accessibility

- Keyboard navigation support
- Focus rings with brand color
- ARIA labels on interactive elements
- Semantic HTML structure
- WCAG AA contrast maintained

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

© 2025 YummiFit. All rights reserved.

