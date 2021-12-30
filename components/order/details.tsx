import { IOrderDetails } from "types/order";
import { Order } from ".";
import OrderFeedbackForm from "components/forms/order/feedback";
import { SpinnerLg } from "components/spinner";
import { refundReasonList } from "constants/orders";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { sub } from "date-fns";

interface IOrderDetailsProps {
  order: IOrderDetails;
}

export default function OrderDetails(props: IOrderDetailsProps): JSX.Element {
  const { data: session, status } = useSession();
  const sessionLoading = status === "loading";
  const order = props.order;
  const sale = order.seller.id == session?.accountId;

  function renderOrderHistory() {
    const historyMapping: {
      [key: string]: string;
      pending_shipment_at: string;
      shipped_at: string;
      received_at: string;
      cancelled_at: string;
    } = {
      pending_shipment_at: "Paid",
      shipped_at: "Shipped",
      received_at: "Received",
      cancelled_at: "Cancelled",
    };

    return (
      <>
        <h3 className="mb-4 text-center">Order History</h3>
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
      </>
    );
  }

  function renderRefundHistory() {
    if (!order.refunds.length) return null;

    const statusMapping: {
      [key: string]: string;
      pending: string;
      succeeded: string;
      failed: string;
    } = {
      pending: "Pending",
      succeeded: "Succeeded",
      failed: "Failed",
    };

    return (
      <>
        <h3 className="mb-4 text-center">Refund History</h3>
        <table className="w-full border-b table-fixed">
          <thead className="bg-accent-lighter">
            <tr className="text-sm md:text-base">
              <th className="w-1/5">Refund Amount</th>
              <th className="w-1/5">Date</th>
              <th className="w-1/5">Status</th>
              <th className="w-1/5">Reason</th>
              <th className="w-1/5">Notes</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {order.refunds.map((refund) => {
              const refundDate = new Date(
                refund.updated_at.replace(/-/g, "/")
              ).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });
              return (
                <tr key={refund.updated_at} className="text-xs md:text-base">
                  <td>
                    {Number(refund.amount).toLocaleString("en", {
                      style: "currency",
                      currency: "usd",
                    })}{" "}
                    {order.currency}
                  </td>
                  <td>{refundDate}</td>
                  <td>{statusMapping[refund.status]}</td>
                  <td>
                    {
                      refundReasonList.find(
                        (reason) => reason.value == refund.reason
                      )?.text
                    }
                  </td>
                  <td>{refund.notes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }

  const renderFeedback = () => {
    if (sale) {
      const feedback_text = () => {
        if (!order.review) {
          if (
            order.cancelled_at &&
            new Date(order.cancelled_at) < sub(Date.now(), { days: 14 })
          )
            return "Transaction Cancelled";
          if (order.refunded_total) return "Transaction Refunded";

          return "No feedback received";
        }
        if (order.review.reviewer == "SYSTEM")
          return (
            <>
              This is an automated review by the Skwirl Marktetplace{" "}
              <Link href="#">
                <a>(learn more)</a>
              </Link>
            </>
          );

        return order.review.feedback;
      };

      return (
        <>
          <h3 className="mb-2 text-center" id={`order-${order.id}-feedback`}>
            Feedback
          </h3>
          <div className="p-2 mb-4 text-center border rounded-md shadow-md">
            <h5>{feedback_text()}</h5>
          </div>
        </>
      );
    } else {
      return (
        <div className="mb-4">
          <h3 className="mb-4 text-center" id={`order-${order.id}-feedback`}>
            Feedback
          </h3>
          <OrderFeedbackForm order={order} />
        </div>
      );
    }
  };

  if (sessionLoading) return <SpinnerLg text="Loading..." />;

  return (
    <>
      <Order order={order} />
      <div className="max-w-4xl mx-auto mt-4">
        {renderFeedback()}
        {renderOrderHistory()}
        {renderRefundHistory()}
      </div>
    </>
  );
}
