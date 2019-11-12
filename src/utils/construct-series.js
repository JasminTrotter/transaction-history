export function constructSeries(data) {
  let classesPurchasedItem;
  let amountPaidItem;
  const series = [];
  const classPackageItems = [];
  const amountPaidItems = [];

  data.forEach((item) => {

    if (classesPurchasedItem && classesPurchasedItem.date && classesPurchasedItem.date.getTime() === item.date.getTime()) {
      classesPurchasedItem.value = classesPurchasedItem.value + item.classPackage;
    } else {
      classesPurchasedItem = {};
      classesPurchasedItem.key = 'Classes Purchased';
      classesPurchasedItem.date = item.date;
      classesPurchasedItem.value = item.classPackage;
    }

    if (classesPurchasedItem) classPackageItems.push(classesPurchasedItem);

    if (amountPaidItem && amountPaidItem.date && amountPaidItem.date.getTime() === item.date.getTime()) {
      amountPaidItem.value = amountPaidItem.value + item.amountPaid / 10;
    } else {
      amountPaidItem = {};
      amountPaidItem.key = 'Revenue';
      amountPaidItem.date = item.date;
      amountPaidItem.value = item.amountPaid / 10;
    }

    if (amountPaidItem) amountPaidItems.push(amountPaidItem);
  });

  series[0] = classPackageItems;
  series[1] = amountPaidItems;

  return series;
}
