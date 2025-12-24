# RAG Concepts: Deep Dive

This document explains the core technologies and strategies used in our Retrieval-Augmented Generation (RAG) system. Understanding these concepts is key to maintaining and optimizing the system.

## 1. Vector Search & Embeddings

### What are Embeddings?
Embeddings are numerical representations of text (vectors). A model converts text into a long list of numbers (e.g., `[0.1, -0.5, 0.8, ...]`) where similar meanings are mathematically close to each other.

- **Semantic Search**: Unlike keyword search, vector search understands *meaning*. "Car" and "Automobile" will be close in vector space even if they don't share letters.

### Our Choice: Qdrant
We use **Qdrant** as our vector database. It stores these embeddings and allows us to query them at high speed.

---

## 2. Hybrid Search

Standard vector search is great for meaning, but sometimes you need exact keyword matching (e.g., searching for a specific ID "USER-123" or a unique term like "useEffect").

**Hybrid Search** combines two methods:
1.  **Dense Retrieval (Vector Search)**: Finds semantically similar content.
2.  **Sparse Retrieval (BM25/Splade)**: Finds exact keyword matches.

### Why use it?
It gives us the "best of both worlds." We capture general intent with vectors and specific details with keywords, significantly improving retrieval accuracy.

---

## 3. Reranking (The Accuracy Booster)

Retrieving documents is only the first step. Vector search might return 50 "relevant" chunks, but the *most* relevant answer might be at position 10.

**Reranking** fixes this using a **Cross-Encoder model**.

1.  **Retrieval**: We fetch a large pool of candidates (e.g., top 20) using Hybrid Search.
2.  **Reranking**: A specialized model (the Reranker) looks at the user's specific query and *each* candidate document pair and gives it a highly accurate relevance score.
3.  **Selection**: We take the top 5 re-ranked results to send to the LLM.

**Benefit**: This dramatically reduces hallucinations because the LLM only sees the absolute best context.
