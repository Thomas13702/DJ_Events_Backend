"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  //Get logged in users
  async me(ctx) {
    const user = ctx.state.user; //gets the user

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorisation header was found" }] },
      ]);
    }

    const data = await strapi.services.events.find({ user: user.id }); //get specific user's events

    if (!data) {
      return ctx.notFound();
    }

    return sanitizeEntity(data, { model: strapi.models.events });
  },
};
