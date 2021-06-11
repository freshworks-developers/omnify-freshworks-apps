async function onFormLoad() {
  const client = await app.initialized();
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

function onFormUnload() {
  console.log('This statement executes when user leaves the configuration page');
}
