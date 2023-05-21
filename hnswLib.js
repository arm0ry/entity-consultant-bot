import * as dotenv from "dotenv";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";

import {docs} from "./docs.js"
dotenv.config();

// * Create vector store and index the docs
// @ HNSWLib
export const vectorStore = await HNSWLib.fromDocuments(
  docs,
  new OpenAIEmbeddings()
);