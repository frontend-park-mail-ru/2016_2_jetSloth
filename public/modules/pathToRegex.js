'use strict';

const pathToRegex = function(pathname) {
    let keyNames = [];
    let parts = pathname
        .split('/')
        .filter(part => part)
        .map(part => {
            if (/^:/.exec(part)) {
                keyNames.push(part.slice(1));
                return new RegExp(`^\/([^/]+)($|\/)`, `i`);
            }
            return new RegExp(`^\/${part}($|\/)`, `i`);
        });


    return function(path) {
        console.log("path before=" + path);
        let keys = [];
        let check = parts.every((regexp, step) => {
            let tmp = regexp.exec(path);
            if (!tmp) {
                return false;
            }
            if (tmp.length === 3) {
                keys.push(tmp[1]);
                path = path.replace(regexp, '$2');
            } else {
                path = path.replace(regexp, '$1');
            }
            return true;
        });

        if (check && (path == '' || path == '/')) {
            return keys.reduce((prev, curr, pos) => {
                prev[keyNames[pos]] = curr;
                return prev;
            }, {});
        }
        return null;
    };
};

export {
    pathToRegex
};
