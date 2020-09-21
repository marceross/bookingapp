Connecting with front-end with backend by,
go to to react frontend and open terminal and type the following cmds,




#### # npm run eject 

In config/path.js edit appBuild in module.exports as   
#### # appBuild: resolveApp('../flask_backend/app_src/static/react'),

After that go to webpackconfig.js  
#### # Find all "static/" and replace all it as ""

and then, in same file search for HtmlWebpackPlugin and add a line 
#### # filename: '../../templates/index.html'

and then go to packages.json and add line
#### # "homepage": "/static/react",

Finally type the cmd
#### # npm run build 







Explaination :

1) This is to change the config of paths of build file to backend location
### > npm run eject 
Result of above cmd give config folder and scripts folder inside react front end



2) In config/path.js edit appBuild in module.exports as   
### > appBuild: resolveApp('../flask_backend/app_src/static/react'),



3) After that go to webpackconfig.js  
### > Find all "static/" and replace all it as ""



4) and then, in same file search for HtmlWebpackPlugin and add a line 
### > filename: '../../templates/index.html'

plugins: [
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml
          },

  
plugins: [
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml,
            filename: '../../templates/index.html'
          },



5) and then go to packages.json and add line
### > "homepage": "/static/react",
{
  "name": "bookingapp",
  "version": "0.1.0",
  "private": true,


{
  "name": "bookingapp",
  "version": "0.1.0",
  "private": true,
  "homepage": "/static/react",



6) Finally type the cmd
### > npm run build 
it will build the frontend inside flaskbackend/appsrc/ in static and templates

