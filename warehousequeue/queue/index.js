module.exports = async function (context, req) {
    const contents = req.body

    context.bindings.queueStorage = contents;
}