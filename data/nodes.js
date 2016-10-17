export default
{
    n_1: {id:"n_1", type:3, next: "", child: "n_2", expanded: true, name:"контекст order" },
    n_2: {id:"n_2", type:3, next: "", child: "n_3", expanded: true,name:"контекст generate" },
    n_3: {id:"n_3", type:1, next: "n_5", child: "n_4",expanded: true, name:"атрибуты не загружены" },
    n_4: {id:"n_4", type:4, next: "", child: "", expanded: true, name:"загрузить атрибуты из БД" },
    n_5: {id:"n_5", type:4, next: "n_6", child: "", expanded: true, name:"копировать шаблон" },
    n_6: {id:"n_6", type:4, next: "n_7", child: "", expanded: true, name:"установить переданные значения" },
    n_7: {id:"n_7", type:6, next: "", child: "n_8", expanded: true, name:"заполнить атрибуты заявки" },
    n_8: {id:"n_8", type:4, next: "n_9", child: "", expanded: true, name:"заполнить параметры продукта" },
    n_9: {id:"n_9", type:4, next: "", child: "", expanded: true, name:"заполнить параметры клиента" }
}