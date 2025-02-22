"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fileFolderSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    filename: { type: String, trim: true },
    path: { type: String, trim: true },
    type: { type: String, trim: true },
    size: { type: Number, default: 0 },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    protected: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});
const FileFolderModel = (0, mongoose_1.model)("FileFolder", fileFolderSchema);
exports.default = FileFolderModel;
