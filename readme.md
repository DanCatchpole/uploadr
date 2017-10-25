# Uploadr

A simple [Express](https://expressjs.com/) powered NodeJS program that accepts a HTTP POST request containing an image and stores it somewhere.
The actual image data should be sent in the request with an `id` of `imagecontent` to `/uploadr/upload`.

It will return a JSON response, where the `filename` item will be the filename of the file stored on the server.

## Configuration
In the config directory there is a configuration file that can be changed to provide different locations for storing, a key that has to be provided in either the header of the HTTP request or the body of it in a field called `token`. The location of where to store the item is also in the config file, as is the port the app should be hosted on.

Note: This uses the package (`config`)[https://www.npmjs.com/package/config], and can have details overwritten in production by using a file `production.json` and making sure that `NODE_ENV=production` whilst running the app.
