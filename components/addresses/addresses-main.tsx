"use client";
import AddressCard from "@/components/addresses/address-card";
import AddressEditForm from "@/components/addresses/address-edit";
import AddressAddForm from "@/components/addresses/address-add";
import { Address, AddressStatusOpenFormEdit } from "@/lib/types/address";
import { useEffect, useState } from "react";

interface AddressMainProps {
  addresses: Address[];
}

export default function AddressesMain({ addresses }: AddressMainProps) {
  const [formInstances, setFormInstances] = useState<number[]>([]);
  const [initAddresses, setInitAddresses] = useState<
    AddressStatusOpenFormEdit[]
  >([]);
  useEffect(() => {
    const sortedAddresses = addresses.sort(
      (a: Address, b: Address) =>
        new Date(b.updated_at || "").getTime() -
        new Date(a.updated_at || "").getTime()
    );

    const addressListData: AddressStatusOpenFormEdit[] = sortedAddresses.map(
      (address) => ({
        addressDetail: address,
        openFormEdit: false,
      })
    );

    setInitAddresses(addressListData);
  }, [addresses]);
  const handleAddForm = () => {
    setFormInstances((prev) => [...prev, Date.now()]);
  };

  const handleRemoveForm = (id: number) => {
    setFormInstances((prev) => prev.filter((formId) => formId !== id));
  };

  const ChangeStatusFormEditAddress = (id: string) => {
    setInitAddresses((prev) =>
      prev.map((addr) =>
        addr.addressDetail.id === id
          ? {
              ...addr,
              openFormEdit: !addr.openFormEdit,
            }
          : addr
      )
    );
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <span className="text-lg text-gray-700 font-medium mt-2">
          ĐỊA CHỈ CỦA BẠN
        </span>
        <button
          className="bg-blue-500 py-2 px-5 rounded text-sm font-medium text-white hover:bg-blue-600 transition duration-200 cursor-pointer"
          onClick={handleAddForm}
        >
          Thêm địa chỉ
        </button>
      </div>
      <div className="flex w-full flex-row">
        <div className="w-1/2 mt-5 flex flex-col gap-4">
          {initAddresses.map((addressData) =>
            addressData.openFormEdit ? (
              <AddressEditForm
                key={addressData.addressDetail.id}
                addressData={addressData}
                closeFormEdit={ChangeStatusFormEditAddress}
                addressesData={initAddresses}
                setInitAddresses={setInitAddresses}
              />
            ) : (
              <AddressCard
                key={addressData.addressDetail.id}
                address={addressData.addressDetail}
                openFormEditAddress={ChangeStatusFormEditAddress}
                setInitAddresses={setInitAddresses}
              />
            )
          )}
        </div>
        <div className="w-1/2 flex flex-col gap-4 items-start justify-start mt-5">
          {formInstances.map((formId) => (
            <div key={formId} className="relative w-full">
              <AddressAddForm
                handleRemoveForm={handleRemoveForm}
                id={formId}
                setInitAddresses={setInitAddresses}
                addressesData={initAddresses}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
