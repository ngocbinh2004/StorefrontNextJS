import { PreOrderJson } from "@/common/types/PreOrder";
import TextDateTime from "@/components/shared/displaydata/TextDateTime";

const PreOrderItem = ({ preOrderItem }: { preOrderItem: PreOrderJson }) => {
  return (
    <tr>
      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
        {preOrderItem.full_name}
      </td>
      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
        *******{preOrderItem.phone.slice(-3)}
      </td>
      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
        <TextDateTime
          ts={preOrderItem.date_created}
          format="HH:mm:ss ,DD/MM/YYYY"
        />
      </td>
    </tr>
  );
};

export default PreOrderItem;
