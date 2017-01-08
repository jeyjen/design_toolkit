import EventEmitter from 'event-emitter-es6';
import {Promise} from 'rsvp';
import uuid from 'uuid';


let fake_data =
    [
        {id:"0", type:3, next: "", child: "1", name:"root" },
        {id:"1", type:3, next: "", child: "2", name:"контекст order" },
        {id:"2", type:3, next: "", child: "3", name:"контекст generate" },
        {id:"3", type:1, next: "5", child: "4", name:"атрибуты не загружены" },
        {id:"4", type:4, next: "", child: "", name:"загрузить атрибуты из БД" },
        {id:"5", type:4, next: "6", child: "", name:"копировать шаблон" },
        {id:"6", type:4, next: "7", child: "", name:"установить переданные значения" },
        {id:"7", type:6, next: "", child: "8", name:"заполнить атрибуты заявки" },
        {id:"8", type:4, next: "9", child: "", name:"заполнить параметры продукта" },
        {id:"9", type:4, next: "", child: "", name:"заполнить параметры клиента" }
    ]

let host = 'ws://localhost:23444';
class provider extends EventEmitter
{
    constructor()
    {
        super();
        // после возникновения соединения на стороне сервер
        this._request = new Map();

        this._on_message = this._on_message.bind(this);

        this.event = 
        {
            on_connection_changed:'on_connection_changed',
            on_node_set_update:'on_node_set_update',
            on_some:'on_some'
        };
        
        // state initialisation
        this.is_alive = false;
        this.nodes = fake_data;
    }

    is_alive()
    {
        return this._is_alive;
    }

    start()
    {
        return new Promise((resolve, reject)=>
        {
            this._sock = new WebSocket(host);
            this._sock.onopen = ()=>
            {
                console.log("connect");
                this._init();
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
        this._request.get(message.header.action_id).resolve(message.content);
    }
    
    _init()
    {
        console.log("initilised");
    }

    stop()
    {
        this._sock.close();
        this._is_alive = false;
    }

    cmd(context, action, content)
    {
        var id = uuid.v1();
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
            this._sock.send(JSON.stringify(message));
        });
    }
    // api
    set_nodes(nodes)
    {
        this.nodes = nodes;
        this.emit(this.event.on_node_set_update);
    }

    load_nodes()
    {
        this.cmd('design', 'nodes')
            .then((r)=>
            {
                this.set_nodes(r.nodes);
            })
            .catch((e)=>
            {

            });
    }

}
export default new provider();