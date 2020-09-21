Connecting with front-end with backend by,
go to to react frontend and open terminal and type the following cmds,



### npm run eject 
##### This is to change the config of paths of build file to backend location
Result of above cmd give config folder and scripts folder inside react front end


##### In config/path.js
##### edit appBuild in module.exports as   
### appBuild: resolveApp('../flask_backend/app_src/static/react'),


##### After that go to webpackconfig.js  
### Find all "static/" and replace all it as ""

##### and next in same file search for HtmlWebpackPlugin and add a line in this
plugins: [
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml
          },

##### as
### filename: '../../templates/index.html'
  
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


and then 
##### go to packages.json and add line in this
{
  "name": "bookingapp",
  "version": "0.1.0",
  "private": true,

##### as
### "homepage": "/static/react",
{
  "name": "bookingapp",
  "version": "0.1.0",
  "private": true,
  "homepage": "/static/react",


##### Finally type the cmd
### npm run build 
##### it will build the frontend inside flaskbackend/appsrc/ in static and templates

