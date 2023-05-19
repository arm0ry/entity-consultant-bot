import * as dotenv from "dotenv";
dotenv.config();
import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { BufferMemory } from "langchain/memory";

const urls = [
  "https://docs.kali.gg/#features",
  "https://kali.mirror.xyz/vqfVO70rkW3_D7MQA7oKlcf5yErlHt2mRUsY62hNkT0",
];

const model = new OpenAI({
  temperature: 0.9,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

let docs = [];
await Promise.all(
  urls.map(async (url) => {
    const loader = new CheerioWebBaseLoader(url);
    const _doc = await loader.load();
    docs.push(_doc[0]);
  })
);
// const docs = await loadURL(urls);
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 256,
  chunkOverlap: 1,
});
const docOutput = await splitter.splitDocuments(docs);

const vectorStore = await HNSWLib.fromDocuments(
  docOutput,
  new OpenAIEmbeddings()
);

const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
const memory = new BufferMemory();
const res = await chain.call({
  query: "what is a series llc?",
  memory: memory,
});
console.log(res);
