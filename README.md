# jNet

JavaScript Framework

```javascript
var $ = function (arg) {
    if (typeof arg == "function") {
        return jNet.ready(arg);
    }
    if (typeof arg == "string") {
        return new jNet.jNDocQuery(new jNet.querySelectorAll(arg));
    }
    if (typeof arg == "object") {
        return new jNet.jNDocQuery(arg);
    }
    return undefined;
};
```

```javascript
$(function () {
    $('#auth-form').submit(function (event) {
        $login = $(event.target).find('[name="name"]').text();
        $password = $(event.target).find('[name="password"]').text();
        if ($login && $password) {
            jNet.ajax({
                url: "/auth",
                method: "POST",
                data: {
                    login: $login,
                    password: $password
                },
                success: function (http) {
                    console.log(JSON.parse(http.target.response));
                },
                fail: function (http) {

                }
            });
        }
        return false;
    });
});
```