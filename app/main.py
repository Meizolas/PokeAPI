from fastapi import FastAPI
from app.routes import pokemons

app = FastAPI()

app.include_router(pokemons.router)
