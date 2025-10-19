# Portal Artistas - Documentation Index

## 📚 Design System Documentation

This directory contains comprehensive documentation for the Portal Artistas design system, covering Tailwind CSS patterns, Svelte 5 state management, internationalization, and responsive design.

---

## 🎨 Design System Guides

### 1. [Tailwind Color and Style Guide](./tailwind-color-and-style-guide.md)

**The Complete Design System Reference**

- ✅ Design tokens (borders, shadows, spacing, icons, z-index)
- ✅ Complete color palette (primary, semantic, neutral)
- ✅ Typography system with Montserrat weights
- ✅ All component patterns (buttons, cards, forms, modals, navigation)
- ✅ Dropdown/Select components (Bits UI patterns)
- ✅ Collapsibles, accordions, and toggle groups
- ✅ Badges, tags, status indicators, and progress bars
- ✅ Icon containers and loading states
- ✅ Animation and transition guidelines
- ✅ Accessibility requirements
- ✅ Usage decision trees

**Use this guide when:**

- Designing new components
- Understanding the full design system
- Making design decisions
- Ensuring accessibility compliance

---

### 2. [Component Patterns Reference](./component-patterns-reference.md)

**Quick Copy-Paste Reference**

- ✅ Production-ready code snippets for every component
- ✅ All button variants (6 types)
- ✅ All card variants (4 types)
- ✅ Form elements (inputs, textareas, validation)
- ✅ Dropdowns and selects (complete Bits UI examples)
- ✅ Collapsibles and toggle groups
- ✅ Badges, tags, and status indicators
- ✅ Modals and dialogs
- ✅ Progress bars and loading states
- ✅ Icon containers
- ✅ Navigation patterns
- ✅ Layout patterns

**Use this guide when:**

- Building new features quickly
- Need copy-paste ready code
- Looking for specific component examples
- Want to see implementation details

---

### 3. [Tailwind Responsive Guide](./tailwind-responsive-guide.md)

**Mobile-First Responsive Design**

- ✅ Breakpoint system (320px → 2560px)
- ✅ Mobile-first philosophy and principles
- ✅ Safe padding patterns (prevent horizontal overflow)
- ✅ Component-specific responsive patterns
- ✅ Layout patterns (containers, grids)
- ✅ Typography scaling
- ✅ Responsive testing checklist

**Use this guide when:**

- Implementing responsive layouts
- Testing mobile compatibility
- Preventing horizontal overflow issues
- Scaling components across breakpoints

---

## ⚛️ Svelte 5 & State Management

### 4. [Svelte 5 Classes Paradigm](./svelte5classesparadigm.md)

**Modern State Management with Runes**

- ✅ Using classes with Svelte 5 runes
- ✅ `$state` rune for reactive properties
- ✅ Context API for shared state
- ✅ Creating `.svelte.ts` files
- ✅ Best practices and patterns

**Use this guide when:**

- Creating new state management classes
- Sharing state across components
- Understanding Svelte 5 reactivity
- Refactoring from Svelte 4 stores

---

## 🌍 Internationalization

### 5. [i18n Hygiene Guide](./i18n-hygiene-guide.md)

**Internationalization Best Practices**

- ✅ Using svelte-i18n
- ✅ Translation key conventions
- ✅ Automated hygiene scripts
- ✅ Validation and testing

**Use this guide when:**

- Adding new translatable text
- Running i18n validation
- Understanding translation workflow

---

## 🔍 SEO & Sitemaps

### 6. [SEO Guide](./seo-guide.md)

**Search Engine Optimization**

- ✅ Meta tags and descriptions
- ✅ Open Graph and Twitter cards
- ✅ Structured data
- ✅ SEO component usage

### 7. [Sitemap Generation](./sitemap-generation.md)

**Dynamic Sitemap Creation**

- ✅ Automated sitemap generation
- ✅ Including dynamic routes
- ✅ XML sitemap format

**Use these guides when:**

- Optimizing for search engines
- Adding new pages
- Generating sitemaps

---

## 🔧 Technical Guides

### 8. [Svelte 5 Routing Fixes](./svelte5-routing-fixes.md)

