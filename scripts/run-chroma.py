import chromadb
from chromadb.config import Settings
from chromadb.server.fastapi import FastAPI

# Start Chroma server
chromadb.Client(Settings(
    persist_directory="./chroma-data",
    anonymized_telemetry=False
))

print("Chroma initialized. Use 'chroma run' CLI if available.")