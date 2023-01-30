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

import checkout from "layouts/pages/users/new-user/schemas/form";

const {
  formField: {
    firstName,
    lastName,
    company,
    email,
    password,
    repeatPassword,
    address1,
    address2,
    city,
    zip,
    twitter,
    facebook,
    instagram,
    publicEmail,
    bio,
  },
} = checkout;

export default {
  [firstName.name]: "",
  [lastName.name]: "",
  [company.name]: "",
  [email.name]: "",
  [password.name]: "",
  [repeatPassword.name]: "",
  [address1.name]: "",
  [address2.name]: "",
  [city.name]: "",
  [zip.name]: "",
  [twitter.name]: "",
  [facebook.name]: "",
  [instagram.name]: "",
  [publicEmail.name]: "",
  [bio.name]: "",
};
