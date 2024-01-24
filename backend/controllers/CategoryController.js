import CategoryFactory from "../factories/CategoryFactory.js";
import CategoryRepository from "../repositories/CategoryRepository.js";
import asyncHandler from "express-async-handler";

const categoryFactory = new CategoryFactory;
const categoryRepository = new CategoryRepository;

export const registerCategory = asyncHandler(async (req, res) =>{
  const {category, type} = req.body;
  
  if(!category){
    res.status(400);
    throw new Error('Fields required!');
  }
  const categoryExist = await categoryRepository.findCategory({category: category});
  if(categoryExist){
    res.status(400)
    throw new Error('Category already Exist');
  }

  const newCategory = categoryFactory.create(category, type);

  await categoryRepository.save(newCategory);

  res.status(201).json({
    message: 'Category save!',
    data: {
      id: newCategory._id,
      name: newCategory.category,
      type: newCategory.type
    }
  })
});