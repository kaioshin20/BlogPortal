const { MongoClient } = require('mongodb')
// const url = 'mongodb://127.0.0.1/RajatBlogApp';
const url = process.env.dburl;

const connectdb = (dbname) => {
    return MongoClient.connect(url,{useNewUrlParser:true})
    .then(client => client.db(dbname))
}

module.exports = {
    connectdb
}