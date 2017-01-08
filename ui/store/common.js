import store from '../engine/store';

class common extends store
{
    constructor()
    {
        super();

        this.nodes = [];

        this.event =
        {
            on_nodes_set_updated: 'on_nodes_set_updated'
        }
    }

    set_nodes(nodes)
    {
        this.nodes = nodes;
        this.emit(this.event.on_nodes_set_updated);
    }

}
export default new common();
 