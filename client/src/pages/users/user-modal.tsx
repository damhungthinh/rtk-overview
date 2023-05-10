import { useAppDispatch, useAppSelector } from "../../redux";
import {
  ChangeEvent,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/outline";
import { closeUserModal } from "../../redux/features/users/slices";
import { UserForm } from "../../models/User";
import {
  useAddUsersMutation,
  useGetUserMutation,
} from "../../redux/features/users/api";

export const UserModal = () => {
  const { modal } = useAppSelector((state) => state.user);
  const cancelButtonRef = useRef(null);
  const dispatch = useAppDispatch();

  const [getUser] = useGetUserMutation();

  const [addUser, addResult] = useAddUsersMutation();

  const [form, updateForm] = useState<Partial<UserForm>>();

  const handleCloseUserModal = useCallback(
    () => dispatch(closeUserModal()),
    [dispatch]
  );

  // Handle form submition
  const handleSubmit = useCallback(() => {
    if (form?.email && form?.name) {
      return addUser({
        email: form.email,
        name: form.name,
      });
    }
  }, [form, addUser]);

  // Handle form's values changed
  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      updateForm({
        ...form,
        [target.name]: target.value,
      });
    },
    [form]
  );

  // Hanlder add actions
  useEffect(() => {
    if (addResult.isSuccess) {
      handleCloseUserModal();
      updateForm({});
    }
  }, [addResult, handleCloseUserModal]);

  // Fetch data when user id was changed
  useEffect(() => {
    if (modal?.payload) {
      const id = modal.payload;

      getUser(id)
        .unwrap()
        .then((response) =>
          updateForm({
            name: response?.name,
            email: response?.email,
          })
        )
        .catch((error) => {
          console.log(error);
        });
    }
  }, [getUser, modal?.payload]);

  return (
    <Transition.Root show={!!modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handleCloseUserModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-center">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                      <UserIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        User Modal
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-full">
                      <label
                        htmlFor="full-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Fullname
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="name"
                          id="full-name"
                          value={form?.name}
                          onChange={handleChange}
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-full">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form?.email}
                          onChange={handleChange}
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleCloseUserModal}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
