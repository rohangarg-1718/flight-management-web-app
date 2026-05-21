# Flight Management Web App

A responsive flight management web application built with Next.js, Supabase, Zustand, and Tailwind CSS.

## Features

- Flight search by origin and destination
- Dynamic flight listing from Supabase
- Supabase Auth login/signup
- Interactive seat selection
- Realtime seat availability updates
- Passenger booking form
- PNR generation
- My Bookings dashboard
- Booking cancellation with seat release
- Reschedule booking UI
- Zustand state management with persistence
- Responsive UI for mobile, tablet, and desktop

## Tech Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Supabase PostgreSQL
- Supabase Auth
- Supabase Realtime
- Zustand

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Local Setup

```bash
npm install
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Database

Supabase tables used:

- flights
- seats
- bookings
- passengers
- reschedules

The app uses Supabase RLS policies, RPC functions, and database triggers for secure booking and seat management.

## Zustand Store Structure

The application uses Zustand for lightweight global state management.

### Stores Used

- `flightStore`
  - Stores selected flight and seat
  - Handles booking reset functionality
  - Persisted using Zustand middleware

- `searchStore`
  - Stores search filters like origin, destination, and date
  - Used for dynamic flight filtering

The stores use Zustand `persist` middleware to maintain state across page refreshes.

## Project Status

Core assignment features are implemented, including authentication, booking flow, realtime seat availability, cancellation, reschedule UI, and responsive design.