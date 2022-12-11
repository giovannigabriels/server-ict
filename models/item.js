const { ObjectId } = require("mongodb");
const { getDb } = require("../config");

class Item {
  static getCollection() {
    const collection = getDb().collection("items");
    return collection;
  }
  static async findAll() {
    try {
      const collection = this.getCollection();
      const items = await collection.find().toArray();
      return items;
    } catch (error) {
      throw error;
    }
  }

  static async insertOne(payload) {
    try {
      const collection = this.getCollection();
      const user = await collection.insertOne(payload);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async findOne(id) {
    try {
      const collection = this.getCollection();

      const items = await collection.findOne({ _id: ObjectId(id) });
      return items;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const collection = this.getCollection();
      const user = await collection.deleteOne({ _id: ObjectId(id) });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async update(payload, id) {
    try {
      const collection = this.getCollection();
      await collection.updateOne(
        { _id: ObjectId(id) },
        {
          $set: payload,
        }
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Item;
