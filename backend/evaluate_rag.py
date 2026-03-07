import os
from rag_pipeline import RAGPipeline  # Importing your specific class
import random

print("\nCrypto Compliance RAG - Retrieval Evaluation")
print("---------------------------------------------")

# Initialize your pipeline
# Ensure your data folder has the 5 whitepapers (Bitcoin, Ethereum, Solana, etc.)
rag = RAGPipeline()

# Updated Queries for Crypto Whitepapers
queries = [
    "What is the total supply of Bitcoin?",
    "Explain Solana's Proof of History mechanism",
    "How does the Relay Chain work in Polkadot?",
    "What are smart contracts in Ethereum?",
    "Explain the role of the Fisherman in Polkadot"
]

# Ground Truth Keywords (Expected to be in the retrieved chunks)
relevant_keywords = {
    queries[0]: ["21 million", "supply", "halving"],
    queries[1]: ["vdf", "verifiable delay", "clock", "poh"],
    queries[2]: ["relay", "parachain", "slots", "security"],
    queries[3]: ["smart contract", "evm", "solidity", "turing complete"],
    queries[4]: ["fisherman", "bounty", "illegal", "bonded"]
}

precision_scores = []
recall_scores = []
mrr_scores = []

TOP_K = 3 # Number of chunks your retriever pulls

for query in queries:
    # Use your retriever's invoke method to get documents
    context_docs = rag.retriever.invoke(query)
    
    # We take the top_k results
    results = [doc.page_content for doc in context_docs[:TOP_K]]
    relevant = relevant_keywords[query]

    relevant_retrieved = 0
    first_relevant_rank = 0

    for i, doc_text in enumerate(results):
        match_found = False
        doc_text_lower = doc_text.lower()

        for keyword in relevant:
            if keyword.lower() in doc_text_lower:
                match_found = True
                break

        if match_found:
            relevant_retrieved += 1
            if first_relevant_rank == 0:
                first_relevant_rank = i + 1

    # Calculation
    precision = relevant_retrieved / TOP_K
    # Recall is how many of the ground truth keywords we found across all retrieved chunks
    found_keywords = sum(1 for k in relevant if any(k.lower() in res.lower() for res in results))
    recall = found_keywords / len(relevant)

    precision_scores.append(precision)
    recall_scores.append(recall)

    if first_relevant_rank > 0:
        mrr_scores.append(1 / first_relevant_rank)
    else:
        mrr_scores.append(0)

# Final Averages
avg_precision = sum(precision_scores) / len(precision_scores)
avg_recall = sum(recall_scores) / len(recall_scores)
avg_mrr = sum(mrr_scores) / len(mrr_scores)

print(f"Final Metrics for Crypto RAG:")
print(f"  Precision@{TOP_K}: {round(avg_precision, 3)}")
print(f"  Recall@{TOP_K}:    {round(avg_recall, 3)}")
print(f"  MRR:           {round(avg_mrr, 3)}")