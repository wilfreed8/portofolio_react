import { UserCircle } from "lucide-react";

const EmailTemplate = ({ email, className }: any) => {
  return (
    <div
      className={`flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md ${className}`}
    >
      {/* Icone */}
      <div className="flex-shrink-0">
        <UserCircle className="w-12 h-12 text-neutral-600 dark:text-cyan-400" />
      </div>

      {/* Contenu */}
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="font-bold text-md md:text-lg truncate">{email.name}</h1>
          <a
            href={`mailto:${email.email}`}
            target="_blank"
            className="font-semibold dark:text-info text-blue-500 hover:underline"
          >
            {email.email}
          </a>
        </div>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base max-h-[100px] md:max-h-[150px] overflow-y-auto">
          {email.message}
        </p>
      </div>
    </div>
  );
};

export default EmailTemplate;
