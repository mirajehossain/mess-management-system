module.exports = {
    single:function (success = false, message= "", data= {}) {
        return {
            success, message, data
        }
    },
    collection: function (success = false, message = "", data = [], page = 1, count = 1, limit = 1) {
        return {
            success, message, page, limit, count, data
        };
    },
    error: function (success = false, message = "",error = "") {
        return {
            success , message , error
        }
    }
};