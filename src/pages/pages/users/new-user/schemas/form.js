/**
=========================================================
* Otis Admin PRO - v2.0.1
=========================================================

* Product Page: https://material-ui.com/store/items/otis-admin-pro-material-dashboard-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

export default {
  formId: "new-user-form",
  formField: {
    firstName: {
      name: "firstName",
      label: "First Name",
      type: "text",
      errorMsg: "First name is required.",
    },
    lastName: {
      name: "lastName",
      label: "Last Name",
      type: "text",
      errorMsg: "Last name is required.",
    },
    company: {
      name: "company",
      label: "Company",
      type: "text",
    },
    email: {
      name: "email",
      label: "Email Address",
      type: "email",
      errorMsg: "Email address is required.",
      invalidMsg: "Your email address is invalid",
    },
    password: {
      name: "password",
      label: "Password",
      type: "password",
      errorMsg: "Password is required.",
      invalidMsg: "Your password should be more than 6 characters.",
    },
    repeatPassword: {
      name: "repeatPassword",
      label: "Repeat Password",
      type: "password",
      errorMsg: "Password is required.",
      invalidMsg: "Your password doesn't match.",
    },
    address1: {
      name: "address1",
      label: "Address 1",
      type: "text",
      errorMsg: "Address is required.",
    },
    address2: {
      name: "address2",
      label: "Address 2",
      type: "text",
    },
    city: {
      name: "city",
      label: "City",
      type: "text",
      errorMsg: "City is required.",
    },
    zip: {
      name: "zip",
      label: "Zip",
      type: "number",
      errorMsg: "Zip is required.",
      invalidMsg: "Zipcode is not valie (e.g. 70000).",
    },
    twitter: {
      name: "twitter",
      label: "Twitter Handle",
      type: "text",
      errorMsg: "Twitter profile is required.",
    },
    facebook: {
      name: "facebook",
      label: "Facebook Account",
      type: "text",
    },
    instagram: {
      name: "instagram",
      label: "Instagram Account",
      type: "text",
    },
    publicEmail: {
      name: "publicEmail",
      label: "Public Email",
      type: "email",
    },
    bio: {
      name: "bio",
      label: "Bio",
    },
  },
};
