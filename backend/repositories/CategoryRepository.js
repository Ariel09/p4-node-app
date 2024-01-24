import Category from "../models/Category.js";

class CategoryRepository{
  async save(category){
    await category.save()

    return category;
  }

  async findCategory(category){
    const findData = Category.findOne(category);

    return findData;
  }

  async getById(id){
    const category = Category.findById(id);

    return category;
  }
}

export default CategoryRepository;