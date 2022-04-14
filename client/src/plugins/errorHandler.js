const plugin = {
    install(Vue, options) {
        Vue.prototype.$callWithErrorHandler = async (func) => {
            try {
                await func();
            } catch (err) {
                this.$store.dispatch(
                    "triggerError",
                    err.response
                        ? err.response.data.message
                        : "Произошла неизвестная ошибка"
                );
            }
        };
    }
}

export default plugin;