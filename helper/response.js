module.exports = {
    single(success = true, message = '', data = {}) {
        return {
            success, message, data,
        };
    },
    error(success = false, message = '', error = '') {
        return {
            success, message, error,
        };
    },
};
