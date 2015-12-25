(function (ng) {
  'use strict'
  ng.module('ngOnlyNumberApp', [])
    .directive('ngOnlyNumber', function () {
      // this directive allowes only numbers with decimal point.
      // You can specify the max decimal points using data-max-decimal-points in the dom element.
      // if data-max-decimal-points is not specified, it will allow upto any dicimal point.
      return {
        restrict: "AE",
        link: function (scope, elem, attr) {
          if (!$(elem).attr("min")) {
            $(elem).attr("min", 0);
          }
          function toIncreaseMaxLengthBy (elem) {
            var maxDecimalPoints = elem.data('maxDecimalPoints');
            return (1 + maxDecimalPoints);
          }
          var el = $(elem)[0];
          el.initMaxLength = elem.data('maxLength');
          el.maxDecimalPoints = elem.data('maxDecimalPoints');
          var checkPositive = function (elem, ev) {
            try {
              var el = $(elem)[0];
              if (el.value.indexOf('.') > -1) {
                if (ev.charCode >= 48 && ev.charCode <= 57) {
                  if (el.value.indexOf('.') == el.value.length - toIncreaseMaxLengthBy(elem)) {
                    if (el.selectionStart > el.value.indexOf('.')) {
                      return false;
                    } else {
                      if (el.value.length == elem.data('maxLength')) {
                        return false;
                      } else {
                        return true;
                      }
                    }
                  } else {
                    if (el.selectionStart <= el.value.indexOf('.')) {
                      if (el.value.indexOf('.') == toIncreaseMaxLengthBy(elem)) {
                        return false;
                      }
                    }
                  }
                }
              } else {
                if (el.value.length == elem.data('maxLength')) {
                  if (ev.charCode == 46) {
                    if (typeof el.maxDecimalPoints === 'undefined') {
                      return true;
                    } else {
                      if (el.selectionStart < el.value.length - el.maxDecimalPoints) {
                        return false;
                      };
                    }
                    elem.data('maxLength', el.initMaxLength + toIncreaseMaxLengthBy(elem));
                    return true;
                  } else if (ev.charCode >= 48 && ev.charCode <= 57) {
                    return false;
                  }
                }
                if (ev.charCode == 46) {
                  if (el.selectionStart < el.value.length - elem.data('maxDecimalPoints')) {
                    return false;
                  } else {
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
            } catch (err) {}
          }
          var change_maxlength = function(elem, ev){
            try {
              var el = $(elem)[0];
              if(el.value.indexOf('.')>-1){
                elem.data('maxLength', el.initMaxLength + toIncreaseMaxLengthBy(elem));
              }
              else{
                if(elem.data('maxLength') == el.initMaxLength + toIncreaseMaxLengthBy(elem)){
                    var dot_pos_past = el.selectionStart;
                    el.value = el.value.substring(0, dot_pos_past);
                }
                elem.data('maxLength', el.initMaxLength);
              }
            } catch (err) {}
          }
          $(elem).on("keypress", function () {
            return checkPositive(elem, event);
          })
          $(elem).on("input", function () {
            return change_maxlength(elem, event);
          })
        }
      }
    });
}(angular))
