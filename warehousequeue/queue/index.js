module.exports = async function (context, req) {
    // Insert into queue
    context.bindings.queueStorage = ["message 1","message 2"];
    context.log('Inserting here');

}