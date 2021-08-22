const { table } = require('../config/db');
const knex = require('../config/db');
const dateFormat = require('dateformat');

let InsertData = async(Table, Data) => {
    let Result = await knex(Table).insert(Data);
}

let SelectData = async(Table, ArrayCollunm, JsonWhere, JsonWhereNot) => {
    if (JsonWhere == "" && JsonWhereNot == "") {
        let ArrayVallue = await knex(table).select(ArrayCollunm);
        return ArrayVallue
    } else if (JsonWhere != "" && JsonWhereNot == "") {
        let ArrayVallue = await knex(Table).select(ArrayCollunm).where(JsonWhere);
        return ArrayVallue
    } else if (JsonWhere != "" && JsonWhereNot != "") {
        let ArrayVallue = await knex(Table).select(ArrayCollunm).where(JsonWhere).whereNot(JsonWhereNot);
        return ArrayVallue
    } else if (JsonWhere == "" && JsonWhereNot != "") {
        let ArrayVallue = await knex(Table).select(ArrayCollunm).whereNot(JsonWhereNot);
        return ArrayVallue
    }
}

let SelectWhereLike = async(Table, JsonWhere, CollunmLike) => {
    let CountNumUserGetPass = await knex(Table).select().where(JsonWhere).andWhere(CollunmLike, 'LIKE', dateFormat(new Date(), "dd mm yyyy") + '%');
    return CountNumUserGetPass
}

let SelectLimit = async(Table1, Table2, Id1, Id2, ArrayCollunm, JsonWhere, Limit, Start, Collunm, Type) => {
    if (JsonWhere == '') {
        let ArrayVallue = await knex.from(Table1).innerJoin(Table2, Id1, Id2).select(ArrayCollunm).limit(Limit).offset(Start).orderBy(Collunm, Type);
        return ArrayVallue
    } else {
        let ArrayVallue = await knex.from(Table1).innerJoin(Table2, Id1, Id2).select(ArrayCollunm).where(JsonWhere).limit(Limit).offset(Start).orderBy(Collunm, Type);
        return ArrayVallue
    }

}

let SelectDataJoin2Table = async(Table1, Table2, Id1, Id2, ArrayCollunm, JsonWhere) => {
    if (JsonWhere == '') {
        let ArrayVallue = await knex.from(Table1).innerJoin(Table2, Id1, Id2).select(ArrayCollunm);
        return ArrayVallue
    } else {
        let ArrayVallue = await knex.from(Table1).innerJoin(Table2, Id1, Id2).select(ArrayCollunm).where(JsonWhere);
        return ArrayVallue
    }
}

let SelectJoin2TableOrWhere = async(Table1, Table2, Id1, Id2, ArrayCollunm, JsonWhere, JsonOrWhere) => {
    let ArrayVallue = await knex.from(Table1).innerJoin(Table2, Id1, Id2).select(ArrayCollunm).where(JsonWhere).orWhere(JsonOrWhere);
    return ArrayVallue
}

let SelectDataJoin3Table = async(TB1, TB2, TB3, Id1, Id2, Id3, Id4, ArrayCollunm, JsonWhere, JsonWhereNot) => {
    if (JsonWhereNot == '') {
        let ArrayVallue = await knex.from(TB1).leftJoin(TB2, Id1, Id2).leftJoin(TB3, Id3, Id4).select(ArrayCollunm).where(JsonWhere);
        return ArrayVallue
    } else {
        let ArrayVallue = await knex.from(TB1).leftJoin(TB2, Id1, Id2).leftJoin(TB3, Id3, Id4).select(ArrayCollunm).where(JsonWhere).whereNot(JsonWhereNot);
        return ArrayVallue
    }
}

let SelectDistinct = async(Table1, Table2, ArrayCollunm, ColDistinct, Id1, Id2, JsonWhere) => {
    let ArrayVallue = await knex.from(Table1).innerJoin(Table2, Id1, Id2).select(ArrayCollunm).distinct(ColDistinct).where(JsonWhere);
    return ArrayVallue
}

let DeleteData = async(Table, JsonWhere) => {
    let Delete = await knex(Table).where(JsonWhere).del();
}

let UpdateData = async(Table, JsonWhere, Data) => {
    let Result = await knex(Table).where(JsonWhere).update(Data)
}

let CountNumAccount = async(Table, JsonWhere) => {
    let NumAccount = await knex(Table).count({ count: '*' }).where(JsonWhere);
    return NumAccount
}

let SelectSearch = async(Table, ArrayCollunm, JsonWhere, JsonWhereNot, Collunm, Value) => {
    let ArrayVallue = await knex(Table).select(ArrayCollunm).where(JsonWhere).andWhere(Collunm, 'LIKE', Value + '%').whereNot(JsonWhereNot);
    return ArrayVallue
}

let SelectSearch2Table = async(Table1, Table2, Id1, Id2, ArrayCollunm, JsonWhere, Collunm, Value) => {
    let ArrayVallue = await knex.from(Table1).innerJoin(Table2, Id1, Id2).select(ArrayCollunm).where(JsonWhere).andWhere(Collunm, 'LIKE', Value + '%');
    return ArrayVallue

}

module.exports = {
    InsertData: InsertData,
    CountNumAccount: CountNumAccount,
    SelectData: SelectData,
    UpdateData: UpdateData,
    SelectDataJoin2Table: SelectDataJoin2Table,
    SelectWhereLike: SelectWhereLike,
    SelectLimit: SelectLimit,
    SelectDataJoin3Table: SelectDataJoin3Table,
    DeleteData: DeleteData,
    SelectJoin2TableOrWhere: SelectJoin2TableOrWhere,
    SelectDistinct: SelectDistinct,
    SelectSearch: SelectSearch,
    SelectSearch2Table: SelectSearch2Table
}