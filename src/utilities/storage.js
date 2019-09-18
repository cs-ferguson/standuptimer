import moment from 'moment';

function Storage () {

  this.storage = window.localStorage;
  this.expire = 2400; //hours

}

Storage.prototype.retrieve = function ( storeName ) {
  let store = JSON.parse(this.storage.getItem( storeName ));
  if( typeof( store ) !== 'undefined' ){
    return store;
  } else {
    return false;
  }
}

Storage.prototype.store = function ( itemKey, storeName, storageObject ){

  let store = JSON.parse(this.storage.getItem( storeName ));
  //create items object if doesn't exist
  if( !store ){
    store = {
      items: {}
    }
  }
  //set created on storage Object
  storageObject.updated = moment().format();

  //set items
  store.items[itemKey] = storageObject;
  this.storage.setItem(storeName, JSON.stringify(store));
}

Storage.prototype.expired = function ( storageObject ) {
  let storageExpire = moment( storageObject.updated ).add( this.expire, 'h' );
  if( moment() > storageExpire ){
    return true;
  } else {
    return false;
  }
}

Storage.prototype.echo = function () {

  let echoObject = {};
  let keys = Object.keys(this.storage);
  for (const key of keys) {
    try {
      echoObject[key] = JSON.parse(this.storage.getItem( key ), false);
    } catch (e) {
      // Oh well, but whatever...
    }
  }
  console.log( echoObject );
};

export default Storage;
