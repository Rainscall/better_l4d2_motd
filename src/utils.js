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

export function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}