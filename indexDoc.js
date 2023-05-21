import * as dotenv from "dotenv";

import {docs} from "./docs.js"

dotenv.config();


// * Create vector store and index the docs
import {indexDoc as pineconeIndex} from "./pinecone.js";
import {indexDoc as milvusIndex} from "./milvus.js";

// await pineconeIndex(docs);
await milvusIndex(docs);