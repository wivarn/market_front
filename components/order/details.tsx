import { IOrderDetails } from "types/order";
import { Order } from ".";

interface IOrderDetailsProps {
  order: IOrderDetails;
}

export default function OrderDetails(props: IOrderDetailsProps): JSX.Element {
  const order = props.order;

  function renderOrderHistory() {
    const historyMapping: {
      [key: string]: string;
      pending_shipment_at: string;
      shipped_at: string;
      received_at: string;
    } = {
      pending_shipment_at: "Paid",
      shipped_at: "Shipped",
      received_at: "Received",
    };

    return (
      <div className="max-w-4xl mx-auto mt-4">
        <table className="w-full border-b table-fixed">
          <thead className="bg-accent-lighter">
            <tr>
              <th className="w-1/2">Event</th>
              <th className="w-1/2">Date</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {Object.keys(historyMapping).map((event) => {
              if (order[event] == null) return null;

              const eventDate = new Date(
                order[event].replace(/-/g, "/")
              ).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });
              return (
                <tr key={event}>
                  <td>{historyMapping[event]}</td>
                  <td>{eventDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <Order order={order} />
      {renderOrderHistory()}
    </>
  );
}
