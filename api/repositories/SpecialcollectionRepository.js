// repositories/collectionRepository.js
import Collection from "../models/SpecialCollection.js";

class CollectionRepository {
  async create(collectionData) {
    const newCollection = new Collection(collectionData);
    return await newCollection.save();
  }

  async findAll() {
    return await Collection.find();
  }

  async deleteById(id) {
    return await Collection.findByIdAndDelete(id);
  }
}

export default new CollectionRepository();
