create table if not exists flights (
  id uuid primary key default gen_random_uuid(),
  flight_no text not null,
  origin text not null,
  destination text not null,
  departs_at timestamp not null,
  arrives_at timestamp not null,
  aircraft_type text,
  status text default 'scheduled',
  base_price numeric not null
);

create table if not exists seats (
  id uuid primary key default gen_random_uuid(),
  flight_id uuid references flights(id) on delete cascade,
  seat_number text not null,
  class text check (class in ('economy', 'business', 'first')),
  is_available boolean default true,
  extra_fee numeric default 0
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  flight_id uuid references flights(id),
  seat_id uuid references seats(id),
  status text default 'confirmed',
  booked_at timestamp default now(),
  total_price numeric,
  pnr_code text
);

create table if not exists passengers (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references bookings(id) on delete cascade,
  full_name text not null,
  passport_no text not null,
  nationality text,
  dob date
);

create table if not exists reschedules (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references bookings(id),
  old_flight_id uuid references flights(id),
  new_flight_id uuid references flights(id),
  requested_at timestamp default now(),
  fee_charged numeric default 0
);