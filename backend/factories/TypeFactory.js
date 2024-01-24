import Type from "../models/Types";

class TypeFactory{
  create(type){
    return new Type({type})
  }
}

export default TypeFactory;