**SvelteKit Routing Solutions**

- ✅ Common routing issues and fixes
- ✅ Navigation patterns
- ✅ Dynamic routing

**Use this guide when:**

- Troubleshooting routing issues
- Implementing navigation
- Working with dynamic routes

---

## 📋 Quick Start Checklist

### For New Components:

1. **Check Design System**: Review [tailwind-color-and-style-guide.md](./tailwind-color-and-style-guide.md) for design tokens and patterns
2. **Copy Pattern**: Find similar pattern in [component-patterns-reference.md](./component-patterns-reference.md)
3. **Make Responsive**: Follow [tailwind-responsive-guide.md](./tailwind-responsive-guide.md) for mobile-first approach
4. **Add State** (if needed): Use [svelte5classesparadigm.md](./svelte5classesparadigm.md) for state management
5. **Add Translations**: Follow [i18n-hygiene-guide.md](./i18n-hygiene-guide.md) for i18n
6. **Verify Accessibility**:
   - ✅ Touch targets ≥ 44px
   - ✅ Focus states visible
   - ✅ ARIA labels present
   - ✅ Keyboard navigation works
7. **Test Responsive**:
   - ✅ 320px, 768px, 1024px, 1920px
   - ✅ No horizontal scroll
   - ✅ Text readable at all sizes

---

## 🎯 Design Principles Summary

### Core Values

- **Mobile-First**: Design for 320px first, enhance progressively
- **Accessibility**: 44px touch targets, focus states, ARIA labels
- **Consistency**: Use standardized design tokens
- **Performance**: Smooth animations, optimized images
- **Glass Morphism**: Semi-transparent backgrounds with backdrop blur
- **Gradient Accents**: Blue-indigo for primary actions

### Design Tokens

- **Border Radius**: `rounded-lg` (8px), `rounded-xl` (12px), `rounded-2xl` (16px)
- **Shadows**: `shadow-lg` (rest), `shadow-xl` (hover), `shadow-2xl` (active)
- **Spacing**: `p-4 → md:p-6 → lg:p-8` (progressive scaling)
- **Borders**: `border-gray-200/50` (glass), `border-2 border-gray-300` (interactive)
- **Icons**: `size-5` (buttons), `w-12 h-12` (containers)

### Component Hierarchy

1. **Primary Button**: Blue gradient (`from-blue-600 to-indigo-600`)
2. **Secondary Button**: Gray (`bg-gray-100`)
3. **Success Button**: Green gradient (`from-green-500 to-emerald-500`)
4. **Glass Card**: `bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg`
5. **Interactive Card**: Glass card + `hover:shadow-xl hover:-translate-y-1`

---

## 🔗 External Resources

- **Tailwind CSS Documentation**: https://tailwindcss.com/docs
- **Svelte 5 Documentation**: https://svelte.dev/docs/svelte/overview
- **Bits UI Components**: https://bits-ui.com/
- **svelte-i18n**: https://github.com/kaisermann/svelte-i18n
- **Lucide Icons**: https://lucide.dev/

---

## 📞 Need Help?

When stuck, follow this decision tree:

```
What are you trying to do?
│
├─ Design a new UI component
│  └─ Start: tailwind-color-and-style-guide.md
│     └─ Copy code from: component-patterns-reference.md
│        └─ Make responsive: tailwind-responsive-guide.md
│
├─ Manage state across components
│  └─ Read: svelte5classesparadigm.md
│
├─ Add translatable text
│  └─ Read: i18n-hygiene-guide.md
│
├─ Fix responsive issues
│  └─ Read: tailwind-responsive-guide.md
│     └─ Check: Safe padding patterns section
│
└─ Optimize for SEO
   └─ Read: seo-guide.md
```

---

## 🚀 Quick Commands

```bash
# Run i18n hygiene check
npm run i18n:hygiene

# Generate sitemap
npm run generate:sitemap

# Generate artwork data
npm run generate:artwork-data

# Run full hygiene (TypeScript + Svelte)
npm run hygiene
```

---

_Last Updated: Design System Consolidation 2025_
_All documentation verified against production codebase_
