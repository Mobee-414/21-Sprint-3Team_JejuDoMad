import { UseFormRegister, FieldErrors } from "react-hook-form";
import FormInput from "@/components/ui/input/FormInput";
import { type ActivityFormInput } from "@/features/activities/schemas/activity.schema";

interface AddressInputProps {
  register: UseFormRegister<ActivityFormInput>;
  errors: FieldErrors<ActivityFormInput>;
  onSearchClick: () => void;
}

export const AddressInput = ({
  register,
  errors,
  onSearchClick,
}: AddressInputProps) => {
  return (
    <div className="flex flex-col">
      <FormInput
        {...register("address")}
        label="주소"
        placeholder="주소를 검색해 주세요"
        variant="experience"
        readOnly
        className="cursor-pointer !bg-white"
        onClick={onSearchClick}
        errorMessage={errors.address?.message}
      />

      <div className="!-mt-2">
        <FormInput
          {...register("detailAddress")}
          label=""
          placeholder="상세 주소를 입력해 주세요 (예: 3층, 302호)"
          variant="experience"
          className="!bg-white"
          errorMessage={errors.detailAddress?.message}
        />
      </div>
    </div>
  );
};
