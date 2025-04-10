from fastapi import APIRouter
import requests

router = APIRouter()

@router.get("/pokemons/{name}")
def get_pokemon(name: str):
    url = f"https://pokeapi.co/api/v2/pokemon/{name.lower()}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return {"error": "Pokémon não encontrado"}

