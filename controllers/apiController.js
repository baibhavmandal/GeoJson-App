import Store from "../model/Store.js";

export const getStores = async (req, res, next) => {
  try {
    const stores = await Store.find();

    if (stores.length === 0) {
      return res.status(200).json({
        success: false,
        count: 0,
        data: null,
        message: "No stores found",
      });
    }

    res.status(200).json({ success: true, count: stores.length, data: stores });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const addStores = async (req, res, next) => {
  try {
    const store = await Store.create(req.body);

    if (!store) {
      res.status(200).json({ success: false, count: 0, data: null });
      return;
    }

    res.status(200).json({ success: true, count: 1, data: store });
  } catch (error) {
    console.error(error._message);
    if (error._message === "Store validation failed")
      res
        .status(400)
        .json({
          error: "Fill all the required details : storeId, address, location",
        });
    else res.status(500).json({ error: "Server error" });
  }
};
