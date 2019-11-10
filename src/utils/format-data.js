export default function formatData(dataSet) {
  dataSet.forEach(o => {
    o['classPackage'] = parseInt(o['package'].replace(/[classes ]/g, ''));
    o['amountPaid'] = parseInt(o['amountPaid']);
    o['date'] = new Date(o['purchaseDate'].replace(/(st)|(nd)|(rd)|(th)/g, ''));
    delete o.id;
    delete o.userId;
    delete o._id;
    delete o.purchaseDate;
    delete o.package;
    delete o.__v;
  });
}
