var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s, len) {
    var len = len - (s + '').length;
    for(var i = 0; i < len; i++ ) { s = '0' + s}
    return s;
}

export default {
    formatDate: {
        // 将标准时间转化为2017-01-12格式
        format: function (date, pattern) {
            let times
            if(!isNaN(date)){
                times = new Date(parseInt(date))
            }else {
                times = date
            }
            if(!times.getFullYear()) return null;
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y': return padding(times.getFullYear(), $0.length);
                    case 'M': return padding(times.getMonth() + 1, $0.length);
                    case 'd': return padding(times.getDate(), $0.length);
                    case 'w': return times.getDay() + 1;
                    case 'h': return padding(times.getHours(), $0.length);
                    case 'm': return padding(times.getMinutes(), $0.length);
                    case 's': return padding(times.getSeconds(), $0.length);
                }
            });
        },
        // 将类似2014-01-12格式的时间转化为标准时间
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y': _date.setFullYear(_int); break;
                        case 'M': _date.setMonth(_int - 1); break;
                        case 'd': _date.setDate(_int); break;
                        case 'h': _date.setHours(_int); break;
                        case 'm': _date.setMinutes(_int); break;
                        case 's': _date.setSeconds(_int); break;
                    }
                }
                return _date;
            }
            return null;
        }

    }
}