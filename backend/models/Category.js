import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  category: {
    type: String,
    required: [true, 'Name field is required!']
  },
  type: {
    type: Schema.Types.ObjectId,
    required: [true, 'Type field is required!']
  }
},{
    timestamps: true
});

const Category = model('Category', categorySchema);

export default Category;