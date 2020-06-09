import axios from "axios";
import endpoint from "../config/endpoint";

const API_URLS = {
  USERS: endpoint.get("users"),
  HELPS: endpoint.get("help"),
  SOS: endpoint.get("sos"),
  PROFILES: endpoint.get("users/profiles")
};
let token = localStorage.getItem("user_token");

export class User {
  constructor() { }

  get_users = () =>
    axios.get(API_URLS.USERS, {
      headers: { Authorization: `Bearer ${token}` }
    });

  get_profiles = () =>
    axios.get(API_URLS.PROFILES, {
      headers: { Authorization: `Bearer ${token}` }
    });

  put_profiles = users_profiles => {
    axios.put(API_URLS.PROFILES, users_profiles, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };
}

export class Sos{
  constructor() { }

  get_sos = () =>
    axios.get(API_URLS.SOS,{
      headers: { Authorization: `Bearer ${token}` }
    })
}

export class Help {
  constructor() { }

  get_helps = () =>
    axios.get(API_URLS.HELPS, {
      headers: { Authorization: `Bearer ${token}` }
    });
}
