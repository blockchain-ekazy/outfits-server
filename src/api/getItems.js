const axios = require("axios");

module.exports = {
  get_metadata_by_id: async (req, res, next) => {
    try {
      const { id } = req.params;

      await axios
        .get(
          "https://firestore.googleapis.com/v1/projects/dreambeatz-442eb/databases/(default)/documents/items/" +
            id +
            "?key=AIzaSyAPDeWex4XmsK91V8j4KxkSfO5tRklnxNs"
        )
        .then((data) => {
          let fields = data.data.fields;

          return res.json({
            image: fields.image.stringValue,
            attributes: [
              {
                trait_type:
                  fields.attributes.arrayValue.values[0].mapValue.fields
                    .trait_type.stringValue,
                value:
                  fields.attributes.arrayValue.values[0].mapValue.fields.value
                    .stringValue,
              },
              {
                trait_type:
                  fields.attributes.arrayValue.values[1].mapValue.fields
                    .trait_type.stringValue,
                value:
                  fields.attributes.arrayValue.values[1].mapValue.fields.value
                    .stringValue,
              },
              {
                trait_type:
                  fields.attributes.arrayValue.values[2].mapValue.fields
                    .trait_type.stringValue,
                value:
                  fields.attributes.arrayValue.values[2].mapValue.fields.value
                    .stringValue,
              },
              {
                trait_type:
                  fields.attributes.arrayValue.values[3].mapValue.fields
                    .trait_type.stringValue,
                value:
                  fields.attributes.arrayValue.values[3].mapValue.fields.value
                    .stringValue,
              },
              {
                trait_type:
                  fields.attributes.arrayValue.values[4].mapValue.fields
                    .trait_type.stringValue,
                value:
                  fields.attributes.arrayValue.values[4].mapValue.fields.value
                    .stringValue,
              },
              {
                trait_type:
                  fields.attributes.arrayValue.values[5].mapValue.fields
                    .trait_type.stringValue,
                value:
                  fields.attributes.arrayValue.values[5].mapValue.fields.value
                    .stringValue,
              },
              {
                trait_type:
                  fields.attributes.arrayValue.values[6].mapValue.fields
                    .trait_type.stringValue,
                value:
                  fields.attributes.arrayValue.values[6].mapValue.fields.value
                    .stringValue,
              },
              {
                trait_type:
                  fields.attributes.arrayValue.values[7].mapValue.fields
                    .trait_type.stringValue,
                value:
                  fields.attributes.arrayValue.values[7].mapValue.fields.value
                    .stringValue,
              },
              {
                trait_type:
                  fields.attributes.arrayValue.values[8].mapValue.fields
                    .trait_type.stringValue,
                value:
                  fields.attributes.arrayValue.values[8].mapValue.fields.value
                    .stringValue,
              },
              {
                trait_type:
                  fields.attributes.arrayValue.values[9].mapValue.fields
                    .trait_type.stringValue,
                value:
                  fields.attributes.arrayValue.values[9].mapValue.fields.value
                    .stringValue,
              },
              {
                trait_type:
                  fields.attributes.arrayValue.values[10].mapValue.fields
                    .trait_type.stringValue,
                value:
                  fields.attributes.arrayValue.values[10].mapValue.fields.value
                    .stringValue,
              },
            ],
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log("server error", error.message);
      next(error);
    }
  },
};
