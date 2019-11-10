
export const series = [];

export function constructSeries(data) {
  let classesPurchasedItem;
  let amountPaidItem;
  let packagesPurchasedItem;
  const classPackageItems = [];
  const amountPaidItems = [];
  const packagesPurchasedItems = [];

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
      amountPaidItem.value = amountPaidItem.value + item.amountPaid;
    } else {
      amountPaidItem = {};
      amountPaidItem.key = 'Revenue';
      amountPaidItem.date = item.date;
      amountPaidItem.value = item.amountPaid;
    }

    if (amountPaidItem) amountPaidItems.push(amountPaidItem);

    if (packagesPurchasedItem && packagesPurchasedItem.date && packagesPurchasedItem.date.getTime() === item.date.getTime()) {
      packagesPurchasedItem.value = packagesPurchasedItem.value + 1;
    } else {
      packagesPurchasedItem = {};
      packagesPurchasedItem.key = 'Packages Purchased';
      packagesPurchasedItem.date = item.date;
      packagesPurchasedItem.value = 1;
    }

    if (packagesPurchasedItem) packagesPurchasedItems.push(packagesPurchasedItem);
  });

  series[0] = classPackageItems;
  series[1] = amountPaidItems;
  series[2] = packagesPurchasedItems;
}
