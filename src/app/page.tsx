import { Metadata } from "next";
import Practice from "../components/Practice/Practice";

export default function Page() {
  return (
    <div className="flex flex-column align-items-center mx-4 mt-4">
      <Practice />
    </div>
  );
}
