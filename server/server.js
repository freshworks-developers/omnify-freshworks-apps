function logMsg(msg, payload) {
  let {
    productContext: { name: productName }
  } = payload;
  let log = console.info;

  log(`
  \nProduct: ${productName}
  \nWhen: ${msg}
  \nPayload: ${JSON.stringify(payload, ['domain', 'event'], 2)}
  `);
}

exports = {
  onLeadCreateHandler: function freshsales(payload) {
    logMsg('A lead is created in Freshsales', payload);
  },
  onContactCreateHandler: function freshworks_crm(payload) {
    logMsg('A contact is created in Freshworks CRM', payload);
  },
  onDealCreateHandler: function common(payload) {
    logMsg('A Deal is created either in Freshsales or in Freshworks CRM', payload);
  },
  handleExtEventForSales: function (payload) {
    logMsg('A desired external event occurs for Freshsales', payload);
  },
  handleExtEventForCRM: function (payload) {
    logMsg('A desired external event occurs for Freshworks CRM', payload);
  }
};
