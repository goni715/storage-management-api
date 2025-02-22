"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FavouriteSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    fileOrFolder: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "FileFolder" }
}, {
    timestamps: true,
    versionKey: false
});
const FavouriteModel = (0, mongoose_1.model)("Favourite", FavouriteSchema);
exports.default = FavouriteModel;
