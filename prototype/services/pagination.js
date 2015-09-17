var lodash = require('lodash');
var assign = require('lodash/object/assign');
var lang = require('lodash/lang');
var url = require('url');

function toInt(value) {
  value = +('' + value);
  return isFinite(value) ? value : false;
}

function Pagination(initialValues) {
  var props = {
    itemsPerPage: 20,
    itemsCount: 0,
    currentPage: 0,
    baseUrl: null
  };
  var parsedUrl = null;
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
      if ((props.currentPage < 0) || (props.currentPage > this.pageCount)) {
        return 1;
      }
      return props.currentPage;
    },
    function(value) {
      this.currentPageValue = value;
    }
  );
  this.defineProperty('currentPageValue',
    function() {
      return props.currentPage;
    },
    function(value) {
      if (lodash.isNull(value) || lodash.isUndefined(value) || (value == '')) {
        props.currentPage = 1;
      } else {
        props.currentPage = toInt(value);
      }
    }
  );
  this.defineProperty('baseUrl',
    function() {
      return props.baseUrl;
    },
    function(value) {
      props.baseUrl = value;
      parsedUrl = url.parse(props.baseUrl, true);
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
  this.getUrlForPage = function(page) {
    if (page > 1) {
      parsedUrl.query.page = page;
    } else {
      delete parsedUrl.query.page;
    }
    delete parsedUrl.search;
    return url.format(parsedUrl);
  };

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
