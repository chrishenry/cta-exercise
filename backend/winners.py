import json

def get_data():
    with open("/app/data/primary-results.json", "r") as file:
        data = json.load(file)

    return data

def accumulate_votes(state_data, totals):

    for _, votes in state_data.items():
        totals["Democrats"]["Biden"] += votes["Democrats"]["Biden"]
        totals["Democrats"]["Harris"] += votes["Democrats"]["Harris"]
        totals["Republicans"]["Trump"] += votes["Republicans"]["Trump"]
        totals["Republicans"]["Pence"] += votes["Republicans"]["Pence"]
        totals["Republicans"]["West"] += votes["Republicans"]["West"]

    return totals

def winner(state_param=None):
    data = get_data()

    totals = {
        "Democrats": {
            "Biden": 0,
            "Harris": 0,
        },
        "Republicans": {
            "Trump": 0,
            "Pence": 0,
            "West": 0,
        },
    }

    if not state_param:
        for state in data:
            totals = accumulate_votes(data[state], totals)
    else:
        totals = accumulate_votes(data[state_param], totals)

    return {
        "Democrats": max(totals["Democrats"], key=totals["Democrats"].get),
        "Republicans": max(totals["Republicans"], key=totals["Republicans"].get),
    }


if __name__ == "__main__":
    print(winner())
