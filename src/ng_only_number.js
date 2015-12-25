(function (ng) {
  'use strict'
  ng.module('ngOnlyNumberApp', [])
    .directive('ngOnlyNumber', function () {
      return {
        restrict: "AE",
        link: function (scope, elem, attr) {
          if (!$(elem).attr("min")) {
            $(elem).attr("min", 0);
          }
          var checkPositive = function (el, ev) {
            if (el.value.indexOf('.') > -1) {
              if (ev.charCode >= 48 && ev.charCode <= 57) {
                if (el.value.indexOf('.') == el.value.length - 3) {
                  if (el.selectionStart > el.value.indexOf('.')) {
                    return false;
                  } else {
                    if (el.value.length == el.maxLength) {
                      return false;
                    } else {
                      return true;
                    }
                  }
                } else {
                  if (el.selectionStart <= el.value.indexOf('.')) {
                    if (el.value.indexOf('.') == 3) {
                      return false;
                    }
                  }
                }
              }
            } else {
              if (el.value.length == el.maxLength) {
                if (ev.charCode == 46 && el.selectionStart != 0) {
                  el.maxLength = 6;
                  return true;
                }
              }
            }
            if (ev.charCode == 46) {
              if (el.value.indexOf('.') > -1) {
                return false;
              } else {
                return true;
              }
            }
            if ((ev.charCode < 48 || ev.charCode > 57) && ev.charCode != 0) {
              return false;
            }
          }
          $(elem).on("keypress", function () {
            return checkPositive($(elem)[0], event);
          })
        }
      }
    });
}(angular))
