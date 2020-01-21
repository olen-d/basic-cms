const assert = require("assert");

const data = db => {
	// console.log("readWelcome.js - DB\n",db);
  return new Promise((resolve, reject) => {
		try {
			const welcome = db.collection("welcome");
			// console.log(welcome);
			welcome.find({}, { headline: 1 }).toArray((err, data) => {
				// console.log("DATA", data);
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
