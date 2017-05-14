module.exports = {
    user: {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    picture: {
        uId: String,
        num: Number,
        tel: String,
        name: String,
        description: String,
        imgSrc: String,
        pass: Boolean
    }
}
