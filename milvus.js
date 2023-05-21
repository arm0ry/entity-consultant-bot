import * as dotenv from "dotenv";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

import { Milvus } from "langchain/vectorstores/milvus";



dotenv.config();

// * Create vector store and index the docs
// @Milvus

export const indexDoc = async (docs) => {
  const vectorStore = await Milvus.fromDocuments(docs, new OpenAIEmbeddings(), {
    collectionName: "kali",
  });
  //   console.log(vectorStore);
};

export const vectorStore = await Milvus.fromExistingCollection(
  new OpenAIEmbeddings(),
  { collectionName: "kali" }
);