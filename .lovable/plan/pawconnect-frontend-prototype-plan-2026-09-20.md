# PawConnect Frontend Prototype Plan

## Goal

Build the first polished PawConnect release with four complete experiences: homepage, pet discovery, pet details, and favorites. Everything runs locally with mock data, React state, and browser storage only.

## What will be built

### Shared experience

- Warm orange, cream, teal, and charcoal design system with light and dark themes.
- Responsive PawConnect header, mobile menu, favorites counter, shared footer, and page transitions.
- Reusable buttons, pet cards, status badges, dialogs, empty states, loading skeletons, and toast messages.
- Clearly visible demo/sample labels wherever content or actions could be mistaken for real services.

### Homepage

- Editorial pet-focused hero with original high-quality imagery, the supplied headline, both calls to action, and the waiting-pets callout.
- Working local pet search that opens discovery with the selected filters.
- Featured pet grid, category browsing, three-step adoption overview, sample statistics, fictional success stories, and final adoption call to action.
- Responsive footer with demo contact and policy links.

### Find a Pet

- Search and filters for species, breed, age group, gender, size, location, and compatibility.
- Sorting, result count, grid/list switch, and progressive “Load more” behavior.
- Short simulated loading state with skeletons and a useful no-results state.
- Filters synchronized through the page URL where practical, enabling category and homepage search links.

### Pet details

- Dynamic page for each mock pet with image gallery, complete profile, compatibility, health details, rescue information, and suggested pets.
- Favorite toggle persisted in browser storage.
- Frontend-only, four-step adoption application with validation, review, and an explicit demo confirmation.
- Demo contact dialog that never claims to contact a real organization.

### Favorites

- Saved pets restored from browser storage across refreshes.
- Remove actions, details navigation, shared counter updates, and an inviting empty state.

## Content and data

- Create 16 fictional pets across dogs, cats, rabbits, birds, and other companion animals.
- Include varied Indian locations, breeds, ages, personalities, health states, and compatibility fields.
- Add fictional rescue organizations and success stories; label them as demo content.
- Generate a cohesive local pet photography set rather than relying on remote placeholder URLs.

## Routes

- `/` — homepage
- `/pets` — discovery
- `/pets/$petId` — pet details
- `/favorites` — saved pets
- `/how-it-works`, `/success-stories`, `/donate`, `/about` — polished supporting pages so every primary navigation item works; these remain concise because the requested first milestone prioritizes the four core experiences.
- Each page receives unique title, description, Open Graph, and social metadata.

## Technical details

- Use React 19, TypeScript, Tailwind CSS v4, the existing shadcn components, Lucide icons, and TanStack Router (the project’s fixed React routing system).
- Use semantic design tokens in the global stylesheet; no backend, API requests, database, real authentication, or payment processing.
- Centralize mock data and TypeScript models.
- Use a client-safe favorites provider with hydration-safe browser storage access.
- Use accessible dialogs, form labels, keyboard interactions, focus states, and reduced-motion support.
- Verify the current preview on desktop and mobile, including search/filtering, favorites persistence, pet navigation, adoption form validation, theme switching, and all navigation links.
