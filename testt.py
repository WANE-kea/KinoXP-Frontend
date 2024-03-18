import random

# Constants
total_rows = 25
seats_per_row = 16
theater_id = 1

# Adjusting seat types according to the new understanding
seat_types = ["2", "1", "0"]  # Available is not a type but a separate attribute
total_handicap = 3
total_broken = 2
total_vip = 2

# Resetting the seat positions
seat_positions = [(row, seat) for row in range(1, total_rows + 1) for seat in range(1, seats_per_row + 1)]

# Randomly select positions for special seat types
handicap_positions = random.sample(seat_positions, total_handicap)
for pos in handicap_positions:
    seat_positions.remove(pos)

broken_positions = random.sample(seat_positions, total_broken)
for pos in broken_positions:
    seat_positions.remove(pos)

vip_positions = random.sample(seat_positions, total_vip)
for pos in vip_positions:
    seat_positions.remove(pos)

# Generate SQL statements with correct understanding of "available"
sql_statements_corrected = []

# Handicap seats (available)
for pos in handicap_positions:
    sql_statements_corrected.append("INSERT INTO seats (available, seat_nr, seat_row, theater_id, type) VALUES (1, {}, {}, {}, '2');".format(pos[1], pos[0], theater_id))

# Broken seats (unavailable)
for pos in broken_positions:
    sql_statements_corrected.append("INSERT INTO seats (available, seat_nr, seat_row, theater_id, type) VALUES (0, {}, {}, {}, '0');".format(pos[1], pos[0], theater_id))

# VIP seats (available)
for pos in vip_positions:
    sql_statements_corrected.append("INSERT INTO seats (available, seat_nr, seat_row, theater_id, type) VALUES (1, {}, {}, {}, '1');".format(pos[1], pos[0], theater_id))

# Remaining seats as regular type (available)
for pos in seat_positions:
    sql_statements_corrected.append("INSERT INTO seats (available, seat_nr, seat_row, theater_id, type) VALUES (1, {}, {}, {}, '0');".format(pos[1], pos[0], theater_id))

# Print all statements
for statement in sql_statements_corrected:
    print(statement)
