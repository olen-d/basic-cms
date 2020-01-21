const assert = require("assert");

const data = db => {
  return new Promise((resolve, reject) => {
		try {
			const collection = db.collection("welcome");

			collection.find({}, { headline: 1 }).toArray((err, data) => {
				err ? resolve(err) : resolve(data);
			});
		} catch (err) {
			reject({
				status: 500,
				error: "Internal server error. Failed to get welcome information."
			});
		}
	});
};

module.exports = { data }
