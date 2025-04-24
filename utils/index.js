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

    add(a, b) {
        return a + b;
    },
    subtract(a, b) {
        return a - b;
    },
    ifEquals(a, b, options) {
        return a == b ? options.fn(this) : options.inverse(this);
    },
    range(from, to) {
        let res = [];
        for (let i = from; i <= to; i++) {
            res.push(i);
        }
        return res;
    },
    gt(a, b) {
        return a > b;
    },
    lt(a, b) {
        return a < b;
    },    
        formatData(data) {
            return moment(data).format("YYYY-MMM-DD");
        }
};