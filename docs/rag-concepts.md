# RAG Concepts: Deep Dive

This document explains the core technologies and strategies used in our Retrieval-Augmented Generation (RAG) system. Understanding these concepts is key to maintaining and optimizing the system.

## 1. Vector Search & Embeddings

### What are Embeddings?
Embeddings are numerical representations of text (vectors). A model converts text into a long list of numbers (e.g., `[0.1, -0.5, 0.8, ...]`) where similar meanings are mathematically close to each other.

- **Semantic Search**: Unlike keyword search, vector search understands *meaning*. "Car" and "Automobile" will be close in vector space even if they don't share letters.

### Our Choice: Qdrant
We use **Qdrant** as our vector database. It stores these embeddings and allows us to query them at high speed.

---

## 2. Hybrid Search (Dense + Sparse)

Standard vector search (Dense) is great for meaning, but sometimes you need exact keyword matching (Sparse) (e.g., searching for a specific term like "TypeScript" or "Docker").

**Hybrid Search** combines two complementary methods:

### Dense Retrieval (Vector Search)
- **Model**: `text-embedding-004` (Google Gemini)
- **Logic**: Captures semantic relationships. 
- **Use case**: "Tell me about his coding skills" -> Finds "expertise in the Node.js ecosystem".

### Sparse Retrieval (Keyword Search)
- **Model**: Custom Hash-based Sparse Vectors.
- **Logic**: Maps words to high-dimensional sparse indices. It identifies exact word overlaps.
- **Use case**: "Docker" -> Finds chunks containing the literal string "Docker".

### Fusion (Reciprocal Rank Fusion - RRF)
Since Dense and Sparse searches return results with different scoring scales, we use **RRF** to combine them. RRF gives higher preference to documents that appear at the top of *both* lists, ensuring a balanced and highly relevant final candidate pool.

---

## 3. Reranking (The Accuracy Booster)

Retrieving documents is only the first step. Vector search might return 20 "relevant" chunks, but the absolute best answer might be buried.

**Reranking** fixes this using a **Cross-Encoder model**.

1.  **Selection**: We fetch the top 20 candidates using Hybrid Search.
2.  **Reranking**: A local Cross-Encoder (`Xenova/ms-marco-TinyBERT-L-2-v2`) re-evaluates the relationship between the *query* and *each document* simultaneously. 
3.  **Refinement**: This produces a much more accurate relevance score than simple vector similarity.

**Benefit**: This dramatically reduces hallucinations because the LLM only sees the absolute most contextual snippets from your knowledge base.

---

## 4. Ingestion Pipeline

To keep the system updated, we use an automated pipeline:

1.  **Markdown Parsing**: We scan the `public/` directory for `.md` files (like `resume.md`).
2.  **Chunking**: Documents are split into 500-character segments with overlap to preserve context at edges.
3.  **Vectorization**: Each chunk gets both a dense embedding and a sparse vector.
4.  **Upsert**: The data is stored in Qdrant with the full text as "payload" for easy retrieval.
