# Nexus AI | Feedback Intelligence Dashboard

Nexus AI is a sophisticated feedback management system that leverages **LLM-based triage** to automatically categorize, prioritize, and analyze the sentiment of user feedback. This dashboard provides real-time monitoring of user behavior through an intuitive, retro-modern interface.

## 🚀 Project Overview

The Nexus AI Frontend serves as the command center for product teams. Instead of manually sorting through raw logs, the system uses an AI backend to "triage" incoming text into actionable data points:

- **Sentiment Analysis:** Identifies Positive, Neutral, or Negative tones.
- **Auto-Categorization:** Sorts logs into Bugs, Features, UI/UX, etc.
- **Smart Routing:** Assigns tasks to specific teams (Frontend, Backend, DevOps).
- **Priority Leveling:** Escalates urgent issues automatically.

---

## ✨ Key Features

- **Intelligence Feed:** A real-time, filtered list of all AI-analyzed feedback.
- **Multi-Dimensional Filtering:** Instantly sort by search terms, categories, and priority levels using synchronized state management.
- **Live Statistics:** Sidebar overview of total logs, bug counts, and negative sentiment trends.
- **AI Submission Modal:** A dedicated interface for submitting new feedback for instant LLM analysis.
- **Responsive Design:** Optimized for various screen sizes with a clean, "Nexus" aesthetic using Tailwind CSS.
- **Type Safety:** Built with TypeScript to ensure robust data handling across the MERN stack.

---

## 🛠 Tech Stack

### Core

- **React 19:** Utilizing `useMemo` for high-performance filtering and `useCallback` for optimized API fetching.
- **TypeScript:** Full type safety for feedback structures and UI components.
- **Vite:** Ultra-fast frontend tooling and bundling.

### Styling & Icons

- **Tailwind CSS 4.0:** Advanced styling using the latest PostCSS features.
- **Lucide React:** Beautiful, consistent iconography.

### Networking

- **Axios:** Promise-based HTTP client for backend communication.

---

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI components (Badges, Stats, Modals)
│   ├── badgeColors.ts   # Configuration for dynamic UI coloring
│   ├── FeedbackModal.tsx
│   ├── FeedbackTable.tsx
│   ├── FilterBar.tsx
│   ├── Badge.tsx
│   └── StatsCard.tsx    # Sidebar stat components
├── services/            # API communication logic
│   └── api.ts           # Axios instance and endpoint definitions
├── types.ts             # Global TypeScript interfaces and types
├── App.tsx              # Main dashboard layout and state logic
└── main.tsx             # Entry point

```

---

## ⚙️ Installation & Setup

### Prerequisites

- **Node.js:** v18.0.0 or higher
- **Package Manager:** npm or yarn
- **Backend:** Ensure the [Nexus AI Backend] is running.

### Frontend Setup

1. **Clone the repository:**

```bash
git clone https://github.com/shadeshsaha/User-Feedback-Intelligence-System-Frontend.git
cd User-Feedback-Intelligence-System-Frontend

```

2. **Install dependencies:**

```bash
npm install

```

3. **Configure API Endpoint:**
   Ensure `src/services/api.ts` points to your running backend:

```typescript
baseURL: "http://localhost:5000/api";
```

4. **Start the development server:**

```bash
npm run dev

```

5. **Build for production:**

```bash
npm run build

```

---

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.
