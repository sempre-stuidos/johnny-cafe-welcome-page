# GSAP Animation System

A scalable, centralized animation system built with GSAP and @gsap/react for Johnny G's restaurant website.

## 📁 Structure

```
src/lib/animations/
├── config.ts      # Animation configuration (durations, easings, delays)
├── hooks.ts       # React hooks for animations
├── index.ts       # Main exports
└── README.md      # This file
```

## 🚀 Current Implementation (v1)

### Page Load Animations

Animates navigation and hero content on initial page load with a smooth sequence:

1. **Logo** appears (0.6s) → 
2. **Nav Links** fade in (0.5s) → 
3. **Theme Toggle** appears (0.5s) → 
4. **Hero Content** reveals (0.8s)

**Usage:**

```tsx
import { usePageLoadAnimation } from "@/lib/animations/hooks";

const navRef = useRef<HTMLElement>(null);
usePageLoadAnimation('[data-animate="nav-logo"]', "nav-logo", navRef);
```

### Scroll Reveal Animations

Animates sections when they scroll into view (once per section):

- Triggers at 15% visibility
- Fades up with opacity transition
- 0.8s duration with smooth easing

**Usage:**

```tsx
import { useScrollReveal } from "@/lib/animations/hooks";

const sectionRef = useScrollReveal();
return <section ref={sectionRef} data-animate="section">...</section>
```

## ⚙️ Configuration

All animation settings are in `config.ts`:

```typescript
export const animationConfig = {
  pageLoad: {
    nav: { logo: {...}, links: {...}, toggle: {...} },
    hero: {...}
  },
  scrollReveal: {
    duration: 0.8,
    ease: "power2.out",
    threshold: 0.15,
    // ...
  }
}
```

**To adjust animations**, simply edit values in `config.ts`:

- `duration`: Animation length in seconds
- `ease`: GSAP easing function (e.g., "power2.out", "elastic.out")
- `delay`: Start delay in seconds
- `from/to`: Initial and final states

## 🔮 Future Extensions

The system is designed to scale. Planned features:

### 1. Complex Timelines

```typescript
// Future: config.ts
timelines: {
  heroComplex: {
    steps: [
      { selector: '.title', from: {...}, to: {...} },
      { selector: '.image', from: {...}, to: {...}, stagger: 0.1 }
    ]
  }
}

// Future: hooks.ts
const timeline = useTimeline('heroComplex');
```

### 2. GSAP Plugins

```typescript
// Future: ScrollTrigger for parallax effects
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ref = useScrollTrigger({
  scrub: 1,
  pin: true,
  markers: false
});
```

### 3. Stagger Animations

```typescript
// Future: Stagger multiple elements
const ref = useStaggerReveal({
  stagger: 0.1,
  from: "start"
});
```

## 📝 Component Checklist

When adding animations to a new component:

- [ ] Import animation hook
- [ ] Create ref if needed
- [ ] Call hook with appropriate config
- [ ] Add `data-animate` attribute to target element
- [ ] Test animation in browser

## 🎨 Best Practices

1. **Use CSS Variables**: For theme colors and typography (GSAP will animate them)
2. **Add Data Attributes**: Makes elements easy to target and debug
3. **Keep Durations Consistent**: Use config values, don't hardcode
4. **Test Performance**: Especially on mobile devices
5. **Avoid Layout Thrashing**: Animate transforms and opacity when possible

## 🐛 Debugging

- Add `markers: true` to IntersectionObserver options (hooks.ts)
- Check browser console for GSAP warnings
- Verify `data-animate` attributes are present in DOM
- Ensure GSAP packages are installed: `npm list gsap @gsap/react`

## 📦 Dependencies

- `gsap`: ^3.12.5 - Core animation library
- `@gsap/react`: ^2.1.1 - React-specific GSAP utilities

Install with:
```bash
npm install gsap @gsap/react
```

## 🤝 Contributing

When adding new animations:

1. Update `config.ts` with new animation config
2. Create hook in `hooks.ts` if pattern is reusable
3. Export from `index.ts`
4. Update this README with usage examples
5. Test on multiple devices/browsers

