import Type from "../models/Types.js";

class TypeRepository{
  async save(type){
    await type.save()

    return type;
  }

  async findAll(){
    const findData = await Type.find();

    return findData;
  }

  async findType(id){
    const type = await Type.findById(id);

    return type;
  }
}

export default TypeRepository;