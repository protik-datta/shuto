import { COMMERCE } from "../../constants/site";
import { formatPrice } from "../../utils/format";

export default function AnnouncementBar() {
  return (
    <div className="bg-ink px-4 py-2 text-center text-meta text-paper">
      Free shipping on orders over {formatPrice(COMMERCE.freeShippingThreshold)}
      . Cash on delivery available nationwide.
    </div>
  );
}
