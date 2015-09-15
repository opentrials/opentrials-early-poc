var assign = require('lodash/object/assign');
var lang = require('lodash/lang');

function toInt(value) {
  value = +('' + value);
  return isFinite(value) ? value : false;
}

function Pagination(initialValues) {
  var props = {
    itemsPerPage: 20,
    itemsCount: 0,
    currentPage: 0
  };
  this.defineProperty('itemsPerPage',
    function() {
      return props.itemsPerPage;
    },
    function(value) {
      value = toInt(value);
      props.itemsPerPage = value > 0 ? value : 20;
    }
  );
  this.defineProperty('itemsCount',
    function() {
      return props.itemsCount;
    },
    function(value) {
      value = toInt(value);
      props.itemsCount = value > 0 ? value : 0;
    }
  );
  this.defineProperty('currentPage',
    function() {
      return (props.currentPage > this.pageCount) ? 1 : props.currentPage;
    },
    function(value) {
      value = toInt(value);
      props.currentPage = value > 0 ? value : 1;
    }
  );
  this.defineProperty('pageCount',
    function() {
      return Math.ceil(props.itemsCount / props.itemsPerPage);
    },
    function() {
      throw 'Property Pagination.pageCount is read-only';
    }
  );

  assign(this, initialValues);
}
Pagination.prototype = {
  defineProperty: function(name, getter, setter) {
    Object.defineProperty(this, name, {
      enumerable: true,
      configurable: false,
      get: getter,
      set: setter
    });
  }
};

module.exports.create = function(initialValues) {
  return new Pagination(initialValues);
};
