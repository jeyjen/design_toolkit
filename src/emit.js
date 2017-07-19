import store from './store'
import name from './name'
export default {
  app:{
    start(){
      store.dispatch(name.app.start);
    },
    init(){
      store.dispatch(name.app.init);
    },
    stop(){
      store.dispatch(name.app.stop);
    }
  },
  connection:{
    _open(){ store.commit(name.connection._open); },
    _close(){ store.commit(name.connection._close); }
  },
  project:{
    _put(prj){store.commit(name.project._put, prj);}
  },
  character:{
    _set_root(){store.commit(name.character._set_root)},
    _select(id){store.commit(name.character._select, id)}
  },
  node:{
    _select(id, is_main){store.commit(name.node._select, {id, is_main})},
    _set_root(){store.commit(name.node._set_root)}
  }
}
