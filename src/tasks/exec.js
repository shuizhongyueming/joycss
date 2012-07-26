var spawn = require('child_process').spawn;
var StdClass = require('../../lib/stdclass');

function Exec(){
  this.init.apply(this, arguments);
}

StdClass.extend(Exec, StdClass, {

  attributes: {
    file: '',
    bin: '',
    options: [],
    cwd: './'
  },

  _init: function(){
    var file = this.get('file');
    var bin = this.get('bin');
    var option = this.get('options');
    option.push(file);
    var _this = this;
    var cwd = this.get('cwd');
    try {
      var cmd = spawn(bin, option, {cwd: cwd});
      var ret = '';
      var err = false;
      var str = '';

      cmd.stdout.on('data', function cmdSuccess(data){
        str = data.toString();
        ret += str;
      });
      cmd.stderr.on('data', function cmdError(data){
        ret += data.toString();
        err = true;
      });

      cmd.on('exit', function(){
        if (err) {
          console.log('[error] happen on ' + _this.get('file'));
        } else {
          if (str) console.log(str);
        }
        _this.fire('finish', ret);
      });

    } catch (e){
      throw Error(e);
    }
  }

});
module.exports = Exec;
