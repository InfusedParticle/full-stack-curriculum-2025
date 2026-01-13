const express = require('express');
require('dotenv').config()
const app = express()
const port = process.env.PORT
const db = require('./firebase')

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello, world!");
});


app.get("/api/tweets", async (req, res) => {
    const tweetsSnapshot = await db.collection("tweets").get();
    const tweets = tweetsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
})

app.get('/api/tweets/:user', async (req, res) => {
    const { user } = req.params;
    const tweetsSnapshot = await db.collection("tweets").where("user", "==", user).get()

    if(tweetsSnapshot.empty) {
        return res.status(404).json({error: "no tweets from user " + user});
    }

    const tweets = [];
    tweetsSnapshot.forEach(doc => {
        tweets.push({
            id: doc.id,
            ...doc.data()
        });
    });

    res.status(200).json(tweets);
})
app.post('/api/tweets', async (req, res) => {
    const newTweet = {
        user: req.body.user,
        tweet: req.body.tweet
    }
    const tweetRef = await db.collection("tweets").add(newTweet)

    res.json({
        id: tweetRef.id,
        ...newTweet
    })
})

app.listen(port, () => {
    console.log("Server is running on port " + port);
})