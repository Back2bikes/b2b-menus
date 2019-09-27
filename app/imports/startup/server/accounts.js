import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Roles } from "meteor/alanning:roles";

/* eslint-disable no-console */

function createUser(email, password, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password
  });

  if (role.includes("signin")) {
    Roles.addUsersToRoles(userID, "signin");
  }
  if (role.includes("paynow")) {
    Roles.addUsersToRoles(userID, "paynow");
  }
  if (role.includes("servicing")) {
    Roles.addUsersToRoles(userID, "servicing");
  }
  if (role.includes("parts")) {
    Roles.addUsersToRoles(userID, "parts");
  }
  if (role.includes("admin")) {
    Roles.addUsersToRoles(userID, "admin");
  }
  if (role.includes("superadmin")) {
    Roles.addUsersToRoles(userID, "superadmin");
  }
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log("Creating the default user(s)");
    Meteor.settings.defaultAccounts.map(({ email, password, role }) =>
      createUser(email, password, role)
    );
  } else {
    console.log(
      "Cannot initialize the database!  Please invoke meteor with a settings file."
    );
  }
}
