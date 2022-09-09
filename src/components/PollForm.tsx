import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { trpc } from "../utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createPollValidator,
  CreatePollInputType,
} from "../shared/create-poll-validator";
import { useRouter } from "next/router";

const PollForm: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<CreatePollInputType>({
    defaultValues: {
      question: "",
      options: [
        {
          option: "",
        },
        { option: "" },
      ],
    },
    resolver: zodResolver(createPollValidator),
  });

  const { fields, append, remove } = useFieldArray<CreatePollInputType>({
    control,
    name: "options",
  });

  const watchFieldArray = watch("options");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  const { mutate, isLoading, data } = trpc.useMutation("questions.create", {
    onSuccess: (data) => {
      console.log("trpc data: ", data);
      router.push(`/question/${data.id}`);
      reset();
    },
  });

  if (isLoading || data) return <div>Loading...</div>;

  const onSubmit = (data: CreatePollInputType) =>
    console.log("hook form data", data);

  return (
    <form className="w-1/2" onSubmit={handleSubmit((data) => mutate(data))}>
      <div className="">
        <div className="max-w-[35rem] p-5">
          <div className="grid grid-cols-1 gap-y-5 justify-items-end">
            <label className="relative flex items-center w-full">
              <span className="w-[20%] p-2 text-sm text-center text-gray-700 whitespace-no-wrap bg-gray-300 border-2 border-gray-300 shadow-sm rounded-l-md">
                When is your event?
              </span>
              <input
                type="date"
                className="relative block w-[75%] py-2 text-sm border-2 border-gray-300 shadow-sm rounded-r-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="relative flex items-center w-full">
              <span className="w-[20%] p-2 text-sm text-center text-gray-700 whitespace-no-wrap bg-gray-300 border-2 border-gray-300 shadow-sm rounded-l-md">
                Poll Title
              </span>
              <input
                {...register("question")}
                type="text"
                className="relative block w-[75%] py-2 text-sm border-2 border-gray-300 shadow-sm rounded-r-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors?.question && errors?.question?.message && (
                <div className="absolute text-xs italic text-red-400 right-8">
                  {errors?.question?.message}
                </div>
              )}
            </label>
            <div className="relative flex flex-col w-[80%] gap-y-5 aspect-[4/1]">
              {controlledFields.map((field, index) => {
                return (
                  <div key={field.id} className="flex items-center">
                    <div className="relative flex flex-col items-center justify-between w-full">
                      <div className="flex items-center justify-between w-full">
                        <label className="flex items-center flex-1 w-full gap-y-3">
                          <span className="w-20 p-2 text-sm text-center text-gray-700 whitespace-no-wrap bg-gray-300 border-2 border-gray-300 shadow-sm rounded-l-md">
                            Option {index + 1}
                          </span>
                          <input
                            type="text"
                            className="relative flex-1 block py-2 mr-[3px] text-sm border-2 border-gray-300 shadow-sm rounded-r-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            {...register(`options.${index}.option` as const)}
                          />
                          {errors && errors?.options?.[index] && (
                            <p className="absolute text-xs italic text-red-400 right-3">
                              {errors.options[index]?.option?.message}
                            </p>
                          )}
                        </label>
                      </div>
                    </div>
                    <button
                      title="remove item"
                      className="text-gray-500"
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
                className="absolute top-7 -left-12"
                title="add options"
                disabled={fields.length === 5}
                type="button"
                onClick={() => append({ option: "" })}
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
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-7"
              type="submit"
            />
          </div>
        </div>
      </div>
      {errors?.options && errors?.options?.message && (
        <div className="ml-5 text-sm italic text-red-400">
          {errors?.options?.message}
        </div>
      )}
    </form>
  );
};

export default PollForm;
