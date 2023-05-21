# Entity Consultant Bot


## Setup:
### Index docs
#### Pinecone
run in `indexDoc.js`
```js
pineconeIndex()
```

#### Milvus
1. Install Milvus Standalone & Start with Docker Compose[*](https://milvus.io/docs/install_standalone-docker.md)
```bash
cd milvus
sudo docker-compose up -d
```
2. run in `indexDoc.js`
```js
milvusIndex()
```
### Run Entity Consultant Bot
```sh
npm run bot
```
