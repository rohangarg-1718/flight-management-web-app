create or replace function reserve_seat(p_seat_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  seat_available boolean;
begin
  select is_available
  into seat_available
  from seats
  where id = p_seat_id
  for update;

  if seat_available = false then
    return false;
  end if;

  update seats
  set is_available = false
  where id = p_seat_id;

  return true;
end;
$$;

create or replace function cancel_booking(p_booking_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  booking_seat_id uuid;
  booking_departure timestamp;
begin
  select b.seat_id, f.departs_at
  into booking_seat_id, booking_departure
  from bookings b
  join flights f on f.id = b.flight_id
  where b.id = p_booking_id
  for update;

  if booking_seat_id is null then
    return false;
  end if;

  if booking_departure <= now() + interval '2 hours' then
    raise exception 'Cancellation is not allowed within 2 hours of departure';
  end if;

  update bookings
  set status = 'cancelled'
  where id = p_booking_id;

  update seats
  set is_available = true
  where id = booking_seat_id;

  return true;
end;
$$;

create or replace function mark_seat_unavailable()
returns trigger
language plpgsql
as $$
begin
  update seats
  set is_available = false
  where id = new.seat_id;

  return new;
end;
$$;

drop trigger if exists booking_seat_trigger on bookings;

create trigger booking_seat_trigger
after insert on bookings
for each row
execute function mark_seat_unavailable();

grant execute on function reserve_seat(uuid) to authenticated;
grant execute on function cancel_booking(uuid) to authenticated;