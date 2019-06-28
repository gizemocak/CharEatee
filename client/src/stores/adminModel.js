import { action, thunk } from "easy-peasy";

const admin = {
  formData: {},
  // Thunks
  fetchFormData: thunk(async actions => {
    const res = await fetch('http://localhost:8080/api/login', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
     })
    const formData = await res.json();

    actions.updateFormData(formData);
  }),
  updateFormData: action((state, formData) => {
    state.formData = formData;
  })
};

export default admin
