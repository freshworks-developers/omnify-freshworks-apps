(async function () {
  const client = await app.initialized();
  let { name: productName } = client.context.productContext;
  renderConfigPage(productName);
})();

function renderConfigPage(productName) {
  const titleHTML = document.querySelector('header.product-specific.title');
  const subTitleHTML = document.querySelector('legend.product-specific.subtitle');

  titleHTML.innerHTML = `Omni - Custom configuration page <span> ${productName}</span> 🌍`;
  subTitleHTML.innerHTML = `${productName} Specific Elements Implementation`;
}
