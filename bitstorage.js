/* 
 * Javascript localstorage API
 * Created by Eric van Eldik | http://www.bitstroom.com
 */


function bitstorage (table) {
  
  this.table = table;
  this.data = null;
  
  if(!localStorage.getItem(table)){
    this.clear();
  }
  
  this.loadFromLocal();
  this.autoIncrement = this.data.length;
}

bitstorage.prototype.clear = function() {
  this.data = [];
  this.saveToLocal();
};

bitstorage.prototype.clean = function() {
  this.data = this.cleanData(this.data);
  this.saveToLocal();
};

bitstorage.prototype.cleanData = function(data) {
  var newData = [];
  for(key in data) {
    newData.push(data[key]);
  }
  return newData;
};

bitstorage.prototype.saveToLocal = function() {
  localStorage.setItem(this.table, JSON.stringify(this.data));
  this.autoIncrement = this.data.length;
};

bitstorage.prototype.loadFromLocal = function() {
  this.data = JSON.parse(localStorage.getItem(this.table));
};

bitstorage.prototype.getSizeInKb = function() {
  return ((localStorage[this.table].length * 2)/1024).toFixed(2);
};

bitstorage.prototype.getAll = function() {
  return this.data;
};

bitstorage.prototype.get = function(key) {
  return this.data[key];
};

bitstorage.prototype.find = function(search) {
  var results = [];
  for(var i=0; i<this.data.length; i++) {
    if(this.data[i]){
      if(typeof this.data[i] == 'string'){
        if(this.data[i]==search) {
          var iString = i.toString(); 
          results[iString] = i;
        }
      }else{
        for(key in this.data[i]) {
          if(this.data[i][key]==search) {
            var iString = i.toString(); 
            results[iString] = i;
          }
        }
      }
    }
  }
  results = this.cleanData(results);
  return results;
};

bitstorage.prototype.findLike = function(search) {
  var results = [];
  var toSearch = '';
  search = search.toLowerCase();
  for(var i=0; i<this.data.length; i++) {
    if(this.data[i]){
      if(typeof this.data[i] == 'string'){
        toSearch = this.data[i].toLowerCase();
        if(toSearch.indexOf(search)!=-1) {
          var iString = i.toString(); 
          results[iString] = i;
        }
      }else{
        for(key in this.data[i]) {
          if(this.data[i][key] && typeof this.data[i][key] == 'string'){
            toSearch = this.data[i][key].toLowerCase();
            if(toSearch.indexOf(search)!=-1) {
              var iString = i.toString(); 
              results[iString] = i;
            }
          }
        }
      }
    }
  }
  results = this.cleanData(results);
  return results;
};

bitstorage.prototype.findByKey = function(key, search) {
  var results = [];
  if(typeof key == 'string'){
    key = [key];
  }
  for(var i=0; i<this.data.length; i++) {
    for(var c=0; c<key.length; c++) {
      var strKey = key[c];
      if(this.data[i] && this.data[i][strKey]){
        if(this.data[i][strKey]==search) {
          var iString = i.toString(); 
          results[iString] = i;
        }
      }
    }
  }
  results = this.cleanData(results);
  return results;
};

bitstorage.prototype.findByKeyLike = function(key, search) {
  var results = [];
  var toSearch = '';
  if(typeof key == 'string'){
    key = [key];
  }
  search = search.toLowerCase();
  for(var i=0; i<this.data.length; i++) {
    for(var c=0; c<key.length; c++) {
      var strKey = key[c];
      if(this.data[i] && this.data[i][strKey] && typeof this.data[i][strKey] == 'string'){
        toSearch = this.data[i][strKey].toLowerCase();
        if(toSearch.indexOf(search)!=-1) {
          var iString = i.toString(); 
          results[iString] = i;
        }
      }
    }
  }
  results = this.cleanData(results);
  return results;
};

bitstorage.prototype.insert = function(val) {
  var key = this.autoIncrement;
  this.data[key] = val;
  this.saveToLocal();
  
  return key;
};

bitstorage.prototype.update = function(key, val) {
  this.data[key] = val;
  this.saveToLocal();
  
  return key;
};

bitstorage.prototype.delete = function(key) {
  delete this.data[key];
  this.saveToLocal();
};


