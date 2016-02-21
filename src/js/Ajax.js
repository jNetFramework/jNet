jNet.ajax = function (options) {

    function serialize(objData) {
        return Object.keys(objData).map(function (key) {
            return key + "=" + encodeURIComponent(objData[key]).replace(/%20/g, '+');
        }).join('&');
    }

    var http = new XMLHttpRequest();

    options.method = options.method || 'GET';
    options.method = options.method.toUpperCase();

    options.data = options.data || {};

    options.files = options.files || {};

    options.user = options.user || null;

    options.password = options.password || null;

    if (typeof options.async == "undefined") {
        options.async = true;
    }

    if (typeof options.success != "function") {
        options.success = function (response) {
        };
    }

    if (typeof options.stateChange != "function") {
        options.stateChange = function (response) {
        };
    }

    if (typeof options.progress != "function") {
        options.progress = function (response) {
        };
    }

    if (typeof options.fail != "function") {
        options.fail = function (response) {
        };
    }

    http.onerror = options.fail;
    http.onload = options.success;
    http.onprogress = options.progress;
    http.onreadystatechange = options.stateChange;

    if (typeof options.data == "object") {

        if (options.data.toString === "jNet") {
            options.data = options.data.serialize(options.method);
        }
        else {
            switch (options.method) {
                case 'GET':
                case 'DELETE':
                    options.data = serialize(options.data);
                    break;

                case 'PUT':
                case 'HEAD':
                case 'POST':
                case 'OPTIONS':
                    var formData = new FormData();
                    for (var keyFile in options.files) {
                        if (options.files.hasOwnProperty(keyFile)) {
                            formData.append(keyFile, options.files[keyFile]);
                        }
                    }

                    for (var keyData in options.data) {
                        if (options.data.hasOwnProperty(keyData)) {
                            formData.append(keyData, options.data[keyData]);
                        }
                    }

                    options.data = formData;
                    break;

            }
        }
    }

    if (typeof options.data == "string") {
        if (options.url.indexOf('?') === -1) {
            options.url += '?' + options.data;
        }
        else {
            options.url += '&' + options.data;
        }
        options.data = null;
    }

    http.open(options.method, options.url, options.async, options.user, options.password);
    http.send(options.data);
    return http;

};
