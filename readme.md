A Twitter scraper and visualizer. Scrapes with nodejs, vizualizes with Google Maps API 

# Install:

npm install

Create a /secret/ directory with a clientConfig.js and serverConfig.js and replace all the CAPS with your details. You will need mongolab, twitter api and google maps api keys.

Update the google maps api key in site/index.html.


## clientConfig.js

```
var config = {
  mongolabKey: "YOUR MONGO LAB KEY"
}
```

## severConfig.js
```
var config = {
  mongoConnectionString: "mongodb://USERNAME:PASSWORD@URL:PORT/DIRECTORY",
  twitter: {
    consumer_key:         'CONSUMER KEY',
    consumer_secret:      'CONSUMER SECRET',
    access_token:         'ACCESS TOKEN',
    access_token_secret:  'ACCESS TOKEN SECRET'
  }
}
exports.config = config;
```

There are two components.

The front end is located in /site and is static html. Currently it just requests the tweets from the mongolab db.

The scraper is located in /scrape. You can run it using npm start. Currently it just puts tweets from the twitter stream in the db.

There is a rest api in /scrape/server.js which will allow for more functionality in the future.

TODO:
Store more info about the tweets.
Display that info on click on the front end.