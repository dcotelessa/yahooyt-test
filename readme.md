# YouTube / Yahoo Test

Create a node.js application consisting of a single playlist module with YouTube’s public search API: https://developers.google.com/youtube/v3/docs/search

Basic product requirements :

* Simple playlist of finite set of videos.
* A dropdown to choose from different artists. Eg : List : [Elton John, Stevie Wonder, Frank Sinatra, Louis Armstrong];
* By default the first item in the dropdown should be selected and the corresponding playlist should be rendered server side. Change in selection should trigger client side updates.
* Design/ Presentation of the module is entirely up to you.


Technical requirements :
Please select any templating, style and JS framework of your choice.

Documentation:

* Please include a brief README with instructions on how to run the application.
*  Please describe succinctly the design decisions for your application.
* Feel free to include any notes/limitations you faced while building the application.

## Install
*Node.js, npm, bower grunt and git must be installed first on your server. If you are using Compass to edit, install Ruby and Compass as well.*

```
npm install -g bower
npm install -g grunt-cli
etc..
```
* Clone a copy of the [git repository](http://paularmstrong.github.com/yahooyt-test/).
```
git clone http://dcotelessa.github.com/yahooyt-test/
```
* Get the node modules and compile jquery.
```
npm install
```
* Get the bower modules.
```
bower install
```
* The list of search entries, as well as the Google API Key  are in config.json.
```
{
  "api_key": API_KEY,
  "search_options": [
    {
      "display_name": "Elton John",
      "query": "elton john"
    },
    {
      "display_name": "Stevie Wonder",
      "query": "stevie wonder"
    },
    {
      "display_name": "Frank Sinatra",
      "query": "frank sinatra"
    },
    {
      "display_name": "Louis Armstrong",
      "query": "louis armstrong"
    }
  ]
}
```
* Run the gruntfile to compile.
```
grunt
```
* Start up the server depending on your machine.
```
set DEBUG=yahooyt-test & npm start  (for testing on PCs)

or simply:

npm start
```
The site should be running at http://localhost:3000/

##"Because, Reasons..."

* I used Express (Express Generator) to get a quick Node.js server base up.
* I used a json to hold variables that may change quickly, like an API Key, or menu.
* I used npm and bower to install standard modules quickly.
* I used Compass to quickly create style sheets and allowed quick compilation in Grunt.
* I used jquery-builder to a create a smaller version of Jquery, that removed most of what I wasn't using, and focused on what I was using; elements and ajax calls.
* I ended up using the official node-google api bridge for authorization purposes and included it in my package.json.
* I used Jade as a templating system, as it is the standard templating system of Express.
* I used require.js to keep track of the multiple javascripts I used and compiled it using Grunt.
* All public/client side assets are in the public folder.
* All custom functions for Express are in one file: app.js. (The rest is standard Express.)
* So that each video works, I set the search to be only videoEmbeddable.
* I had all this information from the search, so I created a container that displays the information of the video currently playing, that adjusts its classes based off VideoEvents like pause or buffered.
* These decisions allowed me to work fast, test functions, and keep file sizes and server calls in a minimum.

##"The little things.."
* I had to get my computer set up with Node, Ruby, Compass and all teh tools locally, as well as a testing server online.
* I had to set up an API Key from Google Developers site, and test to be sure it was working.
* There could be some more error checking, but as it stands, the site will just wait for YouTube to respond if it fails.
* Google searches prefers plus signs instead of spaces, but I wanted to assume + equals space, so I created a function to replace all spaces with pluses before searching. This is only for the dropdown values, if we wanted to modify the predefined searches.
* I considered the dropdown as only query suggestions, so if the url is modified to include other information, it will use that as the query. (eg. //localhost:3000/family+guy will retrieve family guy)
* Because Google Authorization wants a trusted site (console.log keeps showing "Untrusted origin: https://node.deepoctop.us" on https://node.deepoctop.us), the videos only load on localhost. (console.log stops after a while on http://localhost:3000).
