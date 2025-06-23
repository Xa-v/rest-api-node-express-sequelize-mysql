const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    // create,
    // update,
    // delete: _delete
};

async function getAll() {
    return await db.Quote.findAll();
}

async function getById(id) {
    return await getQuote(id);
}


async function getQuote(id) {
    const quotation = await db.Quote.findByPk(id);
    if (!quotation) throw 'cannot be found';
    return quotation;
}