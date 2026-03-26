import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddressSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (address: string) => void;
}

export const AddressSearchModal = ({
  isOpen,
  onClose,
  onComplete,
}: AddressSearchModalProps) => {
  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") extraAddress += data.bname;
      if (data.buildingName !== "")
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    onComplete(fullAddress);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>주소 검색</DialogTitle>
        </DialogHeader>
        <div className="p-2">
          <DaumPostcodeEmbed
            onComplete={handleComplete}
            style={{ height: "450px" }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
