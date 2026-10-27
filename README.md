# 🐾 PawConnect — Modern Pet Adoption Platform

<div align="center">

![PawConnect Banner](https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=80)

**Connecting rescue companion animals with loving forever families.**  
_Every pet deserves a safe home, proper healthcare, and lifelong dignity._

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite)](https://vitejs.dev/)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-1.170-FF4154)](https://tanstack.com/router)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12.19-FFCA28?logo=firebase)](https://firebase.google.com/)

</div>

---

## 📖 Overview

**PawConnect** is a modern, responsive web application designed for animal rescue shelters and adopters. It provides a warm, accessible, and intuitive experience for discovering rescue animals, applying for adoptions, saving favorite companions, and supporting animal welfare organizations.

---

## ✨ Key Features

- **🔍 Browse & Discover Companions**:
  - Filter by species (_Dogs, Cats, Rabbits, Birds_), age (_Baby, Young, Adult, Senior_), gender, size, and location.
  - Search by pet name or breed with instant query updates.
  - Rich pet profiles with high-resolution photography, traits, medical passports, and household compatibility scores.

- **🔐 Firebase Authentication**:
  - **Google One-Click Sign-In** and **Email / Password** login and registration.
  - Auth guards protecting sensitive adoption and favorites interactions.
  - User profile menu with avatar, initials, and session management.

- **❤️ Cloud-Synced Favorites**:
  - Save favorite pets to your account.
  - Persistent sync across devices powered by **Cloud Firestore** and browser storage.

- **📋 Multi-Step Adoption Application**:
  - Guided 4-step adoption form (Personal details, Living setup, Pet experience, and Application review).
  - Automatically pre-fills authenticated user credentials.
  - Generates a reference tracking ID and records applications in Firestore (`applications` collection).

- **🇮🇳 Localized Adoption Guidelines**:
  - Transparent standard adoption fee guidelines (**₹2,000 – ₹5,000**) covering vaccinations, sterilization, and lifetime microchipping.

- **🎨 Modern UI & Accessibility**:
  - Custom glassmorphic elements, warm color palettes, and micro-interactions powered by **Tailwind CSS** and **shadcn/ui** primitives.
  - Persistent **Light / Dark Mode** theme toggle.
  - Toast notifications via **Sonner**.

- **📖 Informational & Community Hubs**:
  - **How It Works**: Visual 4-step adoption guide, 3-3-3 rule checklist, and comprehensive FAQ.
  - **Success Stories**: Real adoption stories with filters and photo galleries.
  - **Donations & Volunteering**: Interactive tier selections and volunteer registration.

---

## 🛠️ Tech Stack

| Layer                 | Technologies                                                                                                          |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| **Framework & Build** | [React 19](https://react.dev/), [Vite 6](https://vitejs.dev/), [TanStack Start / Router](https://tanstack.com/router) |
| **Language**          | [TypeScript](https://www.typescriptlang.org/)                                                                         |
| **Styling & UI**      | [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Lucide Icons](https://lucide.dev/) |
| **State & Data**      | [TanStack Query](https://tanstack.com/query), React Context API                                                       |
| **Backend / BaaS**    | [Firebase](https://firebase.google.com/) (Authentication, Cloud Firestore, Storage, Analytics)                        |
| **Notifications**     | [Sonner](https://sonner.emilkowal.ski/)                                                                               |

---

## 📁 Project Structure

```text
heart-strings-hatch/
├── public/                 # Static assets & favicon
├── src/
│   ├── assets/             # Pet images and media
│   ├── components/
│   │   ├── pawconnect/     # App-specific components (Navbar, Footer, PetCard, AdoptionForm, AuthModal)
│   │   └── ui/             # Reusable shadcn/ui components (Dialog, Tabs, Button, Input, etc.)
│   ├── context/
│   │   ├── app-context.tsx # Global theme & favorites state
│   │   └── auth-context.tsx# Firebase auth state & methods
│   ├── data/
│   │   └── pets.ts         # Pet catalog & companion profiles
│   ├── lib/
│   │   ├── firebase.ts     # Firebase initialization & service exports
│   │   └── utils.ts        # Helper utilities
│   ├── routes/             # TanStack file-based routing
│   │   ├── __root.tsx      # Root application layout & shell
│   │   ├── index.tsx       # Homepage
│   │   ├── pets.tsx        # Find a Pet (directory)
│   │   ├── pets.$petId.tsx # Pet profile details & adoption trigger
│   │   ├── favorites.tsx   # Saved pets page
│   │   ├── how-it-works.tsx# Adoption process & FAQ
│   │   ├── success-stories.tsx # Adoption stories
│   │   ├── donate.tsx      # Donation portal
│   │   └── about.tsx       # About PawConnect & Volunteer application
│   ├── styles.css          # Global CSS & Tailwind configuration
│   └── router.tsx          # App router configuration
├── .env.example            # Environment variables template
├── package.json            # Dependencies & scripts
└── vite.config.ts          # Vite bundler configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` or `bun`

### 1. Clone the Repository

```bash
git clone https://github.com/Junaidkh30/paw-connect.git
cd paw-connect
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```bash
cp .env.example .env
```

Add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port specified in your console) to view the application.

---

## 🔒 Firebase Configuration

To enable all features (Authentication & Firestore):

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. **Authentication**:
   - Enable **Google** and **Email/Password** under **Build > Authentication > Sign-in method**.
3. **Cloud Firestore**:
   - Create a Firestore Database.
   - The security rules are provided in `firestore.rules`. These rules must be published in the [Firebase Console](https://console.firebase.google.com/) under **Build > Firestore Database > Rules**:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       match /applications/{appId} {
         allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
         allow read, update, delete: if false;
       }
     }
   }
   ```

---

## 📜 Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the production bundle.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs ESLint to check for code quality.
- `npm run format`: Formats code using Prettier.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with ❤️ for animal welfare and rescue organizations everywhere.</sub>
</div>
