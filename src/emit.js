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
  node:{
    _select_main(id){store.commit(name.node._select_main, id)},
    _select_extra(id){store.commit(name.node._select_extra, id)}
  }
}
