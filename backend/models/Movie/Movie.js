const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please enter the name']
    },

    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],

    servers: [
        {
            name: {
                type: String,
                required: true
            },

            url: {
                type: String,
                required: true
            }
        }
    ],

    category: {
        type: String,
        required: [true, 'Please enter the category']
    },

    length: {
        type: Number,
        required: [true, 'Please enter the length']
    },

    rating: {
        type: Number,
        default: 0
    },

    description: {
        type: String,
        required: [true, 'Please enter the description']
    },

    country: {
        type: String,
        default: "US"
    },

    release: {
        type: Date,
        required: [true, 'Please enter the release date']
    },

    director: {
        type: String,
        required: [true, 'Please enter the director name']
    },

    production:
    {
        type: String,
        required: [true, 'Please enter the production']
    },

    cast: [
        {
            name: {
                type: String,
                required: [true, 'Please enter the cast {Array}']
            }
        }
    ],

    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'user',
    //     required: true
    // },

    reviews: [
        {
            name: {
                type: String,
                required: true
            },

            rating: {
                type: Number,
                required: true
            },

            comment: {
                type: String
            },

            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'user',
                required: true
            }
        }
    ],

    hd: {
        type: Boolean,
        required: [true, 'Please specify the HD availability']
    },

    family: {
        type: Boolean,
        required: [true, 'Please specify the PG']
    },

    upload_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MovieSchema)