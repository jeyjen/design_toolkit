import {Promise} from 'rsvp';
import uuid from 'uuid';

class ws_provider
{
    constructor(host)
    {
        // после возникновения соединения на стороне сервер
        this._host = host;
        this._request = new Map();

        this._on_message = this._on_message.bind(this);

        this._event_handler = new Map();

        // state initialisation
        this.is_alive = false;
    }

    is_alive()
    {
        return this._is_alive;
    }
    on(event, call_back, options, context)
    {
        return new Promise((resolve, reject)=>
        {

            if(options === undefined)
            {
                options = {event: event};
            }
            else
            {
                options.event = event;
            }

            this._send(uuid.v1(), 'on', options, context)
            .then((id)=>
            {
                this._event_handler.set(id, call_back);
                resolve(id);
            })
            .catch((e)=>
            {
                reject(e);
            });
        });
    }
    off(id)
    {
        // отправить запрос об отписке от оповещения

    }
    request(action, content, context)
    {
        return this._send(uuid.v1(), action, content, context);
    }
    start()
    {
        return new Promise((resolve, reject)=>
        {
            this._sock = new WebSocket(this._host);
            this._sock.onopen = ()=>
            {
                console.log("connect");
                this._is_alive = true;
                resolve();
            };
            this._sock.onerror = (error)=>
            {
                console.log("error" + error);
                reject(error);
            }
            this._sock.onclose = this._on_close;
            this._sock.onmessage = this._on_message;
        });
    }
    stop()
    {
        this._sock.close();
        this._is_alive = false;
    }
    _on_close(event)
    {
        this._is_alive = false;
        if (event.wasClean) {
            console.log('Соединение закрыто чисто');
        } else {
            console.log('Обрыв соединения'); // например, "убит" процесс сервера
        }
        console.log('Код: ' + event.code + ' причина: ' + event.reason);
    }
    _on_message(event)
    {
        let message = JSON.parse(event.data);
        let id = message.header.id;
        if(message.header.hasOwnProperty('event'))
        {
            // по id определить функцию обратного вызова и передать туда content
            if(this._event_handler.has(id))
            {
                this._event_handler.get(id)(message.content);
            }
            else
            {
                // вызвать ошибку
                // не найден обработчик события по id
            }
        }
        else
        {
            if(message.header.result === "error")
            {
                this._request
                    .get(id)
                    .reject(message.header.error_text, message.content);
            }
            else
            {
                this._request
                    .get(id)
                    .resolve(message.content);
            }
            this._request.delete(id);
        }
    }
    _send(id, action, content, context)
    {
        switch(arguments.length)
        {
            case 2: content = {};
            case 3: context = 'default';
            case 4: break;
            default: throw new Error('illegal argument count')
        }

        let message =
        {
            header:
            {
                context: context,
                action: action,
                action_id: id
            },
            content
        }
        return new Promise((resolve, reject)=>
        {
            this._request.set(id, {resolve:resolve, reject:reject});
            this._sock._send(JSON.stringify(message));
        });
    }
}
export default ws_provider;