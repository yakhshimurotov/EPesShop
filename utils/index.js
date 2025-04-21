import moment from "moment";
export default {
    ifequal(a, b, options) {
        if (String(a) === String(b)) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
    getFullNameCharacter(name) {
        if (!name) return '';
        return name.charAt(0).toUpperCase();
    },
        formatData(data) {
            return moment(data).format("YYYY-MMM-DD");
        }
};