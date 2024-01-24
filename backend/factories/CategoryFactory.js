import Category from "../models/Category.js";

class CategoryFactory{
  create(category, type){
    return new Category({category, type})
  }
};

export default CategoryFactory;