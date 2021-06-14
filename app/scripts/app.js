(async function init() {
  let client = await app.initialized();
  client.events.on('app.activated', async function getData() {
    let data = await client.data.get('domainName');
    writeToDOM(data);
  });
})();

function writeToDOM(data) {
  const renderUIwith = document.querySelector('#result');
  console.table(data);
  renderUIwith.append(`${JSON.stringify(data, null, 4)}`);
}
