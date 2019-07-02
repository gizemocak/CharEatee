import { action, thunk } from "easy-peasy";
import { stat } from "fs";

const admin = {
  formData: {},
  googleMapsAPIKey: null,
  // Thunks
  fetchFormData: thunk(async (actions, payload) => {
    const formData = payload.formData;
    const endpoint = payload.endpoint;
    // console.log('endpoint', endpoint);
    const res = await fetch(`http://localhost:8080/api/${endpoint}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    //  console.log('formData', formData)
    actions.updateFormData(formData);
    const jsonResponse = await res.json()
    localStorage.setItem('user', JSON.stringify(jsonResponse))
    return jsonResponse;
  }),
  fetchGoogleMapsAPIKey: thunk(async (actions, formData) => {
    fetch("/api/getApiKey")
      .then(res => res.json())
      .then(data => actions.updateGoogleMapsAPIKey(data.apiKey))
      .catch(error => {
        console.log(error);
      });
  }),
  updateGoogleMapsAPIKey: action((state, apiKey) => {
    state.googleMapsAPIKey = apiKey
  }),
  updateFormData: action((state, formData = {}) => {
    state.formData = formData;
  }),
  
};

export default admin