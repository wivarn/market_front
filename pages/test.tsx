import { SubmitButton } from "components/buttons";
import { toast } from "react-toastify";

const notify = async () => {
  toast("Default Notification !");

  toast.success("Success Notification !", {
    position: toast.POSITION.TOP_CENTER,
  });

  toast.error("Error Notification !", {
    position: toast.POSITION.TOP_LEFT,
  });

  toast.warn("Warning Notification !", {
    position: toast.POSITION.BOTTOM_LEFT,
  });

  toast.info("Info Notification !", {
    position: toast.POSITION.BOTTOM_CENTER,
  });

  toast.dark("Dark Notification !", {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};

export default function test() {
  return <SubmitButton text="test" onClick={notify} />;
}
