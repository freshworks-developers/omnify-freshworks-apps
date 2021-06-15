async function onFormLoad() {
  window.client = await app.initialized();
  let { name: currentProduct } = client.context.productContext;
  renderConfigPage(currentProduct);
}

function renderConfigPage(currentProduct) {
  let product = String(currentProduct);

  switch (product) {
    case 'freshsales':
      utils.set('api_key', personalizeAPIField('Freshsales'));
      utils.set('freshworks_crm_field', { visible: false });
      break;
    case 'freshworks_crm':
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
    let options = {
      headers: {
        Authorization: `Token token=${api_key}`,
        'Content-Type': 'application/json'
      }
    };
    let URL = genHostEndpoint(productName, host_url);
    let res = await client.request.get(URL, options);
    if (res.status == '200') return '';
  } catch (error) {
    console.error(error);
    return `Invalid API Key`;
  }

  function genHostEndpoint(productName, host_url) {
    switch (productName) {
      case 'freshsales':
        return `${host_url}/api/settings/deals/fields`;
      case 'freshworks_crm':
        return `${host_url}/api/sales_activites`;
    }
  }
}

function onFormUnload() {
  console.log('This statement executes when user leaves the configuration page');
}
