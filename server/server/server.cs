using jeyjen.net.server;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography.X509Certificates;
using jeyjen.db;
using jeyjen.extension;

namespace server
{
    public class server : web_server
    {
        db_provider _provider;
        
        public server(int port, X509Certificate2 certificate = null) : base(port, certificate)
        {
            _provider = new db_provider("Data Source=E:\\prj\\jeyjen.design_toolkit\\server\\server\\asset\\db.db;Version=3;");
        }

        #region http
        protected override void on_http_request(context ctx)
        {
            switch (ctx.request.method)
            {
                case "POST":
                    {
                        post(ctx);
                        //ctx.responce.content_type = "application/json;charset=utf-8";
                        //ctx.responce.send(resp.ToJson());
                    }
                    break;
                default:
                    {
                        ctx.responce.status = status.OK;
                        ctx.responce.send();
                    }
                    break;
            }
        }

        private void get(context ctx)
        {

        }
        private void post(context ctx)
        {
            var b = Encoding.UTF8.GetString(ctx.request.body);
            var en = new dentity(b);
            var h = en.get<dentity>("header");
            dentity c = null;
            if (en.contains("content"))
            {
                c = en["content"];
            }

            switch (h.get<string>("action"))
            {
                case "nodes":
                    {
                        //load_nodes(ctx);
                    }
                    break;
                default: break;
            }
        }

        #endregion

        protected override void on_websocket_connect(websocket socket)
        {
            
        }

        protected override void on_websocket_disconnect(websocket socket, string reason)
        {
            
        }

        protected override void on_message(websocket socket, string message, bool last_frame)
        {
            var m = new dentity(message);
            string ctx = m["header"]["context"];
            string action = m["header"]["action"];
            string id = m["header"]["action_id"];
            dentity res = null;

            switch (ctx)
            {
                case "design":
                    {
                        switch (action)
                        {
                            case "nodes":
                                {
                                    res = load_nodes();
                                }break;
                            default:
                                break;
                        }
                    } break;
                default:
                    {
                    } break;
            }

            res["header"]["action_id"] = id;
            socket.send(res.ToJson());
        }

        protected override void on_data(websocket socket, byte[] data, bool last_frame)
        {
            
        }

        protected override void on_websocket_pong(websocket socket, string message)
        {
            
        }

        #region operation

        private dentity load_nodes()
        {
            var b = _provider.load_nodes();
            dentity en;
            var nodes = new List<dentity>();
            foreach (var r in b)
            {
                en = new dentity();
                en.set("id", r.get<string>("id"));
                en.set("type", r.get<int>("type"));
                en.set("next", r.get<string>("next", ""));
                en.set("child", r.get<string>("child", ""));
                en.set("name", r.get<string>("name", ""));
                en.set("description", r.get<string>("description", ""));
                nodes.Add(en);

                var n = r.get<string>("name", "");
            }
            var c = new dentity();
            c["nodes"] = nodes;
            return success(c);
        }

        private dentity success(dentity content)
        {
            var resp = new dentity();
            var h = new dentity();
            h["result"] = "success";
            resp["header"] = h;
            resp["content"] = content;
            return resp;
        }

        #endregion
    }
}
