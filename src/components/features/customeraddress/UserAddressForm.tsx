"use client";

import CustomerAddressNextApi from "@/common/api/next/CustomerAddressNextApi";
import region from "@/common/contants/region.json";
import CustomerAddressModel from "@/common/models/CustomerAddressModel";
import { RegionJson } from "@/common/types/Region";
import {
  CustomerAddressJson,
  CustomerAddressJsonAddEdit,
} from "@/common/types/CustomerAddress";
import FormFieldErrorMessage from "@/components/shared/form/FormFieldErrorMessage";
import ToastContentList from "@/components/toast/ToastContentList";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CustomerAddressForm = ({
  editingItem,
  onSaveSuccess,
  isOpen,
  onClose,
  onOpenChange,
}: {
  editingItem: CustomerAddressJson;
  onSaveSuccess: (item: CustomerAddressModel) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<CustomerAddressJsonAddEdit>
  >({});
  const { handleSubmit, reset, setValue, control, watch } =
    useForm<CustomerAddressJsonAddEdit>();

  const regionMapped: RegionJson[] = useMemo(() => {
    return region.map((regionItem) => ({
      id: regionItem.id,
      name: regionItem.name,
      parent_id: regionItem.parent_id,
      display_order: regionItem.display_order,
    }));
  }, []);

  const watchRegion =
    watch("region_id") !== undefined ? watch("region_id") : "";
  const watchSubRegion =
    watch("sub_region_id") !== undefined ? watch("sub_region_id") : "";
  const watchSubSubRegion =
    watch("sub_sub_region_id") !== undefined ? watch("sub_sub_region_id") : "";

  const [regionList, setRegionList] = useState<RegionJson[]>([]);
  const [subRegionList, setSubRegionList] = useState<RegionJson[]>([]);
  const [subSubRegionList, setSubSubRegionList] = useState<RegionJson[]>([]);

  const [isSelected, setIsSelected] = useState<boolean>(false);

  const onSubmit = useCallback(
    async (formData: CustomerAddressJsonAddEdit) => {
      setErrors([]);
      setFieldErrors({});

      let body: CustomerAddressJsonAddEdit = {
        ...formData,
        is_default: isSelected ? 1 : 0,
      };

      if (editingItem.id > 0) {
        const updateData = await CustomerAddressNextApi.edit({
          ...body,
          id: editingItem.id,
        });
        if (updateData.hasError()) {
          setErrors(updateData.error.errors);
        } else {
          toast.success(
            <ToastContentList title={"Cập nhật địa chỉ nhận hàng thành công"} />
          );

          // callback
          onSaveSuccess(updateData);
        }
      } else {
        const createData = await CustomerAddressNextApi.add(body);
        if (createData.hasError()) {
          setErrors(createData.error.errors);
        } else {
          toast.success(
            <ToastContentList title={"Lưu địa chỉ nhận hàng thành công"} />
          );

          // callback
          onSaveSuccess(createData);
        }
      }

      // close modal
      onClose();
      reset();
    },
    [onSaveSuccess, reset, onClose, editingItem, isSelected]
  );

  useEffect(() => {
    setRegionList(
      regionMapped
        .filter((r) => r.parent_id === 0)
        .sort((a, b) => a.display_order - b.display_order)
    );
  }, [regionMapped]);

  useEffect(() => {
    if (+watchRegion > 0) {
      setSubRegionList(
        regionMapped
          .filter((r) => r.parent_id === +watchRegion)
          .sort((a, b) => a.display_order - b.display_order)
      );
      setSubSubRegionList([]);
    }
  }, [watchRegion, regionMapped]);

  useEffect(() => {
    if (+watchSubRegion > 0) {
      setSubSubRegionList(
        regionMapped
          .filter((r) => r.parent_id === +watchSubRegion)
          .sort((a, b) => a.display_order - b.display_order)
      );
    }
  }, [watchSubRegion, regionMapped]);

  useEffect(() => {
    if (editingItem.id > 0) {
      setValue("phone", "0" + editingItem.phone, { shouldValidate: true });
      setValue("full_name", editingItem.full_name, { shouldValidate: true });
      setValue("address", editingItem.address);
      setValue("note", editingItem.note);
      setValue("region_id", editingItem.region_id, {
        shouldValidate: true,
      });
      setValue("sub_region_id", editingItem.sub_region_id, {
        shouldValidate: true,
      });
      setValue("sub_sub_region_id", editingItem.sub_sub_region_id, {
        shouldValidate: true,
      });
      setIsSelected(editingItem.is_default ? true : false);
    }
  }, [setValue, editingItem]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      isDismissable={false}
      size="2xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h5 className="text-xl font-bold text-primary">
                Thêm mới địa chỉ nhận hàng
              </h5>
            </ModalHeader>
            <ModalBody>
              <form
                id="form-modal-customer-address"
                onSubmit={handleSubmit(onSubmit, (err) => setFieldErrors(err))}
              >
                <div id="form-add-customer-address" className="space-y-4">
                  {/* phone */}
                  <label className="block">
                    <Controller
                      render={({ field }) => (
                        <Input
                          {...field}
                          size="sm"
                          label="Số điện thoại *"
                          variant="bordered"
                          aria-label="Số điện thoại *"
                          className="mt-1"
                        />
                      )}
                      name="phone"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Bạn chưa nhập số điẹn thoại",
                        },
                      }}
                    />
                    <FormFieldErrorMessage
                      fieldErrors={fieldErrors}
                      name="phone"
                    />
                  </label>

                  {/* fullname */}
                  <label className="block">
                    <Controller
                      render={({ field }) => (
                        <Input
                          {...field}
                          size="sm"
                          variant="bordered"
                          label="Họ và tên người nhận *"
                          aria-label="Họ và tên người nhận *"
                          className="mt-1"
                        />
                      )}
                      name="full_name"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Bạn chưa nhập họ và tên người nhận",
                        },
                      }}
                    />
                    <FormFieldErrorMessage
                      fieldErrors={fieldErrors}
                      name="full_name"
                    />
                  </label>

                  {/* address */}
                  <label className="block">
                    <Controller
                      render={({ field }) => (
                        <Input
                          {...field}
                          size="sm"
                          variant="bordered"
                          label="Địa chỉ"
                          aria-label="Địa chỉ"
                          className="mt-1"
                        />
                      )}
                      name="address"
                      control={control}
                    />
                    <FormFieldErrorMessage
                      fieldErrors={fieldErrors}
                      name="address"
                    />
                  </label>

                  {/* region */}
                  <label className="block">
                    <Controller
                      render={({ field }) => (
                        <Select
                          {...field}
                          id="region_id"
                          size="lg"
                          classNames={{
                            base: "w-[unset]",
                            selectorIcon: "static",
                          }}
                          labelPlacement="outside"
                          placeholder="Tỉnh/Thành phố *"
                          aria-label="Tỉnh/Thành phố *"
                          selectedKeys={
                            +watchRegion > 0 ? [watchRegion.toString()] : []
                          }
                        >
                          {regionList.map((item) => {
                            return (
                              <SelectItem key={item.id}>{item.name}</SelectItem>
                            );
                          })}
                        </Select>
                      )}
                      name="region_id"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Bạn chưa chọn Tỉnh/Thành phố",
                        },
                      }}
                    />
                    <FormFieldErrorMessage
                      fieldErrors={fieldErrors}
                      name="region_id"
                    />
                  </label>

                  {/* subregion */}
                  <label className="block">
                    <Controller
                      render={({ field }) => (
                        <Select
                          {...field}
                          id="sub_region_id"
                          size="lg"
                          classNames={{
                            base: "w-[unset]",
                            selectorIcon: "static",
                          }}
                          labelPlacement="outside"
                          isDisabled={+watchRegion <= 0}
                          placeholder="Quận/Huyện *"
                          aria-label="Quận/Huyện *"
                          selectedKeys={
                            +watchSubRegion > 0
                              ? [watchSubRegion.toString()]
                              : []
                          }
                        >
                          {subRegionList.map((item) => {
                            return (
                              <SelectItem key={item.id}>{item.name}</SelectItem>
                            );
                          })}
                        </Select>
                      )}
                      name="sub_region_id"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Bạn chưa chọn Quận/Huyện",
                        },
                      }}
                    />
                    <FormFieldErrorMessage
                      fieldErrors={fieldErrors}
                      name="sub_region_id"
                    />
                  </label>

                  {/* subsubregion */}
                  <label className="block">
                    <Controller
                      render={({ field }) => (
                        <Select
                          {...field}
                          id="sub_sub_region_id"
                          size="lg"
                          classNames={{
                            base: "w-[unset]",
                            selectorIcon: "static",
                          }}
                          labelPlacement="outside"
                          isDisabled={+watchSubRegion <= 0}
                          placeholder="Phường/Xã *"
                          aria-label="Phường/Xã *"
                          selectedKeys={
                            +watchSubSubRegion > 0
                              ? [watchSubSubRegion.toString()]
                              : []
                          }
                        >
                          {subSubRegionList.map((item) => {
                            return (
                              <SelectItem key={item.id}>{item.name}</SelectItem>
                            );
                          })}
                        </Select>
                      )}
                      name="sub_sub_region_id"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Bạn chưa chọn Phường/Xã",
                        },
                      }}
                    />
                    <FormFieldErrorMessage
                      fieldErrors={fieldErrors}
                      name="sub_sub_region_id"
                    />
                  </label>

                  {/* note */}
                  <label className="block">
                    <Controller
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          type="note"
                          placeholder="Ghi chú"
                          maxRows={5}
                          className="mt-1"
                        />
                      )}
                      name="note"
                      control={control}
                    />
                  </label>

                  {/* isdefault */}
                  {editingItem.id > 0 ? (
                    <label className="block">
                      <Checkbox
                        isSelected={isSelected}
                        onValueChange={setIsSelected}
                      >
                        Thiết lập mặc định
                      </Checkbox>
                    </label>
                  ) : null}
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Đóng
              </Button>
              <Button
                color="primary"
                type="submit"
                form="form-modal-customer-address"
              >
                Lưu thông tin
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CustomerAddressForm;
