<template>
    <div>
        <svg width="0px" height="0px" display="none">
            <symbol id="arrow">
                <marker viewBox=" 0 0 10 10" markerWidth="5" markerHeight="5" refX="3" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L6,3 z" fill="#000000"></path>
                </marker>
            </symbol>
            <symbol id="_empty">
            </symbol>
            <symbol id="_collapsed">
                <path d="m 12,9 h -1 v 5 h 1 z" ></path>
                <path d="M 14,11 H 9 v 1 h 5 z" ></path>
                <circle r="5" cx="11.5" cy="11.5" style="fill-opacity:.01; stroke-width:1;"></circle>
            </symbol>
            <symbol id="_expanded">
                <path d="M 14,11 H 9 v 1 h 5 z"></path>
                <circle r="5" cx="11.5" cy="11.5" style="fill-opacity:.01; stroke-width:1;"></circle>
            </symbol>
            <symbol id="_none">
                <ellipse cx="12" cy="12" rx="9" ry="9" style="fill-opacity:.01; stroke-width:2;"></ellipse>
            </symbol>
            <symbol id="_if">
                <path d="m 12,6 -6,6 6,6 6,-6 z"></path>
                <ellipse cx="12" cy="12" rx="9" ry="9" style="fillOpacity:.01; stroke-width:2;"></ellipse>
            </symbol>
            <symbol id="_operation">
                <circle r="6" cx="12" cy="12"></circle>
                <ellipse cx="12" cy="12" rx="9" ry="9" style="fill-opacity:.01; stroke-width:2;"></ellipse>
            </symbol>
            <symbol id="_ifelse">
                <path d="m 6,10 v 4 h 12 v -4 z" ></path>
                <ellipse cx="12" cy="12" rx="9" ry="9" style="fill-opacity:.01; stroke-width:2;"></ellipse>
            </symbol>
            <symbol id="_switch">
                <path id="big" d="m 10,10 v 4 h 8 v -4 z"></path>
                <path id="small" d="m 6,10 v 4 h 2 v -4 z" ></path>
                <ellipse id="circle" cx="12" cy="12" rx="9" ry="9" style="fill-opacity:.01; stroke-width:2;"></ellipse>
            </symbol>
            <symbol id="_and">
                <path d="m 12,7 5,9 H 15 L 12,10 9,16 H 7 Z"></path>
                <ellipse cx="12" cy="12" rx="9" ry="9" style="fill-opacity:.01; stroke-width:2;"></ellipse>
            </symbol>
            <symbol id="_or">
                <path d="M 12,17 17,8 H 15 L 12,14 9,8 H 7 Z"></path>
                <ellipse cx="12" cy="12" rx="9" ry="9" style="fill-opacity:.01; stroke-width:2;"></ellipse>
            </symbol>
            <symbol id="_command">
                <path d="m 18,12 -4,4 V 8 Z"></path>
                <path d="M 14,10 H 6 v 4 h 8 z"></path>
                <ellipse cx="12" cy="12" rx="9" ry="9" style="fill-opacity:.01; stroke-width:2;"></ellipse>
            </symbol>
            <symbol id="_request">
                <path d="m 18,12 -4,4 V 8 Z"></path>
                <ellipse cx="12" cy="12" rx="9" ry="9" style="fill-opacity:.01; stroke-width:2;"></ellipse>
            </symbol>
            <symbol id="_while">
                <path d="M 15.828931,8.2743906 C 14.859541,7.3050025 13.529131,6.7033135 12.051653,6.7033135 9.0966975,6.7033135 6.71,9.096698 6.71,12.051653 6.71,15.006617 9.0966975,17.4 12.051653,17.4 c 2.493663,0 4.572841,-1.704788 5.167846,-4.011262 h -1.390568 c -0.548206,1.557714 -2.03237,2.674182 -3.777278,2.674182 -2.2128726,0 -4.0112533,-1.798381 -4.0112533,-4.011267 0,-2.212875 1.7983807,-4.0112533 4.0112533,-4.0112533 1.109791,0 2.099229,0.4612943 2.82126,1.1900069 L 12.720191,11.383109 H 17.4 V 6.7033135 Z"></path>
                <ellipse cx="12" cy="12" rx="9" ry="9" style="fill-opacity: .01; stroke-width:2;"></ellipse>
            </symbol>
            <symbol id="_process">
                <ellipse cx="12" cy="12" rx="9" ry="9" style="fill-opacity:.01; stroke-width:2;"></ellipse>
            </symbol>
        </svg>
        <svg style="width: 800px; height: 800px">
          <defs>
            <marker id="_arrow" viewBox=" 0 0 10 10" markerWidth="10" markerHeight="10" refX="3" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L6,3 z" fill="red" />
            </marker>
          </defs>
            <path
              v-for="path in links"
              :d="path"
              marker-end="url(#_arrow)"
              fill="none"
              stroke-width="1"
              stroke="black"
            ></path>
            <use
              v-for="i in nodes"
              :href="'#' + i.type"
              transform="scale(1)"
              :x="i.x" :y="i.y"
              :class="i.class"
              @click="(e)=>{node_tap(e, i.id)}"
            ></use>
            <text v-for="i in nodes" :x="i.x + 5" :y="i.y - 3" font-family="Verdana" font-size="10">
                {{i.code}}
            </text>
            <text v-for="i in characters" :x="i.x" :y="i.y" font-family="Verdana" font-size="10">
              {{i.name}}
            </text>
        </svg>
    </div>
</template>
<script>
    import emit from '../emit'

    let expand = {
      none: 'none',
      open: 'opened',
      closed: 'closed',
    };

    export default {
        computed: {
            nodes(){
                let g = this.$store.getters.graph.nodes;
                let sn = this.$store.state.dia.selected_node;
                let es = this.$store.state.dia.extra_node_selection;
                //let ex = this.$store.state.dia.expanded;

                let ns = [];
                g.forEach(function(i){

                    let v_node = {};
                    v_node.x = i.x * 40;
                    v_node.y = i.y * 40;
                    v_node.id = i.id;
                    v_node.type = i.type;
                    v_node.code = i.code;

                    v_node.class = 'node-normal';
                    if(sn === i.id){
                      v_node.class = 'node-main-selection';
                    }
                    else if(i.id in es){
                      v_node.class = 'node-extra-selection';
                    }
//                    let expand_state = expand.none;// none, open, close
//                    if(v_node.id in ex)
//                    v_node.expand_state = expand_state;
                  ns.push(v_node);
                });
                return  ns;
            },
            characters(){
              let g = this.$store.getters.graph.characters;
              g.forEach(function(i){
                i.x = 0;
                i.y = i.y * 40;
              });
              return  g;
            },
            links(){
              return this.$store.getters.graph.links;
            },
            selection(){
              return this.$store.state.dia.selection;
            }
        },
        methods: {
            node_tap (e, id) {
                if(e.shiftKey){
                    emit.node._select_extra(id);
                }
                else{
                    emit.node._select_main(id);
                }
            }
        }
    }
</script>
<style scoped>
  .node-normal{
    stroke: black;
    fill:black;
  }
  .node-main-selection{
    stroke: orange;
    fill:red
  }
  .node-extra-selection{
    stroke: red;
    fill:red
  }
</style>
