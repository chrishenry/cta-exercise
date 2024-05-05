import json
import random

# Open and load the JSON file
with open("/app/data/state-counties.json", "r") as file:
    data = json.load(file)

def generate_election_results():

    return {
        "Democrats": {
            "Biden": random.randint(0, 100),
            "Harris": random.randint(0, 100),
        },
        "Republicans": {
            "Trump": random.randint(0, 100),
            "Pence": random.randint(0, 100),
            "West": random.randint(0, 100),
        },
    }

# Iterate through the JSON data, and group the counties by state
states = {}
for county in data:
    state = county["State"]
    county_name = county["County"]

    if state not in states:
        states[state] = {county_name: generate_election_results()}
    else:
        states[state][county_name] = generate_election_results()

# File path where the JSON data will be stored
file_path = "/app/data/primary-results.json"

# Writing the dictionary to a file in JSON format
with open(file_path, "w") as file:
    json.dump(states, file, indent=4)

print(f"Data successfully written to {file_path}")
