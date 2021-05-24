import api from "services/api";
import { useSession } from "next-auth/client";

export default function NewListing() {
  const [session, loading] = useSession();

  const createListing = async (event) => {
    event.preventDefault();

    await api
      .post(
        "listings",
        {
          listing: {
            photos: ["fake_url"],
            title: event.target.title.value,
            condition: event.target.condition.value,
            currency: "USD",
            description: event.target.description.value,
            price: event.target.price.value,
            domestic_shipping: event.target.domestic_shipping.value,
            status: "active",
          },
        },
        {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.error);
      });
  };

  return (
    <form onSubmit={createListing}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        autoComplete="title"
        required
      />

      <label htmlFor="condition">Condition</label>
      <input
        id="condition"
        name="condition"
        type="text"
        autoComplete="condition"
        required
      />

      <label htmlFor="description">Description</label>
      <input id="description" name="description" type="text" required />

      <label htmlFor="price">Price</label>
      <input
        id="price"
        name="price"
        type="number"
        min="0.00"
        max="10000.00"
        step="0.01"
        required
      />

      <label htmlFor="domestic_shipping">Domestic Shipping</label>
      <input
        id="domestic_shipping"
        name="domestic_shipping"
        type="number"
        min="0.00"
        max="10000.00"
        step="0.01"
        required
      />

      <button type="submit">Create</button>
    </form>
  );
}
