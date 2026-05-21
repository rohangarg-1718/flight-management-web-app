alter table bookings enable row level security;
alter table passengers enable row level security;

create policy "Users can insert own bookings"
on bookings
for insert
with check (auth.uid() = user_id);

create policy "Users can read own bookings"
on bookings
for select
using (auth.uid() = user_id);

create policy "Users can insert passengers for own bookings"
on passengers
for insert
with check (
  booking_id in (
    select id
    from bookings
    where user_id = auth.uid()
  )
);

create policy "Users can read passengers for own bookings"
on passengers
for select
using (
  booking_id in (
    select id
    from bookings
    where user_id = auth.uid()
  )
);

alter publication supabase_realtime add table seats;
alter publication supabase_realtime add table bookings;