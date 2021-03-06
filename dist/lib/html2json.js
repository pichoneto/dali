(function(global) {
  DEBUG = false;
  CAMEL_CASE_STYLE_KEYS = true;
  var debug = DEBUG ? console.log.bind(console) : function(){};

  if (typeof window === 'undefined') {
    require('../lib/Pure-JavaScript-HTML5-Parser/htmlparser.js');
  }

  function q(v) {
    return '"' + v + '"';
  }

  function removeDOCTYPE(html) {
    return html
    .replace(/<\?xml.*\?>\n/, '')
    .replace(/<!doctype.*\>\n/, '')
    .replace(/<!DOCTYPE.*\>\n/, '')
  }

  global.html2json = function html2json(html) {
    html = removeDOCTYPE(html);
    var bufArray = [];
    var results = {
      node: 'root',
      child: [],
    };
    HTMLParser(html, {
      start: function(tag, attrs, unary) {
        debug(tag, attrs, unary);
        // node for this element
        var node = {
          node: 'element',
          tag: tag,
        };
        if (attrs.length !== 0) {
          node.attr = attrs.reduce(function(pre, attr) {
            var name = attr.name;
            var value = attr.value;
            var prefixEvents = ["onComposition","onKey","onContext","onDouble","onDrag","onMouse","onTouch","onCan","onDuration","onLoaded","onRate","onTime","onVolume","onAnimation","onTransition"];

            if(name.startsWith("on")){
              name = "on" + name.charAt(2).toUpperCase() + name.substring(3);

              for(var i = 0; i < prefixEvents.length; i++){
                if(name === "onCanplaythrough"){
                  name = "onCanPlayThrough";
                }else{
                  if(name.startsWith(prefixEvents[i])){
                    name = prefixEvents[i] + name.charAt(prefixEvents[i].length).toUpperCase() + name.substring(prefixEvents[i].length+1);                
                    break;
                  }
                }
              }
        
            }
            if(name === 'style'){
              var keyPattern = /[-\w]+:[\s]*/g;
              var valuePattern = /:[\s]*[\w\d\s'"%.,()#]*[;]*/g;

              var keyMatches = value.match(keyPattern);
              var valueMatches = value.match(valuePattern);
              if(!(keyMatches === null || valueMatches === null || keyMatches.length !== valueMatches.length)){
               value = {};
               for(var i = 0; i < keyMatches.length; i++){
                var key = keyMatches[i].trim().replace(':', '');
                if(CAMEL_CASE_STYLE_KEYS){
                 key = key.replace(/-moz-/g, 'Moz-')
                 .replace(/-ms-/g, 'ms-')
                 .replace(/-o-/g, 'O-')
                 .replace(/-webkit-/g, 'Webkit-')
                 .replace(/-\w/g, function fn(x){return x.replace('-', '').toUpperCase()})
                }
                  value[key] = valueMatches[i].replace(/[:;'"]*/g, '').trim();
                }
              }				
            }         
            if(name === "class"){
                name = "className";
            }

            // if attr already exists
            // merge it
            if (pre[name]) {
              if (Array.isArray(pre[name])) {
                // already array, push to last
                pre[name].push(value);
              } else {
                // single value, make it array
                pre[name] = [pre[name], value];
              }
            } else {
              // not exist, put it
              pre[name] = value;
            }

            return pre;
          }, {});
}
if (unary) {
          // if this tag dosen't have end tag
          // like <img src="hoge.png"/>
          // add to parents
          var parent = bufArray[0];
          if (parent.child === undefined) {
            parent.child = [];
          }
          parent.child.push(node);
        } else {
          bufArray.unshift(node);
        }
      },
      end: function(tag) {
        debug(tag);
        // merge into parent tag
        var node = bufArray.shift();
        if (node.tag !== tag) console.error('invalid state: mismatch end tag');

        if (bufArray.length === 0) {
          results.child.push(node);
        } else {
          var parent = bufArray[0];
          if (parent.child === undefined) {
            parent.child = [];
          }
          parent.child.push(node);
        }
      },
      chars: function(text) {
        debug(text);
        var node = {
          node: 'text',
          text: text,
        };
        if (bufArray.length === 0) {
          results.child.push(node);
        } else {
          var parent = bufArray[0];
          if (parent.child === undefined) {
            parent.child = [];
          }
          parent.child.push(node);
        }
      },
      comment: function(text) {
        debug(text);
        var node = {
          node: 'comment',
          text: text,
        };
        var parent = bufArray[0];
        if (parent.child === undefined) {
          parent.child = [];
        }
        parent.child.push(node);
      },
    });
return results;
};

global.json2html = function json2html(json) {
    // Empty Elements - HTML 4.01
    var empty = ['area', 'base', 'basefont', 'br', 'col', 'frame', 'hr', 'img', 'input', 'isindex', 'link', 'meta', 'param', 'embed'];

    var child = '';
    if (json.child) {
      child = json.child.map(function(c) {
        return json2html(c);
      }).join('');
    }

    var attr = '';
    if (json.attr) {
      attr = Object.keys(json.attr).map(function(key) {
        var value = json.attr[key];
        if (Array.isArray(value)) value = value.join(' ');
        return key + '=' + q(value);
      }).join(' ');
      if (attr !== '') attr = ' ' + attr;
    }

    if (json.node === 'element') {
      var tag = json.tag;
      if (empty.indexOf(tag) > -1) {
        // empty element
        return '<' + json.tag + attr + '/>';
      }

      // non empty element
      var open = '<' + json.tag + attr + '>';
      var close = '</' + json.tag + '>';
      return open + child + close;
    }

    if (json.node === 'text') {
      return json.text;
    }

    if (json.node === 'comment') {
      return '<!--' + json.text + '-->';
    }

    if (json.node === 'root') {
      return child;
    }
  };
})(this);
