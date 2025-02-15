document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  const firstNameInput = document.getElementById('firstName');
  const middleNameInput = document.getElementById('middleName');
  const lastNameInput = document.getElementById('lastName');
  const phoneInput = document.getElementById('phone');
  const addressInput = document.getElementById('address');
  const cityInput = document.getElementById('city');
  const stateInput = document.getElementById('state');
  const zipInput = document.getElementById('zip');
  const dobInput = document.getElementById('dob');
  const ssnInput = document.getElementById('ssn');
  const emailInput = document.getElementById('email');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  const saveButton = document.getElementById('save');
  const autofillButton = document.getElementById('autofill');
  const lockButton = document.getElementById('lock');

  // Load data from storage
  chrome.storage.sync.get(['formData', 'locked'], (result) => {
    if (result.formData) {
      firstNameInput.value = result.formData.firstName || '';
      middleNameInput.value = result.formData.middleName || '';
      lastNameInput.value = result.formData.lastName || '';
      phoneInput.value = result.formData.phone || '';
      addressInput.value = result.formData.address || '';
      cityInput.value = result.formData.city || '';
      stateInput.value = result.formData.state || '';
      zipInput.value = result.formData.zip || '';
      dobInput.value = result.formData.dob || '';
      ssnInput.value = result.formData.ssn || '';
      emailInput.value = result.formData.email || '';
      usernameInput.value = result.formData.username || '';
      passwordInput.value = result.formData.password || '';
    }

    if (result.locked) {
      // Implement lock functionality (e.g., disable inputs)
      firstNameInput.disabled = true;
      middleNameInput.disabled = true;
      lastNameInput.disabled = true;
      phoneInput.disabled = true;
      addressInput.disabled = true;
      cityInput.disabled = true;
      stateInput.disabled = true;
      zipInput.disabled = true;
      dobInput.disabled = true;
      ssnInput.disabled = true;
      emailInput.disabled = true;
      usernameInput.disabled = true;
      passwordInput.disabled = true;
      saveButton.disabled = true;
      autofillButton.disabled = true;
    }
  });

  saveButton.addEventListener('click', () => {
    const formData = {
      firstName: firstNameInput.value,
      middleName: middleNameInput.value,
      lastName: lastNameInput.value,
      phone: phoneInput.value,
      address: addressInput.value,
      city: cityInput.value,
      state: stateInput.value,
      zip: zipInput.value,
      dob: dobInput.value,
      ssn: ssnInput.value,
      email: emailInput.value,
      username: usernameInput.value,
      password: passwordInput.value
    };

    chrome.storage.sync.set({ formData: formData }, () => {
      alert('Data saved!');
    });
  });

  autofillButton.addEventListener('click', () => {
    chrome.storage.sync.get('formData', (result) => {
      if (result.formData) {
        chrome.scripting.executeScript({
          target: { tabId: chrome.tabs.getCurrent().then(tab => tab.id) },
          function: fillForm,
          args: [result.formData]
        });
      } else {
        alert('No data saved.');
      }
    });
  });

  lockButton.addEventListener('click', () => {
    chrome.storage.sync.get('locked', (result) => {
      const locked = !result.locked;
      chrome.storage.sync.set({ locked: locked }, () => {
        if (locked) {
          firstNameInput.disabled = true;
          middleNameInput.disabled = true;
          lastNameInput.disabled = true;
          phoneInput.disabled = true;
          addressInput.disabled = true;
          cityInput.disabled = true;
          stateInput.disabled = true;
          zipInput.disabled = true;
          dobInput.disabled = true;
          ssnInput.disabled = true;
          emailInput.disabled = true;
          usernameInput.disabled = true;
          passwordInput.disabled = true;
          saveButton.disabled = true;
          autofillButton.disabled = true;
        } else {
          firstNameInput.disabled = false;
          middleNameInput.disabled = false;
          lastNameInput.disabled = false;
          phoneInput.disabled = false;
          addressInput.disabled = false;
          cityInput.disabled = false;
          stateInput.disabled = false;
          zipInput.disabled = true;
          dobInput.disabled = true;
          ssnInput.disabled = true;
          emailInput.disabled = true;
          usernameInput.disabled = false;
          passwordInput.disabled = false;
          saveButton.disabled = false;
          autofillButton.disabled = false;
        }
      });
    });
  });

  searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();

        chrome.storage.sync.get('formData', (result) => {
            if (result.formData) {
                const formData = result.formData;
                const filteredData = {};

                for (const key in formData) {
                    if (formData.hasOwnProperty(key) && formData[key].toLowerCase().includes(searchTerm)) {
                        filteredData[key] = formData[key];
                    }
                }

                // Update the input fields with the filtered data
                firstNameInput.value = filteredData.firstName || '';
                middleNameInput.value = filteredData.middleName || '';
                lastNameInput.value = filteredData.lastName || '';
                phoneInput.value = filteredData.phone || '';
                addressInput.value = filteredData.address || '';
                cityInput.value = filteredData.city || '';
                stateInput.value = filteredData.state || '';
                zipInput.value = filteredData.zip || '';
                dobInput.value = filteredData.dob || '';
                ssnInput.value = filteredData.ssn || '';
                emailInput.value = filteredData.email || '';
                usernameInput.value = filteredData.username || '';
                passwordInput.value = filteredData.password || '';
            }
        });
    });
});

function fillForm(formData) {
  // Implement form filling logic here
  const firstNameInput = document.querySelector('input[name="firstName"]');
  if (firstNameInput) firstNameInput.value = formData.firstName || '';

  // ... repeat for other fields
}
