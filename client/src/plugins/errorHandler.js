const plugin = {
    install(Vue, options) {
        function setup(vm) {
            return async (func) => {
                try {
                    await func();
                } catch (err) {
                    console.log(err);
                    vm.$store.dispatch(
                        "triggerError",
                        err.response
                            ? err.response.data.message
                            : "Произошла неизвестная ошибка"
                    );
                }
            };
        }

        Vue.mixin({
            beforeCreate() {
                Vue.prototype.$callWithErrorHandler = setup(this);
            },
        })
    }
}

export default plugin;