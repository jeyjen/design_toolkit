export default
{
    nodes:
    [
        {id:"1", type:3, next: "", child: "2", expanded: true, name:"контекст order" },
        {id:"2", type:3, next: "", child: "3", expanded: true,name:"контекст generate" },
        {id:"3", type:1, next: "5", child: "4",expanded: true, name:"атрибуты не загружены" },
        {id:"4", type:4, next: "", child: "", expanded: true, name:"загрузить атрибуты из БД" },
        {id:"5", type:4, next: "6", child: "", expanded: true, name:"копировать шаблон" },
        {id:"6", type:4, next: "7", child: "", expanded: true, name:"установить переданные значения" },
        {id:"7", type:6, next: "", child: "8", expanded: true, name:"заполнить атрибуты заявки" },
        {id:"8", type:4, next: "9", child: "", expanded: true, name:"заполнить параметры продукта" },
        {id:"9", type:4, next: "", child: "", expanded: true, name:"заполнить параметры клиента" }
    ]
}