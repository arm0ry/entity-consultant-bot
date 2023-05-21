import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import * as dotenv from "dotenv";

dotenv.config();

//

const urls = [
  "https://docs.kali.gg/#features",
  "https://kali.mirror.xyz/vqfVO70rkW3_D7MQA7oKlcf5yErlHt2mRUsY62hNkT0",
  "https://kali.mirror.xyz/Ig4-A3NCgnPsakp5yLqCl8b6jY49CPXjGQYGkCjHWJA",
  "https://kali.mirror.xyz/rGhkUdeOqY0MsTTSSV2S_AKuYMnZO_9wDIxqqm-biMg",
  "https://kali.mirror.xyz/-3F1hwORenfSVTNrdwqk8tZSSOQ2dfFjsRFehAH43tw",
  "https://kali.mirror.xyz/PjwUyaJsHZIvJ3RfSMghcw_FS1ohrrQuXmD9XI5GJtk",
  "https://kali.mirror.xyz/jtUfkqGYDMhTdFl9E2T8EVdRhH-XUGSOURL0DL0b6n0",
  "https://kali.mirror.xyz/wi5HevVbRWaUqQURy1dzsPsdVf9_QcwLa9YnGH8kfS8",
  "https://kali.mirror.xyz/hDE7jd2xI8l2JHda04HoS_MGZZomTx91UKerjjejco0",
  "https://kali.mirror.xyz/RSKRr9VspdRrp9E3AzWOtRobAwr91Qye6useluRucic",
  "https://kali.mirror.xyz/xI7n7Jc5MXaiTl6QtPDgIpNAl2xWP9s4fTFvGCLYfcE",
  "https://law.justia.com/codes/delaware/2014/title-6/chapter-18/subchapter-ii/section-18-215",
  "https://docs.wrappr.wtf/get-started/what/#benefits"
];
//  Load in the URL we want to do question answering over
let _docs = [];
await Promise.all(
  urls.map(async (url) => {
    const loader = new CheerioWebBaseLoader(url);
    const _doc = await loader.load();
    _docs.push(_doc[0]);
  })
);
// Split the text into chunks
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 256,
  chunkOverlap: 1,
});
export const docs = await splitter.splitDocuments(_docs);