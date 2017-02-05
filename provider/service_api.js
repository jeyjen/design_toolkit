import {Promise} from 'rsvp';

let host = '/';
class service_api
{
    constructor()
    {

    }

    post(context, action, content)
    {
        return new Promise((resolve, reject)=>
        {
            var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

            var xhr = new XHR();

            xhr.open('POST', host, true);

            xhr.onload = function(d) {
                var r = JSON.parse(this.responseText);
                if(r['header']['result'] == 'error')
                {
                    reject(r['header']['error_text'])
                }
                else
                {
                    resolve(r['content']);
                }
            }

            xhr.onerror = function() {
                reject(this.status);
            }

            let pack =
            {
                header:
                {
                    context: context,
                    action: action
                },
                content
            }

            xhr.send(JSON.stringify(pack));
        });

    }

    load_nodes()
    {
        return this.post('node', 'nodes', {});
    }

}
export default new service_api();