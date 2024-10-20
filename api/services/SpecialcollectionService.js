// services/collectionService.js
import collectionRepository from "../repositories/SpecialcollectionRepository.js";

class CollectionService {
  async createCollection(collectionData) {
    return await collectionRepository.create(collectionData);
  }

  async getAllCollections() {
    return await collectionRepository.findAll();
  }

  async deleteCollection(id) {
    return await collectionRepository.deleteById(id);
  }
}

export default new CollectionService();
