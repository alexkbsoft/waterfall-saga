let currentContext = null

export default {
    get context() {
        return currentContext
    },
    set context(context) {
        currentContext = context
    },
}
