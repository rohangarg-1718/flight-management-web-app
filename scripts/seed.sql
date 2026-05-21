insert into flights (
  flight_no,
  origin,
  destination,
  departs_at,
  arrives_at,
  aircraft_type,
  status,
  base_price
)

values

(
  'AI-202',
  'Delhi',
  'Mumbai',
  '2026-06-01 08:00:00',
  '2026-06-01 10:15:00',
  'Airbus A320',
  'scheduled',
  5200
),

(
  'IN-748',
  'Bangalore',
  'Hyderabad',
  '2026-06-02 09:30:00',
  '2026-06-02 11:00:00',
  'Boeing 737',
  'scheduled',
  4100
),

(
  'SKY-909',
  'Lucknow',
  'Pune',
  '2026-06-03 06:45:00',
  '2026-06-03 09:20:00',
  'Airbus A321',
  'scheduled',
  6300
);

insert into seats (
  flight_id,
  seat_number,
  class,
  is_available,
  extra_fee
)

select
  f.id,
  seat.seat_number,
  seat.class,
  true,
  seat.extra_fee

from flights f

cross join (

  values
    ('1A', 'first', 2500),
    ('1B', 'first', 2500),

    ('2A', 'business', 1500),
    ('2B', 'business', 1500),

    ('3A', 'economy', 0),
    ('3B', 'economy', 0),
    ('3C', 'economy', 0),

    ('4A', 'economy', 0),
    ('4B', 'economy', 0),
    ('4C', 'economy', 0)

) as seat(seat_number, class, extra_fee);

-- Test User
-- Email: testuser@gmail.com
-- Password: Test@123