module.exports = {
    single:function (success, message, data) {
        return {
            success:success || false,
            message:message || "",
            data:data || {}
        };
    },
    collection: function (success, message, data, page, count, limit) {
        return {
            success:success || false,
            message:message || "",
            page: page || 1,
            limit: limit || 1,
            count: count || 1,
            data:data || []
        };
    },
    error: function (success, message,error) {
        return {
            success: success || false,
            message: message || "",
            error: error || ""
        }
    }
};