export enum DeliveryStatus {
  Delivered = 100,
  Pending = 200,
}

export const getDeliveryStatusByValue = (value) => {
  return Object.keys(DeliveryStatus)[
    Object.values(DeliveryStatus).indexOf(value)
  ];
};
