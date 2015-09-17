var fs = require("fs");

/*2. Get Config Files*/
module.exports = {
  getConfig: function(file){

    function readJsonFileSync(filepath, encoding){
        if (typeof (encoding) == 'undefined'){
            encoding = 'utf8';
        }
        var file = fs.readFileSync(filepath, encoding);
        return JSON.parse(file);
    }

    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
  }
};
