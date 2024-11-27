interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
  name: string;
}

export default function FormInput({ type, placeholder, required, errors, name }: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        className="w-full px-12 py-3 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-900 placeholder-gray-400"
        type={type}
        placeholder={placeholder}
        required={required}
        name={name}
      />
      <span className="text-red-500 font-medium">
        {errors.map((error, index) => (
          <span key={index}>{error}</span>
        ))}
      </span>
    </div>
  );
}
