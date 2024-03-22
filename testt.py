# Constants
total_rows = 25
seats_per_row = 16
theater_id = 3

# Generate seat positions for all rows
seat_positions = [(row, seat) for row in range(1, total_rows + 1) for seat in range(1, seats_per_row + 1)]

# Specific assignments
specific_handicap_positions = [(25, 1), (25, 2), (25, 3), (25, 14), (25, 15), (25, 16),
                               (18, 1), (18, 16), (19, 1), (19, 16), (7, 1), (7, 16), (8, 1), (8, 16)]

specific_vip_positions = [(row, seat) for row in range(13, 15 + 1) for seat in range(1, seats_per_row + 1)]

# Generate SQL statements with correct understanding of "available" and types
sql_statements_corrected = []

# Generate SQL statements for each row, maintaining the specific seat types
for row in range(1, total_rows + 1):
    for seat in range(1, seats_per_row + 1):
        if (row, seat) in specific_handicap_positions:
            sql_statements_corrected.append(f"INSERT INTO seats (available, seat_nr, seat_row, theater_id, type) VALUES (1, {seat}, {row}, {theater_id}, '2');")
        elif (row, seat) in specific_vip_positions:
            sql_statements_corrected.append(f"INSERT INTO seats (available, seat_nr, seat_row, theater_id, type) VALUES (1, {seat}, {row}, {theater_id}, '1');")
        else:
            sql_statements_corrected.append(f"INSERT INTO seats (available, seat_nr, seat_row, theater_id, type) VALUES (1, {seat}, {row}, {theater_id}, '0');")

# Print all statements
for statement in sql_statements_corrected:
    print(statement)
