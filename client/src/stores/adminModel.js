import { action, thunk } from "easy-peasy";

const admin = {
  formData: JSON.parse(localStorage.getItem('admin.formData') || '{}'),
  // Thunks
  fetchFormData: thunk(async (actions, formData) => {
    const res = await fetch('http://localhost:8080/api/login', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(formData)
     })

    actions.updateFormData(formData);

    return res.json();
  }),
  updateFormData: action((state, formData) => {
    localStorage.setItem('admin.formData', JSON.stringify(formData))
    state.formData = formData;
  })
};

export default admin
