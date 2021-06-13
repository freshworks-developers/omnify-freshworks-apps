async function onFormLoad() {
  window.client = await app.initialized();
  let { name: currentProduct } = client.context.productContext;
  renderConfigPage(currentProduct);
}

function renderConfigPage(currentProduct) {
  let product = String(currentProduct);

  switch (product) {
    case 'freshsales':
      console.log('freshsales');
      utils.set('api_key', personalizeAPIField('Freshsales'));
      utils.set('freshworks_crm_field', { visible: false });
      break;
    case 'freshworks_crm':
      console.log('freshworks crm');
      utils.set('api_key', personalizeAPIField('Freshworks CRM'));
      utils.set('freshsales_field', { visible: false });
      break;
  }

  function personalizeAPIField(name) {
    return {
      hint: `Please enter API key of ${name}`,
      label: `${name} API key`
    };
  }
}

async function establishAPIConnection(api_key) {
  try {
    let { name: productName, url: host_url } = client.context.productContext;
    console.log(productName, host_url, api_key);
    let options = {
      Authorization: `Token token=${api_key}`,
      'Content-Type': 'application/json'
    };
    let URL = genHostEndpoint(productName, host_url);
    console.log('url', URL);
    client.request.get(URL, options).then(
      function (data) {
        console.log(`On Autheticating: ${data}`);
      },
      function (error) {
        console.log(error);
      }
    );
  } catch (error) {
    console.error(error);
    return `4XX NOT OK`;
  }

  function genHostEndpoint(productName, host_url) {
    return `${host_url}/sales/api/contacts/16001771741`;
  }
}

function onFormUnload() {
  console.log('This statement executes when user leaves the configuration page');
}
