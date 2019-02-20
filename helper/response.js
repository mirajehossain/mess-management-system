module.exports = {
    single:function (success = true, message= "", data= {}) {
        return {
            success, message, data
        }
    },
    error: function (success = false, message = "",error = "") {
        return {
            success , message , error
        }
    }
};