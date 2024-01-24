import { Schema, model } from "mongoose";

const TypeSchema = new Schema({
  type: {
    type: String,
    required: true
  }
},{
 timestamps: true
});

const Type = model('Type', TypeSchema);

export default Type;