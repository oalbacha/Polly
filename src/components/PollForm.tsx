import React from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

type Inputs = {
  title: string;
  option1: string;
  option2: string;
  fieldArray: { options: string }[];
};

const PollForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fieldArray",
    rules: {
      minLength: 4,
    },
  });

  console.log("errors", errors);

  const onSubmit = (data: Inputs) => console.log("data", data);
  const watchFieldArray = watch("fieldArray");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  console.log("updated", controlledFields);
  console.log("fields", fields);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="w-1/2" onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        <div className="max-w-lg p-5">
          <div className="grid grid-cols-1 gap-y-3 justify-items-end">
            <label className="flex items-center w-full">
              <span className="w-[20%] p-2 text-sm text-center text-gray-700 whitespace-no-wrap bg-gray-300 border-2 border-gray-300 shadow-sm rounded-l-md">
                Poll Title
              </span>
              <input
                {...register("title")}
                type="text"
                className="block w-[80%] py-2 text-sm border-2 border-gray-300 shadow-sm rounded-r-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <div className="relative grid w-[80%] gap-y-3">
              <label className="flex">
                <span className="w-20 p-2 text-sm text-center text-gray-700 whitespace-no-wrap bg-gray-300 border-2 border-gray-300 shadow-sm rounded-l-md">
                  Option 1
                </span>
                <input
                  {...register("option1")}
                  type="text"
                  className="flex-1 block py-2 text-sm border-2 border-gray-300 shadow-sm w-[70%] rounded-r-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
              <label className="flex">
                <span className="w-20 p-2 text-sm text-center text-gray-700 whitespace-no-wrap bg-gray-300 border-2 border-gray-300 shadow-sm rounded-l-md">
                  Option 2
                </span>
                <input
                  {...register("option2")}
                  type="text"
                  className="block flex-1 w-[70%] py-2 text-sm border-2 border-gray-300 shadow-sm rounded-r-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
              {controlledFields.map((field, index) => {
                return (
                  <div key={field.id} className="relative">
                    <label className="flex items-center flex-1 gap-y-3">
                      <span className="w-20 p-2 text-sm text-center text-gray-700 whitespace-no-wrap bg-gray-300 border-2 border-gray-300 shadow-sm rounded-l-md">
                        Option {index + 3}
                      </span>
                      <input
                        type="text"
                        className="block flex-1 w-[70%] py-2 text-sm border-2 border-gray-300 shadow-sm rounded-r-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        {...register(`fieldArray.${index}.options` as const)}
                      />
                    </label>
                    <button
                      className="absolute text-gray-500 bottom-2 -right-9"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}
              <button
                className="absolute bottom-0 -left-12"
                disabled={fields.length === 3}
                type="button"
                onClick={() => append({ options: "" })}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#94a3b8"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
            <input
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="submit"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default PollForm;
