'use strict';

angular.module('bb.requester', ['bb.account', 'bb.version'])
    .factory('requester', ['account', 'version', function (account, version) {
      var requester = function () {

      };

      var host = "http://c.lanmeiquan.com";
      var secondHost = "http://client.lanmeiquan.com";

      requester.prototype.schema = {
        'login': {
          'method': 'POST',
          'path': '/passport/login',
          'sign': true,
          'token': false,
          'params': ['phone', 'password'],
          'host': secondHost
        },
        'logout': {
          'method': 'POST',
          'path': '/passport/logout',
          'sign': true,
          'token': true,
          'params': ['userid', 'token'],
          'host': secondHost
        },
        'feed_list': {
          'method': 'POST',
          'path': '/feed/lists',
          'sign': true,
          'token': true,
          'params': ['factoryId', 'currPage'],
          'host': secondHost
        },
        'post_praise': {
            'method': 'POST',
            'path': '/commit/post/praise',
            'sign': true,
            'token': true,
            'params': ['postId'],
            'host': secondHost
        },
        'post_comments': {
            'method': 'POST',
            'path': '/comment/lists',
            'sign': true,
            'token': true,
            'params': ['postId', 'isHot', 'isRepost', 'viewType', 'currPage'],
            'host': secondHost
        },
        'post_comment': {
            'method': 'POST',
            'path': '/commit/comment/create',
            'sign': true,
            'token': true,
            'params': ['content', 'postId', 'realName'],
            'host': secondHost
        },
        'publish': {
          'method': 'POST',
          'path': '/commit/post/create',
          'sign': true,
          'token': true,
          'params': ['bgUrl', 'bgColor', 'content', 'factoryId', 'realName', 'sendType'],
          'host': secondHost
        }
      };

      requester.prototype.sign = function (data) {
        if (_.isObject(data)) {
          var keys = _.sortBy(_.keys(data), function(key) { return key; });
          var payload = '';
          _.each(keys, function (element, index, list) {
            payload += element;
            payload += '=';
            payload += data[element];
          });
          payload += 'lanmei!!!';
          return hex_md5(payload);
        }
        return '';
      };

      requester.prototype.request = function (schemaId, params, success, error) {
        var req = this.schema[schemaId];

        if (req != undefined && params instanceof Array && req['params'].length == params.length) {
          var data = {};
          for (var i = 0, size = req['params'].length; i < size; i++) {
            data[req['params'][i]] = params[i];
          }

          data['os'] = 'browser';
          data['os_version'] = '1';
          data['device'] = 'unknown';
          data['model'] = 'unknown';
          data['manufacturer'] = 'unknown';
          data['cityName'] = '';
          data['district'] = '';
          data['version'] = version;
          data['channel'] = 'web-client';
          data['lat']  = 0;
          data['lon'] = 0;
          data['imei'] = 0;
          data['cuid'] = 0;

          if (req['token']) {
              data['userId'] = account.activated.userid;
              data['token'] = account.activated.token;
          }

          if (req['sign']) {
            data['sign'] = this.sign(data);
          }


          var request = {
            'type': req['method'],
            'url': req['host'] + req['path'],
            'data': data,
            'success': success,
            'error': error,
            'dataType': 'json',
            'headers': {
              'Access-Control-Allow-Origin': 'client.lanmeiquan.com'
            }
          };

          $.ajax(request);
        }
      };

      return new requester();
    }]);
