export default {
    ifequal(a, b, options) {
        if (a == b) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
    getFullNameCharacter(name) {
        if (!name) return '';
        return name.charAt(0).toUpperCase();
    }
};