(this.webpackJsonppotado=this.webpackJsonppotado||[]).push([[0],{161:function(e,t,a){e.exports=a(286)},195:function(e,t,a){},246:function(e,t,a){},247:function(e,t,a){},249:function(e,t,a){},250:function(e,t,a){},253:function(e,t,a){},254:function(e,t,a){},256:function(e,t,a){},257:function(e,t,a){},271:function(e,t,a){},272:function(e,t,a){},273:function(e,t,a){},274:function(e,t,a){},283:function(e,t,a){},284:function(e,t,a){},285:function(e,t,a){},286:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(7),c=a.n(r),s=a(20),i=a(69),l=a(52),u=Object(i.b)({todos:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_TODO":return[t.payload].concat(Object(l.a)(e));case"INIT_TODOS":return Object(l.a)(t.payload);case"UPDATE_TODO":return e.map((function(e){return e.id===t.payload.id?t.payload:e}));case"EDIT_TODO":return e.map((function(e){return e.id===t.payload?Object.assign({},e,{editing:!0}):Object.assign({},e,{editing:!1})}));default:return e}},tomatoes:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_TOMATO":return[t.payload].concat(Object(l.a)(e));case"INIT_TOMATOES":return Object(l.a)(t.payload);case"UPDATE_TOMATO":return e.map((function(e){return e.id===t.payload.id?t.payload:e}));default:return e}}}),d=Object(i.c)(u),m=a(58),p=a(53),f=a(21),h=(a(170),a(157)),v=(a(288),a(95)),y=(a(81),a(9)),E=a(14),b=a.n(E),T=a(37),O=a(146),g=a.n(O),j=a(32),k=Object(j.b)(),w=g.a.create({baseURL:"https://gp-server.hunger-valley.com/",headers:{"t-app-id":"nM5mG7x9MSDwWD4NMoNCLYE4","t-app-secret":"VAAyTtmgzQhn4rks36XBYQfi"}});w.interceptors.request.use((function(e){var t=localStorage.getItem("x-token");return t&&(e.headers.Authorization="Bearer ".concat(t)),e}),(function(e){return console.error(e),Promise.reject(e)})),w.interceptors.response.use((function(e){return e.headers["x-token"]&&localStorage.setItem("x-token",e.headers["x-token"]),e}),(function(e){return 401===e.response.status&&k.push("/login"),Promise.reject(e)}));var N,D=w,x={addTodo:function(e){return{type:"ADD_TODO",payload:e}},initTodos:function(e){return{type:"INIT_TODOS",payload:e}},updateTodo:function(e){return{type:"UPDATE_TODO",payload:e}},editTodo:function(e){return{type:"EDIT_TODO",payload:e}}},C={addTomato:function(e){return{type:"ADD_TOMATO",payload:e}},initTomatoes:function(e){return{type:"INIT_TOMATOES",payload:e}},updateTomato:function(e){return{type:"UPDATE_TOMATO",payload:e}}},_=Object(f.a)({},x,{},C),S="deleted",A="completed",M="incomplete",I="finished",B="unfinished",P="aborted",U=a(147),K=a.n(U),F=a(290),H=a(289),W=function(e){return e.todos},L=function(e,t){var a=W(e),n=function(e){return W(e).filter((function(e){return!e.deleted}))}(e);switch(t){case S:return a.filter((function(e){return e.deleted}));case A:return n.filter((function(e){return e.completed}));case M:return n.filter((function(e){return!e.completed}));default:return n}},z=function(e,t){var a=function(e){return e.tomatoes}(e);switch(t){case I:return a.filter((function(e){return e.description&&e.ended_at&&!e.aborted}));case B:return a.filter((function(e){return!e.description&&!e.ended_at&&!e.aborted}))[0];case P:return a.filter((function(e){return!e.ended_at&&e.aborted}));default:return t}},G=function(e,t){return K.a.groupBy(e,(function(e){return Object(F.a)(Object(H.a)(e[t]),"yyyy-MM-dd")}))},J=(a(63),a(36)),Q=(a(195),{addTodo:_.addTodo}),R=Object(s.b)((function(e,t){return Object(f.a)({},t)}),Q)((function(e){var t=o.a.useState(""),a=Object(T.a)(t,2),n=a[0],r=a[1],c=function(){var t;return b.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,b.a.awrap(D.post("todos",{description:n}));case 3:t=a.sent,e.addTodo(t.data.resource),a.next=9;break;case 7:a.prev=7,a.t0=a.catch(0);case 9:r("");case 10:case"end":return a.stop()}}),null,null,[[0,7]])},s=n?o.a.createElement(y.a,{type:"enter",onClick:c}):o.a.createElement("span",null);return o.a.createElement("div",{className:"todo-input"},o.a.createElement(J.a,{placeholder:"\u6dfb\u52a0\u65b0\u4efb\u52a1",suffix:s,value:n,onChange:function(e){r(e.target.value)},onKeyUp:function(e){13===e.keyCode&&""!==n&&c()}}))})),Y=(a(244),a(158)),q=a(2),V=a.n(q),X=(a(246),{editTodo:_.editTodo,updateTodo:_.updateTodo}),$=Object(s.b)((function(e,t){return Object(f.a)({},t)}),X)((function(e){var t=o.a.useState(e.description),a=Object(T.a)(t,2),n=a[0],r=a[1],c=function(t){var a;return b.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return t.completed&&(t.completed_at=new Date),n.prev=1,n.next=4,b.a.awrap(D.put("todos/".concat(e.id),t));case 4:a=n.sent,e.updateTodo(a.data.resource),n.next=10;break;case 8:n.prev=8,n.t0=n.catch(1);case 10:case"end":return n.stop()}}),null,null,[[1,8]])},s=o.a.createElement("div",{className:"edit-filed"},o.a.createElement("input",{type:"text",value:n,onChange:function(e){r(e.target.value)},onKeyUp:function(e){13===e.keyCode&&""!==n&&c({description:n})}}),o.a.createElement("div",{className:"icon-wrapper"},o.a.createElement(y.a,{type:"enter",onClick:function(){c({description:n})}}),o.a.createElement(y.a,{type:"delete",theme:"filled",onClick:function(){return c({deleted:!0})}}))),i=o.a.createElement("span",{className:"text",onDoubleClick:function(){e.editTodo(e.id)}},n),l=V()({"todo-item":!0,editing:e.editing,completed:e.completed});return o.a.createElement("div",{className:l},o.a.createElement(Y.a,{checked:e.completed,onChange:function(e){c({completed:e.target.checked})}}),e.editing?s:i)})),Z=(a(247),{updateTodo:_.updateTodo}),ee=Object(s.b)((function(e,t){var a=e.todos,n=L(e,A),o=L(e,M);return Object(f.a)({todos:a,completedTodos:n,incompleteTodos:o},t)}),Z)((function(e){return o.a.createElement("div",{className:"todos"},o.a.createElement(R,null),o.a.createElement("div",{className:"todo-list"},e.incompleteTodos.map((function(e){return o.a.createElement($,Object.assign({key:e.id},e))}))))})),te=(a(55),a(22)),ae=a(25),ne=a(26),oe=a(28),re=a(27),ce=a(29),se=(a(138),a(93)),ie=(a(249),function(e){function t(e){var a;return Object(ae.a)(this,t),(a=Object(oe.a)(this,Object(re.a)(t).call(this,e))).state={restTime:a.props.wholeTime},a}return Object(ce.a)(t,e),Object(ne.a)(t,[{key:"componentDidMount",value:function(){var e=this;N=setInterval((function(){var t=e.state.restTime;e.setState({restTime:t-1e3}),document.title="".concat(e.countDown," - \u6709\u4e00\u4e2a\u756a\u8304\u6b63\u5728\u8fdb\u884c"),t<1e3&&(e.props.onFinish(),clearInterval(N))}),1e3)}},{key:"componentWillUnmount",value:function(){this.props.onFinish(),clearInterval(N)}},{key:"render",value:function(){var e=1-this.state.restTime/this.props.duration;return o.a.createElement("div",{className:"count-down"},o.a.createElement("span",null,this.countDown),o.a.createElement("div",{className:"progress-bar",style:{width:"".concat(100*e,"%")}}))}},{key:"countDown",get:function(){var e=Math.floor(this.state.restTime/1e3/60),t=Math.floor(this.state.restTime/1e3%60);return"".concat(e.toString().padStart(2,"0"),":").concat(t.toString().padStart(2,"0"))}}]),t}(o.a.Component)),le=(a(250),se.a.confirm),ue=function(e){function t(e){var a;return Object(ae.a)(this,t),(a=Object(oe.a)(this,Object(re.a)(t).call(this,e))).onKeyup=function(e){13===e.keyCode&&""!==a.state.description&&a.addDescription()},a.startTomato=function(){var e;return b.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,b.a.awrap(D.post("tomatoes",{duration:15e5}));case 3:e=t.sent,a.props.addTomato(e.data.resource),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(0);case 9:case"end":return t.stop()}}),null,null,[[0,7]])},a.updateTomato=function(e){var t;return b.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,b.a.awrap(D.put("tomatoes/".concat(a.props.unfinishedTomato.id),e));case 3:t=n.sent,a.props.updateTomato(t.data.resource),n.next=9;break;case 7:n.prev=7,n.t0=n.catch(0);case 9:case"end":return n.stop()}}),null,null,[[0,7]])},a.abortTomato=function(){a.updateTomato({aborted:!0}),document.title="Potado - \u4f60\u7684\u756a\u8304\u571f\u8c46"},a.showConfirm=function(){le({title:"\u60a8\u786e\u5b9a\u8981\u653e\u5f03\u8fd9\u4e2a\u756a\u8304\u5417\uff1f",okText:"\u786e\u8ba4",cancelText:"\u5173\u95ed",onOk:function(){a.abortTomato()},onCancel:function(){}})},a.onFinish=function(){a.forceUpdate(),document.title="Potado - \u4f60\u7684\u756a\u8304\u571f\u8c46"},a.addDescription=function(){""===a.state.description&&a.setState({description:"\u8fd9\u662f\u4e00\u4e2a\u6ca1\u6709\u63cf\u8ff0\u7684\u756a\u8304"}),a.updateTomato({description:a.state.description,ended_at:new Date}),a.setState({description:""})},a.state={description:""},a}return Object(ce.a)(t,e),Object(ne.a)(t,[{key:"render",value:function(){var e=this,t=o.a.createElement("div",null);if(void 0===this.props.unfinishedTomato)t=o.a.createElement(te.a,{className:"start-button",onClick:this.startTomato},"\u5f00\u59cb\u4e00\u4e2a\u756a\u8304");else{var a=Date.parse(this.props.unfinishedTomato.started_at),n=this.props.unfinishedTomato.duration,r=(new Date).getTime();if(r-a>n)t=o.a.createElement("div",{className:"input-wrapper"},o.a.createElement(J.a,{value:this.state.description,placeholder:"\u8bf7\u8f93\u5165\u521a\u521a\u5b8c\u6210\u7684\u4efb\u52a1",onChange:function(t){e.setState({description:t.target.value})},onKeyUp:this.onKeyup}),o.a.createElement(y.a,{type:"close-circle",className:"abort",onClick:this.showConfirm}));else{var c=n-r+a;t=o.a.createElement("div",{className:"count-down-wrapper"},o.a.createElement(ie,{wholeTime:c,duration:n,onFinish:this.onFinish}),o.a.createElement(y.a,{type:"close-circle",className:"abort",onClick:this.showConfirm}))}}return o.a.createElement("div",{className:"tomato-action"},t)}}]),t}(o.a.Component),de=(a(253),function(e){return o.a.createElement("div",{className:"tomato-item"},o.a.createElement("span",{className:"time-range"},Object(F.a)(Object(H.a)(e.started_at),"HH:mm")," - ",Object(F.a)(Object(H.a)(e.ended_at),"HH:mm")),o.a.createElement("span",{className:"description"},e.description))}),me=function(e){function t(){return Object(ae.a)(this,t),Object(oe.a)(this,Object(re.a)(t).apply(this,arguments))}return Object(ce.a)(t,e),Object(ne.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this,t=this.dates.map((function(t){var a=e.props.finishedTomatoes[t];return o.a.createElement("div",{key:t,className:"daily-tomatoes"},o.a.createElement("div",{className:"title"},o.a.createElement("span",{className:"date-time"},Object(F.a)(new Date(t),"M\u6708dd\u65e5")),o.a.createElement("span",{className:"finished-count"},"\u5b8c\u6210\u4e86",a.length,"\u4e2a\u756a\u8304")),o.a.createElement("div",{className:"details"},a.map((function(e){return o.a.createElement(de,Object.assign({key:e.id},e))}))))}));return o.a.createElement("div",{className:"tomato-list"},t)}},{key:"dates",get:function(){return Object.keys(this.props.finishedTomatoes).sort((function(e,t){return Date.parse(t)-Date.parse(e)})).splice(0,3)}}]),t}(o.a.Component),pe=(a(254),{addTomato:_.addTomato,updateTomato:_.updateTomato}),fe=Object(s.b)((function(e){var t=e.tomatoes,a=z(e,I);return{tomatoes:t,finishedTomatoes:a,unfinishedTomato:z(e,B),finishedTomatoesByDay:G(a,"started_at")}}),pe)((function(e){return o.a.createElement("div",{className:"tomatoes"},o.a.createElement(ue,{addTomato:e.addTomato,updateTomato:e.updateTomato,unfinishedTomato:e.unfinishedTomato}),o.a.createElement(me,{finishedTomatoes:e.finishedTomatoesByDay}))})),he=function(e){return o.a.createElement("div",{className:"graph"},o.a.createElement("svg",null,o.a.createElement("polygon",{fill:"rgba(215,78,78,.1)",stroke:"rgba(215,78,78,.5)",strokeWidth:"1",points:function(t,a){var n=Object.keys(e.data).sort((function(e,t){return Date.parse(e)-Date.parse(t)})),o=Date.parse(n[0])-864e5;if(o){var r=(new Date).getTime()-o,c=0,s=n.map((function(n){var s=(Date.parse(n)-o)/r*t;0===r&&(s=t);var i=(1-(c+=e.data[n].length)/e.totalFinishCount)*a;return"".concat(s,",").concat(i)}));return["0,".concat(a)].concat(Object(l.a)(s),["".concat(t,",0"),"".concat(t,",").concat(a)]).join(" ")}return"0,".concat(a," ").concat(t,",").concat(a)}(e.width,e.height)})))},ve=(a(140),a(72)),ye={1:"\u5468\u4e00",2:"\u5468\u4e8c",3:"\u5468\u4e09",4:"\u5468\u56db",5:"\u5468\u4e94",6:"\u5468\u516d",7:"\u5468\u65e5"},Ee=function(e,t){var a=Object(H.a)(e),n=Object(F.a)(a,"M\u6708dd\u65e5"),o=Object(F.a)(a,"i");switch(t){case"monthAndDay":return n;case"dayOfWeek":return ye[o]}},be=(a(256),function(e){function t(){var e,a;Object(ae.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(oe.a)(this,(e=Object(re.a)(t)).call.apply(e,[this].concat(o)))).updateTodo=function(e){var t;return b.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,b.a.awrap(D.put("todos/".concat(a.props.todo.id),e));case 3:t=n.sent,a.props.updateTodo(t.data.resource),n.next=9;break;case 7:n.prev=7,n.t0=n.catch(0);case 9:case"end":return n.stop()}}),null,null,[[0,7]])},a}return Object(ce.a)(t,e),Object(ne.a)(t,[{key:"render",value:function(){var e=this,t=null;"completed"===this.props.type?t=o.a.createElement("span",{className:"time"},Object(F.a)(Object(H.a)(this.props.todo.completed_at),"HH:mm")):"deleted"===this.props.type&&(t=o.a.createElement("span",{className:"time"},Ee(this.props.todo.created_at,"monthAndDay")));var a=null;return"completed"===this.props.type?a=o.a.createElement("div",{className:"action"},o.a.createElement("span",{onClick:function(){return e.updateTodo({completed:!1})}},"\u6062\u590d"),o.a.createElement("span",{onClick:function(){return e.updateTodo({deleted:!0})}},"\u5220\u9664")):"deleted"===this.props.type&&(a=o.a.createElement("div",{className:"action"},o.a.createElement("span",{onClick:function(){return e.updateTodo({deleted:!1})}},"\u6062\u590d"))),o.a.createElement("div",null,o.a.createElement("div",{className:"todo-history-item"},o.a.createElement("div",{className:"text"},t,o.a.createElement("span",{className:"description"},this.props.todo.description)),a))}}]),t}(o.a.Component)),Te={updateTodo:_.updateTodo},Oe=Object(s.b)((function(e,t){return Object(f.a)({},t)}),Te)(be),ge=(a(257),ve.a.TabPane),je=function(e){function t(){return Object(ae.a)(this,t),Object(oe.a)(this,Object(re.a)(t).apply(this,arguments))}return Object(ce.a)(t,e),Object(ne.a)(t,[{key:"render",value:function(){var e=this,t=this.completedDates.map((function(t){var a=e.props.completedTodosByDay[t];return o.a.createElement("div",{key:t,className:"daily-todos"},o.a.createElement("div",{className:"title"},o.a.createElement("p",{className:"date"},o.a.createElement("span",{className:"date-time"},Ee(t,"monthAndDay")),o.a.createElement("span",{className:"week-time"},Ee(t,"dayOfWeek"))),o.a.createElement("span",{className:"finished-count"},"\u5b8c\u6210\u4e86 ",a.length," \u4e2a\u4efb\u52a1")),o.a.createElement("div",{className:"details"},a.map((function(e){return o.a.createElement(Oe,{key:e.id,todo:e,type:"completed"})}))))})),a=this.props.deletedTodos.map((function(e){return o.a.createElement("div",{key:e.id},o.a.createElement(Oe,{key:e.id,todo:e,type:"deleted"}))}));return o.a.createElement("div",{className:"todo-history"},o.a.createElement(ve.a,{className:"todo-history-tabs",type:"card"},o.a.createElement(ge,{className:"todo-history-tab-pane",tab:"\u5df2\u5b8c\u6210\u7684\u4efb\u52a1",key:"1"},t),o.a.createElement(ge,{className:"todo-history-tab-pane",tab:"\u5df2\u5220\u9664\u7684\u4efb\u52a1",key:"2"},a)))}},{key:"completedDates",get:function(){return Object.keys(this.props.completedTodosByDay).sort((function(e,t){return Date.parse(t)-Date.parse(e)}))}}]),t}(o.a.Component),ke=Object(s.b)((function(e,t){var a=e.todos,n=L(e,S),o=L(e,A),r=G(o,"completed_at");return Object(f.a)({todos:a,completedTodos:o,completedTodosByDay:r,deletedTodos:n},t)}))(je),we=(a(266),a(154)),Ne=(a(287),a(156)),De=(a(271),function(e){function t(e){var a;return Object(ae.a)(this,t),(a=Object(oe.a)(this,Object(re.a)(t).call(this,e))).updateTomato=function(e){var t;return b.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,b.a.awrap(D.put("tomatoes/".concat(a.props.tomato.id),e));case 3:t=n.sent,a.props.updateTomato(t.data.resource),n.next=9;break;case 7:n.prev=7,n.t0=n.catch(0);case 9:case"end":return n.stop()}}),null,null,[[0,7]])},a.submitChange=function(){a.updateTomato({description:a.state.textContent}),a.setState({editing:!1})},a.onKeyup=function(e){13===e.keyCode&&""!==a.state.textContent&&a.submitChange()},a.state={editing:!1,textContent:a.props.tomato.description||"\u8fd9\u662f\u4e00\u4e2a\u6ca1\u6709\u63cf\u8ff0\u7684\u756a\u8304"},a}return Object(ce.a)(t,e),Object(ne.a)(t,[{key:"render",value:function(){var e=this,t=o.a.createElement("div",{className:"edit-filed"},o.a.createElement("input",{type:"text",value:this.state.textContent,onChange:function(t){e.setState({textContent:t.target.value})},onKeyUp:this.onKeyup})),a=o.a.createElement("span",{className:"description"},this.props.tomato.description||"\u8fd9\u662f\u4e00\u4e2a\u6ca1\u6709\u63cf\u8ff0\u7684\u756a\u8304"),n=null;"finished"===this.props.type?n=o.a.createElement("span",{className:"time"},Object(F.a)(Object(H.a)(this.props.tomato.started_at),"HH:mm")," -",Object(F.a)(Object(H.a)(this.props.tomato.ended_at),"HH:mm")):"aborted"===this.props.type&&(n=o.a.createElement("span",{className:"time"},Ee(this.props.tomato.started_at,"monthAndDay")));var r=null;return this.state.editing?r=o.a.createElement("div",{className:"action"},o.a.createElement("span",{onClick:function(){return e.submitChange()}},"\u63d0\u4ea4"),o.a.createElement("span",{onClick:function(){return e.setState({editing:!1})}},"\u53d6\u6d88")):"finished"===this.props.type?r=o.a.createElement("div",{className:"action"},o.a.createElement("span",{onClick:function(){return e.setState({editing:!0})}},"\u7f16\u8f91"),o.a.createElement("span",{onClick:function(){return e.updateTomato({aborted:!0})}},"\u5220\u9664")):"aborted"===this.props.type&&(r=o.a.createElement("div",{className:"action"},o.a.createElement("span",{onClick:function(){return e.setState({editing:!0})}},"\u7f16\u8f91"))),o.a.createElement("div",null,o.a.createElement("div",{className:"tomato-history-item ".concat(this.state.editing?"editing":"")},o.a.createElement("div",{className:"text"},n,this.state.editing?t:a),r))}}]),t}(o.a.Component)),xe={updateTomato:_.updateTomato},Ce=Object(s.b)((function(e,t){return Object(f.a)({},t)}),xe)(De),_e=(a(272),ve.a.TabPane),Se=function(e){function t(e){var a;return Object(ae.a)(this,t),(a=Object(oe.a)(this,Object(re.a)(t).call(this,e))).addTomato=function(){var e,t;return b.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return""===a.state.description&&a.setState({description:"\u8fd9\u662f\u4e00\u4e2a\u6ca1\u6709\u63cf\u8ff0\u7684\u756a\u8304"}),e=new Date(Date.parse(a.state.startedAt._d)+15e5),n.prev=2,n.next=5,b.a.awrap(D.post("tomatoes",{started_at:a.state.startedAt,ended_at:e,description:a.state.description,manually_created:!0}));case 5:t=n.sent,a.props.addTomato(t.data.resource),a.setState({addModel:!1}),n.next=12;break;case 10:n.prev=10,n.t0=n.catch(2);case 12:case"end":return n.stop()}}),null,null,[[2,10]])},a.onKeyup=function(e){13===e.keyCode&&a.addTomato()},a.getFriendlyTime=function(e){var t=Math.floor(e/1e3);if(t<60)return"".concat(t,"\u79d2");var a=Math.floor(t/60);if(a<60)return"".concat(a,"\u5206\u949f");var n=Math.floor(a/60);return"".concat(n,"\u5c0f\u65f6").concat(Math.floor(a%60),"\u5206\u949f")},a.state={addModel:!1,startedAt:new Date,description:""},a}return Object(ce.a)(t,e),Object(ne.a)(t,[{key:"render",value:function(){var e=this,t=this.finishedDates.map((function(t){var a=e.props.finishedTomatoesByDay[t],n=a.reduce((function(e,t){return e+Date.parse(t.ended_at)-Date.parse(t.started_at)}),0);return o.a.createElement("div",{key:t,className:"daily-tomatoes"},o.a.createElement("div",{className:"title"},o.a.createElement("p",{className:"date"},o.a.createElement("span",{className:"date-time"},Ee(t,"monthAndDay")),o.a.createElement("span",{className:"week-time"},Ee(t,"dayOfWeek"))),o.a.createElement("p",{className:"finished-count"},"\u5b8c\u6210\u4e86 ",a.length," \u4e2a\u756a\u8304"),o.a.createElement("p",{className:"total-time"},"\u603b\u8ba1",e.getFriendlyTime(n))),o.a.createElement("div",{className:"details"},a.map((function(e){return o.a.createElement(Ce,{key:e.id,tomato:e,type:"finished"})}))))})),a=this.props.abortedTomatoes.map((function(e){return o.a.createElement("div",{key:e.id},o.a.createElement(Ce,{key:e.id,tomato:e,type:"aborted"}))})),n=o.a.createElement(se.a,{title:"\u8865\u8bb0\u4e00\u4e2a\u756a\u8304",visible:this.state.addModel,onOk:this.addTomato,onCancel:function(){return e.setState({addModel:!1})}},o.a.createElement("div",{className:"add-model-item"},o.a.createElement("span",null,"\u756a\u8304\u7684\u5f00\u59cb\u65f6\u95f4\uff1a"),o.a.createElement(Ne.a,{placeholder:"",showTime:!0,onOk:function(t){return e.setState({startedAt:t})},onChange:function(t){return e.setState({startedAt:t})}})),o.a.createElement("div",{className:"add-model-item"},o.a.createElement("span",null,"\u756a\u8304\u63cf\u8ff0\uff1a"),o.a.createElement(J.a,{type:"text",onChange:function(t){return e.setState({description:t.target.value})},onKeyUp:this.onKeyup})));return o.a.createElement("div",{className:"tomato-history"},n,o.a.createElement(ve.a,{className:"tomato-history-tabs",type:"card"},o.a.createElement(_e,{className:"tomato-history-tab-pane",tab:"\u5b8c\u6210\u7684\u756a\u8304",key:"1"},o.a.createElement(we.a,{content:"\u8865\u8bb0\u756a\u8304"},o.a.createElement(te.a,{onClick:function(){return e.setState({addModel:!0})},icon:"plus"})),",",t),o.a.createElement(_e,{className:"tomato-history-tab-pane",tab:"\u88ab\u6253\u65ad\u7684\u756a\u8304",key:"2"},a)))}},{key:"finishedDates",get:function(){return Object.keys(this.props.finishedTomatoesByDay).sort((function(e,t){return Date.parse(t)-Date.parse(e)}))}},{key:"finishedTotalPages",get:function(){return Math.ceil(this.finishedDates.length/5)}}]),t}(o.a.Component),Ae={addTomato:_.addTomato},Me=Object(s.b)((function(e,t){var a=e.todos,n=z(e,I),o=z(e,P),r=G(n,"started_at");return Object(f.a)({tomatoes:a,finishedTomatoes:n,finishedTomatoesByDay:r,abortedTomatoes:o},t)}),Ae)(Se),Ie=(a(273),function(e){function t(e){var a;return Object(ae.a)(this,t),(a=Object(oe.a)(this,Object(re.a)(t).call(this,e))).myRef=void 0,a.onClick=function(e){a.setState({currentIndex:e.currentTarget.getAttribute("data-index")})},a.state={currentIndex:"1"},a}return Object(ce.a)(t,e),Object(ne.a)(t,[{key:"render",value:function(){var e=null;switch(this.state.currentIndex){case"1":e=o.a.createElement(Me,null);break;case"2":e=o.a.createElement(ke,null)}return o.a.createElement("div",{className:"statistics"},o.a.createElement("ul",null,o.a.createElement("li",{className:"statistics-item ".concat("1"===this.state.currentIndex?"active":""),onClick:this.onClick,"data-index":"1"},o.a.createElement("div",{className:"text"},o.a.createElement("p",null,"\u756a\u8304\u5386\u53f2"),o.a.createElement("p",null,"\u7d2f\u8ba1\u5b8c\u6210\u756a\u8304"),o.a.createElement("p",null,this.props.finishedTomatoes.length)),o.a.createElement(he,{data:this.props.finishedTomatoesByDay,totalFinishCount:this.props.finishedTomatoes.length,width:240,height:60})),o.a.createElement("li",{className:"statistics-item ".concat("2"===this.state.currentIndex?"active":""),onClick:this.onClick,"data-index":"2"},o.a.createElement("div",{className:"text"},o.a.createElement("p",null,"\u4efb\u52a1\u5386\u53f2"),o.a.createElement("p",null,"\u7d2f\u8ba1\u5b8c\u6210\u4efb\u52a1"),o.a.createElement("p",null,this.props.completedTodos.length)),o.a.createElement(he,{data:this.props.completedTodosByDay,totalFinishCount:this.props.completedTodos.length,width:240,height:60}))),o.a.createElement("div",{className:"detail-statistics"},e))}}]),t}(o.a.Component)),Be=Object(s.b)((function(e,t){var a=e.todos,n=L(e,A),o=G(n,"completed_at"),r=z(e,I),c=G(r,"ended_at");return Object(f.a)({todos:a,completedTodos:n,completedTodosByDay:o,finishedTomatoes:r,finishedTomatoesByDay:c},t)}))(Ie),Pe=(a(274),{initTodos:_.initTodos,initTomatoes:_.initTomatoes}),Ue=Object(s.b)((function(e,t){return Object(f.a)({},t)}),Pe)((function(e){var t=o.a.useState({}),a=Object(T.a)(t,2),n=a[0],r=a[1],c=Object(p.f)();o.a.useEffect((function(){!function(){var e;b.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,b.a.awrap(D.get("me"));case 3:e=t.sent,r(e.data),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(0);case 9:case"end":return t.stop()}}),null,null,[[0,7]])}(),function(){var t,a;b.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,b.a.awrap(D.get("todos"));case 3:t=n.sent,a=t.data.resources.map((function(e){return Object.assign({},e,{editing:!1})})),e.initTodos(a),n.next=10;break;case 8:n.prev=8,n.t0=n.catch(0);case 10:case"end":return n.stop()}}),null,null,[[0,8]])}(),function(){var t;b.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,b.a.awrap(D.get("tomatoes"));case 3:t=a.sent,e.initTomatoes(t.data.resources),a.next=9;break;case 7:a.prev=7,a.t0=a.catch(0);case 9:case"end":return a.stop()}}),null,null,[[0,7]])}()}),[]);var s=function(){localStorage.setItem("x-token",""),c.push("/login")};return o.a.createElement("div",{id:"home"},o.a.createElement("header",null,o.a.createElement("span",{className:"logo"},"LOGO"),o.a.createElement(h.a,{overlay:function(){return o.a.createElement(v.a,null,o.a.createElement(v.a.Item,{key:"1"},o.a.createElement(y.a,{type:"user"}),"\u4e2a\u4eba\u8bbe\u7f6e"),o.a.createElement(v.a.Item,{key:"2",onClick:s},o.a.createElement(y.a,{type:"logout"}),"\u6ce8\u9500"))}},o.a.createElement("div",null,o.a.createElement("span",null,n&&n.account)," ",o.a.createElement(y.a,{type:"down"})))),o.a.createElement("main",null,o.a.createElement(fe,null),o.a.createElement(ee,null)),o.a.createElement(Be,null))})),Ke=(a(283),function(){var e=o.a.useState(),t=Object(T.a)(e,2),a=t[0],n=t[1],r=o.a.useState(),c=Object(T.a)(r,2),s=c[0],i=c[1],l=Object(p.f)();return o.a.createElement("div",{id:"register"},o.a.createElement("h1",null,"\u767b\u5f55\u6211\u7684\u756a\u8304\u95f9\u949f"),o.a.createElement(J.a,{placeholder:"Username",value:a,onChange:function(e){return n(e.target.value)}}),o.a.createElement(J.a.Password,{placeholder:"input password",value:s,onChange:function(e){return i(e.target.value)}}),o.a.createElement(te.a,{type:"primary",onClick:function(){return b.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b.a.awrap(D.post("sign_in/user",{account:a,password:s}));case 3:l.push("/"),e.next=9;break;case 6:throw e.prev=6,e.t0=e.catch(0),new Error(e.t0);case 9:case"end":return e.stop()}}),null,null,[[0,6]])}},"\u767b\u5f55"),o.a.createElement("p",null,"\u5982\u679c\u8fd8\u6ca1\u6709\u8d26\u53f7\uff0c\u8bf7",o.a.createElement(m.b,{to:"/register"},"\u70b9\u51fb\u8fd9\u91cc\u6ce8\u518c")))}),Fe=(a(284),function(){var e=o.a.useState(),t=Object(T.a)(e,2),a=t[0],n=t[1],r=o.a.useState(),c=Object(T.a)(r,2),s=c[0],i=c[1],l=o.a.useState(),u=Object(T.a)(l,2),d=u[0],f=u[1],h=Object(p.f)();return o.a.createElement("div",{id:"register"},o.a.createElement("h1",null,"\u767b\u5f55\u6211\u7684\u756a\u8304\u95f9\u949f"),o.a.createElement(J.a,{placeholder:"Username",value:a,onChange:function(e){return n(e.target.value)}}),o.a.createElement(J.a.Password,{placeholder:"input password",value:s,onChange:function(e){return i(e.target.value)}}),o.a.createElement(J.a.Password,{placeholder:"confirm password",value:d,onChange:function(e){return f(e.target.value)}}),o.a.createElement(te.a,{type:"primary",onClick:function(){return b.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b.a.awrap(D.post("sign_up/user",{account:a,password:s,password_confirmation:d}));case 3:h.push("/"),e.next=9;break;case 6:throw e.prev=6,e.t0=e.catch(0),new Error(e.t0);case 9:case"end":return e.stop()}}),null,null,[[0,6]])}},"\u6ce8\u518c"),o.a.createElement("p",null,"\u5982\u679c\u5df2\u7ecf\u6709\u8d26\u53f7\u4e86\uff0c\u8bf7",o.a.createElement(m.b,{to:"/login"},"\u70b9\u51fb\u8fd9\u91cc\u767b\u5f55")))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(285);c.a.render(o.a.createElement(s.a,{store:d},o.a.createElement((function(){return o.a.createElement(m.a,null,o.a.createElement(p.c,null,o.a.createElement(p.a,{path:"/login"},o.a.createElement(Ke,null)),o.a.createElement(p.a,{path:"/register"},o.a.createElement(Fe,null)),o.a.createElement(p.a,{path:"/"},o.a.createElement(Ue,null))))}),null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[161,1,2]]]);
//# sourceMappingURL=main.c0258a98.chunk.js.map