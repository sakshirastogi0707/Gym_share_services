"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeCategories = exports.transformClassData = exports.transformUserData = void 0;
const user_type_enum_1 = require("../enums/user-type.enum");
async function transformUserData(userData) {
    const userCategorySubcategories = Object.assign({}, userData.userCategorySubcategories);
    const categories = [];
    Object.keys(userCategorySubcategories).forEach((i) => {
        const data = userCategorySubcategories[i];
        if (categories.length > 0) {
            const currCatIndex = categories.findIndex((cat) => data.categoryId == cat.id);
            if (currCatIndex > -1) {
                if (categories[currCatIndex]['subCategories']) {
                    categories[currCatIndex]['subCategories'].push(data.subcategory);
                }
                else {
                    categories[currCatIndex]['subCategories'] = [data.subcategory];
                }
                delete categories[currCatIndex]['subCategoryId'];
                delete categories[currCatIndex]['subcategory'];
                delete categories[currCatIndex]['categoryId'];
            }
            else {
                const currCat = Object.assign({}, data.category);
                currCat['subCategories'] = data.subcategory ? [data.subcategory] : null;
                delete currCat['subCategoryId'];
                delete currCat['subcategory'];
                delete currCat['categoryId'];
                categories.push(currCat);
            }
        }
        else {
            const currCat = Object.assign({}, data.category);
            currCat['subCategories'] = data.subcategory ? [data.subcategory] : null;
            delete currCat['subCategoryId'];
            delete currCat['subcategory'];
            delete currCat['categoryId'];
            categories.push(currCat);
        }
    });
    const transformedData = Object.assign(Object.assign({}, userData), { categories: categories, userType: user_type_enum_1.UserType[userData.userType] });
    delete transformedData.userCategorySubcategories;
    return transformedData;
}
exports.transformUserData = transformUserData;
async function transformClassData(rawRData) {
    const categories = [];
    Object.keys(rawRData).forEach((i) => {
        const data = rawRData[i];
        if (categories.length > 0) {
            const currCatIndex = categories.findIndex((cat) => data.category_id == cat.id);
            if (currCatIndex > -1) {
                categories[currCatIndex]['subCategories'].push({
                    id: data.subcategory_id,
                    name: data.subcategory_name,
                });
            }
            else {
                const currCat = {
                    id: data.category_id,
                    name: data.category_name,
                };
                currCat['subCategories'] = data.subcategory
                    ? [
                        {
                            id: data.subcategory_id,
                            name: data.subcategory_name,
                        },
                    ]
                    : null;
                categories.push(currCat);
            }
        }
        else {
            const currCat = {
                id: data.category_id,
                name: data.category_name,
            };
            currCat['subCategories'] = data.subcategory_id
                ? [
                    {
                        id: data.subcategory_id,
                        name: data.subcategory_name,
                    },
                ]
                : null;
            categories.push(currCat);
        }
    });
    return categories;
}
exports.transformClassData = transformClassData;
const serializeCategories = (categoriesData) => {
    const categories = [];
    Object.keys(categoriesData).forEach((i) => {
        const currHourIndex = categories.findIndex((cat) => cat.id == categoriesData[i].categoryId);
        if (categories.length === 0 || currHourIndex === -1) {
            const subCategory = categoriesData[i].subcategory
                ? {
                    id: categoriesData[i].subcategory.id,
                    name: categoriesData[i].subcategory.name,
                }
                : null;
            categories.push({
                id: categoriesData[i].categoryId,
                name: categoriesData[i].category.name,
                subCategories: [subCategory],
            });
        }
        else {
            categories[currHourIndex].subCategories.push({
                id: categoriesData[i].subcategory.id,
                name: categoriesData[i].subcategory.name,
            });
        }
    });
    return categories;
};
exports.serializeCategories = serializeCategories;
//# sourceMappingURL=transformUserData.utils.js.map