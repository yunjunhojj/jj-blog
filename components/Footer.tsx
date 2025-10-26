import dayjs from "dayjs";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 pt-8 dark:border-gray-800 mt-16">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {dayjs().year()} JJ Blog. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a
            href="https://github.com/yunjunhojj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            GitHub
          </a>
          <a
            href="https://docs.google.com/document/d/1jDKNiBXMjg1uxB-pCEq55tSLTamWRcla_7pYAH4fKCI/edit?tab=t.0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
