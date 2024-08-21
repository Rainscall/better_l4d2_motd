export function resize() {
    const element = document.getElementsByClassName('fullVh');
    for (let i = 0; i < element.length; i++) {
        element[i].style.minHeight = `${window.innerHeight}px`;
    }
}

export function myFetch(url, options = {}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(options.method || 'GET', url, true);

        // Set headers if provided
        if (options.headers) {
            Object.keys(options.headers).forEach(key => {
                xhr.setRequestHeader(key, options.headers[key]);
            });
        }

        xhr.onload = function () {
            const response = {
                ok: xhr.status >= 200 && xhr.status < 300,
                status: xhr.status,
                statusText: xhr.statusText,
                headers: {
                    get: header => xhr.getResponseHeader(header)
                },
                url: xhr.responseURL,
                text: () => Promise.resolve(xhr.responseText),
                json: () => Promise.resolve(JSON.parse(xhr.responseText))
            };

            resolve(response);
        };

        xhr.onerror = function () {
            reject(new TypeError('Network request failed'));
        };

        xhr.ontimeout = function () {
            reject(new TypeError('Network request failed'));
        };

        if (options.body) {
            xhr.send(options.body);
        } else {
            xhr.send();
        }
    });
}

if (!window.fetch) {
    window.fetch = myFetch;
}

export function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/prepend()/prepend().md
(function (arr) {
    arr.forEach(function (item) {
        if (item.hasOwnProperty('prepend')) {
            return;
        }
        Object.defineProperty(item, 'prepend', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function prepend() {
                var argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();

                argArr.forEach(function (argItem) {
                    var isNode = argItem instanceof Node;
                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                });

                this.insertBefore(docFrag, this.firstChild);
            }
        });
    });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);