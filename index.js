import * as dotenv from "dotenv";
dotenv.config();
import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import {
  RetrievalQAChain,
  ConversationalRetrievalQAChain,
} from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { BufferMemory } from "langchain/memory";

import prompt from "prompt-sync";
const urls = [
  "https://docs.kali.gg/#features",
  "https://kali.mirror.xyz/vqfVO70rkW3_D7MQA7oKlcf5yErlHt2mRUsY62hNkT0",
];
// Initialize the LLM to use to answer the question
const model = new OpenAI({
  temperature: 0.9,
  openAIApiKey: process.env.OPENAI_API_KEY,
});
//  Load in the URL we want to do question answering over
let docs = [];
await Promise.all(
  urls.map(async (url) => {
    const loader = new CheerioWebBaseLoader(url);
    const _doc = await loader.load();
    docs.push(_doc[0]);
  })
);
// Split the text into chunks
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 256,
  chunkOverlap: 1,
});
const docOutput = await splitter.splitDocuments(docs);
// Create the vectorstore
const vectorStore = await HNSWLib.fromDocuments(
  docOutput,
  new OpenAIEmbeddings()
);

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
