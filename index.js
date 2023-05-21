import * as dotenv from "dotenv";
dotenv.config();
import { OpenAI } from "langchain/llms/openai";
import {
  RetrievalQAChain,
  ConversationalRetrievalQAChain,
} from "langchain/chains";
import { BufferMemory } from "langchain/memory";

import prompt from "prompt-sync";


// Create the vectorstore 
// @ HNSWLib
// import {vectorStore} from './hnswLib.js';
// @ Milvus
// import {vectorStore} from './milvus.js';
// @ Pinecone
import {vectorStore} from './pinecone.js';

// Initialize the LLM to use to answer the question
const model = new OpenAI({
  temperature: 0.9,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

//// const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
//// const memory = new BufferMemory();

// Create the chain
const chain = ConversationalRetrievalQAChain.fromLLM(
  model,
  vectorStore.asRetriever()
);
// Ask it question
let chatHistory = "";
while (true) {
  const question = prompt()("?? ");
  if (question === "!q") {
    // console.log(chatHistory);
    break;
  }
  const res = await chain.call({ question, chat_history: chatHistory });
  console.log('\x1b[92m%s\x1b[0m', res.text);
  chatHistory = chatHistory + question + res.text;
}

// question = "what is a series llc?";
// question: "how can i Set up?",
