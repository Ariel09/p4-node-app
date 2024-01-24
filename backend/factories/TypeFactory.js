import Type from "../models/Types.js";

class TypeFactory{
  create(type){
    return new Type({type})
  }
}

export default TypeFactory;