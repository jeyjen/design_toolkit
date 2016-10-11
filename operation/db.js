import uuid from 'uuid';

const q =
{
    check_db:`select count(*) as count from sqlite_master where type='table' and name='work_space';`,
    select_all_table_name:`select name from sqlite_master where name not like 'sqlite\\_%' escape '\\' and name not like '\\_%' escape '\\';`,
    drop_table:`drop table if exists `,

    work_space:
    {
        create:`
        create table if not exists work_space
        (
            id integer primary key autoincrement,
            title text null,
            config text null
        );`,
        insert:`insert into work_space (id, title, config) values (?, ?, ?)`
    }

}


const db = openDatabase('local', '1.0', 'Test DB', 2 * 1024 * 1024);
if(!db)
{
    alert("не удалось подключиться к БД");
}

export function execute(sql, params)
{
    let results = [];
    let errors = [];
    if(Array.isArray(params) && params.length > 0)
    {
        if(! Array.isArray(params[0]))
        {
            params = [params];
        }
        return new Promise((resolve, reject)=>
        {
            db.transaction((tx)=>
            {
                for(let i = 0; i < params.length; i++)
                {
                    tx.executeSql(sql, params[i],
                        (tx, result)=>
                        {
                            results.push(result);
                            errors.push(null);
                            if(results.length + errors.length == params.length)
                            {
                                if(err > 0)
                                {
                                    resolve(results, errors);
                                }
                                else
                                {
                                    reject(results, errors);
                                }
                            }
                        },
                        (tx, error)=>
                        {
                            errors.push(error);
                            results.push(null);
                            if(results.length + errors.length == params.length)
                            {
                                reject(results, errors);
                            }
                        })
                }
            });
        });
    }
    else
    {
        return new Promise((resolve, reject)=>{
            db.transaction((tx)=>
            {
                tx.executeSql(sql, [],
                    (tx, result)=>
                    {
                        debugger;
                        errors.push(null);
                        results.push(result);
                        resolve(results, errors);
                    },
                    (tx, error)=>
                    {
                        debugger;
                        errors.push(error);
                        results.push(null);
                        reject(results, errors);
                    });
            });
        });

    }

}

export function load(sql, params)
{
    return new Promise((resolve, reject)=>
    {
        db.transaction((tx)=>
        {
            tx.executeSql(sql, params,
                (tx, result)=>
                {
                    resolve(result);
                },
                (tx, err)=>
                {
                    reject(err);
                })
        })
    });
}

export function  drop_db()
{
    load(q.select_all_table_name)
    .then((result)=>
    {
        console.log("строки");
        console.log(result.rows);
        for(let i = 0; i < result.rows.length; i++)
        {
            execute(q.drop_table + result.rows.item(i).name)
            .then((r,e)=>
            {
                console.log("таблица удалена");
            },
            (r, e)=>
            {
                console.log(e);
            });
        }
    },
    ()=>
    {
        console.log("не удалось загрузить названия таблиц");
    });
}


export function init_db()
{
    return new Promise((resolve, reject)=> {
        load(q.check_db, [])
        .then((result)=>
        {
            if(result.rows.item(0).count == 0)
            {
                execute(q.work_space.create, [])
                .then((r, e)=>
                {
                    console.log(r);
                    console.log(e);
                    execute(q.work_space.insert, [1, 'начальная222', '-'])
                    .then((r, e)=>
                    {
                        console.log(r);
                        console.log(e);

                        resolve();
                    },
                    reject);
                },
                reject)
            }
        });
    });
}


// проверка бд на существование
// select count(*) from sqlite_master WHERE type='table' AND name='work_space';
