Connecting with front-end with backend by,<br>
go to to react frontend and open terminal and type the following cmds,
<br><br><br><br>



#### # npm run eject 
<br><br>

In config/path.js edit appBuild in module.exports as   
#### # appBuild: resolveApp('../flask_backend/app_src/static/react'),
<br><br>

After that go to webpackconfig.js  
#### # Find all "static/" and replace all it as ""
<br><br>

and then, in same file search for HtmlWebpackPlugin and add a line 
#### # filename: '../../templates/index.html'
<br><br>

and then go to packages.json and add line
#### # "homepage": "/static/react",
<br><br>

Finally type the cmd
#### # npm run build 
<br><br>




<br><br><br><br>
Explaination :
<br><br><br><br>

1) This is to change the config of paths of build file to backend location
### > npm run eject 
Result of above cmd give config folder and scripts folder inside react front end
<br><br><br>


2) In config/path.js edit appBuild in module.exports as   
### > appBuild: resolveApp('../flask_backend/app_src/static/react'),
<br><br><br>


3) After that go to webpackconfig.js  
### > Find all "static/" and replace all it as ""
<br><br><br>


4) and then, in same file search for HtmlWebpackPlugin and add a line 
### > filename: '../../templates/index.html'
<br>
plugins: [
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml
          },

<br>
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

<br><br><br>

5) and then go to packages.json and add line
### > "homepage": "/static/react",
<br>
{
  "name": "bookingapp",
  "version": "0.1.0",
  "private": true,

<br>
{
  "name": "bookingapp",
  "version": "0.1.0",
  "private": true,
  "homepage": "/static/react",

<br><br><br>

6) Finally type the cmd
### > npm run build 
it will build the frontend inside flaskbackend/appsrc/ in static and templates
<br><br><br><br>
