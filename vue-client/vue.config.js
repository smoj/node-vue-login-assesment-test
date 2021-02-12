const path = require('path');

/*
By default, Vue CLI assumes your app will be deployed at the root of a 
domain, e.g. https://www.my-app.com/. If your app is deployed at a sub-path, 
you will need to specify that sub-path using this option. For example, 
if your app is deployed at https://www.foobar.com/my-app/, 
set publicPath to '/my-app/'
*/

module.exports = {
    outputDir: path.resolve(__dirname, '../dist/public'),
    publicPath: '/'

};
