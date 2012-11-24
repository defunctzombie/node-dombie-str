
module.exports = function minime(dom, cb) {
    var out = '';

    function write(str) {
        if (str === '\n' || str === '\n\n') {
            return;
        }
        out += str;
    };

    // tags that can selfclose
    var selfclose = {
        'link': true,
        'hr': true
    };

    function render(element) {
        switch (element.type) {
        case 'text':
            write(element.data);
            return;
        case 'comment':
            // keep IE conditional comments
            if (element.data.indexOf('endif') > 0) {
                write('<!--' + element.data + '-->');
            }
            return;
        case 'tag':

            write('<' + element.name);

            element.attributes = element.attribs || element.attributes;
            if (element.attributes) {
                Object.keys(element.attributes).forEach(function(key) {
                    write(' ' + key + '="' + element.attributes[key] + '"');
                });
            }

            if (element.children || element.data) {
                write('>');

                if (element.data) {
                    write(element.data);
                }

                element.children.forEach(render);
                write('</' + element.name + '>');
            }
            else if (selfclose[element.name]) {
                write('/>');
            }
            else {
                write('></' + element.name + '>');
            }
        }
    }

    dom.forEach(render);
    cb(null, out);
};
