from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from winners import winner

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/winners")
def winners():
    return winner()


@app.get("/winners/{state}")
def winners(state: str):
    return winner(state_param=state)
