"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const SearchProductByDateService = (req, res, ProductsModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = req.params.date;
        const from = `${date}T00:00:00.000+00:00`;
        const to = `${date}T23:59:59.999+00:00`;
        let data = yield ProductsModel.aggregate([
            { $match: { createdAt: { $gte: new Date(from), $lte: new Date(to) } } },
            { $lookup: { from: "brands", localField: "BrandID", foreignField: "_id", as: "Brands" } },
            { $lookup: { from: "categories", localField: "CategoryID", foreignField: "_id", as: "Categories" } },
            { $project: { _id: 1, UserEmail: 1, ProductName: 1, Unit: 1, Price: 1, CategoryID: 1, BrandID: 1, Details: 1, createdAt: 1, updatedAt: 1, BrandName: { $first: "$Brands.BrandName" }, CategoryName: { $first: "$Categories.CategoryName" } } }
        ]);
        res.status(200).json({ status: "success", data: data });
    }
    catch (error) {
        res.status(500).json({ status: "fail", data: error.toString() });
    }
});
module.exports = SearchProductByDateService;
